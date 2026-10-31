import ArrowLink from '@/components/arrow-link'
import { ClientOnly } from '@/components/client-only'
import Date from '@/components/date'
import ExternalArticlePreview from '@/components/external-article-preview'
import YouTubeFacade from '@/components/youtube-facade'
import { Eyebrow, H1 } from '@/components/headings'
import Layout from '@/components/layout'
import { getClient, portableTextComponents, sanityClient } from '@/lib/sanity'
import { getYouTubeVideoId } from '@/lib/youtube'
import { PortableText } from '@portabletext/react'
import groq from 'groq'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { urlForSanitySource } from '../../lib/urlForSanitySource'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

const normalizeArticleUrl = (value) => {
  try {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol)) return null
    url.pathname = url.pathname.replace(/\/+$/, '') || '/'
    return url.href
  } catch {
    return null
  }
}

const getLinkedBlock = (block) => {
  if (block._type !== 'block' || block.listItem) return null

  const links = block.markDefs?.filter((mark) => mark._type === 'link') ?? []
  if (links.length !== 1) return null

  const link = links[0]
  const firstLinkedIndex = block.children?.findIndex((child) =>
    child.marks?.includes(link._key)
  )
  if (firstLinkedIndex == null || firstLinkedIndex < 0) return null
  if (
    block.children
      .slice(firstLinkedIndex)
      .some((child) => child.text?.trim() && !child.marks?.includes(link._key))
  ) {
    return null
  }

  return {
    href: link.href,
    introChildren: block.children.slice(0, firstLinkedIndex),
  }
}

const NewsItem = ({ newsItem = {}, preview = false }) => {
  const previews = newsItem.externalArticlePreviews ?? []
  const youtubeEmbeds = newsItem.youtubeEmbeds ?? []

  const body = newsItem.body?.flatMap((block) => {
    const match = getLinkedBlock(block)
    if (!match) return [block]

    const videoId = getYouTubeVideoId(match.href)
    const youtubeEmbed = videoId
      ? youtubeEmbeds.find(
          (item) =>
            item.title &&
            item.poster?.asset &&
            getYouTubeVideoId(item.url) === videoId
        )
      : null

    const linkedUrl = normalizeArticleUrl(match.href)
    const preview = linkedUrl
      ? previews.find(
          (item) =>
            item.image?.asset &&
            item.title &&
            item.source &&
            normalizeArticleUrl(item.href) === linkedUrl
        )
      : null

    if (!youtubeEmbed && !preview) return [block]

    return [
      ...(match.introChildren.some((child) => child.text?.trim())
        ? [
            {
              ...block,
              _key: `${block._key}-intro`,
              children: match.introChildren,
            },
          ]
        : []),
      youtubeEmbed
        ? {
            _key: block._key,
            _type: 'youtubeEmbed',
            embed: youtubeEmbed,
            videoId,
          }
        : { _key: block._key, _type: 'externalArticlePreview', preview },
    ]
  })

  return (
    <>
      <Layout title={newsItem.seoTitle} description={newsItem.seoDescription}>
        {preview && (
          <div className="bg-gold fixed inset-x-0 bottom-0 z-50 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-3 text-center text-sm font-bold text-black uppercase">
            <span>Preview — this story is not published yet</span>
            {/* Full page load so the API route can clear the draft mode cookie */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/api/exit-preview?redirect=/news" className="underline">
              Exit preview
            </a>
          </div>
        )}
        <article className="mx-auto max-w-7xl px-5 pt-8 pb-20 lg:pt-12 lg:pb-28">
          <div className="mb-10 max-w-5xl lg:mb-14">
            {newsItem.date && (
              <Eyebrow className="mb-5">
                <Date dateString={newsItem.date} />
              </Eyebrow>
            )}
            <H1 className="max-w-[24ch] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              {newsItem.title}
            </H1>
          </div>
          {!newsItem.videoId && (
            <div className="relative aspect-12/5 w-full overflow-hidden bg-neutral-900">
              <Image
                alt={newsItem.seoTitle ?? newsItem.title}
                src={urlForSanitySource(newsItem.heroImage || newsItem.poster)
                  .width(1440)
                  .height(600)
                  .format('webp')
                  .fit('crop')
                  .crop('focalpoint')
                  .url()}
                fill
                className="object-cover"
              />
            </div>
          )}
          {newsItem.videoId && (
            <ClientOnly>
              <VideoPlayer
                poster={newsItem.heroImage}
                title={newsItem.title}
                videoId={newsItem.videoId}
                videoHeightAspectRatio={newsItem.videoHeightAspectRatio}
                videoWidthAspectRatio={newsItem.videoWidthAspectRatio}
              />
            </ClientOnly>
          )}
          {newsItem.body && (
            <div className="prose prose-lg prose-invert mt-12 max-w-[65ch] break-words text-pretty text-neutral-300 lg:mt-16">
              <PortableText
                components={{
                  ...portableTextComponents,
                  types: {
                    ...portableTextComponents.types,
                    externalArticlePreview: ({ value }) => (
                      <ExternalArticlePreview {...value.preview} />
                    ),
                    youtubeEmbed: ({ value }) => (
                      <YouTubeFacade {...value.embed} videoId={value.videoId} />
                    ),
                  },
                }}
                value={body}
              />
            </div>
          )}
          <div className="mt-16 border-t border-white/15 pt-6">
            <ArrowLink href="/news" className="uppercase">
              More news stories
            </ArrowLink>
          </div>
        </article>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `
    *[_type == "newsItem"]{slug}
  `
  )

  return {
    paths: paths
      .filter((path) => {
        return path?.slug?.current
      })
      .map((path) => {
        return { params: { slug: path.slug.current } }
      }),
    // Lets draft-only stories render in draft mode; unknown slugs still 404
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params, draftMode = false }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = params
  try {
    const newsItem = await getClient(draftMode).fetch(
      groq`
      *[_type == "newsItem" && slug.current == $slug][0]{
        _id,
        seoTitle,
        seoDescription,
        heroImage,
        poster,
        slug,
        title,
        date,
        body,
        externalArticlePreviews,
        youtubeEmbeds,
        videoId,
        videoHeightAspectRatio,
        videoWidthAspectRatio,
      }
      `,
      { slug }
    )
    const newsItems = await sanityClient.fetch(
      groq`
      *[_type == "newsItem"][!(_id in path('drafts.**'))]|order(order asc){
        _id,
        slug,
        title,
        heroImage,
        poster,
        date,
        body,
      }
    `
    )

    if (!newsItem) {
      return {
        notFound: true,
      }
    }

    return {
      props: { newsItem, newsItems, preview: draftMode },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {},
    }
  }
}

export default NewsItem
