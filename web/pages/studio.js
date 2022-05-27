import BackgroundText from '@/components/background-text-section'
import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import MediumWhiteBar from '@/components/medium-white-bar'
import VideoPlayer from '@/components/video-player'
import BlockContent from '@sanity/block-content-to-react'
import groq from 'groq'
import Image from 'next/image'
import { Link as SmoothScrollLink } from 'react-scroll'
import { getClient } from '../lib/sanity'

function Studio({ studioPage }) {
  const heroContent = (
    <div className="h-full w-full flex flex-col lg:gap-4 items-center justify-around text-white">
      <div className="flex flex-col lg:mt-12 items-center justify-center">
        <H1>{studioPage.title}</H1>
        <h2 className="uppercase font-outline text-2xl lg:text-5xl">
          {studioPage.subtitle}
        </h2>
      </div>
      {/* Ternary to remove hero video & video player if no videoId found. */}
      {studioPage.tourVideoId && (
        <SmoothScrollLink
          to="tour"
          className="flex space-x-2 items-center cursor-pointer"
          smooth={true}
          offset={-100}
          duration={500}
        >
          <span className="text-2xl lg:text-4xl uppercase font-bold">Play</span>
          <span className="text-2xl lg:text-4xl uppercase font-outline">
            Tour
          </span>
          <span className="text-xl lg:text-2xl font-bold">&gt;</span>
        </SmoothScrollLink>
      )}
    </div>
  )

  return (
    <Layout
      title={studioPage.seoTitle}
      description={studioPage.seoDescription}
      heroImageUrl={studioPage.poster || null}
      heroVideoId={studioPage.videoId}
      heroContent={heroContent}
      heroVideoHeightInPixels={studioPage.headerVideoHeightInPixels}
      heroVideoWidthInPixels={studioPage.headerVideoWidthInPixels}
    >
      <div className="container px-4 lg:mx-auto text-white text-center my-12 lg:my-24">
        <H2>{studioPage.section1Title}</H2>
        {studioPage.section1Body && (
          <div className="mt-16 mb-8 prose-lg max-w-5xl text-center mx-auto">
            <BlockContent blocks={studioPage.section1Body} />
          </div>
        )}
        <MediumWhiteBar />

        {/* Ternary to remove hero video & video player if no videoId found. */}
        {studioPage.tourVideoId && (
          <>
            <div className="pt-24 px-8 container lg:mx-auto text-center">
              <p className="text-4xl font-extrabold tracking-widest">
                {studioPage.section2Title}
              </p>
              <p className="mt-2 text-3xl font-outline">
                {studioPage.section2Subtitle}
              </p>
            </div>
            <div
              id="tour"
              className="border border-white py-8 px-8 container max-w-7xl lg:mx-auto"
            >
              <VideoPlayer
                poster={studioPage.tourVideoPoster}
                title={studioPage.tourVideoTitle}
                videoId={studioPage.tourVideoId}
                client={studioPage.tourVideoClient}
                description={studioPage.tourVideoDescription}
                videoHeightAspectRatio={studioPage.tourVideoHeightAspectRatio}
                videoWidthAspectRatio={studioPage.tourVideoWidthAspectRatio}
                autoPlay={true}
              />
            </div>
            <div className="my-12 lg:my-24">
              <MediumWhiteBar />
            </div>
          </>
        )}

        {/* studioItems */}
        <section>
          {studioPage.studioItems?.length > 0 && (
            <div className="grid grid-cols-1 gap-y-16 mt-12 max-w-7xl mx-auto">
              {studioPage.studioItems.map((service, index) => {
                const leftOrRight = service.rightAlign ? 'right' : 'left'
                return (
                  <BackgroundText
                    leftOrRight={leftOrRight}
                    image={service.image}
                    imageAlt={service.title}
                    title={service.title}
                    // description={service.description}
                    key={service._id}
                  />
                )
              })}
            </div>
          )}
        </section>
        {/* end: studioItems */}
      </div>
      <MediumWhiteBar />
    </Layout>
  )
}

export async function getStaticProps() {
  const studioPage = await getClient().fetch(
    groq`
		*[_type == "studioPage"][0]{
			footerSubtitle,
			footerTitle,
			poster,
			tourVideoClient,
			tourVideoHeightAspectRatio,
			tourVideoId,
			tourVideoPoster,
			tourVideoTitle,
			tourVideoDescription,
			tourVideoWidthAspectRatio,
			section1Body,
			section1Title,
			seoDescription,
			seoTitle,
			subtitle,
			videoClient,
			videoId,
      headerVideoWidthInPixels,
      headerVideoHeightInPixels,
      brands[]->,
        company3Body,
        company3Link,
        company3Title,
        company3VideoClient,
        directorDescription,
        directorImage,
        directorName,
        directorTitle,
        section2Subtitle,
        section2Title,
        studioItems[]->,
        title,
  		}
  		`
  )
  return {
    props: {
      studioPage,
    },
  }
}

export default Studio
