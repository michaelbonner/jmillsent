import { ClientOnly } from '@/components/client-only'
import Date from '@/components/date'
import ExternalArticlePreview from '@/components/external-article-preview'
import YouTubeFacade from '@/components/youtube-facade'
import LargeGoldBar from '@/components/large-gold-bar'
import Layout from '@/components/layout'
import { portableTextComponents, sanityClient } from '@/lib/sanity'
import { getYouTubeVideoId } from '@/lib/youtube'
import { PortableText } from '@portabletext/react'
import groq from 'groq'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { urlForSanitySource } from '../../lib/urlForSanitySource'
import { styles } from '@/styles/styles'

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

const NewsItem = ({ newsItem = {} }) => {
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
        <div className="relative mx-auto grid gap-y-8 lg:mt-28 lg:max-w-7xl">
          {!newsItem.videoId && (
            <div className="relative h-[600px] w-full">
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
                className="rounded-lg object-cover"
              />
            </div>
          )}
          {newsItem.videoId && (
            <div className="container mx-auto max-w-7xl rounded-xl">
              <ClientOnly>
                <VideoPlayer
                  poster={newsItem.heroImage}
                  title={newsItem.title}
                  videoId={newsItem.videoId}
                  videoHeightAspectRatio={newsItem.videoHeightAspectRatio}
                  videoWidthAspectRatio={newsItem.videoWidthAspectRatio}
                />
              </ClientOnly>
            </div>
          )}
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-x-4 px-8 text-lg uppercase sm:gap-x-32 sm:text-3xl">
            <h1 className="font-extrabold">{newsItem.title}</h1>
            {newsItem.date && <Date dateString={newsItem.date} />}
          </div>
          <div className="mx-auto w-full max-w-5xl sm:px-8">
            <LargeGoldBar yMargin="my-0" />
          </div>
          {newsItem.body && (
            <div className="prose prose-lg prose-invert mx-auto w-full max-w-5xl px-8 text-center">
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
          <div className="mt-10">
            <div className="mt-4 text-center text-2xl">
              <Link href="/news" className={styles.buttonLink.default}>
                <span className="font-outline tracking-tighter text-gray-300 group-hover:text-black">
                  More
                </span>

                <span className="font-bold tracking-wide group-hover:text-black">
                  News
                </span>

                <span className="font-outline tracking-tighter text-gray-300 group-hover:text-black">
                  Stories
                </span>
              </Link>
            </div>
          </div>
        </div>
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
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = params
  try {
    const newsItem = await sanityClient.fetch(
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
      props: { newsItem, newsItems },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {},
    }
  }
}

export default NewsItem
