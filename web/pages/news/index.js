import Layout from '@/components/layout'
import { H1, H2, H3 } from '@/components/headings'
import groq from 'groq'
import { getClient } from '@/lib/sanity'
import NewsItemCard from '@/components/news-item-card'
import MediumWhiteBar from '@/components/medium-white-bar'
import LargeWhiteBar from '@/components/large-white-bar'

function News({ newsPage, newsItems }) {
  const heroContent = (
    <div className="h-full w-full text-white flex items-center justify-center">
      <div className="w-screen px-4 pt-28 flex flex-col items-center justify-center text-center">
        <H1>{newsPage.seoTitle}</H1>
        <h2 className="uppercase font-outline text-2xl lg:text-5xl">
          {newsPage.seoDescription}
        </h2>
      </div>
    </div>
  )

  return (
    <Layout
      title={newsPage.seoTitle}
      description={newsPage.seoDescription}
      heroImageUrl={newsPage.poster || null}
      heroContent={heroContent}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center py-8">
          {newsItems.map((newsItem, index) => {
            return <NewsItemCard newsItem={newsItem} key={index} />
          })}
        </div>
        <div className="mx-auto text-white text-center">
          <MediumWhiteBar />
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
