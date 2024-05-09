import BackgroundText from '@/components/background-text-section'
import DividerBar from '@/components/divider-bar'
import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import MediumWhiteBar from '@/components/medium-white-bar'
import urlForSanitySource from '@/lib/urlForSanitySource'
import { PortableText, toPlainText } from '@portabletext/react'
import classNames from 'classnames'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import Lightbox from 'react-18-image-lightbox'
import 'react-18-image-lightbox/style.css'
import { sanityClient } from '../lib/sanity'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

function Studio({ studioPage }) {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const isDesktop = useIsDesktop()

  const heroContent = (
    <div
      className={classNames(
        'grid h-full w-full items-center text-white',
        'lg:gap-y-4'
      )}
    >
      <div
        className={classNames(
          'grid items-center justify-center pt-4 text-center',
          'lg:mt-16'
        )}
      >
        <H1 className="mb-0">{studioPage.title}</H1>
        <h2
          className={classNames(
            'font-outline text-3xl uppercase',
            'lg:text-7xl'
          )}
        >
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

      <div
        className={classNames(
          'container mx-auto mt-12 px-4 text-center text-white',
          'sm:px-6',
          'lg:mt-24'
        )}
      >
        <H2>{studioPage.section1Title}</H2>
        {studioPage.section1Body && (
          <div
            className={classNames(
              'prose-lg mx-auto mt-4 -mb-2 max-w-5xl px-4 text-center',
              'lg:mt-10'
            )}
          >
            <PortableText value={studioPage.section1Body} />
          </div>
        )}
        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            className={classNames(
              'group flex items-center justify-center gap-4 border-2 border-gray-300 px-3 py-2 uppercase transition-colors',
              'hover:bg-gold'
            )}
          >
            <span
              className={classNames(
                'font-outline text-2xl tracking-tighter text-gray-300',
                'lg:text-3xl',
                'group-hover:text-black'
              )}
            >
              Book
            </span>
            <span
              className={classNames(
                'text-2xl font-bold tracking-wide',
                'lg:text-3xl',
                'group-hover:text-black'
              )}
            >
              Studio
            </span>
            <span
              className={classNames(
                'font-outline text-2xl tracking-tighter text-gray-300',
                'lg:text-3xl',
                'group-hover:text-black'
              )}
            >
              Space
            </span>
          </Link>
        </div>
        <DividerBar />
        <div className="container mx-auto -mt-1.5 px-8 text-center uppercase">
          <H2>{studioPage.section3Title}</H2>
          <p
            className={classNames(
              'font-outline text-xl uppercase leading-4',
              'lg:text-5xl'
            )}
          >
            {studioPage.section3Subtitle}
          </p>
        </div>

        {/* Ternary to remove hero video & video player if no videoId found. */}
        {studioPage.tourVideoId && (
          <>
            <div className="container mx-auto px-8 text-center" id="tour">
              <H2>{studioPage.section2Title}</H2>
              <p
                className={classNames(
                  'font-outline text-xl uppercase',
                  'lg:text-5xl'
                )}
              >
                {studioPage.section2Subtitle}
              </p>
            </div>
            <div
              id="tour"
              className={classNames(
                'container mx-auto mt-4 max-w-7xl border border-gray-300 rounded-xl p-4',
                'lg:mt-10 lg:p-8'
              )}
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
          <div className="container mx-auto -mt-1.5 px-8 text-center uppercase">
            <H2>{studioPage.studioItemSectionTitle}</H2>
            <p
              className={classNames(
                'font-outline text-xl uppercase leading-4',
                'lg:text-5xl'
              )}
            >
              {studioPage.studioItemSectionSubtitle}
            </p>
          </div>
          {studioPage.studioItems?.length > 0 && (
            <div
              className={classNames(
                'mx-auto mt-10 grid max-w-7xl gap-y-4',
                'sm:gap-y-8',
                'lg:gap-y-12'
              )}
            >
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
  const studioPage = await sanityClient.fetch(
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
