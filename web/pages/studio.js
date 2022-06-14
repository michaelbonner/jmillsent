import BackgroundText from '@/components/background-text-section'
import DividerBar from '@/components/divider-bar'
import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import MediumWhiteBar from '@/components/medium-white-bar'
import VideoPlayer from '@/components/video-player'
import { PortableText, toPlainText } from '@portabletext/react'
import groq from 'groq'
import { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import { Link as SmoothScrollLink } from 'react-scroll'
import { getClient } from '../lib/sanity'

import 'react-image-lightbox/style.css'
import urlForSanitySource from '@/lib/urlForSanitySource'

function Studio({ studioPage }) {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const heroContent = (
    <div className="h-full w-full grid lg:gap-y-4 items-center text-white">
      <div className="grid text-center lg:mt-16 items-center justify-center pt-4">
        <H1 className="!text-2xl !mb-0">{studioPage.title}</H1>
        <h2 className="uppercase font-outline text-2xl lg:text-7xl">
          {studioPage.subtitle}
        </h2>
      </div>
      {/* Ternary to remove hero video & video player if no videoId found. */}
      {studioPage.tourVideoId && (
        <SmoothScrollLink
          to="tour"
          className="flex justify-center cursor-pointer lg:w-full mx-auto"
          smooth={true}
          offset={-100}
          duration={500}
        >
          <div className="inline-block">
            <div
              className="flex gap-4 items-center justify-center px-2 sm:px-3 py-1 sm:py-2 sm:mt-10 uppercase hover:bg-gold transition-colors border-2 border-white text-xl lg:text-3xl group"
              target="_blank"
            >
              <span className="font-outline tracking-tighter text-gray-300 group-hover:text-black">
                Play
              </span>

              <span className="font-bold tracking-wide group-hover:text-black">
                Studio
              </span>

              <span className="font-outline tracking-tighter text-gray-300 group-hover:text-black">
                Tour
              </span>
            </div>
          </div>
        </SmoothScrollLink>
      )}
    </div>
  )

  const images = studioPage.studioItems.map((service) => {
    return {
      caption: toPlainText(service.description),
      src: `${urlForSanitySource(
        service.image
      )}?w=2400&h=1600&auto=format&fit=crop&crop=focalpoint`,
      title: service.title,
    }
  })

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
            <div className="px-8 container mx-auto text-center">
              <H2>{studioPage.section2Title}</H2>
              <p className="uppercase font-outline text-xl lg:text-5xl">
                {studioPage.section2Subtitle}
              </p>
            </div>
            <div
              id="tour"
              className="border border-white mt-4 lg:mt-10 p-4 lg:p-8 container max-w-7xl mx-auto"
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
            <DividerBar />
          </>
        )}

        {/* studioItems */}
        <section>
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
