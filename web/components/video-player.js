import Vimeo from '@vimeo/player'
import { clsx } from 'clsx'
import Image from 'next/image'
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import screenfull from 'screenfull'
import { urlForSanitySource } from '../lib/urlForSanitySource'
import SanityImage from './sanity-image'
import { VideoPlayerControlBar } from './video-player-control-bar'
import { VideoPlayerOverlayButton } from './video-player-overlay-button'

const videoPlayerReducer = (state, action) => {
  switch (action.type) {
    case 'setPlayingVideoId':
      return {
        ...state,
        playingVideoId: action.playingVideoId,
      }
    case 'setHasClicked':
      return {
        ...state,
        hasClicked: action.hasClicked,
      }
    case 'setMuted':
      return {
        ...state,
        muted: action.muted,
      }
    case 'setScrubberWidth':
      return {
        ...state,
        scrubberWidth: action.scrubberWidth,
      }
    case 'setScrubberPosition':
      return {
        ...state,
        scrubberPosition: action.scrubberPosition,
      }
    case 'setTotalPlaySeconds':
      return {
        ...state,
        totalPlaySeconds: action.totalPlaySeconds,
      }
    case 'setIsPlaying':
      return {
        ...state,
        isPlaying: action.isPlaying,
      }
    case 'setIsPlayerLoaded':
      return {
        ...state,
        isPlayerLoaded: action.isPlayerLoaded,
      }
    case 'setIsFullscreen':
      return {
        ...state,
        isFullscreen: action.isFullscreen,
      }
    case 'setIsIpad':
      return {
        ...state,
        isIpad: action.isIpad,
      }
    case 'setPlayerState':
      return {
        ...state,
        playerState: action.playerState,
      }
    case 'setShowVideoOverlay':
      return {
        ...state,
        showVideoOverlay: action.showVideoOverlay,
      }
    case 'setVimeoIframeParams':
      if (state.vimeoIframeParams) return state

      const vimeoParams = new URLSearchParams()
      vimeoParams.append('badge', '0')
      vimeoParams.append('autopause', '0')
      vimeoParams.append('player_id', '0')
      vimeoParams.append('app_id', '58479')
      vimeoParams.append('controls', action.isDesktop === true ? '0' : '1')
      vimeoParams.append('transparent', '1')
      vimeoParams.append('playsinline', '1')
      vimeoParams.append('allowfullscreen', '1')

      return {
        ...state,
        vimeoIframeParams: vimeoParams?.toString() || '',
      }
    case 'setVideoPlayTime':
      return {
        ...state,
        videoPlayTime: action.videoPlayTime,
      }

    default:
      return state
  }
}

