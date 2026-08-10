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
    <div className="relative flex h-full min-h-[70svh] w-screen flex-col justify-end overflow-hidden px-5 pb-10 text-white sm:px-8 sm:pb-14 lg:min-h-0 lg:px-12 lg:pb-16">
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/15 to-black/25" />
      <div className="relative mx-auto flex w-full max-w-[100rem] items-end justify-between gap-8">
        <div className="min-w-0">
          <p className="mb-4 font-mono text-sm tracking-wide text-white/70 uppercase sm:text-xs">
            Independent motion picture studio
          </p>
          <H1 className="max-w-[12ch] font-extrabold">{homePage.mainTitle}</H1>
          <h2 className="font-outline mt-2 max-w-[24ch] text-2xl text-balance text-white uppercase sm:text-3xl lg:text-5xl">
            {homePage.subtitle}
          </h2>
        </div>
        <a
          href="#latest"
          className="group hidden shrink-0 items-center gap-3 border-b border-white/40 pb-2 text-sm tracking-wide uppercase lg:flex"
        >
          View latest work
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            ↘
          </span>
        </a>
      </div>
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
      <div className="mx-auto max-w-[100rem] px-5 sm:px-8 lg:px-12">
        <section className="grid gap-8 border-b border-white/15 py-20 text-white sm:py-24 lg:grid-cols-12 lg:gap-8 lg:py-36">
          <div className="lg:col-span-7">
            <p className="mb-5 font-mono text-sm tracking-wide text-white/50 uppercase sm:text-xs">
              Story first / Always
            </p>
            <H2 className="max-w-[16ch]">{homePage.section1Title}</H2>
          </div>
          <div className="lg:col-span-5 lg:pt-10">
            <div className="prose prose-lg prose-invert prose-p:text-base prose-p:font-normal prose-p:leading-7 sm:prose-p:text-lg max-w-[54ch] text-pretty text-white/65">
              <PortableText value={homePage.section1Body} />
            </div>
          </div>
        </section>

        <section
          className="my-6 overflow-hidden rounded-[min(1.5vw,1.5rem)] bg-[#f2f1ed] text-black sm:my-8"
          id="latest"
        >
          <div className="grid gap-10 p-5 sm:p-8 lg:p-12">
            <div className="flex flex-col gap-5 border-b border-black/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 font-mono text-sm tracking-wide text-black/50 uppercase sm:text-xs">
                  Latest campaign
                </p>
                <H2 className="max-w-[18ch] text-black">
                  {homePage.latestCampaignTitle}
                </H2>
              </div>
              <p className="font-outline max-w-[24ch] text-2xl text-balance text-black uppercase sm:text-3xl lg:text-right lg:text-4xl">
                {homePage.latestCampaignSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
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
                      'overflow-hidden rounded-[min(1vw,1rem)] bg-black outline-1 -outline-offset-1 outline-black/10 transition-opacity duration-500',
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

            <div className="flex flex-col gap-3 border-t border-black/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-base font-medium text-black sm:text-sm"
              >
                About the studio
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/work"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-black px-5 py-3 text-base font-medium text-white uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:min-h-0 sm:text-sm"
              >
                Explore all work
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24 lg:py-36" id="section2">
          <div className="mb-8 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 font-mono text-sm tracking-wide text-white/50 uppercase sm:text-xs">
                Featured reel
              </p>
              <H2 className="max-w-[16ch]">{homePage.section2Title}</H2>
            </div>
            <p className="font-outline max-w-[25ch] text-2xl text-balance text-white uppercase sm:text-3xl lg:text-right lg:text-4xl">
              {homePage.section2Subtitle}
            </p>
          </div>
          <div
            className="overflow-hidden rounded-[min(1.5vw,1.5rem)] outline-1 -outline-offset-1 outline-white/10"
            id="featured"
          >
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
        </section>
        {isDesktop === false && (
          <div className="mx-auto flex w-full max-w-md justify-center pb-6">
            <Image
              alt="JME Film Production Company"
              height={100}
              src={`/images/jmills-raven-gold.svg`}
              width={100}
            />
          </div>
        )}
        {isDesktop && (
          <div className="mx-auto w-full max-w-md pb-6 lg:max-w-xl">
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
