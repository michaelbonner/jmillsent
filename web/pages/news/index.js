import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import MediumWhiteBar from '@/components/medium-white-bar'
import NewsItemCard from '@/components/news-item-card'
import { getClient } from '@/lib/sanity'
import groq from 'groq'
import { Fragment } from 'react'

function News({ newsPage }) {
  const heroContent = (
    <div className="-my-2 flex w-full items-center justify-center text-white sm:my-10 sm:mb-10">
      <div className="flex w-screen flex-col items-center justify-center px-4 text-center">
        <H1>{newsPage.seoTitle}</H1>
        <H2 className="font-outline uppercase sm:text-2xl lg:text-5xl">
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
    >
      <div className="mx-auto mt-12 max-w-7xl pb-8 lg:mt-24">
        <div className="mt-10 grid max-w-7xl gap-y-4 sm:gap-y-8 lg:gap-y-12">
          {newsPage?.newsItems.map((newsItem, index) => {
            return (
              <Fragment key={index}>
                <NewsItemCard newsItem={newsItem} />
              </Fragment>
            )
          })}
        </div>
      </div>
      <MediumWhiteBar yMargin="mb-8 mt-12 lg:mt-24" />
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
      newsItems[]->
    }
    `
  )
  return {
    props: {
      newsPage,
    },
  }
}

export default News
