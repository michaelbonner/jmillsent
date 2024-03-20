import classNames from 'classnames'
import { useEffect, useRef } from 'react'
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
}) => {
  const scrubber = useRef(null)

  console.log(videoWidthAspectRatio)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setScrubberWidth(scrubber?.current?.clientWidth || 100)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [setScrubberWidth])

  return (
    <div
      className={
        !isFullscreen
          ? 'container relative z-10 mx-auto flex gap-x-2 bg-black pt-3 md:gap-x-8'
          : isFullscreen && videoWidthAspectRatio == 16
            ? 'container absolute bottom-0 z-10 mb-10 mx-auto flex gap-x-2 pt-3 md:gap-x-8 opacity-50'
            : 'container absolute bottom-0 mb-16 z-10 mx-auto flex gap-x-2 pt-3 md:gap-x-8'
      }
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
        className="relative flex-grow overflow-hidden rounded border-2 border-gray-300"
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
