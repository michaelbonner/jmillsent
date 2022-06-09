import BackgroundText from '@/components/background-text-section'
import DividerBar from '@/components/divider-bar'
import { H1, H2, H3 } from '@/components/headings'
import Layout from '@/components/layout'
import LittleWhiteBar from '@/components/little-white-bar'
import MediumWhiteBar from '@/components/medium-white-bar'
import SanityImage from '@/components/sanity-image'
import VideoPlayer from '@/components/video-player'
import { PortableText } from '@portabletext/react'
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
          <Link href={aboutPage.company3Link || 'https://www.company3.com/'}>
            <a
              className="mt-4 sm:mt-10 px-12 flex items-center justify-center max-w-3xl mx-auto transform transition-all hover:translate-x-1"
              target="_blank"
            >
              <Image
                alt="Visit Company 3 Site"
                height="64"
                src="/images/JME-CO3-link.svg"
                width="300"
              />
            </a>
          </Link>
        </section>
      </div>
      {/* end: company 3 */}

      <DividerBar />

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
          <Link href="https://jeremymillerdirector.com/">
            <a className="flex items-end justify-center px-12 mt-4 sm:mt-10 transform transition-all hover:translate-x-1">
              <Image
                alt="Visit Director Site"
                height="51"
                src="/images/JME-Director-link.svg"
                width="300"
              />
            </a>
          </Link>
        </div>
      </section>
      {/* end: director section */}

      <DividerBar />

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

      <DividerBar />

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

      <DividerBar />

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
        <Link href="https://ravensfilmworks.com/">
          <a className="flex justify-center mt-4 px-14 sm:mt-10 mx-auto transform transition-all hover:translate-x-1">
            <Image
              alt="Visit Ravens Site"
              height="49"
              src="/images/JME-Ravens-link.svg"
              width="300"
            />
          </a>
        </Link>
      </section>
      {/* end: ravens */}

      <DividerBar />

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
