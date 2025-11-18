import { ClientOnly } from '@/components/client-only'
import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import { sanityClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { clsx } from 'clsx'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

function Home({ homePage }) {
  const isDesktop = useIsDesktop()

  const [
    latestCampaignVideoPlayingIndexes,
    setLatestCampaignVideoPlayingIndexes,
  ] = useState([])

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
      <div className="mx-auto max-w-7xl px-8">
        <div className="container mx-auto mt-12 text-center text-white lg:mt-24">
          <H2>{homePage.section1Title}</H2>
          <div className="prose prose-lg prose-invert mx-auto mt-4 -mb-2 text-center lg:mt-10 lg:max-w-5xl">
            <PortableText value={homePage.section1Body} />
          </div>
        </div>

        <div className="container mx-auto my-24 rounded-2xl bg-white py-12">
          <div className="container mx-auto grid gap-8 px-8 text-center lg:px-12">
            <div>
              <H2 className="text-black">{homePage.latestCampaignTitle}</H2>
              <p className="font-outline text-xl tracking-tighter text-black uppercase lg:text-5xl">
                {homePage.latestCampaignSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {homePage.latestCampaignVideos.map((video, index) => {
                const shouldBeBig =
                  (homePage.latestCampaignVideos.length === 1 ||
                    homePage.latestCampaignVideos.length === 3) &&
                  index === 0

                const isCurrentlyPlaying =
                  latestCampaignVideoPlayingIndexes.includes(index)

                const shouldReduceOpacity =
                  latestCampaignVideoPlayingIndexes.length > 0 &&
                  !isCurrentlyPlaying

                return (
                  <div
                    className={clsx(
                      shouldBeBig && 'lg:col-span-2',
                      'overflow-hidden rounded-xl transition-opacity duration-500',
                      'xl:rounded-2xl',
                      shouldReduceOpacity && 'opacity-50'
                    )}
                    key={index}
                  >
                    <ClientOnly>
                      <VideoPlayer
                        autoPlay
                        client={video.clientName}
                        description={video.description}
                        disableGradientOverlay
                        onPlayProp={() =>
                          setLatestCampaignVideoPlayingIndexes((p) => [
                            ...p,
                            index,
                          ])
                        }
                        onPauseProp={() =>
                          setLatestCampaignVideoPlayingIndexes((previous) =>
                            previous.filter((p) => p !== index)
                          )
                        }
                        overrideClassNames={{
                          text: {
                            client: shouldBeBig ? '' : 'text-xl lg:text-3xl',
                            title: shouldBeBig ? '' : 'text-2xl lg:text-4xl',
                          },
                        }}
                        poster={video.poster}
                        title={video.title}
                        videoHeightAspectRatio={video.videoHeightAspectRatio}
                        videoId={video.videoId}
                        videoIdShort={video.videoIdShort}
                        videoWidthAspectRatio={video.videoWidthAspectRatio}
                      />
                    </ClientOnly>
                  </div>
                )
              })}
            </div>

            <div className="mt-3 grid gap-4 lg:flex lg:justify-center lg:gap-16">
              <Link
                href="/about"
                className={clsx(
                  'rounded-lg border-2 border-black px-8 py-0.5 font-bold tracking-widest text-black uppercase transition-all',
                  'hover:bg-gold hover:border-black hover:text-black'
                )}
              >
                Learn More
              </Link>
              <Link
                href="/work"
                className={clsx(
                  'rounded-lg border-2 border-black bg-black px-8 py-0.5 font-bold tracking-widest uppercase transition-all',
                  'hover:bg-gold hover:border-black hover:text-black'
                )}
              >
                Explore Work
              </Link>
            </div>
          </div>
        </div>

        <div
          className="container mx-auto -mt-1.5 text-center uppercase"
          id="section2"
        >
          <H2>{homePage.section2Title}</H2>
          <p className="font-outline text-2xl uppercase lg:text-6xl">
            {homePage.section2Subtitle}
          </p>
        </div>
        <div className="mt-10" id="featured">
          <div className="container mx-auto rounded-2xl">
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
          <div className="mx-auto mt-12 -mb-5 flex w-full max-w-md justify-center lg:mt-24 lg:max-w-xl">
            <Image
              alt="JME Film Production Company"
              height={100}
              src={`/images/jmills-raven-gold.svg`}
              width={100}
            />
          </div>
        )}
        {isDesktop && (
          <div className="mx-auto mt-12 -mb-5 w-full max-w-md lg:mt-24 lg:max-w-xl">
            <Image
              alt="JME Film Production Company"
              height={202}
              src={`/images/JME-film-prod-co-white.svg`}
              width={600}
            />
          </div>
        )}
      </div>
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
        description,
        extraPaddingOnVideo,
        frames,
        videoId,
        videoIdShort,
        videoHeightAspectRatio,
        videoWidthAspectRatio,
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
