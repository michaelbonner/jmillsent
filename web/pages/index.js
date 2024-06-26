import { ClientOnly } from '@/components/client-only'
import DividerBar from '@/components/divider-bar'
import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import { sanityClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

function Home({ homePage }) {
  const isDesktop = useIsDesktop()

  const heroContent = (
    <div className="flex h-full w-screen flex-col items-center justify-center text-center text-white">
      <H1>{homePage.mainTitle}</H1>
      <h2 className="font-outline text-2xl uppercase lg:text-6xl">
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
      <div className="container mx-auto mt-12 px-4 text-center text-white lg:mt-24">
        <H2>{homePage.section1Title}</H2>
        <div className="prose-lg mx-auto -mb-2 mt-4 text-center lg:mt-10 lg:max-w-5xl">
          <PortableText value={homePage.section1Body} />
        </div>
      </div>

      <DividerBar yMargin="my-16 lg:my-24" />

      <div
        className="container mx-auto -mt-1.5 px-8 text-center uppercase"
        id="section2"
      >
        <H2>{homePage.section2Title}</H2>
        <p className="font-outline text-2xl uppercase lg:text-6xl">
          {homePage.section2Subtitle}
        </p>
      </div>
      <div className="mt-10 px-4 2xs:px-8 lg:px-4" id="featured">
        <div className="container mx-auto rounded-xl border border-gray-300 p-4 lg:px-8 lg:py-8">
          <ClientOnly>
            <VideoPlayer
              autoPlay
              client={homePage.reelVideoClient}
              description={homePage.reelVideoDescription}
              poster={homePage.reelVideoPoster}
              title={homePage.reelVideoTitle}
              videoHeightAspectRatio={homePage.reelVideoHeightAspectRatio}
              videoId={homePage.reelVideoId}
              videoIdShort={homePage.reelVideoIdShort}
              videoWidthAspectRatio={homePage.reelVideoWidthAspectRatio}
            />
          </ClientOnly>
        </div>
      </div>
      {isDesktop === false && (
        <div className="mx-auto -mb-5 mt-12 flex w-full max-w-md justify-center px-12 lg:mt-24 lg:max-w-xl">
          <Image
            alt="JME Film Production Company"
            height={100}
            src={`/images/jmills-raven-gold.svg`}
            width={100}
          />
        </div>
      )}
      {isDesktop && (
        <div className="mx-auto -mb-5 mt-12 w-full max-w-md px-12 lg:mt-24 lg:max-w-xl">
          <Image
            alt="JME Film Production Company"
            height={202}
            src={`/images/JME-film-prod-co-white.svg`}
            width={600}
          />
        </div>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const homePage = await sanityClient.fetch(
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
