import { ClientOnly } from '@/components/client-only'
import ArrowLink from '@/components/arrow-link'
import { Eyebrow, H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import SectionIntro from '@/components/section-intro'
import { sanityClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { clsx } from 'clsx'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

function Home({ homePage }) {
  const isDesktop = useIsDesktop()

  const [
    latestCampaignVideoPlayingIndexes,
    setLatestCampaignVideoPlayingIndexes,
  ] = useState([])

  const heroContent = (
    <div className="flex max-w-5xl flex-col items-start gap-5 text-left">
      <Eyebrow className="border-b border-white/60 pb-3 text-white">
        {homePage.subtitle}
      </Eyebrow>
      <H1 className="max-w-[20ch]">{homePage.mainTitle}</H1>
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
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro
            className="mb-0! lg:mb-0!"
            eyebrow="Who we are"
            title={homePage.section1Title}
          >
            <PortableText value={homePage.section1Body} />
          </SectionIntro>
        </div>
      </section>

      <section className="bg-neutral-900 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8 border-t border-white/30 pt-5 lg:mb-12">
            <Eyebrow className="mb-5">Latest campaign</Eyebrow>
            <H2 className="max-w-[24ch]">{homePage.latestCampaignTitle}</H2>
            <p className="font-outline text-2xl uppercase lg:text-4xl">
              {homePage.latestCampaignSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
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
                    'overflow-hidden transition-opacity duration-500',
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

          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 uppercase">
            <ArrowLink href="/about">Learn more</ArrowLink>
            <ArrowLink href="/work">Explore work</ArrowLink>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28" id="section2">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8 lg:mb-12">
            <Eyebrow className="mb-5">{homePage.section2Subtitle}</Eyebrow>
            <H2 className="max-w-[24ch]">{homePage.section2Title}</H2>
          </div>
          <div id="featured">
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
      </section>

      <section className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col gap-8 border-t border-white/15 py-20 lg:flex-row lg:items-end lg:justify-between lg:py-28">
          <div>
            <Eyebrow className="mb-5">Start here</Eyebrow>
            <H2 className="max-w-[20ch]">Bring your next project to JME.</H2>
          </div>
          <ArrowLink
            href="/contact"
            className="self-start uppercase lg:shrink-0"
          >
            Start a project
          </ArrowLink>
        </div>
      </section>
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
