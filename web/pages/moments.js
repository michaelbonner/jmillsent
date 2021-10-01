import { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import groq from 'groq'
import BlockContent from '@sanity/block-content-to-react'
import Image from 'next/image'
import { H1, H2 } from '../components/headings'
import Layout from '../components/layout'
import { getClient } from '../lib/sanity'
import MediumWhiteBar from '../components/medium-white-bar'

import 'react-image-lightbox/style.css'

function Moments({ momentsPage }) {
  const [isGalleryModelOpen, setIsGalleryModelOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const heroContent = (
    <div className="h-full w-full flex flex-col items-center justify-center text-white">
      <H1>{momentsPage.title}</H1>
      <h2 className="uppercase font-outline text-2xl lg:text-5xl">
        {momentsPage.subtitle}
      </h2>
    </div>
  )

  const images = momentsPage.images.map(
    (image) => `${image.imageUrl}?w=1200&auto=format`
  )

  return (
    <Layout
      title={momentsPage.seoTitle}
      description={momentsPage.seoDescription}
      heroImageUrl={momentsPage.poster || null}
      heroVideoId={momentsPage.videoId}
      heroContent={heroContent}
    >
      {isGalleryModelOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsGalleryModelOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}

      <div className="container px-4 lg:mx-auto text-white text-center my-12 lg:my-24">
        <H2>{momentsPage.section1Title}</H2>
        {momentsPage.section1Body && (
          <div className="mt-16 mb-8 prose-lg max-w-3xl text-center mx-auto">
            <BlockContent blocks={momentsPage.section1Body} />
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
            {momentsPage.section2Title}
          </p>
          <p className="mt-2 text-3xl font-outline">
            {momentsPage.section2Subtitle}
          </p>
        </div>
      </div>

      {/* utah locations */}
      <section className="max-w-7xl mx-auto text-center my-12 lg:my-36">
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-1 px-1">
          {momentsPage.images.map((image, index) => {
            const evenRow = (index / 4) % 2 >= 1

            const width = `400`
            const height = evenRow ? `450` : `250`

            return (
              <Image
                key={index}
                className="block cursor-pointer"
                src={`${image.imageUrl}?w=${width}&h=${height}&auto=format&fit=crop&crop=focalpoint`}
                height={height}
                width={width}
                alt={image.caption}
                onClick={() => {
                  setIsGalleryModelOpen(true)
                  setPhotoIndex(index)
                }}
              />
            )
          })}
        </div>
      </section>
      <MediumWhiteBar />
      {/* end: utah locations */}
    </Layout>
  )
}

export async function getStaticProps() {
  const momentsPage = await getClient().fetch(
    groq`
		*[_type == "momentsPage"][0]{
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
            section2Subtitle,
            section2Title,
            title,
            images[]{
                caption,
                "imageUrl": asset->url
            },
  		}
  		`
  )
  return {
    props: {
      momentsPage,
    },
  }
}

export default Moments
