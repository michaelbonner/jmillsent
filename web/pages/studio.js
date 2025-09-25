import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import BackgroundText from '@/components/background-text-section'
import { ClientOnly } from '@/components/client-only'
import DividerBar from '@/components/divider-bar'
import { H1, H2 } from '@/components/headings'
import Layout from '@/components/layout'
import LittleBlackBar from '@/components/little-black-bar'
import { urlForSanitySource } from '@/lib/urlForSanitySource'
import { PortableText, toPlainText } from '@portabletext/react'
import { clsx } from 'clsx'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'
import { styles } from 'styles/styles'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import { sanityClient } from '../lib/sanity'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

function Studio({ studioPage }) {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const isDesktop = useIsDesktop()

  const heroContent = (
    <div
      className={clsx(
        'grid h-full w-full items-center text-white',
        'lg:gap-y-4'
      )}
    >
      <div
        className={clsx(
          'grid items-center justify-center pt-4 text-center',
          'lg:mt-16'
        )}
      >
        <H1 className="mb-0">{studioPage.title}</H1>
        <h2 className={clsx('font-outline text-3xl uppercase', 'lg:text-7xl')}>
          {studioPage.subtitle}
        </h2>
      </div>
    </div>
  )

  const images = studioPage.studioItems.map((service) => {
    return {
      caption: toPlainText(service.description),
      src: urlForSanitySource(service.image)
        .width(2400)
        .height(1600)
        .format('webp')
        .fit('crop')
        .crop('focalpoint')
        .url(),
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
              <div className="bg-gold my-2 h-1 w-40 shrink-0" />
            </div>
          ),
        }))}
      />

      <div className="mx-auto max-w-7xl px-8">
        <div className="mx-auto my-24 max-w-7xl rounded-2xl bg-white px-8 py-12 text-center text-black">
          <H2>{studioPage.section1Title}</H2>
          <LittleBlackBar maxWidth="max-w-96" yMargin="my-10" />

          {studioPage.tourVideoId && (
            <div
              id="tour"
              className={clsx(
                'container mx-auto mt-12 rounded-2xl text-white',
                'lg:px-10'
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
          )}

          {studioPage.section1Body && (
            <div
              className={clsx(
                'prose-lg mx-auto mt-4 -mb-2 max-w-5xl px-4',
                'lg:mt-10'
              )}
            >
              <PortableText value={studioPage.section1Body} />
            </div>
          )}

          <div className="mt-10 flex justify-center">
            <Link
              href="https://theravenspace.com"
              className={styles.buttonLink.blackBorder}
            >
              <span
                className={clsx(
                  'font-outline text-2xl tracking-tighter',
                  'lg:text-3xl',
                  'group-hover:text-gray-800'
                )}
              >
                Book
              </span>
              <span
                className={clsx(
                  'text-2xl font-bold tracking-wide',
                  'lg:text-3xl',
                  'group-hover:text-gray-800'
                )}
              >
                Studio
              </span>
              <span
                className={clsx(
                  'font-outline text-2xl tracking-tighter',
                  'lg:text-3xl',
                  'group-hover:text-gray-800'
                )}
              >
                Space
              </span>
            </Link>
          </div>
        </div>

        {/* Ternary to remove hero video & video player if no videoId found. */}
        {studioPage.tourVideoId && (
          <>
            <div className="container mx-auto px-8 text-center" id="tour">
              <H2>{studioPage.section2Title}</H2>
              <p
                className={clsx(
                  'font-outline text-xl uppercase',
                  'lg:text-5xl'
                )}
              >
                {studioPage.section2Subtitle}
              </p>
            </div>

            <DividerBar />
          </>
        )}

        {/* studioItems */}
        <section id="studio-items">
          <div className="container mx-auto -mt-1.5 text-center uppercase">
            <H2>{studioPage.studioItemSectionTitle}</H2>
            <p
              className={clsx(
                'font-outline text-xl leading-4 uppercase',
                'lg:text-5xl'
              )}
            >
              {studioPage.studioItemSectionSubtitle}
            </p>
          </div>

          {studioPage.studioItems?.length > 0 && (
            <div
              className={clsx(
                'mx-auto mt-12 grid max-w-7xl gap-y-8 rounded-2xl bg-white p-8 lg:mt-24 lg:gap-y-10 lg:p-10'
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
