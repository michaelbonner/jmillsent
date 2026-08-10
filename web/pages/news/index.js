import { H1 } from '@/components/headings'
import Layout from '@/components/layout'
import NewsItemCard from '@/components/news-item-card'
import { sanityClient } from '@/lib/sanity'
import groq from 'groq'

function News({ newsPage }) {
  const heroContent = (
    <div className="relative flex min-h-[70svh] w-screen flex-col justify-end overflow-hidden px-5 pb-10 text-white sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/15 to-black/25" />
      <div className="relative mx-auto w-full max-w-[100rem]">
        <p className="mb-4 font-mono text-sm tracking-wide text-white/70 uppercase sm:text-xs">
          Field notes
        </p>
        <H1 className="max-w-[14ch]">{newsPage?.seoTitle || 'News'}</H1>
        <h2 className="font-outline mt-2 max-w-[24ch] text-2xl text-balance text-white uppercase sm:text-3xl lg:text-5xl">
          {newsPage?.seoDescription || 'News'}
        </h2>
      </div>
    </div>
  )

  return (
    <Layout
      title={newsPage?.seoTitle || 'News'}
      description={newsPage?.seoDescription || 'News'}
      heroImageUrl={newsPage?.poster || ''}
      heroContent={heroContent}
    >
      <div className="mx-auto max-w-7xl lg:mt-10">
        <div className="mx-4 mt-8 rounded-xl bg-white lg:mx-8">
          <div className="grid max-w-7xl justify-center gap-y-24 rounded-xl p-6 lg:gap-y-10 lg:bg-white lg:p-10">
            {(newsPage?.newsItems ?? []).map((newsItem, index) => {
              return <NewsItemCard key={index} newsItem={newsItem} />
            })}
          </div>
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
