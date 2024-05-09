import EmailSignupForm from '@/components/email-signup-form'
import Layout from '@/components/layout'
import MediumWhiteBar from '@/components/medium-white-bar'
import WorkItemTile from '@/components/work-item-tile'
import { sanityClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import classNames from 'classnames'
import groq from 'groq'
import { useQueryState } from 'nuqs'

function Work({ workPage, workItems, workItemCategories }) {
  const [activeTab, setActiveTab] = useQueryState('work-type', {
    defaultValue: workItemCategories?.at(0)?.name || '',
    clearOnDefault: true,
  })

  const filteredWorkItems = workItems
    .map((workItem) => ({
      ...workItem,
      flatCategories: (workItem.categories || []).map(
        (category) => category?.name
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
        <ul className="mt-4 pb-4 pt-4 px-8 flex items-center divide-x divide-white justify-center font-semibold border-t max-w-5xl mx-auto">
          {workItemCategories.map((tab, index) => {
            const tabHasItems = workItems.some((workItem) =>
              workItem.categories
                .map((category) => category?.name)
                .includes(tab.name)
            )

            if (!tabHasItems) return null

            return (
              <li className="px-8 lg:px-12" key={index}>
                <button
                  className={classNames(
                    'uppercase py-1 px-2 border',
                    'lg:tracking-wider',
                    activeTab === tab.name ? 'border-white' : 'border-black'
                  )}
                  onClick={() => setActiveTab(tab.name)}
                >
                  {tab.name}
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
      categories[]->{
        name
      },
      "shortClipMp4URL": shortClipMp4.asset->url,
      "shortClipMp4S3URL": shortClipMp4S3.asset->fileURL,
      "shortClipOgvURL": shortClipOgv.asset->url,
      "shortClipOgvS3URL": shortClipOgvS3.asset->fileURL,
    }
  `
  )
  const workItemCategories = await sanityClient.fetch(
    groq`
    *[_type == "workItemCategory"]|order(order asc){
      name,
      order
    }
  `
  )

  return {
    props: {
      workPage,
      workItems,
      workItemCategories,
    },
  }
}

export default Work
