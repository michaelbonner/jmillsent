import Layout from '@/components/layout'
import groq from 'groq'
import { sanityClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import WorkItemTile from '@/components/work-item-tile'
import MediumWhiteBar from '@/components/medium-white-bar'
import EmailSignupForm from '@/components/email-signup-form'
import classNames from 'classnames'

function Work({ workPage, workItems }) {
  return (
    <Layout title={workPage.seoTitle} description={workPage.seoDescription}>
      <div
        className={classNames(
          'mx-1 grid grid-cols-1 gap-1',
          'lg:grid-cols-3 lg:pt-28'
        )}
      >
        {workItems.map((workItem, index) => {
          return <WorkItemTile workItem={workItem} key={index} />
        })}
      </div>
      <div className="container mx-auto mt-12 px-12 text-center text-white">
        {workPage.workPageDescription && (
          <div className="prose-lg mx-auto max-w-lg border py-1 text-center">
            <PortableText value={workPage.workPageDescription} />
          </div>
        )}
        <div className="mt-10">
          <EmailSignupForm
            title={workPage.subscribeFormTitle}
            successMessage={workPage.subscribeFormSuccessMessage}
            customReel={true}
          />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const workPage = await sanityClient.fetch(
    groq`
  *[_type == "workPage"][0]{
    poster,
    seoTitle,
    seoDescription,
    subscribeFormTitle,
    subscribeFormSuccessMessage,
    videoId,
    workPageDescription,
  }
  `
  )
  const workItems = await sanityClient.fetch(
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
