/* eslint-disable @next/next/no-img-element */
import Date from '@/components/date'
import LargeGoldBar from '@/components/large-gold-bar'
import Layout from '@/components/layout'
import MediumWhiteBar from '@/components/medium-white-bar'
import { portableTextComponents, sanityClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import groq from 'groq'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import urlForSanitySource from '../../lib/urlForSanitySource'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

const NewsItem = ({ newsItem = {} }) => {
  return (
    <>
      <Layout title={newsItem.seoTitle} description={newsItem.seoDescription}>
        <div className="mx-auto grid gap-y-8 lg:mt-28 lg:max-w-7xl">
          {!newsItem.videoId && (
            <Image
              alt={newsItem.seoTitle}
              src={`${urlForSanitySource(
                newsItem.heroImage || newsItem.poster
              )}?w=1440&h=600&auto=format&fit=crop&crop=focalpoint`}
              height={600}
              width={1440}
            />
          )}
          {newsItem.videoId && (
            <div className="container mx-auto max-w-7xl border border-gray-300 py-8 px-8">
              <VideoPlayer
                poster={newsItem.heroImage}
                title={newsItem.title}
                videoId={newsItem.videoId}
                videoHeightAspectRatio={newsItem.videoHeightAspectRatio}
                videoWidthAspectRatio={newsItem.videoWidthAspectRatio}
              />
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
                components={portableTextComponents}
                value={newsItem.body}
              />
            </div>
          )}
          <div className="mt-10">
            <div className="text-center">
              <Link
                href="/news"
                className="group mt-4 inline-flex items-center justify-center gap-3 border-2 border-gray-300 px-3 py-1 text-2xl uppercase transition-colors hover:bg-gold"
              >
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
        <MediumWhiteBar yMargin="mb-8 mt-12 lg:mt-24" />
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
    return {
      props: {},
    }
  }
}

export default NewsItem
