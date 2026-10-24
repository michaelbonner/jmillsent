import ArrowLink from '@/components/arrow-link'
import { ClientOnly } from '@/components/client-only'
import Date from '@/components/date'
import { Eyebrow, H1 } from '@/components/headings'
import Layout from '@/components/layout'
import { portableTextComponents, sanityClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import groq from 'groq'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { urlForSanitySource } from '../../lib/urlForSanitySource'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

const NewsItem = ({ newsItem = {} }) => {
  return (
    <>
      <Layout title={newsItem.seoTitle} description={newsItem.seoDescription}>
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
                components={portableTextComponents}
                value={newsItem.body}
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
