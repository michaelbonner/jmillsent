/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { GrPlay, GrPause, GrContract, GrExpand } from 'react-icons/gr'
import useInterval from '../hooks/useInterval'
import screenfull from 'screenfull'
import urlForSanitySource from '../lib/urlForSanitySource'
import classNames from 'classnames'

const VideoPlayer = ({
  poster,
  title,
  videoId,
  clientName,
  videoHeightAspectRatio = '9',
  videoWidthAspectRatio = '16',
}) => {
  const [showVideo, setShowVideo] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const player = useRef(null)
  const scrubber = useRef(null)
  const [scrubberWidth, setScrubberWidth] = useState(0)
  const [scrubberPosition, setScrubberPosition] = useState(0)
  const [totalPlaySeconds, setTotalPlaySeconds] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [isIpad, setIsIpad] = useState(false)

  const checkIfIos = (navigator) => {
    return (
      [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    )
  }

  const checkIfIpad = (navigator) => {
    return (
      !['iPhone', 'iPod'].includes(navigator.platform) &&
      navigator.userAgent.includes('Mac') &&
      'ontouchend' in document
    )
  }

  const toggleFullScreen = (onOff) => {
    const element = document.querySelector('.bpd-player-container')
    if (onOff) {
      if (screenfull.isEnabled) {
        screenfull.request(element)
      }
      setIsFullscreen(true)
    } else {
      if (screenfull.isEnabled) {
        screenfull.exit()
      }
      setIsFullscreen(false)
    }
  }

  const handleFullScreenChange = (event) => {
    if (screenfull.isFullscreen) {
      setIsFullscreen(true)
    } else {
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on('change', handleFullScreenChange)
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleFullScreenChange)
      }
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setScrubberWidth(scrubber?.current?.clientWidth || 100)
    }, 1000)
  }, [scrubber])

  useInterval(
    () => {
      setScrubberPosition(
        (player.current.getCurrentTime() / totalPlaySeconds) * scrubberWidth
      )
    },
    isPlaying ? 75 : null
  )

  useLayoutEffect(() => {
    if (checkIfIos(window.navigator)) {
      setIsIos(true)
    }
    if (checkIfIpad(window.navigator)) {
      setIsIpad(true)
    }
  }, [])

  return (
    <article
      className={classNames(
        {
          'h-screen flex flex-col justify-center items-center': isFullscreen,
        },
        'bpd-player-container relative z-20'
      )}
    >
      {videoId ? (
        <div
          className={classNames(
            {
              'w-full': isFullscreen,
              container: !isFullscreen,
              'bg-gray-900': !showVideo,
            },
            'mx-auto transition-all duration-700'
          )}
        >
          <div
            className={classNames(
              `my-12 lg:my-0 relative`,
              `aspect-w-${videoWidthAspectRatio} aspect-h-${videoHeightAspectRatio}`,
              `transition-all duration-700`,
              {
                'opacity-100': showVideo,
                'opacity-0': !showVideo,
              }
            )}
          >
            <ReactPlayer
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen={true}
              controls={isIpad}
              frameBorder="0"
              height={`100%`}
              title={title}
              url={`https://player.vimeo.com/video/${videoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
              width={`100%`}
              playing={videoPlaying}
              onReady={() => {
                setTimeout(() => {
                  setTotalPlaySeconds(player.current?.getDuration() || 0)
                  setShowVideo(true)
                }, [500])
              }}
              onEnded={() => {
                setVideoPlaying(false)
              }}
              onPlay={async () => {
                setIsPlaying(true)
              }}
              onPause={() => {
                setIsPlaying(false)
              }}
              ref={player}
            ></ReactPlayer>
            {!isIpad && (
              <button
                className="absolute inset-0 bg-transparent flex items-center justify-center cursor-pointer text-6xl"
                onClick={() => setVideoPlaying(!videoPlaying)}
              >
                <GrPlay
                  className={classNames(
                    `bpd-white-icon transition-all duration-500`,
                    {
                      'opacity-0': videoPlaying,
                      'opacity-100': !videoPlaying,
                    }
                  )}
                />
              </button>
            )}
          </div>

          {!isIos ? (
            <div className="container mx-auto pt-3 flex space-x-8 bg-black">
              <button
                className="relative text-4xl w-8 h-8"
                onClick={() => setVideoPlaying(!videoPlaying)}
                title="Play/Pause"
              >
                <GrPause
                  className={classNames(
                    `bpd-white-icon`,
                    {
                      'opacity-100': videoPlaying,
                      'opacity-0': !videoPlaying,
                    },
                    `absolute inset-0 transition-all duration-500 fill-current`
                  )}
                />
                <GrPlay
                  className={classNames(
                    `bpd-white-icon`,
                    {
                      'opacity-100': !videoPlaying,
                      'opacity-0': videoPlaying,
                    },
                    `absolute inset-0 transition-all duration-500 fill-current`
                  )}
                />
              </button>
              <button
                className="relative w-full border-2 border-white rounded"
                onClick={(e) => {
                  const scrubberBoundingClientRect =
                    scrubber.current.getBoundingClientRect()

                  const zeroBasedClickPosition =
                    e.clientX - scrubberBoundingClientRect.left

                  const xPercentageClicked =
                    zeroBasedClickPosition / scrubber.current.clientWidth

                  player.current.seekTo(xPercentageClicked, 'fraction')
                  setScrubberPosition(xPercentageClicked * scrubberWidth)
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
                  <button
                    className="bpd-white-icon"
                    onClick={() => toggleFullScreen(false)}
                  >
                    <GrContract />
                  </button>
                ) : (
                  <button
                    className="bpd-white-icon"
                    onClick={() => toggleFullScreen(true)}
                  >
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
            className={classNames(
              `aspect-w-${videoWidthAspectRatio}`,
              `aspect-h-${videoHeightAspectRatio}`,
              `transition-all duration-700`
            )}
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
    </article>
  )
}
export default VideoPlayer
