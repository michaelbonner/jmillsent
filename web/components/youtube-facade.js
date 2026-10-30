import { urlForSanitySource } from '@/lib/urlForSanitySource'
import { getYouTubeStartSeconds } from '@/lib/youtube'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function YouTubeFacade({ videoId, url, title, poster }) {
  const [playing, setPlaying] = useState(false)
  const playerRef = useRef(null)
  useEffect(() => {
    if (playing) playerRef.current?.focus()
  }, [playing])
  if (!videoId || !poster?.asset) return null

  const start = getYouTubeStartSeconds(url)
  const playerUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1${start ? `&start=${start}` : ''}`

  return (
    <figure className="not-prose my-8">
      <div
        className="relative overflow-hidden rounded-lg border border-white/20 bg-black"
        style={{ aspectRatio: '16 / 9' }}
      >
        {playing ? (
          <iframe
            ref={playerRef}
            src={playerUrl}
            title={`${title} video player`}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 block h-full w-full cursor-pointer text-white focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#c5a663]"
          >
            <Image
              src={urlForSanitySource(poster).width(1280).url()}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 960px"
              style={{
                objectPosition: poster.hotspot
                  ? `${poster.hotspot.x * 100}% ${poster.hotspot.y * 100}%`
                  : 'center',
              }}
              className="object-cover"
            />
            <span className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/35 motion-reduce:transition-none" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#967738] shadow-lg transition-transform group-hover:scale-110 motion-reduce:transition-none sm:h-20 sm:w-20">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-7 w-7 fill-current sm:h-9 sm:w-9"
                  aria-hidden="true"
                >
                  <path d="M6 3.5v17l14-8.5L6 3.5Z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2 text-left">
        <span className="font-semibold text-white">{title}</span>
        <a
          href={`https://www.youtube.com/watch?v=${videoId}${start ? `&t=${start}s` : ''}`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-sm font-bold tracking-wider text-[#c5a663] uppercase underline-offset-4 hover:underline focus-visible:underline"
        >
          Watch on YouTube ↗
        </a>
      </figcaption>
    </figure>
  )
}
