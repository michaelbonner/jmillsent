import classNames from 'classnames'
import { GrPlay } from 'react-icons/gr'
import LittleGoldBar from './little-gold-bar'

export const VideoPlayerOverlayButton = ({
  client,
  description,
  handleOverlayClick,
  hasClicked,
  isIpad,
  showVideoOverlay,
  title,
}) => {
  return (
    <button
      className={classNames(
        // showVideoOverlay && 'opacity-100',
        // !showVideoOverlay && 'pointer-events-none opacity-0',
        hasClicked &&
          showVideoOverlay &&
          'pointer-events-none md:pointer-events-auto',
        'absolute inset-0 bottom-[40px] h-full w-full cursor-pointer bg-transparent pb-[40px] text-left text-3xl outline-0'
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={classNames(
          'absolute inset-0 h-full w-full bg-gradient-to-r from-black via-transparent to-transparent',
          showVideoOverlay ? 'opacity-80' : 'opacity-0'
        )}
      ></div>
      <div
        className={classNames(
          'transition-all duration-500',
          showVideoOverlay ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div
          className={classNames(
            `absolute inset-0 flex h-full w-full items-center justify-start gap-2 pl-2 md:gap-4 lg:pl-12 md:pb-[40px]`
          )}
        >
          {!isIpad && (
            <div className="z-10 flex cursor-pointer items-center justify-center bg-transparent text-4xl xl:justify-start xl:text-6xl">
              <div
                className={classNames(
                  `bpd-white-icon ml-1 flex items-center justify-center rounded-full border border-gray-300 transition-opacity duration-500 md:border-2`
                )}
              >
                <GrPlay className="h-10 w-10 py-3 pl-1 lg:h-14 lg:w-14 lg:pl-2" />
              </div>
            </div>
          )}
          <div className="border-l-2 border-gold pl-2 md:border-l-4 lg:pl-6">
            <div className="text-xl font-bold uppercase lg:text-4xl">
              {client}
            </div>
            <div className="font-outline text-2xl uppercase lg:text-5xl">
              {title}
            </div>
            {description && (
              <div className="w-64">
                <LittleGoldBar />
                <div className="max-h-[300px] w-full max-w-sm overflow-y-scroll whitespace-pre-wrap text-base uppercase tracking-wide">
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
