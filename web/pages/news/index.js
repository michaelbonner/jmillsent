import Layout from '@/components/layout'
import { H1 } from '@/components/headings'
import groq from 'groq'
import { getClient } from '@/lib/sanity'
import NewsItemCard from '@/components/news-item-card'
import MediumWhiteBar from '@/components/medium-white-bar'
import Link from 'next/link'

function News({ newsPage, newsItems }) {
  const heroContent = (
    <div className="mb-10 sm:my-10 w-full text-white flex items-center justify-center">
      <div className="w-screen px-4 flex flex-col items-center justify-center text-center">
        <H1>{newsPage.seoTitle}</H1>
        <h2 className="uppercase font-outline sm:text-2xl lg:text-5xl">
          {newsPage.seoDescription}
        </h2>
      </div>
    </div>
  )

  return (
    <Layout
      title={newsPage.seoTitle}
      description={newsPage.seoDescription}
      heroImageUrl={newsPage.poster}
      heroContent={heroContent}
      heroVideoHeightInPixels={newsPage.posterHeightInPixels}
      heroVideoWidthInPixels={newsPage.posterWidthInPixels}
    >
      <div className="max-w-7xl mt-12">
        <div className="flex flex-col items-center">
          {newsItems.map((newsItem, index) => {
            return <NewsItemCard newsItem={newsItem} key={index} />
          })}
        </div>
        <MediumWhiteBar yMargin="mb-8 mt-12 lg:mt-24" />
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const newsPage = await getClient().fetch(
    groq`
    *[_type == "newsPage"][0]{
      seoTitle,
      seoDescription,
      poster,
      posterHeightInPixels,
      posterWidthInPixels,
      newsPageDescription,
    }
    `
  )
  const newsItems = await getClient().fetch(
    groq`
      *[_type == "newsItem"][!(_id in path('drafts.**'))]|order(order asc){
        _id,
        slug,
        title,
        description,
        poster,
        date,
      }
    `
  )
  return {
    props: {
      newsPage,
      newsItems,
    },
  }
}

export default News
