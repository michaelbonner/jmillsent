import { ImageGallery } from '@/components/image-gallery'
import { VideoPlayerOverlayButton } from '@/components/video-player-overlay-button'
import WorkItemTile from '@/components/work-item-tile'
import { defaultSlugify } from '@/lib/defaultSlugify'
import { urlForSanitySource } from '@/lib/urlForSanitySource'
import { PortableText } from '@portabletext/react'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { GrPause, GrPlay, GrVolume, GrVolumeMute } from 'react-icons/gr'
import Lightbox from 'yet-another-react-lightbox'
import { ClientOnly } from './client-only'
import Layout from './layout'
import LittleBlackBar from './little-black-bar'

const LoadingAnimation = dynamic(() => import('./loading-animation'))

export const WorkItemCategory = ({
  workPage,
  workItemCategories,
  workItemCategory,
}) => {
  const defaultTab = defaultSlugify(workItemCategories?.at(0)?.name || '')
  const [lightboxActiveIndex, setLightboxActiveIndex] = useState(null)

  const isSocialLayout = workItemCategory === 'social'

  const currentCategory =
    workItemCategories.find(
      (category) => defaultSlugify(category.name) === workItemCategory
    ) ?? workItemCategories.at(0)

  const categoryWorkItems =
    currentCategory.workItems?.map((workItem) => {
      if (!isSocialLayout) return workItem

      return {
        ...workItem,
        posterUrl: urlForSanitySource(workItem.poster)
          .width(1080)
          .height(1920)
          .format('webp')
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
        (workItem.flatCategories || []).includes(currentCategory.name)
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
        workItemCategory !== defaultTab
          ? `${currentCategory.name} ${workPage.seoTitle}`
          : workPage.seoTitle
      }
      description={
        currentCategory.name !== defaultTab
          ? `${currentCategory.name} | ${workPage.seoDescription}`
          : workPage.seoDescription
      }
    >
      <div className={clsx('lg:pt-28', '2xl:pt-32')}>
        <h1 className="sr-only">
          {workItemCategory !== defaultTab
            ? `${currentCategory.name} ${workPage.seoTitle}`
            : workPage.seoTitle}
        </h1>
        <div className="max-w-8xl xl:max-w-9xl mx-auto px-4 lg:px-8 2xl:max-w-none 2xl:px-[10vw]">
          <ul
            className={clsx(
              'mx-7 flex flex-wrap items-center justify-center gap-y-1 rounded-2xl bg-black/80 py-4 font-semibold',
              'lg:sticky lg:top-4 lg:z-20 lg:flex lg:flex-nowrap lg:divide-x lg:divide-black/20 lg:shadow-xl lg:backdrop-blur-sm'
            )}
          >
            {workItemCategories.map((tab, index) => {
              return (
                <li
                  className={clsx(
                    'relative flex justify-center border-r border-black/20 text-xs',
                    'last:border-r-0',
                    'lg:px-2 lg:text-base'
                  )}
                  key={index}
                >
                  <Link
                    className={clsx(
                      'rounded-xs border px-4 py-1 uppercase transition-all',
                      'lg:tracking-wider',
                      workItemCategory === defaultSlugify(tab.name)
                        ? 'border-white bg-black/30'
                        : 'border-transparent hover:scale-110'
                    )}
                    href={
                      index === 0
                        ? '/work'
                        : `/work/category/${defaultSlugify(tab.name)}`
                    }
                  >
                    {tab.name}

                    <span className="absolute inset-0" />
                  </Link>
                </li>
              )
            })}
          </ul>

          <div
            className={clsx(
              'mx-auto mt-2 rounded-2xl bg-white p-4 text-black',
              'lg:p-6'
            )}
          >
            {/* lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 */}
            {filteredWorkItems.length > 0 && (
              <div
                className={clsx(
                  'grid grid-cols-1 gap-4',
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
                              clientName: clsx(
                                'text-lg font-extrabold uppercase transition-opacity duration-300',
                                'lg:text-2xl',
                                'group-hover:opacity-0'
                              ),
                              title: clsx(
                                'font-outline text-lg uppercase transition-opacity duration-300',
                                'lg:text-2xl',
                                'group-hover:opacity-0'
                              ),
                            }
                          : undefined
                      }
                      showPlayOnHover={isSocialLayout}
                    />
                  )
                })}
              </div>
            )}

            {showWhiteContainer && (
              <div className="text-center">
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
          {workPage.workPageDescription && (
            <div className="container mx-auto mt-12 px-12 text-center text-white">
              {workPage.workPageDescription && (
                <div className="prose prose-lg mx-auto max-w-lg border py-1 text-center">
                  <PortableText value={workPage.workPageDescription} />
                </div>
              )}
            </div>
          )}
          {/* {showWhiteContainer && (
            
          )} */}
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
      </div>
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

    const showLoadingAnimation = videoLength === '00:00'

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
        if (!isNaN(videoRef.current.currentTime)) {
          setVideoPlayTime(getMinutesAndSeconds(videoRef.current.currentTime))
        }
      }, 30)

      if (!isNaN(videoRef.current.duration)) {
        setVideoLength(getMinutesAndSeconds(videoRef.current.duration))
      }

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
      if (scrubber.current === null) {
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

        {showLoadingAnimation && (
          <div className="absolute inset-0 animate-pulse bg-black/30">
            <ClientOnly>
              <LoadingAnimation loop setIsAnimationComplete={() => {}} />
            </ClientOnly>
          </div>
        )}

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
          className={clsx(
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
              className={clsx(
                `bpd-white-icon`,
                {
                  'opacity-100': isPlaying,
                  'opacity-0': !isPlaying,
                },
                `col-start-1 row-start-1 size-full fill-current transition-all duration-500`
              )}
            />
            <GrPlay
              className={clsx(
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
