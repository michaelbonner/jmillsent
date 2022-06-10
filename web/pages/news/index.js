import DividerBar from '@/components/divider-bar'
import { H1 } from '@/components/headings'
import Layout from '@/components/layout'
import NewsItemCard from '@/components/news-item-card'
import { getClient } from '@/lib/sanity'
import groq from 'groq'

function News({ newsPage, newsItems }) {
  const heroContent = (
    <div className="mb-10 -my-2 sm:my-10 w-full text-white flex items-center justify-center">
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
      <div className="max-w-7xl mt-12 mx-auto pb-8">
        <div className="flex flex-col items-center">
          {newsItems.map((newsItem, index) => {
            return (
              <div key={index}>
                <NewsItemCard newsItem={newsItem} />
                <div className="px-12">
                  <DividerBar yMargin="my-8" />
                </div>
              </div>
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
