import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import NewsItemCard from '@/components/news-item-card'
import { sanityClient } from '@/lib/sanity'
import groq from 'groq'

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
      <div className="mx-auto mt-12 max-w-7xl pb-8 lg:mt-24 lg:px-8">
        <div className="mt-10 grid max-w-7xl justify-center gap-y-24 rounded-2xl p-8 lg:gap-y-10 lg:bg-white lg:p-10">
          {newsPage?.newsItems.map((newsItem, index) => {
            return <NewsItemCard key={index} newsItem={newsItem} />
          })}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const newsPage = await sanityClient.fetch(
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
