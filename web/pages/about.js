import BackgroundText from '@/components/background-text-section'
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
import { useEffect, useState } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import useWindowSize from '../hooks/useWindowSize'
import { getClient } from '../lib/sanity'
import urlForSanitySource from '../lib/urlForSanitySource'

function About({ aboutPage }) {
  const [isGalleryModelOpen, setIsGalleryModelOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const size = useWindowSize()

  useEffect(() => {
    if (size.width > 1024) {
      setIsDesktop(true)
    } else {
      setIsDesktop(false)
    }
  }, [size.width])

  const utahLocationsImages = aboutPage.utahLocations.map(
    (image) => `${urlForSanitySource(image)}?w=1800&auto=format`
  )

  const heroContent = (
    <div className="h-full w-full text-white flex items-center justify-center">
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
      heroVideoId={aboutPage.videoId}
      heroContent={heroContent}
      heroVideoHeightInPixels={aboutPage.headerVideoHeightInPixels}
      heroVideoWidthInPixels={aboutPage.headerVideoWidthInPixels}
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
        <div className="mt-4 lg:mt-10">
          <div className="border border-white py-8 px-8 container mx-auto">
            <VideoPlayer
              poster={aboutPage.reelVideoPoster}
              title={aboutPage.reelVideoTitle}
              videoId={aboutPage.reelVideoId}
              client={aboutPage.reelVideoClient}
              description={aboutPage.reelVideoDescription}
              videoHeightAspectRatio={aboutPage.reelVideoHeightAspectRatio}
              videoWidthAspectRatio={aboutPage.reelVideoWidthAspectRatio}
              autoPlay={true}
            />
          </div>
        </div>

        <DividerBar />

        {/* services */}
        <section className="-mt-1.5">
          <div className="px-8 container mx-auto text-center">
            <H2>{aboutPage.section2Title}</H2>
            <p className="uppercase font-outline text-xl lg:text-5xl -mt-1.5">
              {aboutPage.section2Subtitle}
            </p>
          </div>
          {aboutPage.services.length > 0 && (
            <div className="grid grid-cols-1 gap-y-6 lg:gap-y-12 mt-4 lg:mt-10 max-w-7xl mx-auto">
              {aboutPage.services.map((service, index) => {
                const leftOrRight = service.rightAlign ? 'right' : 'left'
                return (
                  <BackgroundText
                    leftOrRight={leftOrRight}
                    image={service.image}
                    imageAlt={service.name}
                    title={service.name}
                    description={service.description}
                    key={service._id}
                  />
                )
              })}
            </div>
          )}
        </section>
        {/* end: services */}

        <DividerBar />

        {/* company 3 */}
        <section className="-mt-1.5">
          <H3>{aboutPage.company3Title}</H3>
          {aboutPage.company3Body && (
            <div className="px-4 prose-lg max-w-3xl text-center mx-auto text-white">
              <PortableText value={aboutPage.company3Body} />
            </div>
          )}

          <div className="mt-4 lg:mt-10 border border-white py-8 px-8 container mx-auto max-w-7xl">
            <VideoPlayer
              poster={aboutPage.company3VideoPoster}
              title={aboutPage.company3VideoTitle}
              videoId={aboutPage.company3VideoId}
              client={aboutPage.company3VideoClient}
              description={aboutPage.company3VideoDescription}
              videoHeightAspectRatio={aboutPage.company3VideoHeightAspectRatio}
              videoWidthAspectRatio={aboutPage.company3VideoWidthAspectRatio}
              autoPlay={true}
            />
          </div>
          <div className="inline-block">
            <Link href={aboutPage.company3Link || 'https://www.company3.com/'}>
              <a
                className="flex gap-4 items-center justify-center px-3 py-2 mt-4 sm:mt-10 uppercase hover:bg-gold transition-colors border-2 border-white"
                target="_blank"
              >
                <span className="text-2xl font-outline tracking-tighter text-gray-300">
                  View
                </span>
                <svg
                  className="fill-current"
                  enableBackground="new 0 0 150 25"
                  viewBox="0 0 150 25"
                  xmlns="http://www.w3.org/2000/svg"
                  height={22}
                >
                  <path d="m95.3 12.8v-11.3h7.7c.3 0 .6.4.8.6 2 3.3 4.1 6.5 6.1 9.8.2.3.4.5.7 1v-11.4h2.4 7.2c.7-.1 1.4.3 1.7.9 1.2 2.1 2.6 4.1 3.9 6.2 1.4-2.2 2.7-4.3 4.1-6.4.3-.4.7-.6 1.2-.7 1.3-.1 2.6 0 3.8 0 1.4-.1 2.8-.3 4.3-.4 3.1-.2 6 .4 8.2 2.8 2.6 2.9 1.6 6.7-2.3 8.7 1.7.5 3.1 1.3 3.8 3.1.7 1.6.5 3.4-.5 4.8-1.3 2-3.4 3-5.7 3.4-3 .4-6 .4-8.6-1.4-2-1.3-3.1-3.1-3.5-5.6h5.8c.2 0 .5.4.6.6 1 1.9 3.6 2.6 5.3 1.2.5-.4.9-1.5.8-2.2-.2-1.2-1.2-1.7-2.3-1.7-.8-.1-1.7 0-2.7 0v-4.3h2.5c1.4 0 2.4-1.1 2.4-2.4 0-1.4-.9-2.2-2.4-2.2-2 0-2.9.6-3.4 2.6-1 0-1.9.1-2.9 0s-1.5.3-2 1.1c-.7 1.2-1.4 2.3-2.1 3.4-.8 1.1-1.1 2.4-1.1 3.8.1 2.3 0 4.6 0 6.9h-6.4c0-1.5-.1-3.1 0-4.6.4-3.1-.5-5.6-2.4-8.1-1.1-1.5-2-3.1-3.2-4.7v17.4c-2.2 0-4.3 0-6.4 0-.3 0-.6-.4-.8-.8-2.5-4-5-8-7.5-12-.2-.3-.4-.6-.8-1.2v14c-2.8 0-5.5 0-8.1 0-.3 0-.7-.4-.8-.7-.5-1.1-.9-2.3-1.4-3.5-2.6 0-5.2 0-7.9 0-.3 0-.8.4-.9.7-.6 1.1-.7 2.8-1.6 3.3-1 .6-2.6.2-4 .3-.8 0-1.5 0-2.4 0 1-2.5 1.9-4.9 2.9-7.2l-8.8.4v6.7h-6.1v-13.8l-.2-.1c-1.1 2.8-2.3 5.7-3.4 8.5-.6 1.5-1.1 3-1.8 4.4-.3.4-.7.7-1.2.8-1.3.1-2.8.4-3.7-.2-.8-.5-1-2.1-1.5-3.2-1.4-3.4-2.7-6.8-4.3-10.2v13.5h-6.1v-4.2c-2.6 3.1-5.7 4.8-9.5 4.7-3.8 0-6.9-1.7-9.3-4.8-1.6 2.7-3.9 4.2-6.7 4.6-3.4.5-6.8.1-9.6-2.1-5.2-4-5-12.6-1.5-16.9 3.9-4.7 14-5.5 17.8.9 2.4-3 5.5-4.6 9.2-4.6s6.8 1.6 9.4 4.7v-4.1h9.6c.7 1.8 1.5 3.8 2.2 5.7.8 1.9 1.5 3.8 2.4 5.9 1.4-3.6 2.8-7.2 4.2-10.7.3-.7.7-1 1.5-1 4.9 0 9.7-.1 14.6.1 2.9.1 5.5 1.2 7 4.1.5-1.2 1.1-2.2 1.4-3.3.2-.8.6-.9 1.3-.9 1.8 0 3.7.1 5.5 0 .8 0 1.2.3 1.5 1 1.4 3.5 2.7 6.9 4.1 10.4zm-79.3-3.6c-.8-2.2-1.7-3-3.2-3.1-2.6-.1-3.9.5-4.6 2.5-1 2.7-1 5.5.2 8.1 1 2.2 4.1 3.1 6 1.6.8-.6 1.2-1.7 2-2.7h2.8v-6.4z" />
                </svg>

                <span className="text-2xl font-outline tracking-tighter text-gray-300">
                  Site
                </span>
              </a>
            </Link>
          </div>
        </section>
      </div>
      {/* end: company 3 */}

      <div className="px-8">
        <DividerBar />
      </div>

      {/* director section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto items-center px-4">
        <div className="w-1/2 lg:w-full mx-auto">
          <SanityImage
            image={aboutPage.directorImage}
            alt={aboutPage.directorName}
          />
        </div>
        <div className="lg:col-span-2 text-center">
          <p className="uppercase font-extrabold text-xl lg:text-4xl mt-8 lg:mt-0 mb-4">
            {aboutPage.directorTitle}
          </p>
          <p className="font-outline text-4xl">{aboutPage.directorName}</p>
          {aboutPage.directorDescription && (
            <div className="px-4 prose-lg mx-auto mt-4 sm:mt-10">
              <PortableText value={aboutPage.directorDescription} />
            </div>
          )}
          <div className="inline-block">
            <Link href="https://jeremymillerdirector.com/">
              <a
                className="flex gap-4 items-center justify-center px-3 py-2 mt-4 sm:mt-10 uppercase hover:bg-gold transition-colors border-2 border-white"
                target="_blank"
              >
                <span className="text-2xl font-outline tracking-tighter text-gray-300">
                  View
                </span>
                <span className="text-2xl font-bold tracking-wide">
                  Director&apos;s
                </span>
                <span className="text-2xl font-outline tracking-tighter text-gray-300">
                  Site
                </span>
              </a>
            </Link>
          </div>
        </div>
      </section>
      {/* end: director section */}

      <div className="px-8">
        <DividerBar />
      </div>

      {/* team section */}
      <section className="max-w-7xl mx-auto text-center px-4 -mt-1.5">
        <H3>MEET THE WORLD CLASS</H3>
        <p className="max-w-max py-2 px-6 mx-auto font-outline text-5xl">
          JME TEAM
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-x-10 lg:gap-y-20 mt-10">
          {aboutPage.teamMembers.map((teamMember) => {
            const width = isDesktop ? 400 : 200
            const height = isDesktop ? 644 : 250
            return (
              <div key={teamMember._id}>
                <div className="px-8">
                  <Image
                    src={urlForSanitySource(teamMember.image)
                      .width(width)
                      .height(height)
                      .url()}
                    height={height}
                    width={width}
                    alt={teamMember.name}
                  />
                </div>
                <p className="mt-4 uppercase font-extrabold text-xl lg:text-2xl">
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
      <section className="max-w-7xl mx-auto text-center px-4 -mt-1.5">
        <H2>{aboutPage.utahLocationsTitle}</H2>
        {aboutPage.utahLocationsDescription && (
          <div className="px-4 prose-lg max-w-3xl text-center mx-auto">
            <PortableText value={aboutPage.utahLocationsDescription} />
          </div>
        )}
        <div className="mt-4 lg:mt-10 grid grid-cols-1 lg:grid-cols-3 gap-1 px-4">
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
      </section>
      {/* end: utah locations */}

      <div className="px-8">
        <DividerBar />
      </div>

      {/* ravens */}
      <section className="max-w-7xl mx-auto text-center px-4 -mt-1.5">
        <H2>{aboutPage.ravensCardsTitle}</H2>
        <p className="text-2xl lg:text-4xl font-outline">
          {aboutPage.ravensCardsSubtitle}
        </p>
        {aboutPage.ravensCardsContent && (
          <div className="mt-4 lg:mt-10 text-white px-4 prose prose-lg max-w-3xl text-center mx-auto">
            <PortableText value={aboutPage.ravensCardsContent} />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 mt-4 lg:mt-10">
          {aboutPage.ravensCards.map((ravensCard, index) => {
            return (
              <div
                className="flex flex-col justify-between space-y-12 border-2 border-gold py-8 px-8"
                key={index}
              >
                <div>
                  <Image
                    className="block filter grayscale hover:filter-none transition-all duration-500"
                    src={`/images/ravens-logo-white.svg`}
                    height="197"
                    width="646"
                    alt={ravensCard.caption}
                  />
                  <h4 className="font-bold text-2xl md:text-xl lg:text-4xl uppercase mt-12">
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
              </div>
            )
          })}
        </div>
        <div className="inline-block">
          <Link href="https://ravensfilmworks.com/">
            <a
              className="flex gap-4 items-center justify-center px-3 py-2 mt-4 sm:mt-10 uppercase hover:bg-gold transition-colors border-2 border-white"
              target="_blank"
            >
              <span className="text-2xl font-outline tracking-tighter text-gray-300">
                View
              </span>

              <svg
                className="fill-current"
                enableBackground="new 0 0 6098.1 642.5"
                height={17}
                viewBox="0 0 6098.1 642.5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#fff">
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

              <span className="text-2xl font-outline tracking-tighter text-gray-300">
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
      <section className="max-w-7xl mx-auto text-center px-4 -mt-1.5">
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
			reelVideoPoster,
			reelVideoTitle,
			reelVideoWidthAspectRatio,
			videoClient,
			videoId,
      headerVideoWidthInPixels,
      headerVideoHeightInPixels,
      brands[]->,
      company3Body,
      company3Link,
      company3Title,
      company3VideoClient,
      company3VideoDescription,
      directorDescription,
      directorImage,
      directorName,
      directorTitle,
      section2Subtitle,
      section2Title,
      services[]->,
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
          body
      },
      ravensCardsTitle,
      ravensCardsSubtitle,
      ravensCardsContent,
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
