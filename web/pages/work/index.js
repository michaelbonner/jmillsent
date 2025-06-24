import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import Layout from '@/components/layout'
import LittleBlackBar from '@/components/little-black-bar'
import { VideoPlayerOverlayButton } from '@/components/video-player-overlay-button'
import WorkItemTile from '@/components/work-item-tile'
import { sanityClient } from '@/lib/sanity'
import urlForSanitySource from '@/lib/urlForSanitySource'
import { PortableText } from '@portabletext/react'
import classNames from 'classnames'
import groq from 'groq'
import { useQueryState } from 'nuqs'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { GrPause, GrPlay, GrVolume, GrVolumeMute } from 'react-icons/gr'
import Lightbox from 'yet-another-react-lightbox'
import { ClientOnly } from '@/components/client-only'
import { ImageGallery } from '@/components/image-gallery'

function Work({ workPage, workItemCategories }) {
  const defaultActiveTab = workItemCategories?.at(0)?.name || ''
  const [activeTab, setActiveTab] = useQueryState('work-type', {
    defaultValue: defaultActiveTab,
    clearOnDefault: true,
  })

  const [lightboxActiveIndex, setLightboxActiveIndex] = useState(null)

  const isSocialLayout = activeTab === 'Social'

  const currentCategory = workItemCategories.find(
    (category) => category.name === activeTab
  )

  const categoryWorkItems =
    currentCategory.workItems?.map((workItem) => {
      if (!isSocialLayout) return workItem

      return {
        ...workItem,
        posterUrl: urlForSanitySource(workItem.poster)
          .width(1080)
          .height(1920)
          .crop('focalpoint')
          .url(),
      }
    }) ?? []

  const filteredWorkItems = categoryWorkItems
    .map((workItem) => ({
      ...workItem,
      flatCategories: (workItem.categories || []).map(
        (category) => category?.name
      ),
    }))
    .filter((workItem) => {
      return (
        workItem.flatCategories.length === 0 ||
        (workItem.flatCategories || []).includes(activeTab)
      )
    })

  const lightboxSlides = isSocialLayout
    ? filteredWorkItems.map((item, index) => ({
        ...item,
        index,
      }))
    : []

  const showWhiteContainer =
    currentCategory?.imageGallery?.length > 0 ||
    currentCategory?.title ||
    currentCategory?.workPageDescription

  return (
    <Layout
      title={
        activeTab !== defaultActiveTab
          ? `${activeTab} ${workPage.seoTitle}`
          : workPage.seoTitle
      }
      description={
        activeTab !== defaultActiveTab
          ? `${activeTab} | ${workPage.seoDescription}`
          : workPage.seoDescription
      }
    >
      <div className="lg:pt-24">
        <ul
          className={classNames(
            'mx-6 mt-4 flex flex-wrap items-center justify-center gap-y-1 border-t py-4 font-semibold',
            'lg:mx-36 lg:flex lg:divide-x lg:divide-white lg:pt-4',
            'xl:mx-48'
          )}
        >
          {workItemCategories.map((tab, index) => {
            return (
              <li
                className={classNames(
                  'relative flex justify-center border-r text-xs',
                  '[&:last-child]:border-r-0',
                  'lg:px-12 lg:text-base'
                )}
                key={index}
              >
                <button
                  className={classNames(
                    'rounded-xl border px-2 py-1 uppercase transition-all',
                    'lg:tracking-wider',
                    activeTab === tab.name
                      ? 'mx-2 border-white'
                      : 'border-black hover:scale-110'
                  )}
                  onClick={() => setActiveTab(tab.name)}
                >
                  {tab.name}

                  <span className="absolute inset-0" />
                </button>
              </li>
            )
          })}
        </ul>
        {/* lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 */}
        <div
          className={classNames(
            'mx-1 grid grid-cols-1 gap-1',
            filteredWorkItems.length >= 3
              ? 'lg:grid-cols-3'
              : `lg:grid-cols-${filteredWorkItems.length}`,
            isSocialLayout && 'mx-auto grid-cols-3 xl:grid-cols-6'
          )}
        >
          {filteredWorkItems.map((workItem, index) => {
            return (
              <WorkItemTile
                workItem={workItem}
                key={index}
                aspectRatio={
                  isSocialLayout
                    ? `aspect-w-${workItem.videoWidthAspectRatio} aspect-h-${workItem.videoHeightAspectRatio}`
                    : ''
                }
                onClick={
                  isSocialLayout
                    ? () => {
                        setLightboxActiveIndex(index)
                      }
                    : undefined
                }
                typographyClassNameOverrides={
                  isSocialLayout
                    ? {
                        clientName: classNames(
                          'text-lg font-extrabold uppercase transition-opacity duration-300',
                          'lg:text-2xl',
                          'group-hover:opacity-0'
                        ),
                        title: classNames(
                          'font-outline text-lg uppercase transition-opacity duration-300',
                          'lg:text-2xl',
                          'group-hover:opacity-0'
                        ),
                      }
                    : undefined
                }
              />
            )
          })}
        </div>
        <div className="container mx-auto mt-12 px-12 text-center text-white">
          {workPage.workPageDescription && (
            <div className="prose-lg mx-auto max-w-lg border py-1 text-center">
              <PortableText value={workPage.workPageDescription} />
            </div>
          )}
        </div>
        {showWhiteContainer && (
          <div className="container mx-auto mt-12 bg-white p-4 text-center text-black lg:p-12">
            {currentCategory?.imageGallery &&
              currentCategory.imageGallery.length > 0 && (
                <ClientOnly>
                  <ImageGallery images={currentCategory.imageGallery} />
                </ClientOnly>
              )}
            {(currentCategory?.title ||
              currentCategory?.subtitle ||
              currentCategory?.body) && (
              <div className="mt-12">
                {currentCategory?.title && (
                  <h2 className="text-3xl font-extrabold uppercase lg:text-3xl">
                    {currentCategory.title}
                  </h2>
                )}
                {currentCategory?.subtitle && (
                  <h3 className="font-outline text-3xl uppercase lg:text-4xl">
                    {currentCategory.subtitle}
                  </h3>
                )}
                {currentCategory?.body && (
                  <>
                    <LittleBlackBar yMargin="my-6" maxWidth="max-w-xs" />
                    <div className="mx-auto max-w-2xl py-1 text-center text-sm font-light uppercase">
                      <PortableText value={currentCategory.body} />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {isSocialLayout && (
        <Lightbox
          open={lightboxActiveIndex !== null}
          slides={lightboxSlides}
          index={lightboxActiveIndex}
          close={() => {
            // find all videos and pause them
            const videos = document.querySelectorAll('.yarl__slide video')
            videos.forEach((video) => {
              video.pause()
            })
            setLightboxActiveIndex(null)
          }}
          on={{
            view: (data) => {
              // find all videos and pause them
              const videos = document.querySelectorAll('.yarl__slide video')
              videos.forEach((video) => {
                video.pause()
              })

              setTimeout(() => {
                const currentVideo = document.getElementById(
                  `social-video-${data.index}`
                )
                currentVideo?.play()
              }, 500)
            },
          }}
          render={{
            slide: ({ slide }) => {
              return (
                <SlideVideo
                  slide={slide}
                  isActive={slide.index === lightboxActiveIndex}
                />
              )
            },
          }}
        />
      )}
    </Layout>
  )
}

const SlideVideo = memo(
  ({ slide }) => {
    const videoRef = useRef(null)
    const scrubber = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [muted, setMuted] = useState(false)
    const [scrubberPosition, setScrubberPosition] = useState(0)
    const [videoPlayTime, setVideoPlayTime] = useState('00:00')
    const [videoLength, setVideoLength] = useState('00:00')

    const getMinutesAndSeconds = (time) => {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time - minutes * 60)
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    useEffect(() => {
      if (!videoRef.current) {
        return
      }

      const interval = setInterval(() => {
        if (!videoRef.current) {
          return
        }
        setMuted(videoRef.current.muted)
        setIsPlaying(!videoRef.current.paused)
        setScrubberPosition(
          (videoRef.current.currentTime / videoRef.current.duration) *
            scrubber.current.clientWidth
        )
        setVideoPlayTime(getMinutesAndSeconds(videoRef.current.currentTime))
      }, 30)

      setVideoLength(getMinutesAndSeconds(videoRef.current.duration))

      return () => {
        clearInterval(interval)
      }
    }, [scrubberPosition])

    const handleTogglePlay = () => {
      if (!videoRef.current) {
        return
      }

      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }

    const scrubberWidth = useMemo(() => {
      if (!scrubber.current) {
        return 100
      }

      return scrubber.current.clientWidth
    }, [])

    const handleScrubberClick = (position) => {
      if (!videoRef.current) {
        return
      }

      videoRef.current.currentTime =
        (position / scrubberWidth) * videoRef.current.duration
    }

    const handleMuteClick = (e) => {
      e.stopPropagation()

      if (!videoRef.current) {
        return
      }

      videoRef.current.muted = !muted
    }

    return (
      <div className="group relative mx-auto h-[90%]">
        <video
          autoPlay={false}
          ref={videoRef}
          id={`social-video-${slide.index}`}
          className="h-full w-full cursor-pointer rounded-lg object-contain"
          poster={slide.posterUrl}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          height={1920}
          loop
          playsInline
          preload="auto"
          width={1080}
          controls={false}
          onClick={handleTogglePlay}
        >
          <source src={slide.shortClipMp4S3URL} type="video/mp4" />
          <source src={slide.shortClipOgvS3URL} type="video/ogg" />
          Your browser does not support the video.
        </video>

        <VideoPlayerOverlayButton
          client={slide.clientName}
          handleOverlayClick={handleTogglePlay}
          hasClicked={true}
          overrideClassNames={{
            text: {
              client: 'text-white',
              title: 'text-white',
              description: 'text-white',
            },
          }}
          showVideoOverlay={!isPlaying}
          title={slide.title}
        />

        <div
          className={classNames(
            'absolute right-0 -bottom-[4%] left-0 z-10 flex translate-y-[5%] items-center gap-x-2 opacity-0 duration-500',
            'md:gap-x-8',
            'group-hover:opacity-100'
          )}
        >
          <button
            aria-label="Play/Pause"
            className="relative grid size-6 place-items-center text-4xl outline-0"
            onClick={handleTogglePlay}
            title="Play/Pause"
          >
            <GrPause
              className={classNames(
                `bpd-white-icon`,
                {
                  'opacity-100': isPlaying,
                  'opacity-0': !isPlaying,
                },
                `col-start-1 row-start-1 size-full fill-current transition-all duration-500`
              )}
            />
            <GrPlay
              className={classNames(
                `bpd-white-icon`,
                {
                  'opacity-100': !isPlaying,
                  'opacity-0': isPlaying,
                },
                `col-start-1 row-start-1 size-full fill-current transition-all duration-500`
              )}
            />
          </button>
          <button
            aria-label="Player scrubber bar"
            className="relative h-8 grow overflow-hidden rounded-sm border-2 border-gray-300"
            onClick={(e) => {
              if (!scrubber.current) {
                return
              }
              const scrubberBoundingClientRect =
                scrubber.current.getBoundingClientRect()

              const zeroBasedClickPosition =
                e.clientX - scrubberBoundingClientRect.left

              const xPercentageClicked =
                zeroBasedClickPosition / scrubber.current.clientWidth

              handleScrubberClick(xPercentageClicked * scrubberWidth)
            }}
            ref={scrubber}
          >
            <div
              className="absolute top-0 h-full w-1 bg-gray-500"
              style={{
                transform: `translate3d(${scrubberPosition}px,0, 0)`,
              }}
            ></div>
          </button>
          <div className="flex min-w-[110px] gap-1 text-xl font-light text-gray-100">
            <span className="inline-block min-w-[50px] text-right">
              {videoPlayTime}
            </span>
            <span>/</span>
            <span className="inline-block min-w-[50px]">
              {videoLength ?? 'N/A'}
            </span>
          </div>
          <div className="flex items-center gap-x-2 text-2xl md:gap-x-6">
            {muted === true ? (
              <button
                aria-label="Unmute"
                className="bpd-white-icon"
                onClick={handleMuteClick}
              >
                <GrVolumeMute />
              </button>
            ) : (
              <button
                aria-label="Mute"
                className="bpd-white-icon"
                onClick={handleMuteClick}
              >
                <GrVolume />
              </button>
            )}
          </div>
        </div>
      </div>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.slide.index === nextProps.slide.index
  }
)
SlideVideo.displayName = 'SlideVideo'

export async function getStaticProps() {
  const workPage = await sanityClient.fetch(
    groq`
      *[_type == "workPage"][0]{
        poster,
        seoTitle,
        seoDescription,
        subscribeFormTitle,
        subscribeFormSuccessMessage,
        videoId,
        workPageDescription,
      }
  `
  )

  const workItemCategories = await sanityClient.fetch(
    groq`
      *[_type == "workItemCategory"][showOnWorkPage == true || name == "Narrative"]|order(order asc){
        name,
        order,
        imageGallery[]{
          caption,
          "imageUrl": asset->url,
          "name": asset->originalFilename,
        },
        title,
        subtitle,
        body,
        workItems[]->{
          _id,
          slug,
          clientName,
          title,
          poster,
          videoHeightAspectRatio,
          videoWidthAspectRatio,
          "shortClipMp4URL": shortClipMp4.asset->url,
          "shortClipMp4S3URL": shortClipMp4S3.asset->fileURL,
          "shortClipOgvURL": shortClipOgv.asset->url,
          "shortClipOgvS3URL": shortClipOgvS3.asset->fileURL,
        }
      }
  `
  )

  return {
    props: {
      workPage,
      workItemCategories,
    },
  }
}

export default Work
