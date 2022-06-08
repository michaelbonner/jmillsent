import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import urlForSanitySource from '../lib/urlForSanitySource'
import Date from './date'
import LargeGoldBar from './large-gold-bar'
import LargeWhiteBar from './large-white-bar'

const NewsItemCard = ({ newsItem, index, hideAfterCount = 999 }) => {
  return (
    <>
      <div className="z-10 w-full sm:max-w-xl lg:max-w-3xl xl:max-w-5xl">
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
        <div className="mx-auto mt-8 w-2/3 lg:w-full lg:max-w-sm">
          <Link href={`/news/${newsItem.slug.current}`} key={newsItem._id}>
            <a className="flex justify-center sm:w-full transform transition-all hover:translate-x-1">
              <Image
                alt="Read Full Story"
                height="108"
                src="/images/JME-news-story-link.svg"
                width="500"
              />
            </a>
          </Link>
        </div>
      </div>
      <LargeWhiteBar yMargin="my-12 lg:my-24" />
    </>
  )
}

export default NewsItemCard
