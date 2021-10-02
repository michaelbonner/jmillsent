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
import LittleWhiteBar from '../components/little-white-bar'

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

      <LittleWhiteBar />

      {/* moments images */}
      <section className="max-w-7xl mx-auto text-center my-12 lg:mt-16">
        <div className="mt-0 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-1 px-1">
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
      {/* end: moments images */}
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
