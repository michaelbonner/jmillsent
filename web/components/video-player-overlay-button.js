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
        showVideoOverlay && 'opacity-100',
        !showVideoOverlay && 'opacity-0 pointer-events-none',
        !hasClicked &&
          showVideoOverlay &&
          'pointer-events-none md:pointer-events-auto',
        'absolute inset-0 w-full h-full bg-transparent cursor-pointer text-3xl text-left transition-all duration-500 outline-0 pb-[40px] bottom-[40px]'
      )}
      onClick={handleOverlayClick}
    >
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-black via-transparent to-transparent opacity-80"></div>
      <div
        className={classNames(
          `absolute inset-0 flex h-full w-full items-center justify-start gap-2 pl-2`,
          `md:gap-4`,
          `lg:pl-12`,
          'md:pb-[40px]'
        )}
      >
        {!isIpad && (
          <div className="z-10 bg-transparent flex items-center justify-center xl:justify-start cursor-pointer text-4xl xl:text-6xl">
            <div
              className={classNames(
                `flex bpd-white-icon transition-opacity duration-500 border md:border-2 border-gray-300 ml-1 rounded-full items-center justify-center`
              )}
            >
              <GrPlay className="w-10 h-10 lg:w-14 lg:h-14 py-3 pl-1 lg:pl-2" />
            </div>
          </div>
        )}
        <div className="border-l-2 md:border-l-4 border-gold pl-2 lg:pl-6">
          <div className="font-bold uppercase text-xl lg:text-4xl">
            {client}
          </div>
          <div className="font-outline uppercase text-2xl lg:text-5xl">
            {title}
          </div>
          {description && (
            <div className="w-64">
              <LittleGoldBar />
              <div className="w-full uppercase text-base tracking-wide max-w-sm max-h-[300px] overflow-y-scroll whitespace-pre-wrap">
                {description}
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
