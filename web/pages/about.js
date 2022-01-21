import groq from 'groq'
import { useState, useEffect } from 'react'
import BlockContent from '@sanity/block-content-to-react'
import Image from 'next/image'
import Link from 'next/link'
import Lightbox from 'react-image-lightbox'
import { H1, H2, H3 } from '@/components/headings'
import Layout from '@/components/layout'
import { getClient, urlFor } from '../lib/sanity'
import MediumWhiteBar from '@/components/medium-white-bar'
import urlForSanitySource from '../lib/urlForSanitySource'
import LittleWhiteBar from '@/components/little-white-bar'
import SanityImage from '@/components/sanity-image'
import useWindowSize from '../hooks/useWindowSize'

import 'react-image-lightbox/style.css'
import VideoPlayer from '@/components/video-player'

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
        <h2 className="uppercase font-outline text-2xl lg:text-5xl">
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
    >
      <div className="container px-4 lg:mx-auto text-white text-center my-12 lg:my-24">
        <H2>{aboutPage.section1Title}</H2>
        {aboutPage.section1Body && (
          <div className="mt-16 mb-8 prose-lg max-w-3xl text-center mx-auto">
            <BlockContent blocks={aboutPage.section1Body} />
          </div>
        )}
        <Image
          src={`/images/jmills-raven-white.svg`}
          alt="Jmills"
          width="130"
          height="130"
        />
        <MediumWhiteBar />
        <div className="pt-24 px-8 container lg:mx-auto text-center break-all">
          <p className="text-4xl font-extrabold tracking-widest">
            {aboutPage.section2Title}
          </p>
          <p className="mt-2 text-3xl font-outline">
            {aboutPage.section2Subtitle}
          </p>
        </div>

        {/* services */}
        <section>
          {aboutPage.services.length > 0 && (
            <div className="grid grid-cols-1 gap-y-8 mt-12 max-w-7xl mx-auto">
              {aboutPage.services.map((service) => {
                return (
                  <div
                    className="border p-4 lg:px-8 border-white"
                    key={service._id}
                  >
                    <div className="w-full">
                      <Image
                        src={`${urlForSanitySource(
                          service.image
                        )}?w=1200&h=600&auto=format&fit=crop&crop=focalpoint`}
                        height={600}
                        width={1200}
                        alt={service.title}
                      />
                    </div>
                    <h3 className="text-center font-bold text-3xl mt-8">
                      {service.name}
                    </h3>
                    {service.description && (
                      <>
                        <LittleWhiteBar yMargin={'my-4'} />
                        <div className="mt-4 max-w-5xl prose-lg text-center mx-auto text-white font-light">
                          <BlockContent blocks={service.description} />
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>
        <div className="mt-12 lg:mt-24">
          <MediumWhiteBar />
        </div>
        {/* end: services */}

        {/* company 3 */}
        <section>
          <div className="mt-12 lg:mt-24 border border-white py-8 px-8 container lg:mx-auto max-w-7xl">
            <VideoPlayer
              poster={aboutPage.company3VideoPoster}
              title={aboutPage.company3VideoTitle}
              videoId={aboutPage.company3VideoId}
              clientName={aboutPage.company3VideoClient}
              videoHeightAspectRatio={aboutPage.company3VideoHeightAspectRatio}
              videoWidthAspectRatio={aboutPage.company3VideoWidthAspectRatio}
            />
            <p className="text-4xl mt-8 flex items-center justify-center space-x-6">
              <span className="uppercase font-extrabold text-2xl lg:text-5xl">
                {aboutPage.company3VideoClient}
              </span>
              <span className="uppercase font-outline text-2xl lg:text-5xl">
                {aboutPage.company3VideoTitle}
              </span>
            </p>
          </div>
          <div className="mt-12 lg:mt-24">
            <H3>{aboutPage.company3Title}</H3>
            {aboutPage.company3Body && (
              <div className="mt-4 mb-8 prose-lg max-w-3xl text-center mx-auto text-white">
                <BlockContent blocks={aboutPage.company3Body} />
              </div>
            )}
          </div>
          <Link href={aboutPage.company3Link || 'https://www.company3.com/'}>
            <a
              className="mt-12 flex items-center justify-center text-4xl font-outline uppercase space-x-6 max-w-3xl mx-auto group"
              target="_blank"
            >
              <span className="group-hover:-translate-x-2 transform transition-all">
                View
              </span>
              <div>
                <Image
                  alt="Company 3"
                  height="100"
                  src="/images/company-3-center.svg"
                  width="50"
                />
              </div>
              <span className="group-hover:translate-x-2 transform transition-all">
                Site
              </span>
            </a>
          </Link>
        </section>
        <MediumWhiteBar />
      </div>
      {/* end: company 3 */}

      {/* director section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto items-center my-12 lg:my-24 px-4">
        <div className="w-full">
          <SanityImage
            image={aboutPage.directorImage}
            alt={aboutPage.directorName}
          />
        </div>
        <div className="lg:col-span-2 text-center">
          <p className="uppercase font-extrabold text-xl lg:text-4xl mb-4">
            {aboutPage.directorTitle}
          </p>
          <p className="font-outline text-4xl">{aboutPage.directorName}</p>
          {aboutPage.directorDescription && (
            <div className="prose prose-lg text-gray-300 mx-auto mt-12">
              <BlockContent blocks={aboutPage.directorDescription} />
            </div>
          )}
          <Link href="https://jeremymillerdirector.com/">
            <a className="flex items-end justify-center space-x-4 mt-12 transform transition-all hover:translate-x-1">
              <span className="uppercase font-extrabold text-xl lg:text-3xl">
                View Director&apos;s
              </span>{' '}
              <span className="uppercase font-outline text-xl lg:text-3xl">
                SITE
              </span>{' '}
              <span className="font-bold text-xl lg:text-2xl">&gt;</span>
            </a>
          </Link>
        </div>
      </section>
      <MediumWhiteBar />
      {/* end: director section */}

      {/* team section */}
      <section className="max-w-7xl mx-auto text-center my-12 lg:my-36 px-4">
        <H3>MEET THE WORLD CLASS</H3>
        <p className="font-outline text-4xl">JME TEAM</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-20 mt-12">
          {aboutPage.teamMembers.map((teamMember) => {
            const width = 400
            const height = isDesktop ? 644 : 500
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
                <p className="uppercase font-outline text-xl">
                  {teamMember.title}
                </p>
              </div>
            )
          })}
        </div>
      </section>
      <MediumWhiteBar />
      {/* end: team section */}

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
      <section className="max-w-7xl mx-auto text-center my-12 lg:my-36 px-4">
        <H2>{aboutPage.utahLocationsTitle}</H2>
        {aboutPage.utahLocationsDescription && (
          <div className="mt-8 mb-8 prose-lg max-w-3xl text-center mx-auto">
            <BlockContent blocks={aboutPage.utahLocationsDescription} />
          </div>
        )}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-1">
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
      <MediumWhiteBar />
      {/* end: utah locations */}

      {/* ravens */}
      <section className="max-w-7xl mx-auto text-center my-12 lg:my-36 px-4">
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 my-12 lg:my-24">
          {aboutPage.ravensCards.map((ravensCard, index) => {
            return (
              <div
                className="flex flex-col justify-between space-y-12 border-2 border-gold py-8 px-12"
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
                  <h4 className="font-bold text-4xl uppercase mt-12">
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
                <div className="prose-lg">
                  <BlockContent blocks={ravensCard.body} />
                </div>
              </div>
            )
          })}
        </div>
        <H2>{aboutPage.ravensCardsTitle}</H2>
        <p className="mt-2 text-3xl font-outline">
          {aboutPage.ravensCardsSubtitle}
        </p>
        {aboutPage.ravensCardsContent && (
          <div className="mt-8 mb-8 prose-lg max-w-3xl text-center mx-auto">
            <BlockContent blocks={aboutPage.ravensCardsContent} />
          </div>
        )}
        <Link href="https://ravensfilmworks.com/">
          <a className="flex items-end justify-center space-x-4 mt-12 transform transition-all hover:translate-x-1">
            <span className="uppercase font-extrabold text-xl lg:text-3xl">
              View
            </span>{' '}
            <span className="uppercase font-outline text-xl lg:text-3xl">
              SITE
            </span>{' '}
            <span className="font-bold text-xl lg:text-2xl">&gt;</span>
          </a>
        </Link>
      </section>
      <MediumWhiteBar />
      {/* end: ravens */}

      {/* trusted by */}
      <section className="max-w-7xl mx-auto text-center my-12 lg:my-36 px-4">
        <H3>Trusted By the Following</H3>
        <LittleWhiteBar />
        <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-20 mt-12 items-center">
          {aboutPage.brands.map((brand) => {
            return (
              <div key={brand._id}>
                <SanityImage image={brand.image} alt={brand.name} />
              </div>
            )
          })}
        </div>
      </section>
      <MediumWhiteBar />
      {/* end: trusted by */}
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
			videoClient,
			videoId,
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
