import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import {
  GrContract,
  GrExpand,
  GrPause,
  GrPlay,
  GrVolume,
  GrVolumeMute,
} from 'react-icons/gr'

export const VideoPlayerControlBar = ({
  handleScrubberClick,
  handleTogglePlay,
  isFullscreen,
  isPlaying,
  muted,
  scrubberPosition,
  scrubberWidth,
  setHasClicked,
  setMuted,
  setScrubberWidth,
  toggleFullScreen,
  videoWidthAspectRatio,
  videoHeightAspectRatio,
  videoLength,
  videoPlayTime,
}) => {
  const [fsMargin, setFsMargin] = useState(0)
  const scrubber = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight

      let videoHeight =
        (videoHeightAspectRatio / videoWidthAspectRatio) * screenWidth

      if (videoHeight >= screenHeight) {
        videoHeight = screenHeight - 200
      }

      const blackSpace = (screenHeight - videoHeight) / 2

      const targetMargin = Math.floor(blackSpace / 2) - 12

      setFsMargin(targetMargin)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [isFullscreen, videoHeightAspectRatio, videoWidthAspectRatio])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setScrubberWidth(scrubber?.current?.clientWidth || 100)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [setScrubberWidth])

  return (
    <div
      className={classNames(
        'container z-10 mx-auto flex items-center gap-x-2 pt-3 md:gap-x-8',
        !isFullscreen && 'relative mt-4 bg-black',
        isFullscreen && 'absolute bottom-0 flex gap-x-2',
        isFullscreen && videoWidthAspectRatio == 16 && 'opacity-50'
      )}
      style={isFullscreen ? { marginBottom: `${fsMargin}px` } : {}}
    >
      <button
        aria-label="Play/Pause"
        className="relative h-6 w-6 text-4xl outline-0 md:h-8 md:w-8"
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
            `absolute inset-0 h-6 w-6 fill-current transition-all duration-500 md:h-8 md:w-8`
          )}
        />
        <GrPlay
          className={classNames(
            `bpd-white-icon`,
            {
              'opacity-100': !isPlaying,
              'opacity-0': isPlaying,
            },
            `absolute inset-0 h-6 w-6 fill-current transition-all duration-500 md:h-8 md:w-8`
          )}
        />
      </button>
      <button
        aria-label="Player scrubber bar"
        className="relative h-8 flex-grow overflow-hidden rounded border-2 border-gray-300"
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
      <div className="flex min-w-[110px] gap-1 text-xl font-light">
        <span className="inline-block min-w-[50px] text-right text-gray-400">
          {videoPlayTime}
        </span>
        <span>/</span>
        <span className="inline-block min-w-[50px]">{videoLength}</span>
      </div>
      <div className="flex items-center gap-x-2 text-2xl md:gap-x-6">
        {muted === true ? (
          <button
            aria-label="Unmute"
            className="bpd-white-icon"
            onClick={() => {
              setHasClicked(true)
              setMuted(false)
            }}
          >
            <GrVolumeMute />
          </button>
        ) : (
          <button
            aria-label="Mute"
            className="bpd-white-icon"
            onClick={() => {
              setHasClicked(true)
              setMuted(true)
            }}
          >
            <GrVolume />
          </button>
        )}
        {isFullscreen ? (
          <button
            aria-label="Exit fullscreen"
            className="bpd-white-icon hidden md:block"
            onClick={() => {
              setHasClicked(true)
              toggleFullScreen(false)
            }}
          >
            <GrContract />
          </button>
        ) : (
          <button
            aria-label="Enter fullscreen"
            className="bpd-white-icon hidden md:block"
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
  )
}
