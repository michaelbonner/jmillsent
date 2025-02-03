import Layout from '@/components/layout'
import WorkItemTile from '@/components/work-item-tile'
import { sanityClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import classNames from 'classnames'
import groq from 'groq'
import { useQueryState } from 'nuqs'

function Work({ workPage, workItemCategories }) {
  const [activeTab, setActiveTab] = useQueryState('work-type', {
    defaultValue: workItemCategories?.at(0)?.name || '',
    clearOnDefault: true,
  })

  const categoryWorkItems = workItemCategories.find(
    (category) => category.name === activeTab
  ).workItems

  const filteredWorkItems = categoryWorkItems
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
        <ul
          className={classNames(
            'mx-6 mt-4 grid grid-cols-2 items-center justify-center border-t py-4 font-semibold',
            'lg:mx-36 lg:flex lg:divide-x lg:divide-white',
            'xl:mx-48'
          )}
        >
          {workItemCategories.map((tab, index) => {
            return (
              <li
                className={classNames(
                  'flex justify-center text-xs',
                  'lg:px-12 lg:text-base',
                  index % 2 === 0 && 'border-r lg:border-r-0'
                )}
                key={index}
              >
                <button
                  className={classNames(
                    'rounded-xl border px-2 py-1 uppercase transition-all',
                    'lg:tracking-wider',
                    activeTab === tab.name
                      ? 'border-white'
                      : 'border-black hover:scale-110'
                  )}
                  onClick={() => setActiveTab(tab.name)}
                >
                  {tab.name}
                </button>
              </li>
            )
          })}
          {/* <li
            className={classNames(
              'flex justify-center text-xs',
              'lg:px-12 lg:text-base'
            )}
          >
            <Link
              className={classNames(
                'rounded-xl border px-2 py-1 uppercase transition-all',
                'lg:tracking-wider',
                'border-black hover:scale-110'
              )}
              href="/documentary"
            >
              Documentary
            </Link>
          </li> */}
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

  const workItemCategories = await sanityClient.fetch(
    groq`
      *[_type == "workItemCategory"][showOnWorkPage == true]|order(order asc){
        name,
        order,
        workItems[]->{
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
      }
  `
  )

  return {
    props: {
      workPage,
      workItemCategories,
    },
  }
}

export default Work
