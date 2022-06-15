/* eslint-disable @next/next/no-img-element */
import groq from 'groq'
import Layout from '@/components/layout'
import { getClient, portableTextComponents } from '@/lib/sanity'
import MediumWhiteBar from '@/components/medium-white-bar'
import Date from '@/components/date'
import LargeGoldBar from '@/components/large-gold-bar'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import urlForSanitySource from '../../lib/urlForSanitySource'
import VideoPlayer from '@/components/video-player'

const newsItemQuery = groq`
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
`

const NewsItem = ({ newsItem = {} }) => {
  return (
    <>
      <Layout title={newsItem.seoTitle} description={newsItem.seoDescription}>
        <div className="mx-auto lg:max-w-7xl grid gap-y-8">
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
            <div className="border border-white py-8 px-8 container max-w-7xl mx-auto">
              <VideoPlayer
                poster={newsItem.heroImage}
                title={newsItem.title}
                videoId={newsItem.videoId}
                videoHeightAspectRatio={newsItem.videoHeightAspectRatio}
                videoWidthAspectRatio={newsItem.videoWidthAspectRatio}
              />
            </div>
          )}
          <div className="w-full max-w-5xl mx-auto px-8 flex justify-between items-center gap-x-4 sm:gap-x-32 text-lg sm:text-3xl uppercase">
            <h1 className="font-extrabold">{newsItem.title}</h1>
            <Date dateString={newsItem.date} />
          </div>
          <div className="w-full max-w-5xl mx-auto sm:px-8">
            <LargeGoldBar yMargin="my-0" />
          </div>
          {newsItem.body && (
            <div className="w-full max-w-5xl mx-auto px-8 text-center prose prose-invert prose-lg">
              <PortableText
                components={portableTextComponents}
                value={newsItem.body}
              />
            </div>
          )}
          <div className="mt-10">
            <div className="text-center">
              <Link href="/news">
                <a className="inline-flex gap-3 items-center justify-center px-3 py-1 mt-4 text-2xl uppercase hover:bg-gold transition-colors border-2 border-gray-300 group">
                  <span className="font-outline tracking-tighter text-gray-300 group-hover:text-black">
                    More
                  </span>

                  <span className="font-bold tracking-wide group-hover:text-black">
                    News
                  </span>

                  <span className="font-outline tracking-tighter text-gray-300 group-hover:text-black">
                    Stories
                  </span>
                </a>
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
  const paths = await getClient().fetch(
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
    const newsItem = await getClient().fetch(newsItemQuery, { slug })
    const newsItems = await getClient().fetch(
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
