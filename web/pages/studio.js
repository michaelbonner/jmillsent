import BackgroundText from '@/components/background-text-section'
import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import MediumWhiteBar from '@/components/medium-white-bar'
import VideoPlayer from '@/components/video-player'
import { PortableText } from '@portabletext/react'
import groq from 'groq'
import Image from 'next/image'
import { Link as SmoothScrollLink } from 'react-scroll'
import { getClient } from '../lib/sanity'

function Studio({ studioPage }) {
  const heroContent = (
    <div className="h-full w-full flex flex-col lg:gap-y-4 items-center justify-around text-white">
      <div className="flex flex-col lg:mt-12 items-center justify-center">
        <H1>{studioPage.title}</H1>
        <h2 className="uppercase font-outline text-2xl lg:text-6xl">
          {studioPage.subtitle}
        </h2>
      </div>
      {/* Ternary to remove hero video & video player if no videoId found. */}
      {studioPage.tourVideoId && (
        <SmoothScrollLink
          to="tour"
          className="flex justify-center cursor-pointer w-1/3 lg:w-full"
          smooth={true}
          offset={-100}
          duration={500}
        >
          <Image
            alt="Play Studio Tour"
            height="65"
            src="/images/JME-studio-tour-link.svg"
            width="300"
          />
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
      <div className="container px-4 sm:px-6 lg:mx-auto text-white text-center mt-12 lg:mt-24">
        <H2>{studioPage.section1Title}</H2>
        {studioPage.section1Body && (
          <div className="mt-4 lg:mt-10 px-4 prose-lg max-w-5xl text-center mx-auto -mb-2">
            <PortableText value={studioPage.section1Body} />
          </div>
        )}
        <MediumWhiteBar yMargin="my-12 lg:my-24" />
        <div className="px-8 container lg:mx-auto text-center uppercase -mt-1.5">
          <H2>{studioPage.section3Title}</H2>
          <p className="uppercase font-outline text-xl lg:text-5xl leading-4">
            {studioPage.section3Subtitle}
          </p>
        </div>

        {/* Ternary to remove hero video & video player if no videoId found. */}
        {studioPage.tourVideoId && (
          <>
            <div className="px-8 container lg:mx-auto text-center">
              <H2>{studioPage.section2Title}</H2>
              <p className="uppercase font-outline text-xl lg:text-5xl">
                {studioPage.section2Subtitle}
              </p>
            </div>
            <div
              id="tour"
              className="border border-white mt-4 lg:mt-10 py-8 px-8 container max-w-7xl lg:mx-auto"
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
            <MediumWhiteBar yMargin="my-12 lg:my-24" />
          </>
        )}

        {/* studioItems */}
        <section>
          {studioPage.studioItems?.length > 0 && (
            <div className="grid grid-cols-1 gap-y-4 sm:gap-y-8 lg:gap-y-12 mt-10 max-w-7xl mx-auto">
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
      <MediumWhiteBar yMargin="mb-8 mt-12 lg:mt-24" />
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
      section3Title,
      section3Subtitle,
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
