import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import urlForSanitySource from '../lib/urlForSanitySource'
import Date from './date'
import LargeGoldBar from './large-gold-bar'

const NewsItemCard = ({ newsItem, index, hideAfterCount = 999 }) => {
  return (
    <>
      <div className="z-10 w-full mt-4 lg:mt-10 lg:max-w-3xl xl:max-w-5xl">
        <Link href={`/news/${newsItem.slug.current}`} key={newsItem._id}>
          <a
            className={classNames(
              {
                'lg:hidden': index >= hideAfterCount,
              },
              `bpd-news-tile`,
              `flex flex-col items-center justify-center`
            )}
            key={newsItem._id}
            style={{
              backgroundImage: newsItem.poster
                ? `url(${urlForSanitySource(newsItem.poster).width(700)})`
                : '',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          ></a>
        </Link>
        <div className="mx-auto lg:max-w-2xl xl:max-w-4xl">
          <div className="flex flex-nowrap justify-center items-center px-10 text-lg gap-x-4 sm:text-3xl uppercase z-10 mt-10">
            <h2 className="font-extrabold tracking-wide">{newsItem.title}</h2>
            <Date dateString={newsItem.date} />
          </div>
          <LargeGoldBar yMargin="my-4" />
          <p className="text-center max-w-5xl mx-auto px-8">
            {newsItem.description}
          </p>
        </div>

        <div className="text-center">
          <Link href={`/news/${newsItem.slug.current}`} key={newsItem._id}>
            <a className="inline-flex gap-3 items-center justify-center px-3 py-1 mt-4 text-xl uppercase hover:bg-gold transition-colors border-2 border-gray-300">
              <span className="font-outline tracking-tighter text-gray-300">
                Read
              </span>

              <span className="font-bold tracking-wide">Full</span>

              <span className="font-outline tracking-tighter text-gray-300">
                Story
              </span>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NewsItemCard
