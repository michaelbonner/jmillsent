import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import { ClientOnly } from '@/components/client-only'
import DividerBar from '@/components/divider-bar'
import { H1, H2, H3 } from '@/components/headings'
import Layout from '@/components/layout'
import LittleWhiteBar from '@/components/little-white-bar'
import SanityImage from '@/components/sanity-image'
import { PortableText, toPlainText } from '@portabletext/react'
import { useWindowSize } from '@uidotdev/usehooks'
import classNames from 'classnames'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import { sanityClient } from '../lib/sanity'
import urlForSanitySource from '../lib/urlForSanitySource'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

function About({ aboutPage }) {
  const [isGalleryModelOpen, setIsGalleryModelOpen] = useState(false)
  const [isServicesLightBoxOpen, setIsServicesLightBoxOpen] = useState(false)
  const [servicesPhotoIndex, setServicesPhotoIndex] = useState(0)

  const isDesktop = useIsDesktop()
  const [photoIndex, setPhotoIndex] = useState(0)

  const { width: browserWidth } = useWindowSize()

  const utahLocationsImages = aboutPage.utahLocations.map(
    (image) => `${urlForSanitySource(image)}?w=1800&auto=format`
  )

  const heroContent = (
    <div className="flex h-full w-screen items-center justify-center text-white">
      <div className="flex w-screen flex-col items-center justify-center px-4 text-center">
        <H1>{aboutPage.title}</H1>
        <h2 className="font-outline text-2xl uppercase lg:text-6xl">
          {aboutPage.subtitle}
        </h2>
      </div>
    </div>
  )

  const servicesImages = aboutPage.services.map((service) => {
    return {
      caption: toPlainText(service.description),
      src: `${urlForSanitySource(
        service.image
      )}?w=2400&h=1600&auto=format&fit=crop&crop=focalpoint`,
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
              <div className="my-2 h-1 w-40 shrink-0 bg-gold" />
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

      <div className="container mx-auto mt-12 px-4 text-center text-white lg:mt-24">
        <div className="container mx-auto my-24 rounded-xl bg-white px-8 py-12 text-black">
          <H2>{aboutPage.section1Title}</H2>
          {aboutPage.section1Body && (
            <div className="prose-lg mx-auto -mb-2 mt-4 max-w-6xl px-4 text-center lg:mt-10">
              <PortableText value={aboutPage.section1Body} />
            </div>
          )}

          <div
            className={classNames(
              'mt-8 grid grid-cols-3 items-center justify-center gap-2',
              'lg:mt-12 lg:flex lg:flex-nowrap lg:gap-2 lg:px-4'
            )}
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
                <div className="flex-1" key={index}>
                  <Image
                    className="rounded-lg border border-gray-100"
                    alt={altText}
                    height={height}
                    src={`${image.imageUrl}?w=${width}&h=${height}&auto=format&fit=crop&crop=focalpoint`}
                    width={width}
                    unoptimized
                  />
                </div>
              )
            })}
          </div>
        </div>

        <DividerBar />

        <div className="container mx-auto -mt-1.5 px-8 text-center">
          <H2>{aboutPage.reelVideoSectionTitle}</H2>
          <p className="font-outline text-xl uppercase leading-4 lg:text-5xl">
            {aboutPage.reelVideoSectionSubtitle}
          </p>
        </div>
        <div className="mt-4 lg:mt-10" id="reel">
          <div className="container mx-auto rounded-xl border border-gray-300 p-4 lg:p-8">
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
        </div>

        <div className="px-8">
          <DividerBar />
        </div>

        {/* services */}
        <section className="relative -mt-1.5" id="services">
          <div className="container mx-auto px-8 text-center">
            <H2>{aboutPage.section2Title}</H2>
            <p className="-mt-1.5 font-outline text-xl uppercase lg:text-5xl">
              {aboutPage.section2Subtitle}
            </p>
          </div>

          <div
            className={classNames(
              'mt-12 grid gap-6',
              'md:grid-cols-2',
              'lg:grid-cols-3'
            )}
          >
            {aboutPage.services.map((service, index) => {
              const imageSrc = urlForSanitySource(service.image)
                .width(800)
                .height(600)
                .url()

              return (
                <button
                  className={classNames(
                    'group relative rounded-lg border-2 border-gray-300 focus:outline-white',
                    'aspect-[4/4] overflow-hidden',
                    'bg-cover bg-center bg-no-repeat',
                    'lg:aspect-[3/4]',
                    'xl:aspect-[4/3]'
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
                    className={classNames(
                      'absolute inset-0 rounded-lg bg-gradient-to-t from-black/100 via-black/30 to-black/0 opacity-50 transition-all duration-300',
                      'lg:from-transparent lg:via-transparent lg:to-transparent lg:opacity-0',
                      'group-hover:from-black/80 group-hover:via-black/80 group-hover:to-black/80 group-hover:opacity-100'
                    )}
                  />
                  <div
                    className={classNames(
                      'relative z-10 flex h-full translate-y-1/2 flex-col items-center justify-center overflow-auto py-3 transition-transform duration-300',
                      'group-hover:-translate-y-0'
                    )}
                  >
                    <div
                      className="font-outline text-5xl font-light"
                      style={{
                        letterSpacing: 1,
                      }}
                    >
                      0{index + 1}
                    </div>
                    <div className="mx-auto my-2 h-1 w-40 shrink-0 bg-gold"></div>
                    <h4 className="mb-4 text-3xl font-bold uppercase">
                      {service.name}
                    </h4>
                    <div
                      className={classNames(
                        'px-4 text-sm font-light uppercase text-white opacity-0 transition-opacity',
                        'group-hover:opacity-100'
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

        <DividerBar />

        {/* Ad Formats */}
        <div className="container mx-auto my-24 rounded-xl bg-white px-8 py-12 text-black">
          <section
            className="mx-auto grid max-w-7xl gap-y-4 text-center"
            id="ad-formats"
          >
            {aboutPage.adFormatsTitle && <H2>{aboutPage.adFormatsTitle}</H2>}
            {aboutPage.adFormatsSubtitle && (
              <p className="font-outline text-2xl lg:text-4xl">
                {aboutPage.adFormatsSubtitle}
              </p>
            )}
            <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3 lg:gap-x-8">
              {aboutPage.adFormats.map((adFormatsCard, index) => {
                return (
                  <div
                    key={index}
                    className={classNames(
                      'flex flex-col justify-start space-y-12 rounded-xl bg-black px-8 pb-8 pt-12 text-white'
                    )}
                    target="_blank"
                  >
                    <div>
                      <SanityImage
                        image={adFormatsCard.image}
                        className="block"
                        alt={adFormatsCard.title}
                      />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold uppercase lg:text-3xl">
                        {adFormatsCard.title}
                      </h4>
                      <div className="mx-auto mt-4 h-1 w-40 bg-gold"></div>
                      <div className="prose prose-sm prose-invert mt-4 lg:prose-base">
                        <PortableText value={adFormatsCard.body} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {aboutPage.adFormatsContent && (
              <div className="prose prose-lg mx-auto mt-4 max-w-5xl px-4 text-center text-white lg:mt-10">
                <PortableText value={aboutPage.adFormatsContent} />
              </div>
            )}
          </section>
        </div>
        {/* end: Ad Formats */}

        <div className="px-8">
          <DividerBar />
        </div>

        {/* director section */}
        <section
          className="mx-auto grid max-w-7xl items-center gap-y-10 text-center lg:px-0"
          id="director"
        >
          <div>
            <p className="text-4xl font-bold lg:text-5xl">
              {aboutPage.directorName}
            </p>
            <p className="mt-8 font-outline text-4xl uppercase lg:mt-4 lg:text-5xl">
              {aboutPage.directorTitle}
            </p>
          </div>
          <div className="group relative rounded-xl border border-gray-300 px-4 py-4 lg:px-6">
            <SanityImage
              alt={aboutPage.directorName}
              image={aboutPage.directorImage}
              className="h-full w-full"
            />
            <div
              className={classNames(
                'absolute bottom-0 right-0 top-0 hidden h-full w-1/2 rounded-r-xl bg-gradient-to-l from-black to-transparent opacity-70 transition-all duration-500',
                'lg:block lg:pr-20',
                'group-hover:w-3/4 group-hover:opacity-80'
              )}
            />
            {(aboutPage.directorImageTitle ||
              aboutPage.directorImageSubtitle) && (
              <div className="inset-0 mt-4 flex flex-col items-center justify-center gap-y-1 sm:gap-y-2 lg:absolute lg:mt-0 lg:items-end lg:gap-y-6 lg:pr-24">
                <p className="text-lg font-bold uppercase tracking-wider sm:text-3xl lg:text-4xl">
                  {aboutPage.directorImageTitle}
                </p>
                {aboutPage.directorImageTitle &&
                  aboutPage.directorImageSubtitle && (
                    <div className="h-[2px] w-24 bg-gold md:h-1 md:w-48"></div>
                  )}
                {aboutPage.directorImageSubtitle && (
                  <p className="font-outline text-xl uppercase sm:text-3xl lg:text-4xl">
                    {aboutPage.directorImageSubtitle}
                  </p>
                )}
              </div>
            )}
          </div>
          {aboutPage.directorDescription && (
            <div className="prose-lg mx-auto max-w-5xl px-4">
              <PortableText value={aboutPage.directorDescription} />
            </div>
          )}
          <div className="flex justify-center">
            <a
              href="https://jeremymillerdirector.com/"
              className="group flex items-center justify-center gap-4 border-2 border-gray-300 px-3 py-2 uppercase transition-colors hover:bg-gold"
              rel="noreferrer"
              target="_blank"
            >
              <span className="font-outline text-2xl tracking-tighter text-gray-300 group-hover:text-black lg:text-3xl">
                View
              </span>
              <span className="text-2xl font-bold tracking-wide group-hover:text-black lg:text-3xl">
                Director&apos;s
              </span>
              <span className="font-outline text-2xl tracking-tighter text-gray-300 group-hover:text-black lg:text-3xl">
                Site
              </span>
            </a>
          </div>
        </section>
        {/* end: director section */}

        <div className="px-8">
          <DividerBar />
        </div>

        {/* team section */}
        <section className="mx-auto max-w-7xl text-center lg:px-0" id="team">
          <H2>{aboutPage.teamTitle}</H2>
          <p className="-mt-1.5 font-outline text-xl uppercase lg:text-5xl">
            {aboutPage.teamSubtitle}
          </p>
          <div
            className={classNames(
              'mt-10 grid grid-cols-2 gap-x-2 gap-y-6',
              'sm:gap-x-0 sm:gap-y-8',
              'md:grid-cols-3',
              'lg:grid-cols-8 lg:gap-x-12 lg:gap-y-6'
            )}
          >
            {aboutPage.teamMembers.map((teamMember, teamMemberIndex) => {
              const width = isDesktop ? 400 : 200
              const height = isDesktop ? 460 : 250
              return (
                <Fragment key={teamMember._id}>
                  {aboutPage.teamMembers.length % 4 === 3 &&
                    teamMemberIndex === aboutPage.teamMembers.length - 3 &&
                    browserWidth >= 1024 && <div className=""></div>}
                  {aboutPage.teamMembers.length % 4 === 2 &&
                    teamMemberIndex === aboutPage.teamMembers.length - 2 &&
                    browserWidth >= 1024 && <div className="col-span-2"></div>}
                  {aboutPage.teamMembers.length % 4 === 1 &&
                    teamMemberIndex === aboutPage.teamMembers.length - 1 &&
                    browserWidth >= 1024 && <div className="col-span-3"></div>}
                  <div className="lg:col-span-2">
                    <Image
                      alt={teamMember.name}
                      className="mx-auto rounded-xl"
                      height={height}
                      src={urlForSanitySource(teamMember.image)
                        .width(width)
                        .height(height)
                        .url()}
                      width={width}
                    />
                    <p className="mt-2 text-sm font-extrabold uppercase lg:text-2xl">
                      {teamMember.name}
                    </p>
                    <div className="px-4">
                      <LittleWhiteBar yMargin={'my-2'} />
                    </div>
                    <p className="text-sm font-bold uppercase tracking-wider lg:font-outline lg:text-2xl">
                      {teamMember.title}
                    </p>
                  </div>
                </Fragment>
              )
            })}
          </div>
        </section>
        {/* end: team section */}

        <div className="px-8">
          <DividerBar />
        </div>

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
          className="mx-auto grid max-w-7xl gap-y-10 text-center"
          id="locations"
        >
          <H2 className="!mb-0">{aboutPage.utahLocationsTitle}</H2>
          <div className="grid grid-cols-1 gap-1 px-0 lg:grid-cols-3 lg:px-0">
            {aboutPage.utahLocations.map((utahLocation, index) => {
              return (
                <button
                  aria-label={`Utah location ${index + 1}`}
                  className="h-full w-full"
                  key={index}
                  onClick={() => {
                    setIsGalleryModelOpen(true)
                    setPhotoIndex(index)
                  }}
                  style={{
                    backgroundImage: `url(${urlForSanitySource(
                      utahLocation.asset
                    ).size(600, 400)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: 'min(25vh, 300px)',
                  }}
                ></button>
              )
            })}
          </div>
          {aboutPage.utahLocationsDescription && (
            <div className="prose-lg mx-auto max-w-3xl px-4 text-center">
              <PortableText value={aboutPage.utahLocationsDescription} />
            </div>
          )}
        </section>
        {/* end: utah locations */}

        <div className="px-8">
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
          <H2 className="!mb-0 font-outline font-thin">
            {aboutPage.company3Title}
          </H2>

          <div className="container mx-auto mt-4 max-w-7xl rounded-xl border border-gray-300 p-4 lg:mt-10 lg:p-8">
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
                videoWidthAspectRatio={aboutPage.company3VideoWidthAspectRatio}
              />
            </ClientOnly>
          </div>
          {aboutPage.company3Body && (
            <div className="prose-lg mx-auto mt-6 max-w-5xl px-4 text-center font-light text-white">
              <PortableText value={aboutPage.company3Body} />
            </div>
          )}
          <div className="flex justify-center">
            <a
              href={aboutPage.company3Link || 'https://www.company3.com/'}
              className="group mt-4 flex items-center justify-center gap-4 border-2 border-gray-300 px-3 py-2 uppercase transition-colors hover:bg-gold sm:mt-10"
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
            className="mx-auto grid max-w-7xl gap-y-4 px-4 text-center"
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
                    className={classNames(
                      'flex flex-col justify-between space-y-12 border-2 border-gray-300 px-8 pb-8 pt-12 transition-colors',
                      'hover:bg-gradient-to-b hover:from-gray-900 hover:to-black'
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
                    <div className="prose-sm lg:prose-lg">
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
                className="group mt-4 flex items-center justify-center gap-4 border-2 border-gray-300 px-3 py-2 uppercase transition-colors hover:bg-gold sm:mt-10"
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

      <div className="px-8">
        <DividerBar />
      </div>

      {/* trusted by */}
      <section
        className="mx-auto max-w-7xl px-4 text-center lg:px-0"
        id="brands"
      >
        <H3>Trusted By the Following</H3>
        <LittleWhiteBar yMargin="my-4 lg:my-10" />
        <div className="grid grid-cols-4 items-center gap-6 px-4 lg:gap-20 xl:grid-cols-5">
          {aboutPage.brands.map((brand) => {
            return (
              <div key={brand._id}>
                <SanityImage image={brand.image} alt={brand.name} />
              </div>
            )
          })}
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
