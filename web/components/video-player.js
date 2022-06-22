/* eslint-disable @next/next/no-img-element */
import classNames from 'classnames'
import useIsDesktop from 'hooks/useIsDesktop'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import useInterval from '../hooks/useInterval'
import urlForSanitySource from '../lib/urlForSanitySource'
import { VideoPlayerControlBar } from './video-player-control-bar'
import { VideoPlayerOverlayButton } from './video-player-overlay-button'

const VideoPlayer = ({
  poster,
  client = '',
  title,
  description = '',
  videoId = '',
  videoIdShort = '',
  videoHeightAspectRatio = '9',
  videoWidthAspectRatio = '16',
  autoPlay = false,
}) => {
  const isDesktop = useIsDesktop()
  const [playerState, setPlayerState] = useState('initial')
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
  const [playingVideoId, setPlayingVideoId] = useState(videoIdShort || videoId)

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

  useEffect(() => {
    if (hasClicked) {
      setPlayingVideoId(videoId)
    }
  }, [hasClicked, videoId])

  useEffect(() => {
    if (isDesktop) {
      setPlayerState('playing')
    }
  }, [isDesktop])

  useEffect(() => {
    if (hasClicked && playingVideoId) {
      setPlayerState('playing')
    }
  }, [hasClicked, playingVideoId])

  return (
    <article
      className={classNames(
        {
          'h-screen flex flex-col justify-center items-center': isFullscreen,
        },
        'bpd-player-container relative z-20'
      )}
    >
      {playerState === 'initial' && (
        <div>
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
          <VideoPlayerOverlayButton
            autoPlay={autoPlay}
            client={client}
            description={description}
            hasClicked={hasClicked}
            isIos={isIos}
            isIpad={isIpad}
            player={player}
            setHasClicked={setHasClicked}
            setMuted={setMuted}
            setScrubberPosition={setScrubberPosition}
            setVideoPlaying={setVideoPlaying}
            setVolume={setVolume}
            showVideoOverlay={showVideoOverlay}
            title={title}
            videoPlaying={videoPlaying}
          />
        </div>
      )}
      {playerState === 'playing' && (
        <>
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
                controls={!isDesktop && isPlaying}
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
                url={`https://player.vimeo.com/video/${playingVideoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
                volume={volume}
                width={`100%`}
              ></ReactPlayer>
            </div>

            {!isIos && (
              <VideoPlayerControlBar
                isFullscreen={isFullscreen}
                muted={muted}
                setMuted={setMuted}
                setVolume={setVolume}
                scrubber={scrubber}
                scrubberPosition={scrubberPosition}
                setHasClicked={setHasClicked}
                setVideoPlaying={setVideoPlaying}
                toggleFullScreen={toggleFullScreen}
                videoPlaying={videoPlaying}
              />
            )}
          </div>
          <VideoPlayerOverlayButton
            autoPlay={autoPlay}
            client={client}
            description={description}
            hasClicked={hasClicked}
            isIos={isIos}
            isIpad={isIpad}
            player={player}
            setHasClicked={setHasClicked}
            setMuted={setMuted}
            setScrubberPosition={setScrubberPosition}
            setVideoPlaying={setVideoPlaying}
            setVolume={setVolume}
            showVideoOverlay={showVideoOverlay}
            title={title}
            videoPlaying={videoPlaying}
          />
        </>
      )}
      {playerState === 'poster' && (
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
