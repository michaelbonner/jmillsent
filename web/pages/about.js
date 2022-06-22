import BackgroundTextSectionHalf from '@/components/background-text-section-half'
import DividerBar from '@/components/divider-bar'
import { H1, H2, H3 } from '@/components/headings'
import Layout from '@/components/layout'
import LittleWhiteBar from '@/components/little-white-bar'
import MediumWhiteBar from '@/components/medium-white-bar'
import SanityImage from '@/components/sanity-image'
import VideoPlayer from '@/components/video-player'
import { PortableText } from '@portabletext/react'
import classNames from 'classnames'
import groq from 'groq'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import { getClient } from '../lib/sanity'
import urlForSanitySource from '../lib/urlForSanitySource'

import useIsDesktop from 'hooks/useIsDesktop'
import 'react-image-lightbox/style.css'

function About({ aboutPage }) {
  const [isGalleryModelOpen, setIsGalleryModelOpen] = useState(false)
  const isDesktop = useIsDesktop()
  const [photoIndex, setPhotoIndex] = useState(0)

  const utahLocationsImages = aboutPage.utahLocations.map(
    (image) => `${urlForSanitySource(image)}?w=1800&auto=format`
  )

  const heroContent = (
    <div className="h-full w-screen text-white flex items-center justify-center">
      <div className="w-screen px-4 flex flex-col items-center justify-center text-center">
        <H1>{aboutPage.title}</H1>
        <h2 className="uppercase font-outline text-2xl lg:text-6xl">
          {aboutPage.subtitle}
        </h2>
      </div>
    </div>
  )

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
      <div className="container px-4 mx-auto text-white text-center mt-12 lg:mt-24">
        <H2>{aboutPage.section1Title}</H2>
        {aboutPage.section1Body && (
          <div className="mt-4 lg:mt-10 px-4 text-white prose-lg max-w-5xl text-center mx-auto -mb-2">
            <PortableText value={aboutPage.section1Body} />
          </div>
        )}

        <DividerBar />

        <div className="px-8 container mx-auto text-center -mt-1.5">
          <H2>{aboutPage.reelVideoSectionTitle}</H2>
          <p className="uppercase font-outline text-xl lg:text-5xl leading-4">
            {aboutPage.reelVideoSectionSubtitle}
          </p>
        </div>
        <div className="mt-4 lg:mt-10" id="reel">
          <div className="border border-gray-300 p-4 lg:p-8 container mx-auto">
            <VideoPlayer
              poster={aboutPage.reelVideoPoster}
              title={aboutPage.reelVideoTitle}
              videoId={aboutPage.reelVideoId}
              videoIdShort={aboutPage.reelVideoIdShort}
              client={aboutPage.reelVideoClient}
              description={aboutPage.reelVideoDescription}
              videoHeightAspectRatio={aboutPage.reelVideoHeightAspectRatio}
              videoWidthAspectRatio={aboutPage.reelVideoWidthAspectRatio}
              autoPlay={true}
            />
          </div>
        </div>

        <div className="px-8">
          <DividerBar />
        </div>

        {/* services */}
        <section className="-mt-1.5" id="services">
          <div className="px-8 container mx-auto text-center">
            <H2>{aboutPage.section2Title}</H2>
            <p className="uppercase font-outline text-xl lg:text-5xl -mt-1.5">
              {aboutPage.section2Subtitle}
            </p>
          </div>
          {aboutPage.services.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 lg:mt-10 max-w-7xl mx-auto">
              {aboutPage.services.map((service, index) => {
                return (
                  <BackgroundTextSectionHalf
                    image={service.image}
                    imageAlt={service.name}
                    title={service.name}
                    description={service.description}
                    step={index + 1}
                    key={service._id}
                  />
                )
              })}
            </div>
          )}
        </section>
        {/* end: services */}

        <DividerBar />

        {/* Ad Formats */}
        <section
          className="max-w-7xl mx-auto text-center grid gap-y-4"
          id="ad-formats"
        >
          {aboutPage.adFormatsTitle && <H2>{aboutPage.adFormatsTitle}</H2>}
          {aboutPage.adFormatsSubtitle && (
            <p className="text-2xl lg:text-4xl font-outline">
              {aboutPage.adFormatsSubtitle}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 lg:mt-10">
            {aboutPage.adFormats.map((adFormatsCard, index) => {
              return (
                <div
                  key={index}
                  className={classNames(
                    'flex flex-col justify-between space-y-12 border-2 border-gray-300 pt-12 pb-8 px-8'
                  )}
                  target="_blank"
                >
                  <div>
                    <SanityImage
                      image={adFormatsCard.image}
                      className="block filter grayscale hover:filter-none transition-all duration-500"
                      alt={adFormatsCard.caption}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl lg:text-3xl uppercase">
                      {adFormatsCard.title}
                    </h4>
                    <div className="mt-4 w-40 h-1 bg-gold mx-auto"></div>
                    <div className="prose-sm lg:prose-lg mt-4">
                      <PortableText value={adFormatsCard.body} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {aboutPage.adFormatsContent && (
            <div className="mt-4 lg:mt-10 text-white px-4 prose prose-lg max-w-5xl text-center mx-auto">
              <PortableText value={aboutPage.adFormatsContent} />
            </div>
          )}
        </section>
        {/* end: Ad Formats */}

        <div className="px-8">
          <DividerBar />
        </div>

        {/* director section */}
        <section
          className="grid max-w-7xl mx-auto items-center lg:px-0 gap-y-10 text-center"
          id="director"
        >
          <div>
            <p className="text-4xl lg:text-5xl font-bold">
              {aboutPage.directorName}
            </p>
            <p className="font-outline uppercase text-4xl lg:text-5xl mt-8 lg:mt-4">
              {aboutPage.directorTitle}
            </p>
          </div>
          <div className="relative py-4 px-4 lg:px-6 border border-gray-300">
            <SanityImage
              image={aboutPage.directorImage}
              alt={aboutPage.directorName}
            />
            <div
              className={`absolute w-full right-0 lg:pr-20 top-0 bottom-0 h-full bg-gradient-to-l from-black to-transparent opacity-70 group-hover:opacity-80 transition-all duration-500`}
            />
            {(aboutPage.directorImageTitle ||
              aboutPage.directorImageSubtitle) && (
              <div className="absolute inset-0 pr-8 lg:pr-24 flex flex-col items-end justify-center gap-y-1 sm:gap-y-2 lg:gap-y-6">
                <p className="text-lg sm:text-3xl lg:text-4xl uppercase font-bold tracking-wider">
                  {aboutPage.directorImageTitle}
                </p>
                {aboutPage.directorImageTitle &&
                  aboutPage.directorImageSubtitle && (
                    <div className="w-24 md:w-48 h-[2px] md:h-1 bg-gold"></div>
                  )}
                {aboutPage.directorImageSubtitle && (
                  <p className="font-outline text-xl sm:text-3xl lg:text-4xl uppercase">
                    {aboutPage.directorImageSubtitle}
                  </p>
                )}
              </div>
            )}
          </div>
          {aboutPage.directorDescription && (
            <div className="px-4 prose-lg mx-auto max-w-5xl">
              <PortableText value={aboutPage.directorDescription} />
            </div>
          )}
          <div className="flex justify-center">
            <Link href="https://jeremymillerdirector.com/">
              <a
                className="flex gap-4 items-center justify-center px-3 py-2 uppercase hover:bg-gold transition-colors border-2 border-gray-300 group"
                target="_blank"
              >
                <span className="text-2xl lg:text-3xl font-outline tracking-tighter text-gray-300 group-hover:text-black">
                  View
                </span>
                <span className="text-2xl lg:text-3xl font-bold tracking-wide group-hover:text-black">
                  Director&apos;s
                </span>
                <span className="text-2xl lg:text-3xl font-outline tracking-tighter text-gray-300 group-hover:text-black">
                  Site
                </span>
              </a>
            </Link>
          </div>
        </section>
        {/* end: director section */}

        <div className="px-8">
          <DividerBar />
        </div>

        {/* team section */}
        <section
          className="max-w-7xl mx-auto text-center px-4 lg:px-0"
          id="team"
        >
          <H2>{aboutPage.teamTitle}</H2>
          <p className="uppercase font-outline text-xl lg:text-5xl -mt-1.5">
            {aboutPage.teamSubtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-x-12 lg:gap-y-6 mt-10 px-8 lg:px-0">
            {aboutPage.teamMembers.map((teamMember) => {
              const width = isDesktop ? 400 : 200
              const height = isDesktop ? 460 : 250
              return (
                <div key={teamMember._id}>
                  <Image
                    src={urlForSanitySource(teamMember.image)
                      .width(width)
                      .height(height)
                      .url()}
                    height={height}
                    width={width}
                    alt={teamMember.name}
                  />
                  <p className="mt-2 uppercase font-extrabold text-xl lg:text-2xl">
                    {teamMember.name}
                  </p>
                  <LittleWhiteBar yMargin={'my-2'} />
                  <p className="uppercase font-outline text-2xl">
                    {teamMember.title}
                  </p>
                </div>
              )
            })}
          </div>
        </section>
        {/* end: team section */}

        <div className="px-8">
          <DividerBar />
        </div>

        {/* utah locations */}
        {isGalleryModelOpen && (
          <Lightbox
            mainSrc={utahLocationsImages[photoIndex]}
            nextSrc={
              utahLocationsImages[(photoIndex + 1) % utahLocationsImages.length]
            }
            prevSrc={
              utahLocationsImages[
                (photoIndex + utahLocationsImages.length - 1) %
                  utahLocationsImages.length
              ]
            }
            onCloseRequest={() => setIsGalleryModelOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (photoIndex + utahLocationsImages.length - 1) %
                  utahLocationsImages.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % utahLocationsImages.length)
            }
          />
        )}
        <section
          className="max-w-7xl mx-auto text-center grid gap-y-10"
          id="locations"
        >
          <H2 className="!mb-0">{aboutPage.utahLocationsTitle}</H2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 px-0 lg:px-0">
            {aboutPage.utahLocations.map((utahLocation, index) => {
              return (
                <button
                  className="w-full h-full"
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
            <div className="px-4 prose-lg max-w-3xl text-center mx-auto">
              <PortableText value={aboutPage.utahLocationsDescription} />
            </div>
          )}
        </section>
        {/* end: utah locations */}

        <div className="px-8">
          <DividerBar />
        </div>

        {/* company 3 */}
        <section className="-mt-1.5 grid gap-y-4 items-center" id="company3">
          <div className="w-full max-w-sm mx-auto">
            <Image
              src="/images/company-3.svg"
              alt="company3"
              width="1020"
              height="170"
            />
          </div>
          <H2 className="font-outline font-thin !mb-0">
            {aboutPage.company3Title}
          </H2>

          <div className="mt-4 lg:mt-10 border border-gray-300 p-4 lg:p-8 container mx-auto max-w-7xl">
            <VideoPlayer
              poster={aboutPage.company3VideoPoster}
              title={aboutPage.company3VideoTitle}
              videoId={aboutPage.company3VideoId}
              videoIdShort={aboutPage.company3VideoIdShort}
              client={aboutPage.company3VideoClient}
              description={aboutPage.company3VideoDescription}
              videoHeightAspectRatio={aboutPage.company3VideoHeightAspectRatio}
              videoWidthAspectRatio={aboutPage.company3VideoWidthAspectRatio}
              autoPlay={true}
            />
          </div>
          {aboutPage.company3Body && (
            <div className="mt-6 px-4 prose-lg max-w-5xl text-center mx-auto text-white font-light">
              <PortableText value={aboutPage.company3Body} />
            </div>
          )}
          <div className="flex justify-center">
            <Link href={aboutPage.company3Link || 'https://www.company3.com/'}>
              <a
                className="flex gap-4 items-center justify-center px-3 py-2 mt-4 sm:mt-10 uppercase hover:bg-gold transition-colors border-2 border-gray-300 group"
                target="_blank"
              >
                <span className="text-2xl lg:text-3xl font-outline tracking-tighter text-gray-300 group-hover:text-black">
                  Book
                </span>
                <span className="text-2xl lg:text-3xl font-bold tracking-wide group-hover:text-black">
                  Session
                </span>

                <span className="text-2xl lg:text-3xl font-outline tracking-tighter text-gray-300 group-hover:text-black">
                  Now
                </span>
              </a>
            </Link>
          </div>
        </section>
      </div>
      {/* end: company 3 */}

      <DividerBar />

      {/* ravens */}
      <section
        className="max-w-7xl mx-auto text-center px-4 grid gap-y-4"
        id="ravens"
      >
        <div className="w-full max-w-sm mx-auto px-4 lg:px-0">
          <Image
            src="/images/ravens-official-logo-simple-white.svg"
            alt="Ravens"
            width={900}
            height="102"
          />
        </div>
        {aboutPage.ravensCardsTitle && <H2>{aboutPage.ravensCardsTitle}</H2>}
        {aboutPage.ravensCardsSubtitle && (
          <p className="text-2xl lg:text-4xl font-outline">
            {aboutPage.ravensCardsSubtitle}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 mt-4 lg:mt-10">
          {aboutPage.ravensCards.map((ravensCard, index) => {
            return (
              <Link key={index} href={ravensCard.link}>
                <a
                  className={classNames(
                    'flex flex-col justify-between space-y-12 border-2 border-gray-300 pt-12 pb-8 px-8 transition-colors',
                    'hover:bg-gradient-to-b hover:from-gray-900 hover:to-black'
                  )}
                  target="_blank"
                >
                  <div>
                    <h4 className="font-bold text-2xl lg:text-3xl uppercase">
                      {ravensCard.title}
                    </h4>
                  </div>
                  <div>
                    <SanityImage
                      image={ravensCard.image}
                      className="block filter grayscale hover:filter-none transition-all duration-500"
                      alt={ravensCard.caption}
                    />
                  </div>
                  <div className="prose-sm lg:prose-lg">
                    <PortableText value={ravensCard.body} />
                  </div>
                </a>
              </Link>
            )
          })}
        </div>
        {aboutPage.ravensCardsContent && (
          <div className="mt-4 lg:mt-10 text-white px-4 prose prose-lg max-w-5xl text-center mx-auto">
            <PortableText value={aboutPage.ravensCardsContent} />
          </div>
        )}
        <div className="flex justify-center">
          <Link href="https://ravensfilmworks.com/">
            <a
              className="flex gap-4 items-center justify-center px-3 py-2 mt-4 sm:mt-10 uppercase hover:bg-gold transition-colors border-2 border-gray-300 group"
              target="_blank"
            >
              <span className="text-2xl lg:text-3xl font-outline tracking-tighter text-gray-300 group-hover:text-black">
                View
              </span>

              <svg
                className="fill-current group-hover:text-black h-4 lg:h-5"
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

              <span className="text-2xl lg:text-3xl font-outline tracking-tighter text-gray-300 group-hover:text-black">
                Site
              </span>
            </a>
          </Link>
        </div>
      </section>
      {/* end: ravens */}

      <div className="px-8">
        <DividerBar />
      </div>

      {/* trusted by */}
      <section
        className="max-w-7xl mx-auto text-center px-4 lg:px-0"
        id="brands"
      >
        <H3>Trusted By the Following</H3>
        <LittleWhiteBar yMargin="my-4 lg:my-10" />
        <div className="grid grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-20 items-center px-4">
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

      <MediumWhiteBar yMargin="mb-12 mt-12 lg:mt-24" />
    </Layout>
  )
}

export async function getStaticProps() {
  const aboutPage = await getClient().fetch(
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
