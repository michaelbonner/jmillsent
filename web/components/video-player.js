/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  GrContract,
  GrExpand,
  GrPause,
  GrPlay,
  GrVolume,
  GrVolumeMute,
} from 'react-icons/gr'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import useInterval from '../hooks/useInterval'
import urlForSanitySource from '../lib/urlForSanitySource'
import LittleGoldBar from './little-gold-bar'

const VideoPlayer = ({
  poster,
  client = '',
  title,
  description = '',
  videoId,
  videoHeightAspectRatio = '9',
  videoWidthAspectRatio = '16',
  autoPlay = false,
}) => {
  const [showVideo, setShowVideo] = useState(false)
  const [showVideoOverlay, setShowVideoOverlay] = useState(
    autoPlay && (title || client)
  )
  const [videoPlaying, setVideoPlaying] = useState(autoPlay)
  const player = useRef(null)
  const scrubber = useRef(null)
  const [scrubberWidth, setScrubberWidth] = useState(0)
  const [scrubberPosition, setScrubberPosition] = useState(0)
  const [totalPlaySeconds, setTotalPlaySeconds] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [isIpad, setIsIpad] = useState(false)
  const [muted, setMuted] = useState(autoPlay)
  const [volume, setVolume] = useState(1)
  const [hasClicked, setHasClicked] = useState(false)

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

  useEffect(() => {
    if (hasClicked) {
      setMuted(false)
      setVolume(1)
    }
  }, [hasClicked])

  useInterval(
    () => {
      if (
        player.current &&
        typeof player.current.getCurrentTime === 'function'
      ) {
        setScrubberPosition(
          (player.current.getCurrentTime() / totalPlaySeconds) * scrubberWidth
        )
      }
    },
    isPlaying ? 75 : null
  )

  useLayoutEffect(() => {
    if (checkIfIos(window.navigator)) {
      setVideoPlaying(false)
      setMuted(false)
      setIsIos(true)
    }
    if (checkIfIpad(window.navigator)) {
      setIsIpad(true)
    }
  }, [])

  useLayoutEffect(() => {
    if (!player.current) {
      return
    }
    if (muted) {
      player.current.muted = true
    } else {
      player.current.muted = false
    }
  }, [muted])

  useEffect(() => {
    if (!title && !client) {
      setShowVideoOverlay(false)
      return
    }
    setShowVideoOverlay(!hasClicked || !isPlaying)
  }, [client, hasClicked, isPlaying, title])

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
              `lg:my-0 relative`,
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
              controls={isIpad || (isIos && !isIpad && !showVideoOverlay)}
              frameBorder="0"
              height={`100%`}
              muted={muted}
              loop={autoPlay}
              onReady={() => {
                setTimeout(() => {
                  if (
                    player?.current &&
                    typeof player?.current?.getDuration === 'function'
                  ) {
                    setTotalPlaySeconds(player?.current?.getDuration() || 0)
                    setShowVideo(true)
                  }
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
              playing={videoPlaying}
              ref={player}
              title={title}
              url={`https://player.vimeo.com/video/${videoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
              volume={volume}
              width={`100%`}
            ></ReactPlayer>
          </div>

          {!isIos ? (
            <div className="relative z-10 container mx-auto pt-3 flex space-x-8 bg-black">
              <button
                className="relative text-4xl w-8 h-8"
                onClick={() => {
                  setHasClicked(true)
                  setVideoPlaying(!videoPlaying)
                }}
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
                  setHasClicked(true)
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
              <div className="text-2xl flex items-center space-x-6">
                {muted === true ? (
                  <button
                    className="bpd-white-icon"
                    onClick={() => {
                      setHasClicked(true)
                      setMuted(false)
                      setVolume(1)
                    }}
                  >
                    <GrVolumeMute />
                  </button>
                ) : (
                  <button
                    className="bpd-white-icon"
                    onClick={() => {
                      setHasClicked(true)
                      setMuted(true)
                      setVolume(0)
                    }}
                  >
                    <GrVolume />
                  </button>
                )}
                {isFullscreen ? (
                  <button
                    className="bpd-white-icon"
                    onClick={() => {
                      setHasClicked(true)
                      toggleFullScreen(false)
                    }}
                  >
                    <GrContract />
                  </button>
                ) : (
                  <button
                    className="bpd-white-icon"
                    onClick={() => {
                      setHasClicked(true)
                      toggleFullScreen(true)
                    }}
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

      <button
        className={classNames(
          showVideoOverlay ? 'opacity-100' : 'opacity-0',
          'absolute inset-0 bg-transparent cursor-pointer text-3xl text-left transition-all duration-500',
          isIos && !isIpad ? '' : 'bottom-[40px]'
        )}
        onClick={() => {
          if (autoPlay) {
            if (videoPlaying && !hasClicked) {
              setMuted(false)
              setVolume(1)
              setTimeout(() => {
                player.current.seekTo(0, 'fraction')
                setScrubberPosition(0)
                setVideoPlaying(true)
              }, 200)
            } else {
              setVideoPlaying(!videoPlaying)
            }
          }
          setHasClicked(true)
        }}
      >
        <div className="absolute inset-0 h-full bg-gradient-to-r from-black via-transparent to-transparent opacity-80"></div>
        <div
          className={classNames(
            `absolute inset-0 flex h-full items-center justify-start gap-2`,
            `md:gap-4`,
            `lg:pl-12`,
            !isIos && 'bottom-12'
          )}
        >
          {!isIpad && (
            <div
              className="z-10 bg-transparent flex items-center justify-center xl:justify-start cursor-pointer text-4xl xl:text-6xl"
              onClick={() => {
                setHasClicked(true)
                setVideoPlaying(!videoPlaying)
              }}
            >
              <div
                className={classNames(
                  `flex bpd-white-icon transition-opacity duration-500 border md:border-2 border-white ml-1 rounded-full items-center justify-center`
                )}
              >
                <GrPlay className="w-10 h-10 lg:w-14 lg:h-14 py-3 pl-1 lg:pl-2" />
              </div>
            </div>
          )}
          <div className="border-l-2 md:border-l-4 border-gold pl-2 lg:pl-6">
            <div className="font-bold uppercase text-xl lg:text-4xl">
              {client}
            </div>
            <div className="font-outline uppercase text-2xl lg:text-5xl">
              {title}
            </div>
            {description && (
              <div className="w-64">
                <LittleGoldBar />
                <div className="w-full uppercase text-base tracking-wide max-w-sm max-h-[300px] overflow-y-scroll whitespace-pre-wrap">
                  {description}
                </div>
              </div>
            )}
          </div>
        </div>
      </button>
    </article>
  )
}
export default VideoPlayer
