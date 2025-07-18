import classNames from 'classnames'
import Link from 'next/link'
import { useState } from 'react'
import { GrPlay } from 'react-icons/gr'
import urlForSanitySource from '../lib/urlForSanitySource'

const Button = (props) => {
  return <button {...props} />
}

const WorkItemTile = ({
  aspectRatio,
  autoPlay = false,
  className,
  hideAfterCount = 999,
  index,
  onClick,
  playLockupClassName,
  showPlayOnHover = false,
  showWithPlayLockup = false,
  typographyClassNameOverrides = {},
  workItem,
}) => {
  const [isHovered, setIsHovered] = useState(autoPlay)
  const [hasHovered, setHasHovered] = useState(autoPlay)

  const ElementToRender = onClick ? Button : Link

  return (
    <ElementToRender
      href={onClick ? undefined : `/work/${workItem.slug?.current}`}
      onClick={onClick ? onClick : undefined}
      key={workItem._id}
      className={classNames(
        'group',
        {
          'lg:hidden': index >= hideAfterCount,
        },
        aspectRatio ? aspectRatio : 'bpd-project-tile',
        `relative text-white`,
        `flex flex-col items-center justify-center space-y-2 lg:space-y-0`,
        className
      )}
      style={{
        backgroundImage: workItem.poster
          ? `url(${urlForSanitySource(workItem.poster).width(700).format('webp').quality(80)})`
          : '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      onMouseEnter={() => {
        setHasHovered(true)
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        if (!autoPlay) {
          setIsHovered(false)
        }
      }}
      onTouchStart={() => {
        setHasHovered(true)
        setIsHovered(true)
      }}
      onTouchEnd={() => {
        if (!autoPlay) {
          setIsHovered(false)
        }
      }}
    >
      {hasHovered &&
        (workItem.shortClipMp4URL || workItem.shortClipMp4S3URL) &&
        (workItem.shortClipOgvURL || workItem.shortClipOgvS3URL) && (
          <video
            className={classNames(
              `absolute inset-0 h-full w-full object-cover transition-all duration-700`,
              {
                'opacity-100': workItem.shortClipMp4S3URL && isHovered,
                'opacity-0': !workItem.shortClipMp4S3URL || !isHovered,
              }
            )}
            muted={true}
            autoPlay={true}
            loop={true}
            playsInline={true}
            preload="none"
          >
            {workItem.shortClipMp4S3URL ? (
              <source
                id="mp4"
                src={workItem.shortClipMp4S3URL}
                type="video/mp4"
              />
            ) : (
              <source
                id="mp4"
                src={workItem.shortClipMp4URL}
                type="video/mp4"
              />
            )}
            {workItem.shortClipOgvS3URL ? (
              <source
                id="ogv"
                src={workItem.shortClipOgvS3URL}
                type="video/ogg"
              />
            ) : (
              <source
                id="ogv"
                src={workItem.shortClipOgvURL}
                type="video/ogg"
              />
            )}
          </video>
        )}
      {showPlayOnHover && (
        <div className="absolute inset-0 flex size-full items-center justify-center bg-black/50 opacity-0 transition-all duration-500 group-hover:opacity-100">
          <GrPlay className="size-20 rounded-full border-2 border-gray-300 py-5 pl-2" />
        </div>
      )}
      <div className="z-10 flex w-full flex-col justify-center text-center">
        {showWithPlayLockup ? (
          <div
            className={classNames(
              'flex w-full items-center justify-start gap-4 pr-2 pl-4 text-left',
              playLockupClassName
            )}
          >
            <div className="z-10 flex cursor-pointer items-center justify-center bg-transparent text-4xl xl:justify-start xl:text-6xl">
              <div className="bpd-white-icon ml-1 flex scale-110 items-center justify-center rounded-full border-2 border-gray-300 transition-opacity duration-500">
                <GrPlay className="size-10 py-2 pl-1" />
              </div>
            </div>
            <div className="border-gold border-l-4 pl-4">
              <div className="text-xl font-bold uppercase">
                {workItem.clientName}
              </div>
              <div className="font-outline text-xl uppercase">
                {workItem.title}
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2
              className={
                typographyClassNameOverrides?.clientName
                  ? typographyClassNameOverrides.clientName
                  : classNames(
                      'text-3xl font-extrabold uppercase',
                      'lg:text-2xl'
                    )
              }
            >
              {workItem.clientName}
            </h2>
            <h3
              className={
                typographyClassNameOverrides?.title
                  ? typographyClassNameOverrides.title
                  : classNames('font-outline text-3xl uppercase', 'lg:text-2xl')
              }
            >
              {workItem.title}
            </h3>
          </>
        )}
      </div>
    </ElementToRender>
  )
}

export default WorkItemTile
