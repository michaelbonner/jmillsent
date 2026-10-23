import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import ArrowLink from '@/components/arrow-link'
import { ClientOnly } from '@/components/client-only'
import { Eyebrow, H1, H2, H3 } from '@/components/headings'
import Layout from '@/components/layout'
import SectionIntro from '@/components/section-intro'
import { urlForSanitySource } from '@/lib/urlForSanitySource'
import { PortableText, toPlainText } from '@portabletext/react'
import { clsx } from 'clsx'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import { sanityClient } from '../lib/sanity'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

function Studio({ studioPage }) {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const isDesktop = useIsDesktop()

  const heroContent = (
    <div className="flex max-w-5xl flex-col items-start gap-5 text-left">
      <Eyebrow className="border-b border-white/60 pb-3 text-white">
        {studioPage.subtitle}
      </Eyebrow>
      <H1 className="max-w-[20ch]">{studioPage.title}</H1>
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
              <div className="my-2 h-px w-40 shrink-0 bg-white/30" />
            </div>
          ),
        }))}
      />

      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro eyebrow="The space" title={studioPage.section1Title}>
            {studioPage.section1Body && (
              <PortableText value={studioPage.section1Body} />
            )}
          </SectionIntro>

          {studioPage.tourVideoId && (
            <div id="tour">
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

          <ArrowLink
            href="https://theravenspace.com"
            className="mt-10 uppercase"
          >
            Book the studio space
          </ArrowLink>
        </div>
      </section>

      {studioPage.tourVideoId &&
        (studioPage.section2Title || studioPage.section2Subtitle) && (
          <section className="mx-auto max-w-7xl px-5">
            <div className="border-t border-white/15 pt-5">
              <SectionIntro
                eyebrow={studioPage.section2Subtitle}
                title={studioPage.section2Title}
              />
            </div>
          </section>
        )}

      {/* studioItems */}
      <section className="bg-neutral-900 py-20 lg:py-28" id="studio-items">
        <div className="mx-auto max-w-7xl px-5">
          <div className="border-t border-white/30 pt-5">
            <SectionIntro
              eyebrow={studioPage.studioItemSectionSubtitle}
              title={studioPage.studioItemSectionTitle}
            />
          </div>

          {studioPage.studioItems?.length > 0 && (
            <div className="grid gap-5 lg:grid-cols-2">
              {studioPage.studioItems.map((service, index) => {
                return (
                  <button
                    className={clsx(
                      'group relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden bg-neutral-800 p-6 text-left text-white sm:p-9',
                      'first:lg:col-span-2 first:lg:min-h-[520px]'
                    )}
                    key={service._id}
                    onClick={() => {
                      setIsLightBoxOpen(true)
                      setPhotoIndex(index)
                    }}
                    type="button"
                  >
                    <Image
                      alt={service.title}
                      className="-z-10 object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                      fill
                      sizes={
                        index === 0
                          ? '(max-width: 1279px) 100vw, 1280px'
                          : '(max-width: 1023px) 100vw, 640px'
                      }
                      src={urlForSanitySource(service.image)
                        .width(index === 0 ? 2000 : 1200)
                        .format('webp')
                        .quality(80)
                        .url()}
                    />
                    <div className="absolute inset-0 -z-10 bg-linear-to-t from-neutral-950/85 via-neutral-950/20 to-transparent" />
                    <div className="flex flex-wrap items-end justify-between gap-5">
                      <H3 className="mb-0 max-w-[24ch] lg:text-3xl">
                        {service.title}
                      </H3>
                      <span className="border-b border-white pb-2 text-sm font-medium tracking-[0.08em] uppercase">
                        View ↗
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </section>
      {/* end: studioItems */}

      <section className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col gap-8 py-20 lg:flex-row lg:items-end lg:justify-between lg:py-28">
          <div>
            <Eyebrow className="mb-5">Book it</Eyebrow>
            <H2 className="max-w-[20ch]">
              Bring your next shoot to our studio.
            </H2>
          </div>
          <ArrowLink
            href="https://theravenspace.com"
            className="self-start uppercase lg:shrink-0"
          >
            Book the space
          </ArrowLink>
        </div>
      </section>
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
