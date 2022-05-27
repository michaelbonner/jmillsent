import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import MediumWhiteBar from '@/components/medium-white-bar'
import VideoPlayer from '@/components/video-player'
import { getClient } from '@/lib/sanity'
import BlockContent from '@sanity/block-content-to-react'
import groq from 'groq'
import Image from 'next/image'

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
      heroVideoHeightInPixels={homePage.reelVideoHeightInPixels}
      heroVideoWidthInPixels={homePage.reelVideoWidthInPixels}
    >
      <div className="container px-4 lg:mx-auto text-white text-center my-12 lg:mt-36">
        <H2>{homePage.section1Title}</H2>
        <div className="mt-16 mb-8 prose-lg lg:max-w-5xl text-center mx-auto">
          <BlockContent blocks={homePage.section1Body} />
        </div>
      </div>
      <MediumWhiteBar />
      <div className="px-4">
        <div className="border border-white py-8 px-8 container lg:mx-auto">
          <VideoPlayer
            poster={homePage.reelVideoPoster}
            title={homePage.reelVideoTitle}
            videoId={homePage.reelVideoId}
            client={homePage.reelVideoClient}
            description={homePage.reelVideoDescription}
            videoHeightAspectRatio={homePage.reelVideoHeightAspectRatio}
            videoWidthAspectRatio={homePage.reelVideoWidthAspectRatio}
            autoPlay={true}
          />
        </div>
      </div>
      <div className="px-8 container lg:mx-auto text-center mt-16">
        <p className="text-4xl font-extrabold tracking-widest">
          {homePage.footerTitle}
        </p>
        <p className="mt-2 text-3xl font-outline">{homePage.footerSubtitle}</p>
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
			reelVideoDescription,
			reelVideoHeightAspectRatio,
      reelVideoHeightInPixels,
      reelVideoWidthInPixels,
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
