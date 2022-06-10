/* eslint-disable @next/next/no-img-element */
import groq from 'groq'
import Layout from '@/components/layout'
import { getClient } from '@/lib/sanity'
import MediumWhiteBar from '@/components/medium-white-bar'
import Date from '@/components/date'
import LargeGoldBar from '@/components/large-gold-bar'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import urlForSanitySource from '../../lib/urlForSanitySource'

const newsItemQuery = groq`
*[_type == "newsItem" && slug.current == $slug][0]{
  _id,
  seoTitle,
  seoDescription,
  description,
  poster,
  heroImage,
  slug,
  title,
  date,
  body,
}
`

const NewsItem = ({ newsItem = {} }) => {
  return (
    <>
      <Layout title={newsItem.seoTitle} description={newsItem.seoDescription}>
        <div className="mx-auto lg:max-w-7xl">
          <img
            alt={newsItem.seoTitle}
            src={`${urlForSanitySource(newsItem.heroImage)}`}
          />
          <div className="mx-auto md:max-w-4xl xl:max-w-5xl">
            <div className="flex justify-center items-center px-10 gap-x-4 sm:gap-x-32 text-lg sm:text-3xl uppercase mt-4 lg:mt-10">
              <h1 className="font-extrabold justify-self-end text-right">
                {newsItem.title}
              </h1>
              <Date dateString={newsItem.date} />
            </div>
            <LargeGoldBar yMargin="my-4" />
            {newsItem.body && (
              <div className="text-center px-8 sm:px-12 -mb-2 prose-lg">
                <PortableText value={newsItem.body} />
              </div>
            )}
          </div>
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
        return path
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
        description,
        title,
        poster,
        heroImage,
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
