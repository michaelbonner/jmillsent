import classNames from 'classnames'
import Link from 'next/link'
import { useState } from 'react'
import urlForSanitySource from '../lib/urlForSanitySource'

const PortfolioItemTile = ({ portfolioItem, index, hideAfterCount = 999 }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [hasHovered, setHasHovered] = useState(false)

  return (
    <Link
      href={`/private-gallery/${portfolioItem.slug?.current}`}
      key={portfolioItem._id}
      className={classNames(
        {
          'lg:hidden': index >= hideAfterCount,
        },
        `bpd-project-tile relative text-white `,
        `flex flex-col items-center justify-center space-y-2 lg:space-y-0`
      )}
      style={{
        backgroundImage: portfolioItem.poster
          ? `url(${urlForSanitySource(portfolioItem.poster).width(700)})`
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
        (portfolioItem.shortClipMp4URL || portfolioItem.shortClipMp4S3URL) &&
        (portfolioItem.shortClipOgvURL || portfolioItem.shortClipOgvS3URL) && (
          <video
            className={classNames(
              `absolute inset-0 h-full w-full object-cover transition-all duration-700`,
              {
                'opacity-100': portfolioItem.shortClipMp4S3URL && isHovered,
                'opacity-0': !portfolioItem.shortClipMp4S3URL || !isHovered,
              }
            )}
            muted={true}
            autoPlay={true}
            loop={true}
            playsInline={true}
            preload="none"
          >
            {portfolioItem.shortClipMp4S3URL ? (
              <source
                id="mp4"
                src={portfolioItem.shortClipMp4S3URL}
                type="video/mp4"
              />
            ) : (
              <source
                id="mp4"
                src={portfolioItem.shortClipMp4URL}
                type="video/mp4"
              />
            )}
            {portfolioItem.shortClipOgvS3URL ? (
              <source
                id="ogv"
                src={portfolioItem.shortClipOgvS3URL}
                type="video/ogg"
              />
            ) : (
              <source
                id="ogv"
                src={portfolioItem.shortClipOgvURL}
                type="video/ogg"
              />
            )}
          </video>
        )}
      <div className="z-10 text-center">
        <h2 className="text-3xl font-extrabold uppercase lg:text-2xl">
          {portfolioItem.clientName}
        </h2>
        <h3 className="font-outline text-3xl uppercase lg:text-2xl">
          {portfolioItem.title}
        </h3>
      </div>
    </Link>
  )
}

export default PortfolioItemTile
