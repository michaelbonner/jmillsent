import { H1 } from '@/components/headings'
import Layout from '@/components/layout'
import LittleWhiteBar from '@/components/little-white-bar'
import MediumWhiteBar from '@/components/medium-white-bar'
import classNames from 'classnames'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import capitalize from 'just-capitalize'
import shuffle from 'just-shuffle'
import Image from 'next/image'
import { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import { getClient } from '../lib/sanity'

import 'react-image-lightbox/style.css'

function Moments({ momentsPage }) {
  const [isGalleryModelOpen, setIsGalleryModelOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const isDesktop = useIsDesktop()

  const imageTypeMap = [
    {
      width: 400,
      height: 300,
      colSpan: 'col-span-2',
    },
    {
      width: 600,
      height: 300,
      colSpan: 'col-span-3',
    },
    {
      width: 800,
      height: 400,
      colSpan: 'col-span-4',
    },
    {
      width: 600,
      height: 400,
      colSpan: 'col-span-3',
    },
  ]

  const desktopImageTypeSequence = [
    // row 0
    2, 2, 2,
    // row 1
    1, 0, 0, 0, 1,
    // row 2
    3, 3, 3, 3,
    // row 3
    0, 1, 1, 0, 0,
  ]

  const heroContent = (
    <div className="h-full w-full flex flex-col items-center justify-center text-white">
      <H1>{momentsPage.title}</H1>
      <h2 className="uppercase font-outline text-2xl lg:text-6xl">
        {momentsPage.subtitle}
      </h2>
    </div>
  )

  const images = momentsPage.images.map(
    (image) => `${image.imageUrl}?w=1800&auto=format`
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
      <section className="max-w-13xl mx-auto text-center my-12 lg:mt-16 px-6">
        <div
          className={classNames(
            'mt-0 grid grid-cols-2 lg:grid-cols-12 gap-4 px-1'
          )}
        >
          {momentsPage.images.map((image, index) => {
            const desktopIndex = index % 17
            const imageType =
              imageTypeMap[desktopImageTypeSequence[desktopIndex]]
            const width = isDesktop ? imageType.width : 800

            const height = isDesktop ? imageType.height : 600
            const altText =
              image.caption ||
              capitalize(
                image.name
                  .replace(/-/g, ' ')
                  .replace(/_/g, ' ')
                  .replace('.jpg', '')
              )

            return (
              <div
                className={classNames(
                  isDesktop ? imageType.colSpan : '',
                  'bpd-gallery-image-container'
                )}
                key={index}
              >
                <Image
                  alt={altText}
                  className={`cursor-pointer bpd-gallery-image`}
                  height={height}
                  onClick={() => {
                    setIsGalleryModelOpen(true)
                    setPhotoIndex(index)
                  }}
                  src={`${image.imageUrl}?w=${width}&h=${height}&auto=format&fit=crop&crop=focalpoint`}
                  width={width}
                />
              </div>
            )
          })}
        </div>
      </section>
      <MediumWhiteBar yMargin="mb-8 mt-12 lg:mt-24" />
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
          "imageUrl": asset->url,
          "name": asset->originalFilename,
      },
    }
    `
  )

  momentsPage.images = shuffle(momentsPage.images)

  return {
    props: {
      momentsPage,
    },
  }
}

export default Moments
