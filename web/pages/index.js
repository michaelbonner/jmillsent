import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import MediumWhiteBar from '@/components/medium-white-bar'
import VideoPlayer from '@/components/video-player'
import { getClient } from '@/lib/sanity'
import BlockContent from '@sanity/block-content-to-react'
import groq from 'groq'
import Image from 'next/image'
import footerGraphic from '../public/images/JME-film-prod-co-white.svg'

function Home({ homePage }) {
  const heroContent = (
    <div className="h-full w-full flex flex-col items-center justify-center text-white text-center">
      <H1>{homePage.mainTitle}</H1>
      <h2 className="uppercase font-outline text-2xl lg:text-6xl">
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
      <div className="container px-4 mx-auto text-white text-center mt-12 lg:mt-24">
        <H2>{homePage.section1Title}</H2>
        <div className="mt-4 sm:mt-10 prose text-white lg:prose-lg lg:max-w-5xl text-center mx-auto">
          <BlockContent blocks={homePage.section1Body} />
        </div>
      </div>
      <MediumWhiteBar yMargin="my-12 lg:my-24" />
      <div className="px-8 container lg:mx-auto text-center uppercase">
        <H2>{homePage.section2Title}</H2>
        <p className="uppercase font-outline text-2xl lg:text-6xl">
          {homePage.section2Subtitle}
        </p>
      </div>
      <div className="px-4 mt-10">
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
      <div className="mx-auto w-1/2 max-w-lg mt-10">
        <Image src={footerGraphic} alt="JME Film Production Company" />
      </div>
      <MediumWhiteBar yMargin="mb-8 mt-12 lg:mt-24" />
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
      section2Title,
      section2Subtitle,
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
