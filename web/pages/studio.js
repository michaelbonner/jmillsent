import BackgroundText from '@/components/background-text-section'
import { ClientOnly } from '@/components/client-only'
import DividerBar from '@/components/divider-bar'
import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import urlForSanitySource from '@/lib/urlForSanitySource'
import { PortableText, toPlainText } from '@portabletext/react'
import classNames from 'classnames'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import { sanityClient } from '../lib/sanity'

import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

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
      <Lightbox
        captions={{
          descriptionMaxLines: 100,
        }}
        close={() => setIsLightBoxOpen(false)}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
          closeOnPullUp: true,
        }}
        index={photoIndex}
        open={isLightBoxOpen}
        plugins={[Captions]}
        slides={images.map((image) => ({
          src: image.src,
          description: (
            <div className="text-center md:text-lg">{image.caption}</div>
          ),
          title: (
            <div>
              <span className="flex items-center gap-4 text-lg md:text-2xl">
                <span>{image.title}</span>
              </span>
              <div className="my-2 h-1 w-40 shrink-0 bg-gold" />
            </div>
          ),
        }))}
      />

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
              'prose-lg mx-auto -mb-2 mt-4 max-w-5xl px-4 text-center',
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
                'container mx-auto mt-4 max-w-7xl rounded-xl border border-gray-300 p-4',
                'lg:mt-10 lg:p-8'
              )}
            >
              <ClientOnly>
                <VideoPlayer
                  autoPlay
                  client={studioPage.tourVideoClient}
                  description={studioPage.tourVideoDescription}
                  poster={studioPage.tourVideoPoster}
                  title={studioPage.tourVideoTitle}
                  videoHeightAspectRatio={studioPage.tourVideoHeightAspectRatio}
                  videoId={studioPage.tourVideoId}
                  videoIdShort={studioPage.tourVideoIdShort}
                  videoWidthAspectRatio={studioPage.tourVideoWidthAspectRatio}
                />
              </ClientOnly>
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
