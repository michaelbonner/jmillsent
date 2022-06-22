import DividerBar from '@/components/divider-bar'
import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import MediumWhiteBar from '@/components/medium-white-bar'
import VideoPlayer from '@/components/video-player'
import { getClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import Image from 'next/image'

function Home({ homePage }) {
  const isDesktop = useIsDesktop()

  const heroContent = (
    <div className="h-full w-screen flex flex-col items-center justify-center text-white text-center">
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
      heroContent={heroContent}
      heroVideoId={
        (isDesktop ? homePage.videoId : homePage.videoIdMobile) ||
        homePage.videoId
      }
      heroVideoHeightInPixels={
        (isDesktop
          ? homePage.reelVideoHeightInPixels
          : homePage.headerVideoHeightInPixelsMobile) ||
        homePage.reelVideoHeightInPixels
      }
      heroVideoWidthInPixels={
        (isDesktop
          ? homePage.reelVideoWidthInPixels
          : homePage.headerVideoWidthInPixelsMobile) ||
        homePage.reelVideoWidthInPixels
      }
    >
      <div className="container px-4 mx-auto text-white text-center mt-12 lg:mt-24">
        <H2>{homePage.section1Title}</H2>
        <div className="mt-4 -mb-2 lg:mt-10 prose-lg lg:max-w-5xl text-center mx-auto">
          <PortableText value={homePage.section1Body} />
        </div>
      </div>

      <DividerBar yMargin="my-16 lg:my-24" />

      <div
        className="px-8 container mx-auto text-center uppercase -mt-1.5"
        id="section2"
      >
        <H2>{homePage.section2Title}</H2>
        <p className="uppercase font-outline text-2xl lg:text-6xl">
          {homePage.section2Subtitle}
        </p>
      </div>
      <div className="px-8 lg:px-4 mt-10" id="featured">
        <div className="border border-white p-4 lg:py-8 lg:px-8 container mx-auto">
          <VideoPlayer
            poster={homePage.reelVideoPoster}
            title={homePage.reelVideoTitle}
            videoId={homePage.reelVideoId}
            videoIdShort={homePage.reelVideoIdShort}
            client={homePage.reelVideoClient}
            description={homePage.reelVideoDescription}
            videoHeightAspectRatio={homePage.reelVideoHeightAspectRatio}
            videoWidthAspectRatio={homePage.reelVideoWidthAspectRatio}
            autoPlay={true}
          />
        </div>
      </div>
      {!isDesktop && (
        <div className="flex justify-center mx-auto -mb-5 px-12 w-full max-w-md lg:max-w-xl mt-12 lg:mt-24">
          <Image
            alt="JME Film Production Company"
            height={100}
            src={`/images/jmills-raven-gold.svg`}
            width={100}
          />
        </div>
      )}
      {isDesktop && (
        <div className="mx-auto -mb-5 px-12 w-full max-w-md lg:max-w-xl mt-12 lg:mt-24">
          <Image
            alt="JME Film Production Company"
            height={202}
            src={`/images/JME-film-prod-co-white.svg`}
            width={600}
          />
        </div>
      )}
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
      reelVideoIdShort,
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
      videoIdMobile,
      headerVideoWidthInPixelsMobile,
      headerVideoHeightInPixelsMobile
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
