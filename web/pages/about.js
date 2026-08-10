import 'swiper/css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import { ClientOnly } from '@/components/client-only'
import DividerBar from '@/components/divider-bar'
import {
  H1 as SharedH1,
  H2 as SharedH2,
  H3 as SharedH3,
} from '@/components/headings'
import Layout from '@/components/layout'
import LittleBlackBar from '@/components/little-black-bar'
import LittleWhiteBar from '@/components/little-white-bar'
import SanityImage from '@/components/sanity-image'
import { PortableText, toPlainText } from '@portabletext/react'
import { clsx } from 'clsx'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { styles } from 'styles/styles'
import { Autoplay, Controller } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import { sanityClient } from '../lib/sanity'
import { urlForSanitySource } from '../lib/urlForSanitySource'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

const H1 = ({ className, ...props }) => (
  <SharedH1
    className={clsx(
      'text-2xl font-extrabold tracking-normal lg:text-7xl',
      className
    )}
    {...props}
  />
)

const H2 = ({ className, ...props }) => (
  <SharedH2
    className={clsx(
      'text-2xl font-extrabold tracking-normal lg:text-5xl',
      className
    )}
    {...props}
  />
)

const H3 = ({ className, ...props }) => (
  <SharedH3
    className={clsx(
      'text-xl font-extrabold tracking-normal lg:text-3xl',
      className
    )}
    {...props}
  />
)

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
    <div className="relative flex h-full min-h-[70svh] w-screen flex-col justify-end overflow-hidden px-5 pb-10 text-white sm:px-8 sm:pb-14 lg:min-h-0 lg:px-12 lg:pb-16">
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/15 to-black/25" />
      <div className="relative mx-auto w-full max-w-[100rem]">
        <p className="mb-4 font-mono text-sm tracking-wide text-white/70 uppercase sm:text-xs">
          About the studio
        </p>
        <H1 className="max-w-[14ch]">{aboutPage.title}</H1>
        <h2 className="font-outline mt-2 max-w-[24ch] text-2xl text-balance text-white uppercase sm:text-3xl lg:text-5xl">
          {aboutPage.subtitle}
        </h2>
      </div>
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
                <span className="font-outline">0{servicesPhotoIndex + 1}</span>
                <span>{image.title}</span>
              </span>
              <div className="bg-gold my-2 h-1 w-40 shrink-0" />
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

      <div className="mx-auto max-w-[100rem] px-5 sm:px-8 lg:px-12">
        <div className="text-white">
          <section
            className="my-6 overflow-hidden rounded-[min(1.5vw,1.5rem)] bg-[#f2f1ed] text-black sm:my-8"
            id="reel"
          >
            <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-12">
              <div className="lg:col-span-5">
                <p className="mb-4 font-mono text-sm tracking-wide text-black/50 uppercase sm:text-xs">
                  Our approach
                </p>
                <H2 className="max-w-[18ch] text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  {aboutPage.section1Title}
                </H2>
                {aboutPage.section1Body && (
                  <div className="prose prose-p:text-base prose-p:font-normal prose-p:leading-7 sm:prose-p:text-lg mt-6 max-w-[55ch] text-pretty text-black/65 lg:mt-8">
                    <PortableText value={aboutPage.section1Body} />
                  </div>
                )}
                {aboutPage.section1Subtitle && (
                  <H3 className="mt-8 max-w-[26ch] border-t border-black/15 pt-6 text-xl font-semibold sm:text-2xl">
                    {aboutPage.section1Subtitle}
                  </H3>
                )}
              </div>
              <div className="min-w-0 lg:col-span-7">
                <div className="overflow-hidden rounded-[min(1vw,1rem)] bg-black text-white outline-1 -outline-offset-1 outline-black/10">
                  <ClientOnly>
                    <VideoPlayer
                      autoPlay
                      client={aboutPage.reelVideoClient}
                      description={aboutPage.reelVideoDescription}
                      poster={aboutPage.reelVideoPoster}
                      title={aboutPage.reelVideoTitle}
                      videoHeightAspectRatio={
                        aboutPage.reelVideoHeightAspectRatio
                      }
                      videoId={aboutPage.reelVideoId}
                      videoIdShort={aboutPage.reelVideoIdShort}
                      videoWidthAspectRatio={
                        aboutPage.reelVideoWidthAspectRatio
                      }
                    />
                  </ClientOnly>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    className="relative flex size-12 shrink-0 items-center justify-center rounded-full border border-black/15"
                    aria-label="Previous image"
                    onClick={() => controlledSwiper?.slidePrev()}
                  >
                    <Image
                      className="h-6 w-auto rotate-180 opacity-60"
                      alt=""
                      src="/images/chevron-arrow.svg"
                      width={12}
                      height={24}
                    />
                  </button>
                  <Swiper
                    autoplay={{
                      delay: 1_500,
                      disableOnInteraction: false,
                    }}
                    breakpoints={{
                      640: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                      },
                    }}
                    className="min-w-0 flex-1"
                    loop
                    modules={[Autoplay, Controller]}
                    navigation={true}
                    onSwiper={setControlledSwiper}
                    slidesPerView={1.4}
                    spaceBetween={12}
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
                          <div>
                            <Image
                              className="aspect-4/3 w-full rounded-[min(1vw,0.75rem)] object-cover outline-1 -outline-offset-1 outline-black/10"
                              alt={altText}
                              height={height}
                              src={`${image.imageUrl}?w=${width}&h=${height}&auto=format&fit=crop&crop=focalpoint`}
                              width={width}
                              unoptimized
                            />
                          </div>
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                  <button
                    className="relative flex size-12 shrink-0 items-center justify-center rounded-full border border-black/15"
                    aria-label="Next image"
                    onClick={() => controlledSwiper?.slideNext()}
                  >
                    <Image
                      className="h-6 w-auto opacity-60"
                      alt=""
                      src="/images/chevron-arrow.svg"
                      width={12}
                      height={24}
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* services */}
          <section
            className="border-b border-white/15 py-20 sm:py-24 lg:py-32"
            id="services"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 font-mono text-sm tracking-wide text-white/50 uppercase sm:text-xs">
                  What we do
                </p>
                <H2 className="max-w-[20ch] text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  {aboutPage.section2Title}
                </H2>
              </div>
              <p className="font-outline max-w-[24ch] text-2xl text-white uppercase sm:text-3xl lg:text-right lg:text-4xl">
                {aboutPage.section2Subtitle}
              </p>
            </div>

            <div
              className={clsx(
                'mt-10 grid gap-3 sm:mt-12',
                'md:grid-cols-2',
                'lg:grid-cols-3'
              )}
            >
              {aboutPage.services.map((service, index) => {
                const imageSrc = urlForSanitySource(service.image)
                  .width(800)
                  .height(600)
                  .format('webp')
                  .quality(80)
                  .url()

                return (
                  <button
                    className={clsx(
                      'group relative rounded-[min(1vw,1rem)] outline-1 -outline-offset-1 outline-white/10',
                      'min-h-[30rem] overflow-hidden md:aspect-4/4 md:min-h-0',
                      'bg-cover bg-center bg-no-repeat',
                      'lg:aspect-3/4',
                      'xl:aspect-4/3'
                    )}
                    onClick={() => {
                      setIsServicesLightBoxOpen(true)
                      setServicesPhotoIndex(index)
                    }}
                    style={{
                      backgroundImage: `url(${imageSrc})`,
                    }}
                    key={index}
                  >
                    <div
                      className={clsx(
                        'absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-90'
                      )}
                    />
                    <div
                      className={clsx(
                        'relative z-10 flex h-full flex-col items-start justify-end p-5 text-left sm:p-6'
                      )}
                    >
                      <div className="font-outline mb-auto text-3xl text-white/65 tabular-nums">
                        0{index + 1}
                      </div>
                      <h3 className="max-w-[22ch] text-2xl font-semibold tracking-tight text-balance uppercase sm:text-3xl">
                        {service.name}
                      </h3>
                      <div
                        className={clsx(
                          'mt-3 max-w-[48ch] text-base text-pretty text-white/70 sm:text-sm',
                          'lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-[max-height,opacity] lg:duration-300 lg:group-hover:max-h-48 lg:group-hover:opacity-100'
                        )}
                      >
                        <PortableText value={service.description} />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>

          {/* end: services */}

          {/* Ad Formats */}
          <div className="my-6 overflow-hidden rounded-[min(1.5vw,1.5rem)] bg-[#f2f1ed] text-black sm:my-8">
            <section
              className="grid gap-8 p-5 sm:p-8 lg:gap-12 lg:p-12"
              id="ad-formats"
            >
              <div className="flex flex-col gap-4 border-b border-black/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="mb-4 font-mono text-sm tracking-wide text-black/50 uppercase sm:text-xs">
                    Built for every screen
                  </p>
                  {aboutPage.adFormatsTitle && (
                    <H2 className="max-w-[20ch] text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                      {aboutPage.adFormatsTitle}
                    </H2>
                  )}
                </div>
                {aboutPage.adFormatsSubtitle && (
                  <p className="font-outline max-w-[24ch] text-2xl text-black uppercase sm:text-3xl lg:text-right lg:text-4xl">
                    {aboutPage.adFormatsSubtitle}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {aboutPage.adFormats.map((adFormatsCard, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col gap-8 rounded-[min(1vw,1rem)] bg-black p-5 text-left text-white sm:p-6"
                    >
                      <div>
                        <SanityImage
                          image={adFormatsCard.image}
                          className="aspect-4/3 w-full rounded-[min(1vw,0.75rem)] object-cover outline-1 -outline-offset-1 outline-white/10"
                          alt={adFormatsCard.title}
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold tracking-tight text-balance uppercase lg:text-3xl">
                          {adFormatsCard.title}
                        </h3>
                        <div className="prose prose-invert prose-p:text-base sm:prose-p:text-sm mt-4 text-pretty text-white/65">
                          <PortableText value={adFormatsCard.body} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              {aboutPage.adFormatsContent && (
                <div className="prose prose-p:text-base sm:prose-p:text-lg max-w-[60ch] text-pretty text-black/65">
                  <PortableText value={aboutPage.adFormatsContent} />
                </div>
              )}
            </section>
          </div>
          {/* end: Ad Formats */}

          {/* director section */}
          <section
            className="grid gap-8 border-b border-white/15 py-20 sm:py-24 lg:grid-cols-12 lg:gap-12 lg:py-32"
            id="director"
          >
            <div className="lg:col-span-4">
              <p className="mb-4 font-mono text-sm tracking-wide text-white/50 uppercase sm:text-xs">
                The director
              </p>
              <h2 className="max-w-[20ch] text-4xl font-semibold tracking-tight text-balance uppercase sm:text-5xl">
                {aboutPage.directorName}
              </h2>
              <p className="font-outline mt-2 max-w-[24ch] text-2xl text-white uppercase sm:text-3xl">
                {aboutPage.directorTitle}
              </p>
              {aboutPage.directorDescription && (
                <div className="prose prose-invert prose-p:text-base prose-p:leading-7 sm:prose-p:text-lg mt-8 max-w-[55ch] text-pretty text-white/65 lg:mt-10">
                  <PortableText value={aboutPage.directorDescription} />
                </div>
              )}
              <a
                href="https://jeremymillerdirector.com/"
                className="group mt-8 inline-flex items-center gap-3 border-b border-white/30 pb-2 text-base font-medium sm:text-sm"
                rel="noreferrer"
                target="_blank"
              >
                Visit director&apos;s site
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </a>
            </div>
            <div className="group relative overflow-hidden rounded-[min(1.5vw,1.5rem)] outline-1 -outline-offset-1 outline-white/10 lg:col-span-8">
              <SanityImage
                alt=""
                image={aboutPage.directorImage}
                className="h-full w-full object-cover"
              />
              <div
                className={clsx(
                  'absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent'
                )}
              />
              {(aboutPage.directorImageTitle ||
                aboutPage.directorImageSubtitle) && (
                <div className="absolute inset-0 flex flex-col items-start justify-end gap-2 p-5 sm:p-8">
                  <p className="max-w-[24ch] text-xl font-semibold tracking-tight text-balance uppercase sm:text-3xl">
                    {aboutPage.directorImageTitle}
                  </p>
                  {aboutPage.directorImageSubtitle && (
                    <p className="font-outline max-w-[28ch] text-xl text-white/80 uppercase sm:text-2xl">
                      {aboutPage.directorImageSubtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>
          {/* end: director section */}

          {/* team section */}
          <section
            className="border-b border-white/15 py-20 sm:py-24 lg:py-32"
            id="team"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-4 font-mono text-sm tracking-wide text-white/50 uppercase sm:text-xs">
                  The crew
                </p>
                <H2 className="max-w-[20ch] text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  {aboutPage.teamTitle}
                </H2>
              </div>
              <p className="font-outline max-w-[24ch] text-2xl text-white uppercase sm:text-3xl lg:text-right lg:text-4xl">
                {aboutPage.teamSubtitle}
              </p>
            </div>
            <ul
              className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 md:grid-cols-3 lg:grid-cols-4"
              role="list"
            >
              {aboutPage.teamMembers.map((teamMember) => {
                const width = isDesktop ? 400 : 200
                const height = isDesktop ? 460 : 250
                return (
                  <li key={teamMember._id} className="min-w-0">
                    <Image
                      alt=""
                      className="aspect-4/5 w-full rounded-[min(1vw,1rem)] object-cover outline-1 -outline-offset-1 outline-white/10"
                      height={height}
                      src={urlForSanitySource(teamMember.image)
                        .width(width)
                        .height(height)
                        .format('webp')
                        .quality(80)
                        .url()}
                      width={width}
                    />
                    <p className="mt-4 text-base font-semibold text-white uppercase sm:text-lg">
                      {teamMember.name}
                    </p>
                    <p className="mt-1 text-base text-white/50 sm:text-sm">
                      {teamMember.title}
                    </p>
                  </li>
                )
              })}
            </ul>
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
          <section
            className="grid gap-8 border-b border-white/15 py-20 sm:py-24 lg:gap-12 lg:py-32"
            id="locations"
          >
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <p className="mb-4 font-mono text-sm tracking-wide text-white/50 uppercase sm:text-xs">
                  Home base / Utah
                </p>
                <H2 className="max-w-[20ch] text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  {aboutPage.utahLocationsTitle}
                </H2>
              </div>
              {aboutPage.utahLocationsDescription && (
                <div className="prose prose-invert prose-p:text-base prose-p:leading-7 sm:prose-p:text-lg max-w-[55ch] text-pretty text-white/65 lg:col-span-5 lg:pt-8">
                  <PortableText value={aboutPage.utahLocationsDescription} />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
              {aboutPage.utahLocations.map((utahLocation, index) => {
                return (
                  <button
                    aria-label={`Utah location ${index + 1}`}
                    className="min-h-64 w-full overflow-hidden rounded-[min(1vw,1rem)] outline-1 -outline-offset-1 outline-white/10"
                    key={index}
                    onClick={() => {
                      setIsGalleryModelOpen(true)
                      setPhotoIndex(index)
                    }}
                    style={{
                      backgroundImage: `url(${urlForSanitySource(
                        utahLocation.asset
                      )
                        .width(600)
                        .height(400)
                        .format('webp')
                        .quality(80)
                        .url()})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: 'min(25vh, 300px)',
                    }}
                  ></button>
                )
              })}
            </div>
          </section>
          {/* end: utah locations */}

          <div>
            <DividerBar />
          </div>

          {/* company 3 */}
          <section className="-mt-1.5 grid items-center gap-y-4" id="company3">
            <div className="mx-auto w-full max-w-sm">
              <a
                href="https://www.company3.com/"
                rel="noreferrer"
                target="_blank"
              >
                <Image
                  src="/images/company-3.svg"
                  alt="company3"
                  width="1020"
                  height="170"
                />
              </a>
            </div>
            <H2 className="font-outline mb-0! font-thin">
              {aboutPage.company3Title}
            </H2>

            <div className="container mx-auto mt-4 max-w-7xl rounded-xl lg:mt-10">
              <ClientOnly>
                <VideoPlayer
                  autoPlay
                  client={aboutPage.company3VideoClient}
                  description={aboutPage.company3VideoDescription}
                  poster={aboutPage.company3VideoPoster}
                  title={aboutPage.company3VideoTitle}
                  videoHeightAspectRatio={
                    aboutPage.company3VideoHeightAspectRatio
                  }
                  videoId={aboutPage.company3VideoId}
                  videoIdShort={aboutPage.company3VideoIdShort}
                  videoWidthAspectRatio={
                    aboutPage.company3VideoWidthAspectRatio
                  }
                />
              </ClientOnly>
            </div>
            {aboutPage.company3Body && (
              <div className="prose prose-lg prose-invert mx-auto mt-6 max-w-5xl px-4 text-center font-light text-white">
                <PortableText value={aboutPage.company3Body} />
              </div>
            )}
            <div className="mt-8 flex justify-center">
              <a
                href={aboutPage.company3Link || 'https://www.company3.com/'}
                className={styles.buttonLink.default}
                target="_blank"
              >
                <span className="font-outline text-2xl tracking-tighter text-gray-300 group-hover:text-black lg:text-3xl">
                  Book
                </span>
                <span className="text-2xl font-bold tracking-wide group-hover:text-black lg:text-3xl">
                  Session
                </span>

                <span className="font-outline text-2xl tracking-tighter text-gray-300 group-hover:text-black lg:text-3xl">
                  Now
                </span>
              </a>
            </div>
          </section>
        </div>
        {/* end: company 3 */}

        {/* ravens */}
        {(aboutPage.ravensCardsTitle?.length ||
          aboutPage.ravensCardsSubtitle?.length ||
          aboutPage.ravensCardsContent?.length ||
          aboutPage.ravensCards?.length > 0) && (
          <>
            <DividerBar />
            <section
              className="mx-auto grid max-w-7xl gap-y-4 text-center"
              id="ravens"
            >
              <div className="mx-auto w-full max-w-sm px-4 lg:px-0">
                <Image
                  src="/images/ravens-official-logo-simple-white.svg"
                  alt="Ravens"
                  width={900}
                  height="102"
                />
              </div>
              {aboutPage.ravensCardsTitle && (
                <H2>{aboutPage.ravensCardsTitle}</H2>
              )}
              {aboutPage.ravensCardsSubtitle && (
                <p className="font-outline text-2xl lg:text-4xl">
                  {aboutPage.ravensCardsSubtitle}
                </p>
              )}
              <div className="mt-4 grid grid-cols-1 gap-8 px-8 md:grid-cols-3 lg:mt-10">
                {aboutPage.ravensCards?.map((ravensCard, index) => {
                  return (
                    <Link
                      key={index}
                      href={ravensCard.link}
                      className={clsx(
                        'flex flex-col justify-between space-y-12 border-2 border-gray-300 px-8 pt-12 pb-8 transition-colors',
                        'hover:bg-linear-to-b hover:from-gray-900 hover:to-black'
                      )}
                      target="_blank"
                    >
                      <div>
                        <h4 className="text-2xl font-bold uppercase lg:text-3xl">
                          {ravensCard.title}
                        </h4>
                      </div>
                      <div>
                        <SanityImage
                          image={ravensCard.image}
                          className="block grayscale filter transition-all duration-500 hover:filter-none"
                          alt={ravensCard.caption}
                        />
                      </div>
                      <div className="prose prose-sm lg:prose-lg prose-invert">
                        <PortableText value={ravensCard.body} />
                      </div>
                    </Link>
                  )
                })}
              </div>
              {aboutPage.ravensCardsContent && (
                <div className="prose prose-lg mx-auto mt-4 max-w-5xl px-4 text-center text-white lg:mt-10">
                  <PortableText value={aboutPage.ravensCardsContent} />
                </div>
              )}
              <div className="flex justify-center">
                <a
                  href="https://ravensfilmworks.com/"
                  className="group hover:bg-gold mt-4 flex items-center justify-center gap-4 border-2 border-gray-300 px-3 py-2 uppercase transition-colors sm:mt-10"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="font-outline text-2xl tracking-tighter text-gray-300 group-hover:text-black lg:text-3xl">
                    View
                  </span>

                  <svg
                    className="h-4 fill-current group-hover:text-black lg:h-5"
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

                  <span className="font-outline text-2xl tracking-tighter text-gray-300 group-hover:text-black lg:text-3xl">
                    Site
                  </span>
                </a>
              </div>
            </section>
          </>
        )}
        {/* end: ravens */}

        <div>
          <DividerBar />
        </div>

        {/* trusted by */}
        <section className="mx-auto mb-36 max-w-7xl text-center" id="brands">
          <H3>Trusted By the Following</H3>
          <LittleWhiteBar yMargin="my-4 lg:my-10" />
          <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 items-center gap-6 px-4 lg:max-w-5xl lg:grid-cols-5 lg:gap-20">
            {aboutPage.brands.map((brand) => {
              return (
                <div key={brand._id}>
                  <SanityImage alt={brand.name} image={brand.image} />
                </div>
              )
            })}
          </div>
        </section>
      </div>
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
