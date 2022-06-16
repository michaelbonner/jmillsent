import DividerBar from '@/components/divider-bar'
import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import NewsItemCard from '@/components/news-item-card'
import { getClient } from '@/lib/sanity'
import groq from 'groq'
import { Fragment } from 'react'

function News({ newsPage, newsItems }) {
  const heroContent = (
    <div className="sm:mb-10 -my-2 sm:my-10 w-full text-white flex items-center justify-center">
      <div className="w-screen px-4 flex flex-col items-center justify-center text-center">
        <H1>{newsPage.seoTitle}</H1>
        <H2 className="uppercase font-outline sm:text-2xl lg:text-5xl">
          {newsPage.seoDescription}
        </H2>
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
      <div className="max-w-7xl mt-12 lg:mt-24 mx-auto pb-8">
        <div className="grid gap-y-12 lg:gap-y-0 justify-center">
          {newsItems.map((newsItem, index) => {
            return (
              <Fragment key={index}>
                <NewsItemCard newsItem={newsItem} />
                <div className="px-12 sm:px-24">
                  <DividerBar yMargin="my-12 lg:my-24" />
                </div>
              </Fragment>
            )
          })}
        </div>
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
        customButtonTextSection1,
        customButtonTextSection2,
        customButtonTextSection3,
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
