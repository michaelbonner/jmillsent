/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import groq from 'groq'
import Link from 'next/link'
import { HiChevronDown } from 'react-icons/hi'
import Layout from '../../components/layout'
import { getClient } from '../../lib/sanity'
import VideoPlayer from '../../components/video-player'
// import WorkItemTile from "../../components/work-item-tile"

const workItemQuery = groq`
*[_type == "workItem" && slug.current == $slug][0]{
  _id,
  behindTheScenes,
  clientName,
  credits,
  extraPaddingOnVideo,
  frames,
  poster,
  slug,
  title,
  video_id,
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

const WorkItem = ({ workItem = {}, workItems = [] }) => {
    const [creditsOpen, setCreditsOpen] = useState(false)

    const fullTitle = workItem.clientName
        ? `${workItem.clientName} | ${workItem.title}`
        : workItem.title

    return (
        <Layout
            title={
                workItem.seo_title ||
                `${fullTitle} | JmillsENT | Motion Picture Studio + Film Agency`
            }
            description={
                workItem.seo_description ||
                `${fullTitle} | JmillsENT | Motion Picture Studio + Film Agency`
            }
        >
            <VideoPlayer
                poster={workItem.poster}
                title={workItem.title}
                videoId={workItem.video_id}
                clientName={workItem.clientName}
                videoHeightAspectRatio={workItem.videoHeightAspectRatio || '9'}
                videoWidthAspectRatio={workItem.videoWidthAspectRatio || '16'}
            />
            <div className="mx-auto my-12 border border-white w-48"></div>

            <div className="container px-4 md:px-0 mx-auto mt-4">
                <div>
                    {workItem.credits && workItem.credits.length > 0 && (
                        <>
                            <button
                                className="w-full flex items-center justify-center space-x-8 font-bold text-lg lg:text-4xl text-left my-12 uppercase pb-2"
                                onClick={() => setCreditsOpen(!creditsOpen)}
                                type="button"
                            >
                                <span>Credits</span>
                                <span
                                    className={`${
                                        creditsOpen ? 'rotate-180' : null
                                    } transform transition-all text-4xl`}
                                >
                                    <HiChevronDown />
                                </span>
                            </button>
                            <div
                                className={`lg:text-2xl ${
                                    creditsOpen ? 'h-auto' : 'h-0'
                                } transition-all overflow-hidden`}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-4 mb-12">
                                    {workItem.credits.map((credit, index) => {
                                        return (
                                            <div
                                                className="grid grid-cols-3"
                                                key={index}
                                            >
                                                <div className="font-bold uppercase">
                                                    {credit.role}
                                                </div>
                                                <div className="col-span-2 uppercase space-x-4 space-x-4 font-outline tracking-wide">
                                                    {credit.value}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="text-center">
                                    <div className="text-lg lg:text-3xl font-bold uppercase">
                                        Production Company
                                    </div>
                                    <div className="uppercase space-x-4 space-x-4 font-outline tracking-wide">
                                        JMills Entertainment
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="mx-auto my-12 border border-white w-48"></div>

            <div className="text-center">
                <Link href="/work">
                    <a>
                        <span className="text-lg lg:text-2xl font-bold uppercase">
                            Back To
                        </span>{' '}
                        <span className="text-lg lg:text-3xl uppercase space-x-4 space-x-4 font-outline tracking-wide">
                            Work
                        </span>{' '}
                        <span className="text-lg lg:text-2xl font-bold">
                            &gt;
                        </span>
                    </a>
                </Link>
            </div>
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
        fallback: true,
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
        title,
        poster,
        "shortClipMp4URL": shortClipMp4.asset->url,
        "shortClipOgvURL": shortClipOgv.asset->url,
      }
    `
        )
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
