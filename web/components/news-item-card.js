import Image from 'next/image'
import Link from 'next/link'
import urlForSanitySource from '../lib/urlForSanitySource'
import Date from './date'

const NewsItemCard = ({ newsItem }) => {
  return (
    <div className="grid gap-y-4 z-10 w-full lg:max-w-2xl xl:max-w-4xl px-8">
      <Link href={`/news/${newsItem.slug?.current}`}>
        <a
          key={newsItem._id}
          className="w-full flex items-center justify-center"
        >
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

      <div className="mx-auto w-full my-2 sm:my-4 lg:max-w-2xl xl:max-w-4xl sm:px-8">
        <Link href={`/news/${newsItem.slug?.current}`}>
          <a className="flex flex-nowrap justify-between items-center text-lg gap-x-4 sm:text-3xl uppercase border-b border-gold pb-4 sm:pb-7">
            <h2 className="font-extrabold tracking-wide">{newsItem.title}</h2>
            <Date dateString={newsItem.date} />
          </a>
        </Link>
      </div>

      <p className="text-center max-w-5xl mx-auto prose prose-invert sm:px-8 sm:text-lg">
        {newsItem.description}
      </p>

      <div className="text-center mt-2">
        <Link href={`/news/${newsItem.slug?.current}`} key={newsItem._id}>
          <a className="inline-flex gap-3 items-center justify-center px-3 py-1 mt-4 text-2xl uppercase hover:bg-gold transition-colors border-2 border-gray-300 group">
            <span className="font-outline tracking-tighter text-gray-300 group-hover:text-black">
              {newsItem.customButtonTextSection1 || `Read`}
            </span>

            <span className="font-bold tracking-wide group-hover:text-black">
              {newsItem.customButtonTextSection2 || `Full`}
            </span>

            <span className="font-outline tracking-tighter text-gray-300 group-hover:text-black">
              {newsItem.customButtonTextSection3 || `Story`}
            </span>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default NewsItemCard
