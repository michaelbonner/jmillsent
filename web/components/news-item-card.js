import Image from 'next/image'
import Link from 'next/link'
import urlForSanitySource from '../lib/urlForSanitySource'
import Date from './date'

const NewsItemCard = ({ newsItem }) => {
  return (
    <div className="z-10 grid w-full gap-y-4 px-8 lg:max-w-2xl xl:max-w-4xl">
      <Link href={`/news/${newsItem.slug?.current}`}>
        <a
          key={newsItem._id}
          className="flex w-full items-center justify-center"
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

      <div className="mx-auto my-2 w-full sm:my-4 sm:px-8 lg:max-w-2xl xl:max-w-4xl">
        <Link href={`/news/${newsItem.slug?.current}`}>
          <a className="flex flex-nowrap items-center justify-between gap-x-4 border-b border-gold pb-4 text-lg uppercase sm:pb-7 sm:text-3xl">
            <h2 className="font-extrabold tracking-wide">{newsItem.title}</h2>
            <Date dateString={newsItem.date} />
          </a>
        </Link>
      </div>

      <p className="prose prose-invert mx-auto max-w-5xl text-center sm:px-8 sm:text-lg">
        {newsItem.description}
      </p>

      <div className="mt-2 text-center">
        <Link href={`/news/${newsItem.slug?.current}`} key={newsItem._id}>
          <a className="group mt-4 inline-flex items-center justify-center gap-3 border-2 border-gray-300 px-3 py-1 text-2xl uppercase transition-colors hover:bg-gold">
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
