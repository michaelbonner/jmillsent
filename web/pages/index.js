import groq from 'groq'
import BlockContent from '@sanity/block-content-to-react'
import { H1, H2 } from '../components/headings'
import Layout from '../components/layout'
import { getClient } from '../lib/sanity'
import Image from 'next/image'
import LittleWhiteBar from '../components/little-white-bar'
import VideoPlayer from '../components/video-player'
import MediumWhiteBar from '../components/medium-white-bar'

function Home({ homePage }) {
    const heroContent = (
        <div className="h-full w-full flex flex-col items-center justify-center text-white">
            <H1>{homePage.mainTitle}</H1>
            <h2 className="uppercase font-outline text-2xl lg:text-5xl">
                {homePage.subtitle}
            </h2>
        </div>
    )

    return (
        <Layout
            title={homePage.seoTitle}
            description={homePage.seoDescription}
            heroImageUrl={homePage.poster || null}
            heroVideoId={homePage.videoId}
            heroContent={heroContent}
        >
            <div className="container mx-4 lg:mx-auto text-white text-center my-12 lg:my-36">
                <H2>{homePage.section1Title}</H2>
                <div className="mt-16 mb-8 prose-lg max-w-3xl text-center mx-auto">
                    <BlockContent blocks={homePage.section1Body} />
                </div>
                <Image
                    src={`/images/jmills-raven-white.svg`}
                    alt="Jmills"
                    width="130"
                    height="130"
                />
                <LittleWhiteBar />
            </div>
            <div className="border border-white py-8 px-8 container mx-4 lg:mx-auto">
                <VideoPlayer
                    poster={homePage.reelVideoPoster}
                    title={homePage.reelVideoTitle}
                    videoId={homePage.reelVideoId}
                    clientName={homePage.reelVideoClient}
                    videoHeightAspectRatio={homePage.reelVideoHeightAspectRatio}
                    videoWidthAspectRatio={homePage.reelVideoWidthAspectRatio}
                />
                <p className="text-4xl mt-8 flex items-center justify-center space-x-6">
                    <span className="uppercase font-extrabold text-2xl lg:text-5xl">
                        {homePage.reelVideoClient}
                    </span>
                    <span className="uppercase font-outline text-2xl lg:text-5xl">
                        {homePage.reelVideoTitle}
                    </span>
                </p>
            </div>
            <div className="pt-24 px-8 container mx-4 lg:mx-auto text-center">
                <p className="text-4xl font-extrabold tracking-widest">
                    {homePage.footerTitle}
                </p>
                <p className="mt-2 text-3xl font-outline">
                    {homePage.footerSubtitle}
                </p>
            </div>
            <MediumWhiteBar />
        </Layout>
    )
}

export async function getStaticProps() {
    const homePage = await getClient().fetch(
        groq`
		*[_type == "homePage"][0]{
			footerSubtitle,
			footerTitle,
			mainTitle,
			poster,
			reelVideoClient,
			reelVideoHeightAspectRatio,
			reelVideoId,
			reelVideoPoster,
			reelVideoTitle,
			reelVideoWidthAspectRatio,
			section1Body,
			section1Title,
			seoDescription,
			seoTitle,
			subtitle,
			videoClient,
			videoId,
  		}
  		`
    )
    return {
        props: {
            homePage,
        },
    }
}

export default Home
