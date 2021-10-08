import { useEffect, useState } from 'react'
import Lightbox from 'react-image-lightbox'
import groq from 'groq'
import Image from 'next/image'
import { H1, H2 } from '../components/headings'
import Layout from '../components/layout'
import { getClient } from '../lib/sanity'
import MediumWhiteBar from '../components/medium-white-bar'

import 'react-image-lightbox/style.css'
import LittleWhiteBar from '../components/little-white-bar'
import useWindowSize from '../hooks/useWindowSize'
import classNames from 'classnames'

function Moments({ momentsPage }) {
  const [isGalleryModelOpen, setIsGalleryModelOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const size = useWindowSize()

  const imageTypeMap = [
    {
      width: 400,
      height: 400,
      colSpan: 'col-span-2',
    },
    {
      width: 600,
      height: 400,
      colSpan: 'col-span-3',
    },
    {
      width: 800,
      height: 600,
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
    1, 1, 1, 1,
    // row 3
    1, 0, 0, 0, 1,
  ]

  useEffect(() => {
    if (size.width > 1024) {
      setIsDesktop(true)
    } else {
      setIsDesktop(false)
    }
  }, [size.width])

  const heroContent = (
    <div className="h-full w-full flex flex-col items-center justify-center text-white">
      <H1>{momentsPage.title}</H1>
      <h2 className="uppercase font-outline text-2xl lg:text-5xl">
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
            'mt-0 grid grid-cols-1 lg:grid-cols-12 gap-1 px-1'
          )}
        >
          {momentsPage.images.map((image, index) => {
            const desktopIndex = index % 17
            const imageType =
              imageTypeMap[desktopImageTypeSequence[desktopIndex]]
            const width = isDesktop ? imageType.width : 600

            const height = isDesktop ? imageType.height : 800

            return (
              <div
                className={classNames(
                  imageType.colSpan,
                  'bpd-gallery-image-container'
                )}
                key={index}
              >
                <Image
                  alt={image.caption}
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
