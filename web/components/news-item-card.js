import Link from 'next/link'
import urlForSanitySource from '../lib/urlForSanitySource'
import Date from './date'
import LargeGoldBar from './large-gold-bar'
import Image from 'next/image'

const NewsItemCard = ({ newsItem }) => {
  return (
    <>
      <div className="z-10 w-full lg:max-w-2xl xl:max-w-4xl">
        <Link href={`/news/${newsItem.slug?.current}`} key={newsItem._id}>
          <a key={newsItem._id}>
            <Image
              alt={newsItem.seoTitle}
              src={`${urlForSanitySource(
                newsItem.heroImage || newsItem.poster
              )}?w=1440&h=600&auto=format&fit=crop&crop=focalpoint`}
              height={600}
              width={1440}
            />
          </a>
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

        <div className="text-center mt-2">
          <Link href={`/news/${newsItem.slug?.current}`} key={newsItem._id}>
            <a className="inline-flex gap-3 items-center justify-center px-3 py-1 mt-4 text-2xl uppercase hover:bg-gold transition-colors border-2 border-gray-300 group">
              <span className="font-outline tracking-tighter text-gray-300 group-hover:text-black">
                Read
              </span>

              <span className="font-bold tracking-wide group-hover:text-black">
                Full
              </span>

              <span className="font-outline tracking-tighter text-gray-300 group-hover:text-black">
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
