import 'yet-another-react-lightbox/styles.css'

import { ClientOnly } from '@/components/client-only'
import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import WorkItemTile from '@/components/work-item-tile'
import { sanityClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import classNames from 'classnames'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import DividerBar from '@/components/divider-bar'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

function Home({ homePage }) {
  const isDesktop = useIsDesktop()

  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const latestCampaignVideoSlides = homePage.latestCampaignVideos.map(
    (latestCampaignVideo) => ({
      ...latestCampaignVideo,
      slideType: 'video-slide',
      client: latestCampaignVideo.clientName,
      TitleElement: (
        <div>
          <span className="flex items-center gap-4 text-lg md:text-2xl">
            <span>{latestCampaignVideo.title}</span>
          </span>
          <div className="my-2 h-1 w-40 shrink-0 bg-gold" />
        </div>
      ),
    })
  )

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

        <div className="mt-10 lg:mt-16" id="featured">
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
          <div className="mx-auto -mb-5 mt-12 flex w-full max-w-md justify-center lg:mt-24 lg:max-w-xl">
            <Image
              alt="JME Film Production Company"
              height={100}
              src={`/images/jmills-raven-gold.svg`}
              width={100}
            />
          </div>
        )}
        {isDesktop && (
          <div className="mx-auto -mb-5 mt-12 w-full max-w-md lg:mt-24 lg:max-w-xl">
            <Image
              alt="JME Film Production Company"
              height={202}
              src={`/images/JME-film-prod-co-white.svg`}
              width={600}
            />
          </div>
        )}
      </div>

      <Lightbox
        close={() => setIsLightBoxOpen(false)}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
          closeOnPullUp: true,
        }}
        index={photoIndex}
        open={isLightBoxOpen}
        slides={latestCampaignVideoSlides}
        render={{
          slide: ({ slide }) => {
            const {
              TitleElement: _titleElement,
              DescriptionElement: _descriptionElement,
              ...slideProps
            } = slide

            return slide.slideType === 'video-slide' ? (
              <ClientOnly>
                <div className="w-full text-white">
                  <VideoPlayer noContainer {...slideProps} />
                </div>
              </ClientOnly>
            ) : undefined
          },
          description: ({ DescriptionElement }) => <DescriptionElement />,
          title: ({ TitleElement }) => <TitleElement />,
        }}
      />
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
        clientName,
        description,
        extraPaddingOnVideo,
        frames,
        videoId,
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
