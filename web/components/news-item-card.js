import classNames from 'classnames'
import Link from 'next/link'
import urlForSanitySource from '../lib/urlForSanitySource'
import Date from './date'
import LargeGoldBar from './large-gold-bar'
import LargeWhiteBar from './large-white-bar'

const NewsItemCard = ({ newsItem, index, hideAfterCount = 999 }) => {
  return (
    <>
      <div className="z-10 w-full sm:max-w-xl lg:max-w-3xl xl:max-w-5xl px-2 sm:px-0 mt-10">
        <Link href={`/news/${newsItem.slug.current}`} key={newsItem._id}>
          <a
            className={classNames(
              {
                'lg:hidden': index >= hideAfterCount,
              },
              `bpd-news-tile relative text-white`,
              `flex flex-col items-center justify-center space-y-2 lg:space-y-0`
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
        <div className="flex justify-between text-2xl sm:text-3xl uppercase z-10 mt-10">
          <h2 className="font-extrabold">{newsItem.title}</h2>
          <Date dateString={newsItem.date} />
        </div>
        <LargeGoldBar yMargin="my-4" />
        <p className="prose lg:prose-lg text-center text-white max-w-5xl mx-auto">
          {newsItem.description}
        </p>
        <div className="mx-auto text-center mt-8">
          <Link href={`/news/${newsItem.slug.current}`} key={newsItem._id}>
            <a className="text-2xl font-bold uppercase tracking-wide">
              Read{' '}
              <span className="font-outline tracking-wider">More &gt;</span>
            </a>
          </Link>
        </div>
      </div>
      <LargeWhiteBar yMargin="my-10" />
    </>
  )
}

export default NewsItemCard
