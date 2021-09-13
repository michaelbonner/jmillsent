/* eslint-disable @next/next/no-img-element */
import groq from "groq";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { HiChevronDown } from "react-icons/hi";
import { GrContract, GrExpand, GrPause, GrPlay } from "react-icons/gr";
import Layout from "../../components/layout";
import { getClient } from "../../lib/sanity";
import urlForSanitySource from "../../lib/urlForSanitySource";
import useInterval from "../../hooks/useInterval";
import WorkItemTile from "../../components/work-item-tile";
import screenfull from "screenfull";

const workItemQuery = groq`
*[_type == "workItem" && slug.current == $slug][0]{
  _id,
  behindTheScenes,
  clientName,
  credits,
  extraPaddingOnVideo,
  frames,
  poster,
  slug,
  title,
  video_id,
  videoHeightAspectRatio,
  videoWidthAspectRatio,
}
`;

/*
prevent purging of aspect ratio
aspect-w-1	aspect-h-1
aspect-w-2	aspect-h-2
aspect-w-3	aspect-h-3
aspect-w-4	aspect-h-4
aspect-w-5	aspect-h-5
aspect-w-6	aspect-h-6
aspect-w-7	aspect-h-7
aspect-w-8	aspect-h-8
aspect-w-9	aspect-h-9
aspect-w-10	aspect-h-10
aspect-w-11	aspect-h-11
aspect-w-12	aspect-h-12
aspect-w-13	aspect-h-13
aspect-w-14	aspect-h-14
aspect-w-15	aspect-h-15
aspect-w-16	aspect-h-16
*/

