import { ClientOnly } from '@/components/client-only'
import DividerBar from '@/components/divider-bar'
import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import WorkItemTile from '@/components/work-item-tile'
import { sanityClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

function Home({ homePage }) {
  console.log('homePage', homePage)
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

      <div className="container mx-auto my-24 rounded-xl bg-white px-8 py-12">
        <div className="container mx-auto grid gap-8 px-4 text-center">
          <div>
            <H2 className="text-black">{homePage.latestCampaignTitle}</H2>
            <p className="font-outline text-lg uppercase text-black lg:text-6xl">
              {homePage.latestCampaignSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {homePage.latestCampaignVideos.map((video) => {
              return <WorkItemTile workItem={video} key={video._id} />
            })}
          </div>
        </div>
      </div>

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
      headerVideoHeightInPixelsMobile,
      latestCampaignTitle,
      latestCampaignSubtitle,
      latestCampaignVideos[]->{
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
      homePage,
    },
  }
}

export default Home
