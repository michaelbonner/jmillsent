import { clsx } from 'clsx'
import { memo } from 'react'
import { GrPlay } from 'react-icons/gr'
import { twMerge } from 'tailwind-merge'

const VideoPlayerOverlayButtonNotMemoized = ({
  client,
  description,
  disableGradientOverlay,
  handleOverlayClick,
  hasClicked,
  isIpad,
  showVideoOverlay,
  title,
  overrideClassNames,
}) => {
  return (
    <button
      className={clsx(
        // showVideoOverlay && 'opacity-100',
        // !showVideoOverlay && 'pointer-events-none opacity-0',
        hasClicked &&
          showVideoOverlay &&
          'pointer-events-none md:pointer-events-auto',
        'absolute inset-0 bottom-[40px] h-full w-full cursor-pointer bg-transparent py-[40px] text-left text-3xl outline-0'
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={clsx(
          'absolute inset-0 h-full w-full',
          !disableGradientOverlay &&
            'bg-linear-to-r from-black via-transparent to-transparent',
          showVideoOverlay ? 'opacity-80' : 'opacity-0'
        )}
      ></div>
      <div
        className={clsx(
          'transition-all duration-500',
          showVideoOverlay ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div
          className={clsx(
            `absolute inset-0 flex h-full w-full items-center justify-start gap-2 pl-2 md:gap-4 md:py-[40px] lg:pl-12`
          )}
        >
          {!isIpad && (
            <div className="z-10 flex cursor-pointer items-center justify-center bg-transparent text-4xl xl:justify-start xl:text-6xl">
              <div
                className={clsx(
                  `bpd-white-icon ml-1 flex items-center justify-center rounded-full border border-white bg-neutral-950/50 shadow-lg transition-transform duration-300 group-hover:scale-105`
                )}
              >
                <GrPlay className="h-10 w-10 py-3 pl-1 lg:h-14 lg:w-14 lg:pl-2" />
              </div>
            </div>
          )}
          <div className="border-l border-white/60 pl-3 lg:pl-6">
            <div
              className={twMerge(
                'text-xl font-semibold tracking-tight uppercase lg:text-4xl',
                overrideClassNames?.text?.client
              )}
            >
              {client}
            </div>
            <div
              className={twMerge(
                'font-outline text-2xl uppercase lg:text-5xl',
                overrideClassNames?.text?.title
              )}
            >
              {title}
            </div>
            {description && (
              <div className="w-64">
                <div className="my-2 h-px w-36 bg-white/30" />
                <div
                  className={twMerge(
                    'max-h-[300px] w-full max-w-sm overflow-y-scroll text-base tracking-wide whitespace-pre-wrap uppercase',
                    overrideClassNames?.text?.description
                  )}
                >
                  {description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

export const VideoPlayerOverlayButton = memo(
  VideoPlayerOverlayButtonNotMemoized,
  (prevProps, nextProps) => {
    return (
      prevProps.client === nextProps.client &&
      prevProps.description === nextProps.description &&
      prevProps.hasClicked === nextProps.hasClicked &&
      prevProps.isIpad === nextProps.isIpad &&
      prevProps.showVideoOverlay === nextProps.showVideoOverlay &&
      prevProps.title === nextProps.title &&
      prevProps.disableGradientOverlay === nextProps.disableGradientOverlay
    )
  }
)