const WorkItem = ({ workItem = {}, workItems = [] }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const player = useRef(null);
  const scrubber = useRef(null);
  const [scrubberWidth, setScrubberWidth] = useState(0);
  const [scrubberPosition, setScrubberPosition] = useState(0);
  const [totalPlaySeconds, setTotalPlaySeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isIpad, setIsIpad] = useState(false);

  const checkIfIos = (navigator) => {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  };

  const checkIfIpad = (navigator) => {
    return (
      !["iPhone", "iPod"].includes(navigator.platform) &&
      navigator.userAgent.includes("Mac") &&
      "ontouchend" in document
    );
  };

  const toggleFullScreen = (onOff) => {
    const element = document.querySelector(".bpd-player-container");
    if (onOff) {
      if (screenfull.isEnabled) {
        screenfull.request(element);
      }
      setIsFullscreen(true);
    } else {
      if (screenfull.isEnabled) {
        screenfull.exit();
      }
      setIsFullscreen(false);
    }
  };

  const handleFullScreenChange = (event) => {
    if (screenfull.isFullscreen) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on("change", handleFullScreenChange);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off("change", handleFullScreenChange);
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setScrubberWidth(scrubber?.current?.clientWidth || 100);
    }, 1000);
  }, [scrubber]);

  useInterval(
    () => {
      setScrubberPosition(
        (player.current.getCurrentTime() / totalPlaySeconds) * scrubberWidth
      );
    },
    isPlaying ? 75 : null
  );

  useLayoutEffect(() => {
    if (checkIfIos(window.navigator)) {
      setIsIos(true);
    }
    if (checkIfIpad(window.navigator)) {
      setIsIpad(true);
    }
  }, []);

  const {
    clientName = "",
    credits = [],
    poster = "",
    title = "",
    video_id = null,
  } = workItem;

  const videoHeightAspectRatio = workItem.videoHeightAspectRatio || "9";
  const videoWidthAspectRatio = workItem.videoWidthAspectRatio || "16";

  const fullTitle = clientName ? `${clientName} | ${title}` : title;

  return (
    <Layout
      title={
        workItem.seo_title ||
        `${fullTitle} | JmillsENT | Motion Picture Studio + Film Agency`
      }
      description={
        workItem.seo_description ||
        `${fullTitle} | JmillsENT | Motion Picture Studio + Film Agency`
      }
    >
      <article
        className={`bpd-player-container relative z-20 ${
          isFullscreen
            ? "h-screen flex flex-col justify-center items-center"
            : ""
        }`}
      >
        {video_id ? (
          <div className={`${isFullscreen ? "w-full" : "container"} mx-auto`}>
            <div
              className={`my-12 lg:my-0 relative aspect-w-${videoWidthAspectRatio} aspect-h-${videoHeightAspectRatio} transition-all duration-700 ${
                showVideo ? `opacity-100` : `opacity-0`
              }`}
            >
              <ReactPlayer
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen={true}
                controls={isIpad}
                frameBorder="0"
                height={`100%`}
                title={fullTitle}
                url={`https://player.vimeo.com/video/${video_id}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
                width={`100%`}
                playing={videoPlaying}
                onReady={() => {
                  setTimeout(() => {
                    setTotalPlaySeconds(player.current.getDuration());
                    setShowVideo(true);
                  }, [500]);
                }}
                onEnded={() => {
                  setVideoPlaying(false);
                }}
                onPlay={async () => {
                  setIsPlaying(true);
                }}
                onPause={() => {
                  setIsPlaying(false);
                }}
                ref={player}
              ></ReactPlayer>
              {!isIpad && (
                <button
                  className="absolute inset-0 bg-transparent flex items-center justify-center cursor-pointer text-6xl"
                  onClick={() => setVideoPlaying(!videoPlaying)}
                >
                  <GrPlay
                    className={`bpd-play-icon transition-all duration-500 ${
                      videoPlaying ? "opacity-0" : "opacity-100"
                    }`}
                  />
                </button>
              )}
            </div>

            {!isIos ? (
              <div className="container mx-auto mt-3 flex space-x-8">
                <button
                  className="relative text-4xl w-8 h-8"
                  onClick={() => setVideoPlaying(!videoPlaying)}
                  title="Play/Pause"
                >
                  <GrPause
                    className={`${
                      videoPlaying ? "opacity-100" : "opacity-0"
                    } absolute inset-0 transition-all duration-500`}
                  />
                  <GrPlay
                    className={`${
                      videoPlaying ? "opacity-0" : "opacity-100"
                    } absolute inset-0 transition-all duration-500`}
                  />
                </button>
                <button
                  className="relative w-full border-2 border-black rounded"
                  onClick={(e) => {
                    const scrubberBoundingClientRect =
                      scrubber.current.getBoundingClientRect();

                    const zeroBasedClickPosition =
                      e.clientX - scrubberBoundingClientRect.left;

                    const xPercentageClicked =
                      zeroBasedClickPosition / scrubber.current.clientWidth;

                    player.current.seekTo(xPercentageClicked, "fraction");
                    setScrubberPosition(xPercentageClicked * scrubberWidth);
                  }}
                  ref={scrubber}
                >
                  <div
                    className="h-full w-1 bg-gray-500 absolute top-0"
                    style={{
                      transform: `translate3d(${scrubberPosition}px,0, 0)`,
                    }}
                  ></div>
                </button>
                <div className="text-2xl flex items-center">
                  {isFullscreen ? (
                    <button onClick={() => toggleFullScreen(false)}>
                      <GrContract />
                    </button>
                  ) : (
                    <button onClick={() => toggleFullScreen(true)}>
                      <GrExpand />
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="container mx-auto">
            <div
              className={`aspect-w-${videoWidthAspectRatio} aspect-h-${videoHeightAspectRatio} transition-all duration-700`}
            >
              {poster ? (
                <img
                  alt="Poster image"
                  className="w-full h-full"
                  src={urlForSanitySource(poster).width(1200).url()}
                />
              ) : null}
            </div>
          </div>
        )}

        <div className="container px-4 md:px-0 mx-auto mt-4">
          <div className="flex justify-start items-center">
            <h1 className="text-2xl md:text-2xl lg:text-4xl uppercase flex space-x-4 md:space-x-8 text-left py-4">
              <span className="font-extrabold tracking-wide">
                {clientName ? `${clientName}` : ""}
              </span>
              <span className="font-outline tracking-wide">
                {title ? `${title}` : ""}
              </span>
            </h1>
          </div>

          <div>
            {credits && credits.length > 0 && (
              <>
                <button
                  className="w-full flex items-center space-x-2 font-bold text-lg lg:text-2xl text-left my-12 uppercase border-b-2 border-black pb-2"
                  onClick={() => setCreditsOpen(!creditsOpen)}
                  type="button"
                >
                  <span>Credits</span>
                  <span
                    className={`${
                      creditsOpen ? "rotate-180" : null
                    } transform transition-all text-4xl`}
                  >
                    <HiChevronDown />
                  </span>
                </button>
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 ${
                    creditsOpen ? "h-auto" : "h-0"
                  } transition-all overflow-hidden`}
                >
                  {credits.map((credit, index) => {
                    return (
                      <div className="grid grid-cols-3" key={index}>
                        <div className="font-bold">{credit.role}</div>
                        <div className="col-span-2">{credit.value}</div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </article>
      <aside className="hidden lg:block container mx-auto border-t mt-12 pt-12">
        <h3 className="font-outline uppercase text-3xl py-8 tracking-wider px-4 lg:px-0">
          Work
        </h3>
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-1">
          {workItems.map((workItem, index) => {
            return <WorkItemTile workItem={workItem} key={index} />;
          })}
        </div>
      </aside>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `
    *[_type == "workItem"]{slug}
  `
  );

  return {
    paths: paths
      .filter((path) => {
        return path;
      })
      .map((path) => {
        return { params: { slug: path.slug.current } };
      }),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  try {
    const workItem = await getClient().fetch(workItemQuery, { slug });
    const workItems = await getClient().fetch(
      groq`
      *[_type == "workItem"][!(_id in path('drafts.**'))]|order(order asc){
        _id,
        slug,
        clientName,
        title,
        poster,
        "shortClipMp4URL": shortClipMp4.asset->url,
        "shortClipOgvURL": shortClipOgv.asset->url,
      }
    `
    );
    return {
      props: { workItem, workItems },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}

export default WorkItem;
