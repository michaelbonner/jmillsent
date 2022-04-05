import groq from 'groq'
import BlockContent from '@sanity/block-content-to-react'
import Image from 'next/image'
import { Link as SmoothScrollLink, animateScroll as scroll } from 'react-scroll'
import { H1, H2, H3 } from '@/components/headings'
import Layout from '@/components/layout'
import { getClient } from '../lib/sanity'
import VideoPlayer from '@/components/video-player'
import MediumWhiteBar from '@/components/medium-white-bar'
import urlForSanitySource from '../lib/urlForSanitySource'
import LittleWhiteBar from '@/components/little-white-bar'

function Studio({ studioPage }) {
  const heroContent = (
    <div className="h-full w-full flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center mb-12">
        <H1>{studioPage.title}</H1>
        <h2 className="uppercase font-outline text-2xl lg:text-5xl">
          {studioPage.subtitle}
        </h2>
      </div>
      <SmoothScrollLink
        to="tour"
        className="flex space-x-2 items-end cursor-pointer"
        smooth={true}
        offset={-100}
        duration={500}
        style={{
          transform: 'translate3d(0, 20vh, 0)',
        }}
      >
        <span className="text-4xl uppercase font-bold">Play</span>
        <span className="text-4xl uppercase font-outline">Tour</span>
        <span className="text-2xl font-bold">&gt;</span>
      </SmoothScrollLink>
    </div>
  )

  return (
    <Layout
      title={studioPage.seoTitle}
      description={studioPage.seoDescription}
      heroImageUrl={studioPage.poster || null}
      heroVideoId={studioPage.videoId}
      heroContent={heroContent}
    >
      <div className="container px-4 lg:mx-auto text-white text-center my-12 lg:my-24">
        <H2>{studioPage.section1Title}</H2>
        {studioPage.section1Body && (
          <div className="mt-16 mb-8 prose-lg max-w-3xl text-center mx-auto">
            <BlockContent blocks={studioPage.section1Body} />
          </div>
        )}
        <Image
          src={`/images/jmills-raven-white.svg`}
          alt="Jmills"
          width="130"
          height="130"
        />
        <MediumWhiteBar />
        <div className="pt-24 px-8 container lg:mx-auto text-center">
          <p className="text-4xl font-extrabold tracking-widest">
            {studioPage.section2Title}
          </p>
          <p className="mt-2 text-3xl font-outline">
            {studioPage.section2Subtitle}
          </p>
        </div>

        <div
          id="tour"
          className="border border-white py-8 px-8 container lg:mx-auto"
        >
          <VideoPlayer
            poster={studioPage.tourVideoPoster}
            title={studioPage.tourVideoTitle}
            videoId={studioPage.tourVideoId}
            client={studioPage.tourVideoClient}
            description={studioPage.tourVideoDescription}
            videoHeightAspectRatio={studioPage.tourVideoHeightAspectRatio}
            videoWidthAspectRatio={studioPage.tourVideoWidthAspectRatio}
            autoPlay={true}
          />
        </div>

        <div className="my-12 lg:my-24">
          <MediumWhiteBar />
        </div>

        {/* studioItems */}
        <section>
          {studioPage.studioItems?.length > 0 && (
            <div className="grid grid-cols-1 gap-y-16 mt-12 max-w-7xl mx-auto">
              {studioPage.studioItems.map((service) => {
                return (
                  <div
                    className="border p-4 lg:px-8 border-white"
                    key={service._id}
                  >
                    <div className="w-full">
                      <Image
                        src={urlForSanitySource(service.image)
                          .width(1800)
                          .height(800)
                          .url()}
                        width="1800"
                        height="800"
                        alt={service.title}
                      />
                    </div>
                    <h3 className="text-center font-bold text-3xl mt-8 uppercase">
                      {service.title}
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
        {/* end: studioItems */}
      </div>
      <MediumWhiteBar />
    </Layout>
  )
}

export async function getStaticProps() {
  const studioPage = await getClient().fetch(
    groq`
		*[_type == "studioPage"][0]{
			footerSubtitle,
			footerTitle,
			poster,
			tourVideoClient,
			tourVideoHeightAspectRatio,
			tourVideoId,
			tourVideoPoster,
			tourVideoTitle,
			tourVideoDescription,
			tourVideoWidthAspectRatio,
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
