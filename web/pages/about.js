import 'swiper/css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import ArrowLink from '@/components/arrow-link'
import { ClientOnly } from '@/components/client-only'
import { Eyebrow, H1, H2, H3 } from '@/components/headings'
import Layout from '@/components/layout'
import SanityImage from '@/components/sanity-image'
import SectionIntro from '@/components/section-intro'
import { PortableText, toPlainText } from '@portabletext/react'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Autoplay, Controller } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import { sanityClient } from '../lib/sanity'
import { urlForSanitySource } from '../lib/urlForSanitySource'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

function About({ aboutPage }) {
  const [isGalleryModelOpen, setIsGalleryModelOpen] = useState(false)
  const [isServicesLightBoxOpen, setIsServicesLightBoxOpen] = useState(false)
  const [servicesPhotoIndex, setServicesPhotoIndex] = useState(0)
  const [controlledSwiper, setControlledSwiper] = useState(null)

  const isDesktop = useIsDesktop()
  const [photoIndex, setPhotoIndex] = useState(0)

  const utahLocationsImages = aboutPage.utahLocations.map((image) =>
    urlForSanitySource(image).width(1800).format('webp').quality(80).url()
  )

  const heroContent = (
    <div className="flex max-w-5xl flex-col items-start gap-5 text-left">
      <Eyebrow className="border-b border-white/60 pb-3 text-white">
        {aboutPage.subtitle}
      </Eyebrow>
      <H1 className="max-w-[20ch]">{aboutPage.title}</H1>
    </div>
  )

  const servicesImages = aboutPage.services.map((service) => {
    return {
      caption: toPlainText(service.description),
      src: urlForSanitySource(service.image)
        .width(2400)
        .height(1600)
        .format('webp')
        .fit('crop')
        .crop('focalpoint')
        .url(),
      title: service.name.toUpperCase(),
    }
  })

  return (
    <Layout
      title={aboutPage.seoTitle}
      description={aboutPage.seoDescription}
      heroImageUrl={aboutPage.poster || null}
      heroContent={heroContent}
      heroVideoId={
        (isDesktop ? aboutPage.videoId : aboutPage.videoIdMobile) ||
        aboutPage.videoId
      }
      heroVideoHeightInPixels={
        (isDesktop
          ? aboutPage.headerVideoHeightInPixels
          : aboutPage.headerVideoHeightInPixelsMobile) ||
        aboutPage.headerVideoHeightInPixels
      }
      heroVideoWidthInPixels={
        (isDesktop
          ? aboutPage.headerVideoWidthInPixels
          : aboutPage.headerVideoWidthInPixelsMobile) ||
        aboutPage.headerVideoWidthInPixels
      }
    >
      <Lightbox
        captions={{
          descriptionMaxLines: 100,
        }}
        close={() => setIsServicesLightBoxOpen(false)}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
          closeOnPullUp: true,
        }}
        index={servicesPhotoIndex}
        open={isServicesLightBoxOpen}
        plugins={[Captions]}
        slides={servicesImages.map((image) => ({
          src: image.src,
          description: (
            <div className="text-center md:text-lg">{image.caption}</div>
          ),
          title: (
            <div>
              <span className="flex items-center gap-4 text-lg md:text-2xl">
                <span className="text-white/60">
                  {String(servicesPhotoIndex + 1).padStart(2, '0')}
                </span>
                <span>{image.title}</span>
              </span>
              <div className="my-2 h-px w-40 shrink-0 bg-white/30" />
            </div>
          ),
        }))}
        styles={{
          captionsTitleContainer: {
            backgroundColor: 'black',
            paddingBottom: 6,
          },
          captionsDescriptionContainer: {
            backgroundColor: 'black',
          },
        }}
      />

      {/* intro */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro eyebrow="Who we are" title={aboutPage.section1Title}>
            {aboutPage.section1Body && (
              <PortableText value={aboutPage.section1Body} />
            )}
          </SectionIntro>
          <div id="reel">
            <ClientOnly>
              <VideoPlayer
                autoPlay
                client={aboutPage.reelVideoClient}
                description={aboutPage.reelVideoDescription}
                poster={aboutPage.reelVideoPoster}
                title={aboutPage.reelVideoTitle}
                videoHeightAspectRatio={aboutPage.reelVideoHeightAspectRatio}
                videoId={aboutPage.reelVideoId}
                videoIdShort={aboutPage.reelVideoIdShort}
                videoWidthAspectRatio={aboutPage.reelVideoWidthAspectRatio}
              />
            </ClientOnly>
          </div>

          {aboutPage.section1Subtitle && (
            <div className="mt-16 flex items-end justify-between gap-5 border-t border-white/30 pt-5">
              <Eyebrow>{aboutPage.section1Subtitle}</Eyebrow>
              <div className="flex gap-2">
                <button
                  aria-label="Previous"
                  className="flex size-12 items-center justify-center border border-white/40 transition-colors hover:border-white"
                  onClick={() => controlledSwiper?.slidePrev()}
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  aria-label="Next"
                  className="flex size-12 items-center justify-center border border-white/40 transition-colors hover:border-white"
                  onClick={() => controlledSwiper?.slideNext()}
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          )}

          <Swiper
            autoplay={{
              delay: 1_500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="mt-6"
            loop
            modules={[Autoplay, Controller]}
            onSwiper={setControlledSwiper}
            slidesPerView={2}
            spaceBetween={20}
            speed={1000}
          >
            {(aboutPage.section1Images || []).map((image, index) => {
              const width = 600
              const height = 440

              const altText =
                image.caption ||
                capitalize(
                  (image.name || `image-${index}`)
                    .replace(/-/g, ' ')
                    .replace(/_/g, ' ')
                    .replace('.jpg', '')
                )

              return (
                <SwiperSlide key={index}>
                  <Image
                    alt={altText}
                    height={height}
                    src={`${image.imageUrl}?w=${width}&h=${height}&auto=format&fit=crop&crop=focalpoint`}
                    width={width}
                    unoptimized
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </section>
      {/* end: intro */}

      {/* services */}
      <section className="bg-neutral-900 py-20 lg:py-28" id="services">
        <div className="mx-auto max-w-7xl px-5">
          <div className="border-t border-white/30 pt-5">
            <SectionIntro
              eyebrow={aboutPage.section2Subtitle}
              title={aboutPage.section2Title}
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {aboutPage.services.map((service, index) => {
              return (
                <button
                  className="group relative isolate flex min-h-[360px] flex-col justify-end overflow-hidden bg-neutral-800 p-6 text-left text-white sm:p-8"
                  key={index}
                  onClick={() => {
                    setIsServicesLightBoxOpen(true)
                    setServicesPhotoIndex(index)
                  }}
                  type="button"
                >
                  <Image
                    alt=""
                    className="-z-10 object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 420px"
                    src={urlForSanitySource(service.image)
                      .width(900)
                      .height(1100)
                      .format('webp')
                      .quality(80)
                      .url()}
                  />
                  <div className="absolute inset-0 -z-10 bg-linear-to-t from-neutral-950/85 via-neutral-950/20 to-transparent" />
                  <Eyebrow className="mb-3 text-white/70">
                    {String(index + 1).padStart(2, '0')}
                  </Eyebrow>
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <H3 className="mb-0 max-w-[16ch]">{service.name}</H3>
                    <span className="border-b border-white pb-2 text-sm font-medium tracking-[0.08em] uppercase">
                      Details ↗
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>
      {/* end: services */}

      {/* ad formats */}
      <section className="py-20 lg:py-28" id="ad-formats">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro eyebrow="Formats" title={aboutPage.adFormatsTitle}>
            {aboutPage.adFormatsSubtitle && (
              <p>{aboutPage.adFormatsSubtitle}</p>
            )}
          </SectionIntro>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
            {aboutPage.adFormats.map((adFormatsCard, index) => {
              return (
                <div key={index} className="border-t border-white/20 pt-6">
                  <SanityImage
                    image={adFormatsCard.image}
                    className="block"
                    alt={adFormatsCard.title}
                  />
                  <H3 className="mt-6">{adFormatsCard.title}</H3>
                  <div className="prose prose-invert mt-2 text-pretty text-neutral-300">
                    <PortableText value={adFormatsCard.body} />
                  </div>
                </div>
              )
            })}
          </div>
          {aboutPage.adFormatsContent && (
            <div className="prose prose-lg prose-invert mt-12 max-w-[65ch] text-neutral-300">
              <PortableText value={aboutPage.adFormatsContent} />
            </div>
          )}
        </div>
      </section>
      {/* end: ad formats */}

      {/* director section */}
      <section className="bg-neutral-900 py-20 lg:py-28" id="director">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SanityImage
              alt={aboutPage.directorImageTitle || aboutPage.directorName}
              image={aboutPage.directorImage}
              className="h-full w-full"
            />
          </div>
          <div className="lg:col-span-5">
            <Eyebrow className="mb-5">{aboutPage.directorName}</Eyebrow>
            <H2 className="max-w-[24ch]">{aboutPage.directorImageTitle}</H2>
            {aboutPage.directorImageSubtitle && (
              <p className="font-outline text-2xl uppercase lg:text-3xl">
                {aboutPage.directorImageSubtitle}
              </p>
            )}
            {aboutPage.directorTitle && (
              <p className="mt-2 text-neutral-400 uppercase">
                {aboutPage.directorTitle}
              </p>
            )}
            {aboutPage.directorDescription && (
              <div className="prose prose-lg prose-invert mt-6 text-pretty text-neutral-300">
                <PortableText value={aboutPage.directorDescription} />
              </div>
            )}
            <ArrowLink
              href="https://jeremymillerdirector.com/"
              className="mt-6 uppercase"
              rel="noreferrer"
              target="_blank"
            >
              View director&apos;s site
            </ArrowLink>
          </div>
        </div>
      </section>
      {/* end: director section */}

      {/* team section */}
      <section className="py-20 lg:py-28" id="team">
        <div className="mx-auto max-w-7xl px-5">
          <SectionIntro
            eyebrow={aboutPage.teamSubtitle || 'The crew'}
            title={aboutPage.teamTitle}
          />
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
            {aboutPage.teamMembers.map((teamMember) => {
              const width = isDesktop ? 600 : 300
              const height = isDesktop ? 690 : 345
              return (
                <div key={teamMember._id}>
                  <Image
                    alt={teamMember.name}
                    className="w-full"
                    height={height}
                    src={urlForSanitySource(teamMember.image)
                      .width(width)
                      .height(height)
                      .format('webp')
                      .quality(80)
                      .url()}
                    width={width}
                  />
                  <div className="mt-4 border-t border-white/20 pt-4">
                    <p className="text-lg font-semibold tracking-tight uppercase lg:text-2xl">
                      {teamMember.name}
                    </p>
                    <Eyebrow className="mt-1">{teamMember.title}</Eyebrow>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {/* end: team section */}

      {/* utah locations */}
      <Lightbox
        open={isGalleryModelOpen}
        close={() => setIsGalleryModelOpen(false)}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
          closeOnPullUp: true,
        }}
        index={photoIndex}
        plugins={[Zoom]}
        slides={utahLocationsImages.map((image) => ({
          src: image,
        }))}
      />
      <section className="bg-neutral-900 py-20 lg:py-28" id="locations">
        <div className="mx-auto max-w-7xl px-5">
          <div className="border-t border-white/30 pt-5">
            <SectionIntro
              eyebrow="On location"
              title={aboutPage.utahLocationsTitle}
            >
              {aboutPage.utahLocationsDescription && (
                <PortableText value={aboutPage.utahLocationsDescription} />
              )}
            </SectionIntro>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {aboutPage.utahLocations.map((utahLocation, index) => {
              return (
                <button
                  aria-label={`Utah location ${index + 1}`}
                  className="group relative aspect-3/2 overflow-hidden"
                  key={index}
                  onClick={() => {
                    setIsGalleryModelOpen(true)
                    setPhotoIndex(index)
                  }}
                  type="button"
                >
                  <Image
                    alt=""
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 420px"
                    src={urlForSanitySource(utahLocation.asset)
                      .width(900)
                      .height(600)
                      .format('webp')
                      .quality(80)
                      .url()}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </section>
      {/* end: utah locations */}

      {/* company 3 */}
      <section className="py-20 lg:py-28" id="company3">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-10 grid gap-8 lg:mb-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <Eyebrow className="mb-5">In partnership with</Eyebrow>
              <a
                href="https://www.company3.com/"
                rel="noreferrer"
                target="_blank"
                className="block max-w-[260px]"
              >
                <Image
                  src="/images/company-3.svg"
                  alt="Company 3"
                  width="1020"
                  height="170"
                />
              </a>
              <H2 className="mt-6 max-w-[24ch]">{aboutPage.company3Title}</H2>
            </div>
            {aboutPage.company3Body && (
              <div className="prose prose-lg prose-invert max-w-[65ch] text-pretty text-neutral-300 lg:col-span-7 lg:pt-6">
                <PortableText value={aboutPage.company3Body} />
              </div>
            )}
          </div>
          <ClientOnly>
            <VideoPlayer
              autoPlay
              client={aboutPage.company3VideoClient}
              description={aboutPage.company3VideoDescription}
              poster={aboutPage.company3VideoPoster}
              title={aboutPage.company3VideoTitle}
              videoHeightAspectRatio={aboutPage.company3VideoHeightAspectRatio}
              videoId={aboutPage.company3VideoId}
              videoIdShort={aboutPage.company3VideoIdShort}
              videoWidthAspectRatio={aboutPage.company3VideoWidthAspectRatio}
            />
          </ClientOnly>
          <ArrowLink
            href={aboutPage.company3Link || 'https://www.company3.com/'}
            className="mt-10 uppercase"
            rel="noreferrer"
            target="_blank"
          >
            Book a session
          </ArrowLink>
        </div>
      </section>
      {/* end: company 3 */}

      {/* ravens */}
      {(aboutPage.ravensCardsTitle?.length ||
        aboutPage.ravensCardsSubtitle?.length ||
        aboutPage.ravensCardsContent?.length ||
        aboutPage.ravensCards?.length > 0) && (
        <section className="bg-neutral-900 py-20 lg:py-28" id="ravens">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-8 max-w-sm">
              <Image
                src="/images/ravens-official-logo-simple-white.svg"
                alt="Ravens"
                width={900}
                height="102"
              />
            </div>
            <SectionIntro
              eyebrow={aboutPage.ravensCardsSubtitle}
              title={aboutPage.ravensCardsTitle}
            >
              {aboutPage.ravensCardsContent && (
                <PortableText value={aboutPage.ravensCardsContent} />
              )}
            </SectionIntro>
            <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
              {aboutPage.ravensCards?.map((ravensCard, index) => {
                return (
                  <Link
                    key={index}
                    href={ravensCard.link}
                    className="group border-t border-white/20 pt-6"
                    target="_blank"
                  >
                    <SanityImage
                      image={ravensCard.image}
                      className="block grayscale transition-all duration-500 group-hover:grayscale-0"
                      alt={ravensCard.caption}
                    />
                    <H3 className="mt-6">{ravensCard.title}</H3>
                    <div className="prose prose-invert mt-2 text-neutral-300">
                      <PortableText value={ravensCard.body} />
                    </div>
                  </Link>
                )
              })}
            </div>
            <a
              href="https://ravensfilmworks.com/"
              className="mt-10 inline-flex min-h-12 items-center gap-3 border-b border-white py-2 text-base font-medium uppercase transition-colors hover:border-white/50 hover:text-white/75"
              rel="noreferrer"
              target="_blank"
            >
              View
              <svg
                className="h-4 fill-current lg:h-5"
                enableBackground="new 0 0 6098.1 642.5"
                viewBox="0 0 6098.1 642.5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="m6084 468.5c-6.5 31.3-12.5 54.3-39.4 87.3-22.1 27-49.5 45.2-49.5 45.2l-44.9-110.3s5.2-7.6 7.5-13.6c11.1-29.9 6.4-53.7-22.6-67.3-38.5-18-80.1-29.5-120.4-44.1-34.8-12.6-71.6-21.8-103.9-39.3-81-43.5-86.4-144-56.1-208.8 15.6-33.3 38-60.6 74.1-77.2 13.3 32.9 42.5 106.5 42.5 106.5s-2.4 2.8-3.9 7.1c-13.4 37.8-4.3 65.2 33.1 79.3 43.9 16.7 90.1 27.5 134.8 42.2 42.8 14 86.3 29.2 114.8 66.1 14.8 19.1 28.2 41.5 33.8 65.4 4.8 20.1 4.3 41.6.1 61.5z" />
                  <path d="m6007.2 175.2c-34.3-35.4-62-43.5-85.2-50.5-49.9-15.2-117.4 4.9-117.4 4.9s-25.9-69.4-39.6-103.4c82.6-19.8 143.8-17.4 182.2-7.3 79.5 20.9 146.9 84.3 146.9 84.3s-59 48.4-86.9 72z" />
                  <path d="m189.8 421s-10.5-.2-14.3-.3c-61.5-.5-50.4 1.5-51 54.9-.5 45.7-.1 91.5-.1 139h-120.3v-593.9c6.5.3 7.7.1 11.7.1 99.1 1.2 198.5-1.1 297.3 5 80.5 5 153.3 40.9 175.5 131.7 22.7 93.5 1.9 187.4-100.7 234.8-21.3 9.9-18.7 19-8.3 33.8 35.8 51.3 71.4 102.9 107 154.5 6.9 10.2 13.2 20.7 22.7 35.7-47.8 0-141.9-.4-141.9-.4l-6.3-9.8-190.4-283.7s-2.1-3.3-3.6-6.6c34 0 71 1.2 104.8-.3 43.4-1.9 78.1-18 95.5-61.8 16.7-41.9-6.9-98.1-50.6-111.5-19.1-5.8-39.5-9.3-59.4-10-42.6-1.5-85.4-.4-131.8-.4v84.2c0 11.1 1.8 100.2 1.8 100.2" />
                  <path d="m5036.5 616.4-104.9-.8s-7.4-9.1-13.4-16.8c-91.3-118.7-182-237.9-272.9-356.9-4.6-6-9.6-11.8-17.4-21.4v393.9c-40.2 0-78.1 0-117.7 0 0-195.5 0-391.2 0-589.7 35.4 0 115 .6 115 .6s5.3 6.6 9.9 12.6c86.1 112 171.4 224.3 257.3 336.5 40.3 52.7 143.4 189.2 143.4 189.2z" />
                  <path d="m3596.1 370.7v138.3h335.2v107c-149.1 0-297.9 0-448.1 0 0-170.7 0-530.3 0-530.3l114.3 112.3v66.3h329.5v106.3c-109.5.1-219.2.1-330.9.1z" />
                  <path d="m1719.7 616.4c-44.6 0-134.5-.6-134.5-.6s-2.7-6.8-5.1-12.7c-77.1-190.8-153.5-381.9-230-572.9-.9-2.2-2-5.1-3.2-8.9h117.5c84.4 197 168.9 393.9 255.3 595.1z" />
                  <path d="m2670.3 616.6c-39.7 0-125.9-.6-125.9-.6s-3.3-6.9-5.7-12.8c-45-109.2-89.3-218.8-133.6-328.3-31.8-78.4-63.5-156.9-95.2-235.3-2.1-5.3-4.5-10.9-7.4-19.8 40.4 0 126.5.7 126.5.7s3.3 9.6 6 16.2c54.8 134.4 108.9 268.9 163.4 403.4 20 49.4 40.6 98.7 60.8 148.1 3.2 8.5 7 17.1 11.1 28.4z" />
                  <path d="m1090.5 616.4c78.1-182 154.8-361 233.8-544.9 19.9 49.3 58.2 141.5 58.2 141.5s-3.5 10.2-5.5 15.4c-49.4 123.9-98.7 248-148.8 371.6-2.8 6.8-6.6 15.6-6.6 15.6s-88.8.8-131.1.8z" />
                  <path d="m2902.7 18.7c-71.2 182.4-140.8 361.5-212.3 545-20.1-50.4-59.4-147-59.4-147s2.7-9.6 5.4-16.9c42.6-117.1 86.2-233.8 128.5-351 7.9-21.9 10.7-29.7 10.7-29.7s90.8-.4 127.1-.4z" />
                  <path d="m5035.5 488.4c-41.7-55-80.1-105.4-118.2-156-2.3-3-3.1-4.8-3.1-4.8s-.1-202.1-.1-302.1h121.6c-.2 152.7-.2 304.8-.2 462.9z" />
                  <path d="m3483.6 19.7c150.3.2 300.6.4 451 .5-.1 37.7-.3 76.3-.4 113.9-111.2.1-222.4.3-333.6.4" />
                  <path d="m5916.9 509.1s29.3 74.2 41.6 105.3c-32.2 8.1-103.4 28.1-183.3 8.7-81.3-19.7-130.2-69.9-155.2-92 24.8-19.9 86.4-68.4 86.4-68.4 20.7 13.5 51.4 44.2 99.9 53.8 46.6 9 86.7-3.1 110.6-7.4z" />
                </g>
              </svg>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      )}
      {/* end: ravens */}

      {/* trusted by */}
      <section className="py-20 lg:py-28" id="brands">
        <div className="mx-auto max-w-7xl px-5">
          <div className="border-t border-white/30 pt-5">
            <Eyebrow className="mb-5">Trusted by</Eyebrow>
            <H2 className="max-w-[24ch]">Brands we&apos;ve worked with</H2>
          </div>
          <div className="mt-12 grid grid-cols-3 items-center gap-8 lg:grid-cols-5 lg:gap-16">
            {aboutPage.brands.map((brand) => {
              return (
                <div key={brand._id}>
                  <SanityImage alt={brand.name} image={brand.image} />
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {/* end: trusted by */}
    </Layout>
  )
}

export async function getStaticProps() {
  const aboutPage = await sanityClient.fetch(
    groq`
		*[_type == "aboutPage"][0]{
			company3VideoHeightAspectRatio,
			company3VideoId,
      company3VideoIdShort,
			company3VideoPoster,
			company3VideoTitle,
			company3VideoWidthAspectRatio,
			footerSubtitle,
			footerTitle,
			poster,
			section1Body,
			section1Title,
      section1Subtitle,
      section1Images[]{
        caption,
        "imageUrl": asset->url,
        "name": asset->originalFilename,
      },
			seoDescription,
			seoTitle,
			subtitle,
      reelVideoSectionTitle,
      reelVideoSectionSubtitle,
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
      company3VideoDescription,
      directorDescription,
      directorImage,
      directorImageTitle,
      directorImageSubtitle,
      directorName,
      directorTitle,
      section2Subtitle,
      section2Title,
      services[]->,
      teamTitle,
      teamSubtitle,
      teamMembers[]->,
      title,
      utahLocationsTitle,
      utahLocationsDescription,
      utahLocations[]{
          caption,
          asset
      },
      ravensCards[]{
          title,
          image,
          body,
          link,
      },
      ravensCardsTitle,
      ravensCardsSubtitle,
      ravensCardsContent,
      adFormats[]{
          title,
          image,
          body,
      },
      adFormatsTitle,
      adFormatsSubtitle,
      adFormatsContent,
  		}
  		`
  )

  return {
    props: {
      aboutPage,
    },
  }
}

export default About
