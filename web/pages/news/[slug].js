/* eslint-disable @next/next/no-img-element */
import groq from 'groq'
import Layout from '@/components/layout'
import { getClient } from '@/lib/sanity'
import MediumWhiteBar from '@/components/medium-white-bar'
import Date from '@/components/date'
import LargeGoldBar from '@/components/large-gold-bar'
import Link from 'next/link'
import Image from 'next/image'
import BlockContent from '@sanity/block-content-to-react'

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
    <Layout
      title={newsItem.seoTitle}
      description={newsItem.seoDescription}
      heroImageUrl={newsItem.heroImage || null}
    >
      <div className="mx-auto lg:max-w-7xl px-4 py-6">
        <div className="flex justify-around text-3xl uppercase">
          <h1 className="font-extrabold">{newsItem.title}</h1>
          <Date dateString={newsItem.date} />
        </div>
        <LargeGoldBar yMargin="my-4" />
        {newsItem.body && (
          <div className="text-white text-center mx-auto max-w-lg md:max-w-4xl lg:max-w-7xl prose lg:prose-lg">
            <BlockContent blocks={newsItem.body} />
          </div>
        )}
        <div className="mx-auto mt-12 w-40 max-w-xs sm:w-full">
          <Link href="/news">
            <a className="flex justify-center transform transition-all hover:translate-x-1">
              <Image
                alt="Read Full Story"
                height="108"
                src="/images/JME-more-news-link.svg"
                width="500"
              />
            </a>
          </Link>
        </div>
      </div>
      <MediumWhiteBar />
    </Layout>
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
