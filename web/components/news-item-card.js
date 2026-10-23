import { urlForSanitySource } from '@/lib/urlForSanitySource'
import { toPlainText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import Date from './date'
import { Eyebrow, H3 } from './headings'

const NewsItemCard = ({ newsItem }) => {
  const image = newsItem?.poster || newsItem?.heroImage
  const linkText = [
    newsItem?.customButtonTextSection1 || 'Read',
    newsItem?.customButtonTextSection2 || 'Full',
    newsItem?.customButtonTextSection3 || 'Story',
  ].join(' ')

  return (
    <Link
      className="group flex flex-col border-t border-white/20 pt-6"
      href={`/news/${newsItem?.slug?.current}`}
    >
      {image && (
        <div className="relative aspect-3/2 overflow-hidden bg-neutral-900">
          <Image
            alt={newsItem?.seoTitle || newsItem?.title || 'News'}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
            fill
            sizes="(max-width: 1023px) 100vw, 640px"
            src={urlForSanitySource(image)
              .width(1200)
              .height(800)
              .format('webp')
              .fit('crop')
              .crop('focalpoint')
              .url()}
          />
        </div>
      )}
      {newsItem?.date && (
        <Eyebrow className="mt-6">
          <Date dateString={newsItem.date} />
        </Eyebrow>
      )}
      <H3 className="mt-3 max-w-[28ch]">{newsItem?.title}</H3>
      {newsItem?.description && (
        <p className="mt-2 line-clamp-3 max-w-[60ch] text-base/7 text-pretty text-neutral-300">
          {toPlainText(newsItem.description)}
        </p>
      )}
      <span className="mt-5 self-start border-b border-white pb-2 text-sm font-medium tracking-[0.08em] uppercase transition-colors group-hover:border-white/50 group-hover:text-white/75">
        {linkText} ↗
      </span>
    </Link>
  )
}

export default NewsItemCard
