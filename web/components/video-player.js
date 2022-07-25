/* eslint-disable @next/next/no-img-element */
import Vimeo from '@vimeo/player'
import classNames from 'classnames'
import useIsDesktop from 'hooks/useIsDesktop'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import screenfull from 'screenfull'
import urlForSanitySource from '../lib/urlForSanitySource'
import SanityImage from './sanity-image'
import { VideoPlayerControlBar } from './video-player-control-bar'
import { VideoPlayerOverlayButton } from './video-player-overlay-button'

const vimeoIframeParams = new URLSearchParams()
vimeoIframeParams.append('badge', '0')
vimeoIframeParams.append('autopause', '0')
vimeoIframeParams.append('player_id', '0')
vimeoIframeParams.append('app_id', '58479')
vimeoIframeParams.append('controls', '0')
vimeoIframeParams.append('transparent', '1')
vimeoIframeParams.append('playsinline', '0')

const VideoPlayer = ({
  autoPlay = false,
  client = '',
  description = '',
  poster,
  title,
  videoHeightAspectRatio = '9',
  videoId = '',
  videoIdShort = '',
  videoWidthAspectRatio = '16',
}) => {
  const isDesktop = useIsDesktop()
  const [playerState, setPlayerState] = useState('initial')
  const [showVideo, setShowVideo] = useState(true)
  const [showVideoOverlay, setShowVideoOverlay] = useState(
    autoPlay && (title || client)
  )
  const vimeoPlayerRef = useRef(null)
  const playerContainer = useRef(null)
  const [scrubberWidth, setScrubberWidth] = useState(0)
  const [scrubberPosition, setScrubberPosition] = useState(0)
  const [totalPlaySeconds, setTotalPlaySeconds] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isIos, setIsIos] = useState(false)
  const [isIpad, setIsIpad] = useState(false)
  const [muted, setMuted] = useState(true)
  const [hasClicked, setHasClicked] = useState(false)
  const [playingVideoId, setPlayingVideoId] = useState(videoIdShort || videoId)
  const [vimeoPlayer, setVimeoPlayer] = useState(null)

  useEffect(() => {
    if (!vimeoPlayerRef?.current) {
      return
    }

    var iframe = vimeoPlayerRef?.current
    var player = new Vimeo(iframe)
    setVimeoPlayer(player)
  }, [autoPlay, hasClicked, isDesktop, vimeoPlayerRef, vimeoPlayer])

  useEffect(() => {
    if (!vimeoPlayer) {
      return
    }

    vimeoPlayer.setLoop(autoPlay)

    const getVideoDetails = async (player) => {
      const duration = await player.getDuration()
      console.info('player: duration', duration)
      setTotalPlaySeconds(duration)
    }

    const onLoaded = () => {
      console.info('player: onLoaded')
      getVideoDetails(vimeoPlayer)
      if (isDesktop && autoPlay) {
        setTimeout(async () => {
          await vimeoPlayer.play()
        }, 500)
      }
    }
    vimeoPlayer.on('loaded', onLoaded)

    const onPlay = function () {
      console.info('player: play')
      setIsPlaying(true)
    }
    vimeoPlayer.on('play', onPlay)

    const onPause = function () {
      console.info('player: pause')
      setIsPlaying(false)
    }
    vimeoPlayer.on('pause', onPause)

    const onTimeupdate = function (data) {
      setScrubberPosition(data.percent * scrubberWidth)
    }
    vimeoPlayer.on('timeupdate', onTimeupdate)

    vimeoPlayer.on('seeked', function (data) {
      console.info('player: seeked', data)
      if (data.percent !== 0) {
        setHasClicked(true)
      }
    })

    return () => {
      vimeoPlayer.off('loaded')
      vimeoPlayer.off('play')
      vimeoPlayer.off('pause')
      vimeoPlayer.off('timeupdate')
    }
  }, [autoPlay, isDesktop, scrubberWidth, vimeoPlayer])

  // switch to full video if we need to on first click
  useEffect(() => {
    if (hasClicked && isDesktop && playingVideoId !== videoId) {
      vimeoPlayer.loadVideo(videoId)
    }
  }, [hasClicked, isDesktop, playingVideoId, videoId, vimeoPlayer])

  const handleOverlayClick = () => {
    if (!vimeoPlayer) {
      setHasClicked(true)
      return
    }

    if (autoPlay && isPlaying && !hasClicked) {
      vimeoPlayer.pause()
      vimeoPlayer.setVolume(1)
      vimeoPlayer.setCurrentTime(0)
      setScrubberPosition(0)
      setTimeout(() => {
        vimeoPlayer.play()
      }, 100)
    } else {
      handleTogglePlay()
    }

    setHasClicked(true)
  }

  const handleTogglePlay = async () => {
    setHasClicked(true)
    const isPaused = await vimeoPlayer.getPaused()
    if (isPaused) {
      vimeoPlayer.play()
    } else {
      vimeoPlayer.pause()
    }
  }

  const handleScrubberClick = (position) => {
    setScrubberPosition(position)
    setHasClicked(true)
    vimeoPlayer.setCurrentTime(
      Math.min(totalPlaySeconds, totalPlaySeconds * (position / scrubberWidth))
    )
  }

  const toggleFullScreen = (onOff) => {
    try {
      const element = playerContainer.current
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
    } catch (error) {
      console.warn('toggleFullScreen error', error)
    }
  }

  const handleFullScreenChange = () => {
    try {
      if (screenfull.isFullscreen) {
        setIsFullscreen(true)
      } else {
        setIsFullscreen(false)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  useEffect(() => {
    setShowVideo(!!playingVideoId)
  }, [playingVideoId])

  useEffect(() => {
    try {
      if (screenfull.isEnabled) {
        screenfull.on('change', handleFullScreenChange)
      }
    } catch (error) {
      console.warn(error)
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleFullScreenChange)
      }
    }
  }, [])

  useEffect(() => {
    if (hasClicked) {
      setMuted(false)
      vimeoPlayer?.setVolume(1)
    }
  }, [hasClicked, vimeoPlayer])

  useLayoutEffect(() => {
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

    if (checkIfIos(window.navigator)) {
      setMuted(false)
      setIsIos(true)
    }
    if (checkIfIpad(window.navigator)) {
      setIsIpad(true)
    }
  }, [])

  useLayoutEffect(() => {
    if (!vimeoPlayer) {
      return
    }
    if (muted) {
      vimeoPlayer.setVolume(0)
    } else {
      vimeoPlayer.setVolume(1)
    }
  }, [muted, vimeoPlayer])

  useEffect(() => {
    const toggleVideoOverlay = async () => {
      const isPaused = await vimeoPlayer?.getPaused()
      const hasTitleOrClient = title || client
      const isPausedOrInitial = !hasClicked || isPaused
      if (hasTitleOrClient && isPausedOrInitial) {
        setShowVideoOverlay(true)
      } else {
        setShowVideoOverlay(false)
      }
    }
    toggleVideoOverlay()
  }, [client, hasClicked, isPlaying, title, vimeoPlayer])

  useEffect(() => {
    if (isDesktop === null) {
      return
    }

    if (isDesktop === true) {
      setPlayerState('playing')
    } else {
      setPlayingVideoId(videoId)
    }
  }, [isDesktop, videoId])

  useEffect(() => {
    if (hasClicked && playingVideoId) {
      setPlayerState('playing')
    } else if (!playingVideoId) {
      setPlayerState('poster')
    }
  }, [hasClicked, playingVideoId])

  if (isDesktop === null) {
    return <></>
  }

  return (
    <article
      className={classNames(
        {
          'h-screen flex flex-col justify-center items-center': isFullscreen,
        },
        'bpd-player-container relative z-20'
      )}
      ref={playerContainer}
    >
      <div className={playerState === 'initial' ? 'block' : 'hidden'}>
        <div className="container mx-auto">
          <div
            className={classNames(
              `aspect-w-${videoWidthAspectRatio}`,
              `aspect-h-${videoHeightAspectRatio}`,
              `transition-all duration-700`
            )}
          >
            {poster ? (
              <div className="w-full h-full overflow-hidden">
                <SanityImage
                  alt={`Video poster`}
                  className="w-full h-full object-contain object-center"
                  image={poster}
                />
              </div>
            ) : null}
          </div>
        </div>

        <VideoPlayerOverlayButton
          client={client}
          description={description}
          handleOverlayClick={handleOverlayClick}
          hasClicked={hasClicked}
          isIos={isIos}
          isIpad={isIpad}
          showVideoOverlay={showVideoOverlay}
          title={title}
        />
      </div>

      <div
        className={
          playerState === 'playing'
            ? 'flex items-center w-full h-full'
            : 'hidden'
        }
      >
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
            {isDesktop === null && <div>Loading video</div>}
            {isDesktop !== null && (
              <iframe
                allow="autoplay; fullscreen"
                frameBorder="0"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
                allowFullScreen={true}
                src={`https://player.vimeo.com/video/${playingVideoId}?${vimeoIframeParams.toString()}`}
                ref={vimeoPlayerRef}
              />
            )}
          </div>
        </div>
        <VideoPlayerOverlayButton
          client={client}
          description={description}
          handleOverlayClick={handleOverlayClick}
          hasClicked={hasClicked}
          isIos={isIos}
          isIpad={isIpad}
          showVideoOverlay={showVideoOverlay}
          title={title}
        />
      </div>

      {playerState !== 'poster' && (
        <VideoPlayerControlBar
          handleScrubberClick={handleScrubberClick}
          handleTogglePlay={handleTogglePlay}
          isFullscreen={isFullscreen}
          isPlaying={isPlaying}
          muted={muted}
          scrubberPosition={scrubberPosition}
          scrubberWidth={scrubberWidth}
          setHasClicked={setHasClicked}
          setMuted={setMuted}
          setScrubberWidth={setScrubberWidth}
          toggleFullScreen={toggleFullScreen}
        />
      )}

      <div className={playerState === 'poster' ? 'block' : 'hidden'}>
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
      </div>
    </article>
  )
}
export default VideoPlayer
