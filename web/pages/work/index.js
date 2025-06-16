import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import Layout from '@/components/layout'
import WorkItemTile from '@/components/work-item-tile'
import { sanityClient } from '@/lib/sanity'
import urlForSanitySource from '@/lib/urlForSanitySource'
import { PortableText } from '@portabletext/react'
import classNames from 'classnames'
import groq from 'groq'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Video from 'yet-another-react-lightbox/plugins/video'

function Work({ workPage, workItemCategories }) {
  const defaultActiveTab = workItemCategories?.at(0)?.name || ''
  const [activeTab, setActiveTab] = useQueryState('work-type', {
    defaultValue: defaultActiveTab,
    clearOnDefault: true,
  })

  const [lightboxActiveIndex, setLightboxActiveIndex] = useState(null)

  const isSocialLayout = activeTab === 'Social'

  const categoryWorkItems = workItemCategories
    .find((category) => category.name === activeTab)
    .workItems.map((workItem) => {
      if (!isSocialLayout) return workItem

      return {
        ...workItem,
        posterUrl: urlForSanitySource(workItem.poster)
          .width(1080)
          .height(1920)
          .crop('focalpoint')
          .url(),
      }
    })

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

  const lightboxSlides = isSocialLayout
    ? filteredWorkItems.map((workItem) => {
        return {
          autoplay: true,
          controlsList: 'nodownload nofullscreen noremoteplayback',
          disablePictureInPicture: true,
          disableRemotePlayback: true,
          height: 1920,
          loop: true,
          playsInline: true,
          poster: workItem.posterUrl,
          preload: 'auto',
          sources: [
            {
              src: workItem.shortClipMp4S3URL,
              type: 'video/mp4',
            },
            {
              src: workItem.shortClipOgvS3URL,
              type: 'video/ogg',
            },
          ],
          type: 'video',
          width: 1080,
        }
      })
    : []

  return (
    <Layout
      title={
        activeTab !== defaultActiveTab
          ? `${activeTab} ${workPage.seoTitle}`
          : workPage.seoTitle
      }
      description={
        activeTab !== defaultActiveTab
          ? `${activeTab} | ${workPage.seoDescription}`
          : workPage.seoDescription
      }
    >
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
                  'lg:px-12 lg:text-base lg:[&:last-child]:border-r-0',
                  index % 2 === 0 && 'border-r'
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
        </ul>
        <div
          className={classNames(
            'mx-1 grid grid-cols-1 gap-1',
            'lg:grid-cols-3',
            isSocialLayout && 'mx-auto max-w-6xl grid-cols-3'
          )}
        >
          {filteredWorkItems.map((workItem, index) => {
            return (
              <WorkItemTile
                workItem={workItem}
                key={index}
                aspectRatio={isSocialLayout ? 'aspect-[1080/1920]' : ''}
                onClick={
                  isSocialLayout
                    ? () => {
                        setLightboxActiveIndex(index)
                      }
                    : undefined
                }
                typographyClassNameOverrides={
                  isSocialLayout
                    ? {
                        clientName: classNames(
                          'text-lg font-extrabold uppercase',
                          'lg:text-2xl'
                        ),
                        title: classNames(
                          'font-outline text-lg uppercase',
                          'lg:text-2xl'
                        ),
                      }
                    : undefined
                }
              />
            )
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

      {isSocialLayout && (
        <Lightbox
          open={lightboxActiveIndex !== null}
          plugins={[Video]}
          slides={lightboxSlides}
          index={lightboxActiveIndex}
          close={() => {
            // find all videos and pause them
            const videos = document.querySelectorAll(
              '.yarl__video_container video'
            )
            videos.forEach((video) => {
              video.pause()
            })
            setLightboxActiveIndex(null)
          }}
        />
      )}
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
