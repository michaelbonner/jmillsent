import Layout from '@/components/layout'
import groq from 'groq'
import { getClient } from '@/lib/sanity'
import BlockContent from '@sanity/block-content-to-react'
import WorkItemTile from '@/components/work-item-tile'
import Image from 'next/image'
import MediumWhiteBar from '@/components/medium-white-bar'

function Work({ workPage, workItems }) {
  return (
    <Layout title={workPage.seoTitle} description={workPage.seoDescription}>
      <div className="mx-1 grid grid-cols-1 lg:grid-cols-3 gap-1">
        {workItems.map((workItem, index) => {
          return <WorkItemTile workItem={workItem} key={index} />
        })}
      </div>
      <div className="container px-4 lg:mx-auto text-white text-center my-12">
        <div className="prose-lg max-w-3xl text-center mx-auto">
          <BlockContent blocks={workPage.workPageDescription} />
        </div>
        <MediumWhiteBar />
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const workPage = await getClient().fetch(
    groq`
  *[_type == "workPage"][0]{
    seoTitle,
    seoDescription,
    poster,
    videoId,
    workPageDescription,
  }
  `
  )
  const workItems = await getClient().fetch(
    groq`
    *[_type == "workItem"][!(_id in path('drafts.**'))]|order(order asc){
      _id,
      slug,
      clientName,
      title,
      poster,
      "shortClipMp4URL": shortClipMp4.asset->url,
      "shortClipMp4S3URL": shortClipMp4S3.asset->fileURL,
      "shortClipOgvURL": shortClipOgv.asset->url,
      "shortClipOgvS3URL": shortClipOgvS3.asset->fileURL,
    }
  `
  )
  return {
    props: {
      workPage,
      workItems,
    },
  }
}

export default Work
