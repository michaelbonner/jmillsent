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
}) => {
  const scrubber = useRef(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setScrubberWidth(scrubber?.current?.clientWidth || 100)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [setScrubberWidth])

  return (
    <div className="flex gap-x-2 md:gap-x-8 relative z-10 container mx-auto pt-3 bg-black">
      <button
        aria-label="Play/Pause"
        className="relative text-4xl w-6 h-6 md:w-8 md:h-8 outline-0"
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
            `absolute inset-0 transition-all duration-500 fill-current w-6 h-6 md:w-8 md:h-8`
          )}
        />
        <GrPlay
          className={classNames(
            `bpd-white-icon`,
            {
              'opacity-100': !isPlaying,
              'opacity-0': isPlaying,
            },
            `absolute inset-0 transition-all duration-500 fill-current w-6 h-6 md:w-8 md:h-8`
          )}
        />
      </button>
      <button
        aria-label="Player scrubber bar"
        className="relative flex-grow border-2 border-gray-300 rounded overflow-hidden"
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
          className="h-full w-1 bg-gray-500 absolute top-0"
          style={{
            transform: `translate3d(${scrubberPosition}px,0, 0)`,
          }}
        ></div>
      </button>
      <div className="text-2xl flex items-center gap-x-2 md:gap-x-6">
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
            aria-label="Enter fullscreen"
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
  )
}
