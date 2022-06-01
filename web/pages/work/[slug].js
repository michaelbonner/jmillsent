/* eslint-disable @next/next/no-img-element */
import groq from 'groq'
import Layout from '@/components/layout'
import { getClient } from '@/lib/sanity'
import VideoPlayer from '@/components/video-player'
import MediumWhiteBar from '@/components/medium-white-bar'
import { H3 } from '@/components/headings'

const workItemQuery = groq`
*[_type == "workItem" && slug.current == $slug][0]{
  _id,
  behindTheScenes,
  clientName,
  description,
  credits,
  extraPaddingOnVideo,
  frames,
  poster,
  slug,
  title,
  videoId,
  videoHeightAspectRatio,
  videoWidthAspectRatio,
}
`

/*
prevent purging of aspect ratio
aspect-w-1	aspect-h-1
aspect-w-2	aspect-h-2
aspect-w-3	aspect-h-3
aspect-w-4	aspect-h-4
aspect-w-5	aspect-h-5
aspect-w-6	aspect-h-6
aspect-w-7	aspect-h-7
aspect-w-8	aspect-h-8
aspect-w-9	aspect-h-9
aspect-w-10	aspect-h-10
aspect-w-11	aspect-h-11
aspect-w-12	aspect-h-12
aspect-w-13	aspect-h-13
aspect-w-14	aspect-h-14
aspect-w-15	aspect-h-15
aspect-w-16	aspect-h-16
*/

const WorkItem = ({ workItem = {} }) => {
  const fullTitle = workItem.clientName
    ? `${workItem.clientName} | ${workItem.title}`
    : workItem.title

  const column1Credits = workItem?.credits?.length
    ? workItem.credits.slice(0, Math.ceil(workItem.credits.length / 2))
    : []
  const column2Credits = workItem?.credits?.length
    ? workItem.credits.slice(column1Credits.length)
    : []

  return (
    <Layout
      title={
        workItem.seoTitle ||
        `${fullTitle} | JmillsENT | Motion Picture Studio + Film Agency`
      }
      description={
        workItem.seoDescription ||
        `${fullTitle} | JmillsENT | Motion Picture Studio + Film Agency`
      }
    >
      <div className="px-4 lg:px-8">
        <div className="my-12 p-4 xl:p-8 border border-white px-4 xl:mx-auto max-w-9xl">
          <VideoPlayer
            client={workItem.clientName}
            description={workItem.description}
            poster={workItem.poster}
            title={workItem.title}
            videoId={workItem.videoId}
            clientName={workItem.clientName}
            videoHeightAspectRatio={workItem.videoHeightAspectRatio || '9'}
            videoWidthAspectRatio={workItem.videoWidthAspectRatio || '16'}
          />
        </div>
      </div>

      <div className="container px-4 md:px-0 mx-auto mt-4">
        {workItem.credits && workItem.credits.length > 0 && (
          <div className="my-12 max-w-9xl mx-auto">
            <H3>Credits</H3>
            <div className="lg:text-xl h-auto transition-all overflow-hidden xl:mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-20 gap-y-4 mb-12">
                <div>
                  {column1Credits.map((credit, index) => {
                    return (
                      <div
                        className="grid grid-cols-2 gap-2 items-center pt-4"
                        key={index}
                      >
                        <div className="font-bold uppercase">{credit.role}</div>
                        <div className="uppercase space-x-4 font-outline tracking-wide text-2xl">
                          {credit.value}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div>
                  {column2Credits.map((credit, index) => {
                    return (
                      <div
                        className="grid grid-cols-2 gap-2 items-center pt-4"
                        key={index}
                      >
                        <div className="font-bold uppercase">{credit.role}</div>
                        <div className="uppercase space-x-4 font-outline tracking-wide text-2xl">
                          {credit.value}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="pt-24 px-8 container lg:mx-auto text-center uppercase">
        <p className="text-4xl font-extrabold tracking-widest">
          Production Company
        </p>
        <p className="mt-2 text-3xl font-outline">JMills Entertainment</p>
      </div>

      <MediumWhiteBar />
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `
    *[_type == "workItem"]{slug}
  `
  )

  return {
    paths: paths
      .filter((path) => {
        return path
      })
      .map((path) => {
        return { params: { slug: path.slug.current } }
      }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = params
  try {
    const workItem = await getClient().fetch(workItemQuery, { slug })
    const workItems = await getClient().fetch(
      groq`
      *[_type == "workItem"][!(_id in path('drafts.**'))]|order(order asc){
        _id,
        slug,
        clientName,
        description,
        title,
        poster,
        "shortClipMp4URL": shortClipMp4.asset->url,
        "shortClipMp4S3URL": shortClipMp4S3.asset->fileURL,
        "shortClipOgvURL": shortClipOgv.asset->url,
        "shortClipOgvS3URL": shortClipOgvS3.asset->fileURL,
      }
    `
    )

    if (!workItem) {
      return {
        notFound: true,
      }
    }

    return {
      props: { workItem, workItems },
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}

export default WorkItem