const VideoPlayerComponent = ({
  autoPlay = false,
  client = '',
  description = '',
  disableGradientOverlay = false,
  poster,
  title,
  videoHeightAspectRatio = '9',
  videoId = '',
  videoIdShort = '',
  videoWidthAspectRatio = '16',
  noContainer = false,
  overrideClassNames = {},
  onPlayProp,
  onPauseProp,
}) => {
  const [state, dispatch] = useReducer(videoPlayerReducer, {
    hasClicked: false,
    isFullscreen: false,
    isIpad: false,
    isPlayerLoaded: false,
    isPlaying: false,
    muted: !!autoPlay,
    playerState: 'initial',
    playingVideoId: videoIdShort || videoId,
    scrubberPosition: 0,
    scrubberWidth: 0,
    showVideoOverlay: autoPlay && (title || client),
    totalPlaySeconds: 0,
    videoPlayTime: '0:00',
    vimeoIframeParams: '',
    vimeoPlayer: null,
  })

  const {
    hasClicked,
    isFullscreen,
    isIpad,
    isPlayerLoaded,
    isPlaying,
    muted,
    playerState,
    playingVideoId,
    scrubberPosition,
    scrubberWidth,
    showVideoOverlay,
    totalPlaySeconds,
    videoPlayTime,
    vimeoIframeParams,
  } = state
  const [vimeoPlayer, setVimeoPlayer] = useState(null)

  const isDesktop = useMemo(() => {
    if (typeof window === 'undefined') return null

    return window.innerWidth > 1024
  }, [])
  const vimeoPlayerRef = useCallback((videoNode) => {
    if (!videoNode) {
      return
    }

    setVimeoPlayer(new Vimeo(videoNode))
  }, [])

  const playerContainer = useRef(null)

  const videoLength = useMemo(() => {
    const minutes = Math.floor(totalPlaySeconds / 60)
    const seconds = Math.floor(totalPlaySeconds - minutes * 60)
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }, [totalPlaySeconds])

  const showVideo = useMemo(() => {
    return !!playingVideoId
  }, [playingVideoId])

  // player initialization
  useEffect(() => {
    if (isDesktop === null) return

    dispatch({ type: 'setVimeoIframeParams', isDesktop })
  }, [autoPlay, hasClicked, isDesktop, vimeoPlayerRef, vimeoPlayer])

  const getVideoDetails = async () => {
    const duration = await vimeoPlayer?.getDuration()
    if (duration) {
      console.debug('player: duration', duration)
      dispatch({ type: 'setTotalPlaySeconds', totalPlaySeconds: duration })
    }
  }

  const onLoaded = () => {
    console.debug('player: onLoaded')
    getVideoDetails()

    if (!isPlayerLoaded && isDesktop && autoPlay && !hasClicked) {
      setTimeout(async () => {
        try {
          await vimeoPlayer?.play()

          dispatch({ type: 'setIsPlayerLoaded', isPlayerLoaded: true })
        } catch (error) {
          console.error('onLoaded error', error)
        }
      }, 500)
    }
  }

  useEffect(() => {
    if (isDesktop === null) return
    if (!vimeoPlayer) return

    vimeoPlayer?.setLoop(autoPlay)

    vimeoPlayer?.on('loaded', onLoaded)

    const onPlay = function () {
      console.debug('player: play')
      dispatch({ type: 'setIsPlaying', isPlaying: true })
    }
    vimeoPlayer?.on('play', onPlay)

    const onPause = function () {
      console.debug('player: pause')
      dispatch({ type: 'setIsPlaying', isPlaying: false })
    }
    vimeoPlayer?.on('pause', onPause)

    const onTimeupdate = function (data) {
      const playMinutes = Math.floor(data.seconds / 60)
      const playSeconds = Math.floor(data.seconds - playMinutes * 60)

      dispatch({
        type: 'setVideoPlayTime',
        videoPlayTime: `${playMinutes}:${playSeconds < 10 ? '0' : ''}${playSeconds}`,
      })
      dispatch({
        type: 'setScrubberPosition',
        scrubberPosition: data.percent * scrubberWidth,
      })
    }
    vimeoPlayer?.on('timeupdate', onTimeupdate)

    return () => {
      vimeoPlayer?.off('loaded')
      vimeoPlayer?.off('play')
      vimeoPlayer?.off('pause')
      vimeoPlayer?.off('timeupdate')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, isDesktop, scrubberWidth, vimeoPlayer])

  useEffect(() => {
    if (typeof window === 'undefined') return

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
      dispatch({ type: 'setMuted', muted: false })
    }
    if (checkIfIpad(window.navigator)) {
      dispatch({ type: 'setIsIpad', isIpad: true })
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!vimeoPlayer) return

    if (muted) {
      vimeoPlayer?.setVolume(0)
    } else {
      vimeoPlayer?.setVolume(1)
    }
  }, [muted, vimeoPlayer])

  useEffect(() => {
    const toggleVideoOverlay = async () => {
      const isPaused = await vimeoPlayer?.getPaused()
      const hasTitleOrClient = title || client
      const isPausedOrInitial = !hasClicked || isPaused
      if (hasTitleOrClient && isPausedOrInitial) {
        dispatch({ type: 'setShowVideoOverlay', showVideoOverlay: true })
      } else {
        dispatch({ type: 'setShowVideoOverlay', showVideoOverlay: false })
      }
    }
    toggleVideoOverlay()
  }, [client, hasClicked, isPlaying, title, vimeoPlayer])

  useEffect(() => {
    if (isDesktop === null) {
      return
    }

    if (isDesktop === true) {
      dispatch({ type: 'setPlayerState', playerState: 'playing' })
    } else {
      // dispatch({ type: 'setPlayingVideoId', playingVideoId: videoId })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop])

  useEffect(() => {
    if (hasClicked && playingVideoId) {
      dispatch({ type: 'setPlayerState', playerState: 'playing' })
    } else if (!playingVideoId) {
      dispatch({ type: 'setPlayerState', playerState: 'poster' })
    }
  }, [hasClicked, playingVideoId])

  // switch to full video if we need to on first click
  useEffect(() => {
    if (isDesktop === null) return
    if (!vimeoPlayer) return

    const loadVideo = async () => {
      await vimeoPlayer?.loadVideo(videoId)
      await vimeoPlayer?.setCurrentTime(0)
      await vimeoPlayer?.play()

      setTimeout(async () => {
        await vimeoPlayer?.setVolume(1)
      }, 200)
    }

    if (hasClicked && isDesktop && playingVideoId !== videoId) {
      loadVideo()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasClicked, isDesktop, playingVideoId, videoId])

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

  const handleOverlayClick = async () => {
    dispatch({ type: 'setHasClicked', hasClicked: true })

    if (vimeoPlayerRef?.current) {
      setVimeoPlayer(vimeoPlayerRef?.current)
    }

    if (isPlaying) {
      onPauseProp?.()
    } else {
      if (!hasClicked) {
        dispatch({ type: 'setMuted', muted: false })
      }
      onPlayProp?.()
    }

    if (autoPlay && !isPlaying && !hasClicked) {
      await vimeoPlayer?.pause()
      await vimeoPlayer?.play()
      await vimeoPlayer?.setCurrentTime(0)
      dispatch({ type: 'setScrubberPosition', scrubberPosition: 0 })
      setTimeout(async () => {
        await vimeoPlayer?.setVolume(1)
      }, 200)
    } else {
      handleTogglePlay()
    }
  }

  const handleTogglePlay = async () => {
    const isPaused = await vimeoPlayer?.getPaused()
    if (isPaused) {
      await vimeoPlayer?.play()
      onPlayProp?.()
    } else {
      await vimeoPlayer?.pause()
      onPauseProp?.()
    }
  }

  const handleScrubberClick = async (position) => {
    try {
      await vimeoPlayer?.setCurrentTime(
        Math.min(
          totalPlaySeconds,
          totalPlaySeconds * (position / scrubberWidth)
        )
      )
    } catch (error) {
      console.error('handleScrubberClick error', error)
    }

    dispatch({ type: 'setScrubberPosition', scrubberPosition: position })
    dispatch({ type: 'setHasClicked', hasClicked: true })
  }

  const toggleFullScreen = (onOff) => {
    try {
      const element = playerContainer.current
      if (onOff) {
        if (screenfull.isEnabled) {
          screenfull.request(element)
        }
        dispatch({ type: 'setIsFullscreen', isFullscreen: true })
      } else {
        if (screenfull.isEnabled) {
          screenfull.exit()
        }
        dispatch({ type: 'setIsFullscreen', isFullscreen: false })
      }
    } catch (error) {
      console.warn('toggleFullScreen error', error)
    }
  }

  const handleFullScreenChange = () => {
    try {
      if (screenfull.isFullscreen) {
        dispatch({ type: 'setIsFullscreen', isFullscreen: true })
      } else {
        dispatch({ type: 'setIsFullscreen', isFullscreen: false })
      }
    } catch (error) {
      console.warn(error)
    }
  }

  if (isDesktop === null) {
    return <></>
  }

  return (
    <article
      className={clsx(
        {
          'flex h-screen flex-col items-center justify-center': isFullscreen,
        },
        'bpd-player-container group relative z-20 w-full overflow-hidden rounded-2xl'
      )}
      ref={playerContainer}
    >
      <div className={playerState === 'initial' ? 'block' : 'hidden'}>
        <div className="container mx-auto">
          <div
            className={clsx(
              `aspect-w-${videoWidthAspectRatio}`,
              `aspect-h-${videoHeightAspectRatio}`,
              `transition-all duration-700`
            )}
          >
            {poster ? (
              <div className="h-full w-full overflow-hidden">
                <SanityImage
                  alt={`Video poster`}
                  className="h-full w-full object-contain object-center"
                  image={poster}
                />
              </div>
            ) : null}
          </div>
        </div>

        <VideoPlayerOverlayButton
          client={client}
          description={description}
          disableGradientOverlay={disableGradientOverlay}
          handleOverlayClick={handleOverlayClick}
          hasClicked={hasClicked}
          isIpad={isIpad}
          overrideClassNames={overrideClassNames}
          showVideoOverlay={showVideoOverlay}
          title={title}
        />
      </div>

      <div
        className={
          playerState === 'playing'
            ? 'flex h-full w-full items-center'
            : 'hidden'
        }
      >
        <div
          className={clsx(
            {
              'w-full': isFullscreen || noContainer,
              container: !isFullscreen && !noContainer,
              'bg-gray-900': !showVideo,
            },
            'mx-auto transition-all duration-700'
          )}
        >
          <div
            className={clsx(
              `relative lg:my-0`,
              `aspect-w-${videoWidthAspectRatio} aspect-h-${videoHeightAspectRatio}`,
              `transition-all duration-700`,
              {
                'opacity-100': showVideo,
                'opacity-0': !showVideo,
              }
            )}
          >
            {isDesktop === null && <div>Loading video</div>}
            {isDesktop !== null && vimeoIframeParams && (
              <iframe
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen={true}
                frameBorder="0"
                mozallowfullscreen="true"
                ref={vimeoPlayerRef}
                src={`https://player.vimeo.com/video/${playingVideoId}?${vimeoIframeParams}`}
                webkitallowfullscreen="true"
              />
            )}
          </div>
        </div>
        <VideoPlayerOverlayButton
          client={client}
          description={description}
          disableGradientOverlay={disableGradientOverlay}
          handleOverlayClick={handleOverlayClick}
          hasClicked={hasClicked}
          isIpad={isIpad}
          overrideClassNames={overrideClassNames}
          showVideoOverlay={showVideoOverlay}
          title={title}
        />
      </div>

      {playerState !== 'poster' && isDesktop === true && (
        <VideoPlayerControlBar
          handleScrubberClick={handleScrubberClick}
          handleTogglePlay={handleOverlayClick}
          isFullscreen={isFullscreen}
          isPlaying={isPlaying}
          muted={muted}
          scrubberPosition={scrubberPosition}
          scrubberWidth={scrubberWidth}
          setHasClicked={(value) =>
            dispatch({ type: 'setHasClicked', hasClicked: value })
          }
          setMuted={(value) => dispatch({ type: 'setMuted', muted: value })}
          setScrubberWidth={(value) =>
            dispatch({ type: 'setScrubberWidth', scrubberWidth: value })
          }
          toggleFullScreen={toggleFullScreen}
          videoHeightAspectRatio={videoHeightAspectRatio}
          videoWidthAspectRatio={videoWidthAspectRatio}
          videoLength={videoLength}
          videoPlayTime={videoPlayTime}
        />
      )}

      <div className={playerState === 'poster' ? 'block' : 'hidden'}>
        <div className="container mx-auto">
          <div
            className={clsx(
              `aspect-w-${videoWidthAspectRatio}`,
              `aspect-h-${videoHeightAspectRatio}`,
              `transition-all duration-700`
            )}
          >
            {poster ? (
              <Image
                alt={`${client || ''} ${description || ''} poster`}
                className="h-full w-full"
                src={urlForSanitySource(poster)
                  .width(1200)
                  .height(
                    1200 * (videoHeightAspectRatio / videoWidthAspectRatio)
                  )
                  .format('webp')
                  .quality(80)
                  .url()}
                width="1200"
                height={1200 * (videoHeightAspectRatio / videoWidthAspectRatio)}
              />
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}

const VideoPlayer = memo(VideoPlayerComponent, (prevProps, nextProps) => {
  const isSame =
    prevProps.autoPlay === nextProps.autoPlay &&
    prevProps.client === nextProps.client &&
    prevProps.description === nextProps.description &&
    prevProps.poster === nextProps.poster &&
    prevProps.title === nextProps.title &&
    prevProps.videoHeightAspectRatio === nextProps.videoHeightAspectRatio &&
    prevProps.videoId === nextProps.videoId &&
    prevProps.videoIdShort === nextProps.videoIdShort &&
    prevProps.videoWidthAspectRatio === nextProps.videoWidthAspectRatio &&
    prevProps.noContainer === nextProps.noContainer

  return isSame
})

export default VideoPlayer
