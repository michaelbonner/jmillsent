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
  isFullscreen,
  muted,
  player,
  scrubberPosition,
  scrubberWidth,
  setHasClicked,
  setMuted,
  setScrubberPosition,
  setScrubberWidth,
  setVideoPlaying,
  setVolume,
  toggleFullScreen,
  videoPlaying,
}) => {
  const scrubber = useRef(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setScrubberWidth(scrubber?.current?.clientWidth || 100)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [setScrubberWidth])

  return (
    <div className="flex space-x-8 relative z-10 container mx-auto pt-3 bg-black">
      <button
        aria-label="Play/Pause"
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
        aria-label="Player scrubber bar"
        className="relative w-full border-2 border-gray-300 rounded"
        onClick={(e) => {
          setHasClicked(true)
          if (!scrubber.current || !player.current) {
            return
          }
          const scrubberBoundingClientRect =
            scrubber.current.getBoundingClientRect()

          const zeroBasedClickPosition =
            e.clientX - scrubberBoundingClientRect.left

          const xPercentageClicked =
            zeroBasedClickPosition / scrubber.current.clientWidth

          player?.current?.seekTo(xPercentageClicked, 'fraction')
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
            aria-label="Unmute"
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
            aria-label="Mute"
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
