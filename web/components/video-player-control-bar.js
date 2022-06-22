import classNames from 'classnames'
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
  scrubber,
  scrubberPosition,
  setHasClicked,
  setVideoPlaying,
  toggleFullScreen,
  videoPlaying,
}) => {
  return (
    <div className="hidden lg:flex space-x-8 relative z-10 container mx-auto pt-3 bg-black">
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
  )
}
