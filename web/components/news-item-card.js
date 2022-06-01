import classNames from 'classnames'
import Link from 'next/link'
import urlForSanitySource from '../lib/urlForSanitySource'
import Date from './date'
import LargeGoldBar from './large-gold-bar'
import LargeWhiteBar from './large-white-bar'

const NewsItemCard = ({ newsItem, index, hideAfterCount = 999 }) => {
  return (
    <>
      <div className="z-10 w-full sm:max-w-xl lg:max-w-3xl xl:max-w-5xl px-2 sm:px-0 my-12">
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
        <div className="flex justify-between text-2xl sm:text-3xl uppercase z-10 mt-4">
          <h2 className="font-extrabold">{newsItem.title}</h2>
          <Date dateString={newsItem.date} />
        </div>
        <LargeGoldBar yMargin="my-4" />
        <div>
          <p className="prose lg:prose-lg text-center text-white max-w-5xl mx-auto">
            {newsItem.description}
          </p>
        </div>
      </div>
      <LargeWhiteBar yMargin="my-0" />
    </>
  )
}

export default NewsItemCard
