import Image from 'next/image'
import { urlForSanitySource } from '@/lib/urlForSanitySource'

export default function ExternalArticlePreview({ href, image, title, source }) {
  const imageUrl = image?.asset
    ? urlForSanitySource(image).width(1280).height(700).fit('crop').url()
    : null

  if (!imageUrl) return null

  return (
    <a
      href={href}
      rel="noreferrer noopener"
      className="not-prose group relative block min-h-80 overflow-hidden rounded-lg border border-white/20 text-left text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5a663] sm:min-h-112"
    >
      <Image
        src={imageUrl}
        alt=""
        fill
        sizes="(max-width: 640px) 100vw, 960px"
        className="object-cover object-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
      />
      <span className="absolute inset-0 bg-linear-to-t from-black via-black/55 to-black/5" />
      <span className="relative flex min-h-80 flex-col justify-between p-6 sm:min-h-112 sm:p-10">
        <span className="text-sm font-bold tracking-[0.18em] text-white uppercase">
          {source}
        </span>
        <span className="block">
          <span className="block max-w-3xl text-2xl leading-tight font-extrabold sm:text-4xl">
            {title}
          </span>
          <span className="mt-5 inline-flex items-center gap-2 border-b border-[#967738] pb-1 text-sm font-bold tracking-widest uppercase transition-colors group-hover:text-[#c5a663] group-focus-visible:text-[#c5a663]">
            Read the story <span aria-hidden="true">↗</span>
          </span>
        </span>
      </span>
    </a>
  )
}
