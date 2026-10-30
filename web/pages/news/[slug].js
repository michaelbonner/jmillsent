import { ClientOnly } from '@/components/client-only'
import Date from '@/components/date'
import ExternalArticlePreview from '@/components/external-article-preview'
import LargeGoldBar from '@/components/large-gold-bar'
import Layout from '@/components/layout'
import { portableTextComponents, sanityClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import groq from 'groq'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { urlForSanitySource } from '../../lib/urlForSanitySource'
import { styles } from '@/styles/styles'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

const fordArticle = {
  href: 'https://www.fromtheroad.ford.com/us/en/articles/2026/new-mustang-dark-horse-sc',
  image: '/images/ford-dark-horse-sc.jpg',
  title: 'The Mustang Dark Horse SC: A New Standard for Race-Bred Engineering',
  source: 'Ford From the Road',
}

const isFordArticleLink = (block) =>
  block._type === 'block' &&
  block.markDefs?.some(
    (mark) => mark._type === 'link' && mark.href === fordArticle.href
  )

const NewsItem = ({ newsItem = {} }) => {
  const body =
    newsItem.slug?.current === 'ford-mustang-dark-horse-sc'
      ? newsItem.body?.map((block) =>
          isFordArticleLink(block)
            ? { ...block, _type: 'externalArticlePreview' }
            : block
        )
      : newsItem.body

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
                    externalArticlePreview: () => (
                      <ExternalArticlePreview {...fordArticle} />
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
