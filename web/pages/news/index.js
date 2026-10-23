import { Eyebrow, H1 } from '@/components/headings'
import Layout from '@/components/layout'
import NewsItemCard from '@/components/news-item-card'
import { sanityClient } from '@/lib/sanity'
import groq from 'groq'

function News({ newsPage }) {
  const heroContent = (
    <div className="flex max-w-5xl flex-col items-start gap-5 text-left">
      <Eyebrow className="border-b border-white/60 pb-3 text-white">
        {newsPage?.seoDescription || 'Hot off the press'}
      </Eyebrow>
      <H1 className="max-w-[20ch]">{newsPage?.seoTitle || 'News'}</H1>
    </div>
  )

  return (
    <Layout
      title={newsPage?.seoTitle || 'News'}
      description={newsPage?.seoDescription || 'News'}
      heroImageUrl={newsPage?.poster || ''}
      heroContent={heroContent}
    >
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-x-10 gap-y-16 px-5 lg:grid-cols-2">
          {(newsPage?.newsItems ?? []).map((newsItem, index) => {
            return <NewsItemCard key={index} newsItem={newsItem} />
          })}
        </div>
      </section>
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
