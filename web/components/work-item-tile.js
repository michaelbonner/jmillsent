import classNames from 'classnames'
import Link from 'next/link'
import { useLayoutEffect, useState } from 'react'
import urlForSanitySource from '../lib/urlForSanitySource'

const WorkItemTile = ({ workItem, index, hideAfterCount = 999 }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [hasHovered, setHasHovered] = useState(false)

  return (
    <Link href={`/work/${workItem.slug?.current}`} key={workItem._id}>
      <a
        className={classNames(
          {
            'lg:hidden': index >= hideAfterCount,
          },
          `bpd-project-tile relative text-white `,
          `flex flex-col items-center justify-center space-y-2 lg:space-y-0`
        )}
        key={workItem._id}
        style={{
          backgroundImage: workItem.poster
            ? `url(${urlForSanitySource(workItem.poster).width(700)})`
            : '',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        onMouseEnter={() => {
          setHasHovered(true)
          setIsHovered(true)
        }}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => {
          setHasHovered(true)
          setIsHovered(true)
        }}
        onTouchEnd={() => setIsHovered(false)}
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
        <div className="z-10 text-center">
          <h2 className="text-3xl font-extrabold uppercase lg:text-2xl">
            {workItem.clientName}
          </h2>
          <h3 className="font-outline text-3xl uppercase lg:text-2xl">
            {workItem.title}
          </h3>
        </div>
      </a>
    </Link>
  )
}

export default WorkItemTile
