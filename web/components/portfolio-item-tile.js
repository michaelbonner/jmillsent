import { clsx } from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { urlForSanitySource } from '../lib/urlForSanitySource'

const PortfolioItemTile = ({ portfolioItem, index, hideAfterCount = 999 }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [hasHovered, setHasHovered] = useState(false)

  return (
    <Link
      href={`/private-gallery/${portfolioItem.slug?.current}`}
      key={portfolioItem._id}
      className={clsx(
        {
          'lg:hidden': index >= hideAfterCount,
        },
        `group bpd-project-tile relative isolate overflow-hidden bg-neutral-900 text-white`,
        `flex flex-col items-start justify-end p-5 text-left lg:p-6`
      )}
      style={{
        backgroundImage: portfolioItem.poster
          ? `url(${urlForSanitySource(portfolioItem.poster).width(700).format('webp').quality(80).url()})`
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
            className={clsx(
              `absolute inset-0 -z-10 h-full w-full object-cover transition-all duration-700`,
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
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-neutral-950/85 via-neutral-950/20 to-transparent transition-opacity duration-500 group-hover:opacity-60" />
      <div className="z-10">
        <h2 className="text-sm font-medium tracking-[0.12em] text-white/75 uppercase">
          {portfolioItem.clientName}
        </h2>
        <h3 className="mt-1 text-xl font-semibold tracking-tight text-balance uppercase lg:text-2xl">
          {portfolioItem.title}
        </h3>
      </div>
    </Link>
  )
}

export default PortfolioItemTile
