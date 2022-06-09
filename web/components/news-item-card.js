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
        <div className="grid grid-cols-2 items-center px-8 text-lg gap-x-4 sm:text-3xl uppercase z-10 mt-10">
          <h2 className="font-extrabold justify-self-end text-right">
            {newsItem.title}
          </h2>
          <Date dateString={newsItem.date} />
        </div>
        <LargeGoldBar yMargin="my-4" />
        <p className="prose sm:prose-lg text-center text-white max-w-5xl mx-auto px-8">
          {newsItem.description}
        </p>
        <div className="mt-8 px-24 lg:max-w-sm transform transition-all hover:translate-x-1">
          <Link href={`/news/${newsItem.slug.current}`} key={newsItem._id}>
            <a>
              <Image
                alt="Read Full Story"
                height="65"
                src="/images/JME-news-story-link.svg"
                width="300"
              />
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NewsItemCard
