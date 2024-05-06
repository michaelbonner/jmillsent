import EmailSignupForm from '@/components/email-signup-form'
import Layout from '@/components/layout'
import MediumWhiteBar from '@/components/medium-white-bar'
import WorkItemTile from '@/components/work-item-tile'
import { sanityClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import classNames from 'classnames'
import groq from 'groq'
import { useQueryState } from 'nuqs'

const tabs = ['Commercial', 'Narrative']

function Work({ workPage, workItems }) {
  const [activeTab, setActiveTab] = useQueryState('work-type', {
    defaultValue: 'Commercial',
    clearOnDefault: true,
    shallow: true,
  })

  const filteredWorkItems = workItems
    .map((workItem) => ({
      ...workItem,
      flatCategories: (workItem.categories || []).map(
        (category) => category?.title
      ),
    }))
    .filter((workItem) => {
      return (
        workItem.flatCategories.length === 0 ||
        (workItem.flatCategories || []).includes(activeTab)
      )
    })

  return (
    <Layout title={workPage.seoTitle} description={workPage.seoDescription}>
      <div className="lg:pt-24">
        <ul className="pb-8 px-8 flex items-center justify-center gap-8 font-semibold">
          {tabs.map((tab, index) => {
            return (
              <li key={index} className="">
                <button
                  className={classNames(
                    'uppercase italic p-1 border',
                    activeTab === tab ? 'border-white' : 'border-black'
                  )}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              </li>
            )
          })}
        </ul>
        <div
          className={classNames(
            'mx-1 grid grid-cols-1 gap-1',
            'lg:grid-cols-3'
          )}
        >
          {filteredWorkItems.map((workItem, index) => {
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
          <MediumWhiteBar yMargin="mb-8 mt-12 lg:mt-24" />
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
      categories,
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
