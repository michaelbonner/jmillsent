import BackgroundText from '@/components/background-text-section'
import DividerBar from '@/components/divider-bar'
import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import MediumWhiteBar from '@/components/medium-white-bar'
import VideoPlayer from '@/components/video-player'
import urlForSanitySource from '@/lib/urlForSanitySource'
import { PortableText, toPlainText } from '@portabletext/react'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import { getClient } from '../lib/sanity'

import 'react-image-lightbox/style.css'

function Studio({ studioPage }) {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const isDesktop = useIsDesktop()

  const heroContent = (
    <div className="h-full w-full grid lg:gap-y-4 items-center text-white">
      <div className="grid text-center lg:mt-16 items-center justify-center pt-4">
        <H1 className="mb-0">{studioPage.title}</H1>
        <h2 className="uppercase font-outline text-3xl lg:text-7xl">
          {studioPage.subtitle}
        </h2>
      </div>
    </div>
  )

  const images = studioPage.studioItems.map((service) => {
    return {
      caption: toPlainText(service.description),
      src: `${urlForSanitySource(
        service.image
      )}?w=2400&h=1600&auto=format&fit=crop&crop=focalpoint`,
      title: service.title.toUpperCase(),
    }
  })

  return (
    <Layout
      title={studioPage.seoTitle}
      description={studioPage.seoDescription}
      heroImageUrl={studioPage.poster || null}
      heroContent={heroContent}
      heroVideoId={
        (isDesktop ? studioPage.videoId : studioPage.videoIdMobile) ||
        studioPage.videoId
      }
      heroVideoHeightInPixels={
        (isDesktop
          ? studioPage.headerVideoHeightInPixels
          : studioPage.headerVideoHeightInPixelsMobile) ||
        studioPage.headerVideoHeightInPixels
      }
      heroVideoWidthInPixels={
        (isDesktop
          ? studioPage.headerVideoWidthInPixels
          : studioPage.headerVideoWidthInPixelsMobile) ||
        studioPage.headerVideoWidthInPixels
      }
    >
      {isLightBoxOpen && (
        <Lightbox
          imageCaption={images[photoIndex].caption}
          imageTitle={images[photoIndex].title}
          mainSrc={images[photoIndex].src}
          nextSrc={images[(photoIndex + 1) % images.length].src}
          prevSrc={images[(photoIndex + images.length - 1) % images.length].src}
          onCloseRequest={() => setIsLightBoxOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}

      <div className="container px-4 sm:px-6 mx-auto text-white text-center mt-12 lg:mt-24">
        <H2>{studioPage.section1Title}</H2>
        {studioPage.section1Body && (
          <div className="mt-4 lg:mt-10 px-4 prose-lg max-w-5xl text-center mx-auto -mb-2">
            <PortableText value={studioPage.section1Body} />
          </div>
        )}
        <DividerBar />
        <div className="px-8 container mx-auto text-center uppercase -mt-1.5">
          <H2>{studioPage.section3Title}</H2>
          <p className="uppercase font-outline text-xl lg:text-5xl leading-4">
            {studioPage.section3Subtitle}
          </p>
        </div>

        {/* Ternary to remove hero video & video player if no videoId found. */}
        {studioPage.tourVideoId && (
          <>
            <div className="px-8 container mx-auto text-center" id="tour">
              <H2>{studioPage.section2Title}</H2>
              <p className="uppercase font-outline text-xl lg:text-5xl">
                {studioPage.section2Subtitle}
              </p>
            </div>
            <div
              id="tour"
              className="border border-gray-300 mt-4 lg:mt-10 p-4 lg:p-8 container max-w-7xl mx-auto"
            >
              <VideoPlayer
                poster={studioPage.tourVideoPoster}
                title={studioPage.tourVideoTitle}
                videoId={studioPage.tourVideoId}
                videoIdShort={studioPage.tourVideoIdShort}
                client={studioPage.tourVideoClient}
                description={studioPage.tourVideoDescription}
                videoHeightAspectRatio={studioPage.tourVideoHeightAspectRatio}
                videoWidthAspectRatio={studioPage.tourVideoWidthAspectRatio}
                autoPlay={true}
              />
            </div>
            <DividerBar />
          </>
        )}

        {/* studioItems */}
        <section id="studio-items">
          <div className="px-8 container mx-auto text-center uppercase -mt-1.5">
            <H2>{studioPage.studioItemSectionTitle}</H2>
            <p className="uppercase font-outline text-xl lg:text-5xl leading-4">
              {studioPage.studioItemSectionSubtitle}
            </p>
          </div>
          {studioPage.studioItems?.length > 0 && (
            <div className="grid gap-y-4 sm:gap-y-8 lg:gap-y-12 mt-10 max-w-7xl mx-auto">
              {studioPage.studioItems.map((service, index) => {
                const leftOrRight = service.rightAlign ? 'right' : 'left'
                return (
                  <button
                    onClick={() => {
                      setIsLightBoxOpen(true)
                      setPhotoIndex(index)
                    }}
                    type="button"
                    key={service._id}
                  >
                    <BackgroundText
                      leftOrRight={leftOrRight}
                      image={service.image}
                      imageAlt={service.title}
                      title={service.title}
                      description={service.description}
                    />
                  </button>
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
      tourVideoIdShort,
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
      studioItemSectionTitle,
      studioItemSectionSubtitle,
			videoClient,
			videoId,
      headerVideoWidthInPixels,
      headerVideoHeightInPixels,
      videoIdMobile,
      headerVideoWidthInPixelsMobile,
      headerVideoHeightInPixelsMobile,
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
