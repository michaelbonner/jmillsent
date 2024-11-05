import classNames from 'classnames'
import Image from 'next/image'
import { useRef, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import 'yet-another-react-lightbox/styles.css'

export const MomentsGallery = ({ images = [] }) => {
  const [isGalleryModelOpen, setIsGalleryModelOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

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

  const zoomRef = useRef(null)

  if (typeof window === 'undefined') return null

  return (
    <div>
      <Lightbox
        close={() => setIsGalleryModelOpen(false)}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
          closeOnPullUp: true,
        }}
        index={photoIndex}
        open={isGalleryModelOpen}
        plugins={[Zoom]}
        slides={images.map((image) => ({
          src: image.lightboxSource,
          caption: image.altText,
          width: 1800,
        }))}
        zoom={{ ref: zoomRef }}
      />

      <section className="mx-auto max-w-13xl text-center">
        {/* desktop grid */}
        <div
          className={classNames(
            'mt-0 hidden grid-cols-2 gap-4 px-1',
            'lg:grid lg:grid-cols-12'
          )}
        >
          {images.map((image, index) => {
            const desktopIndex = index % 17
            const imageType =
              imageTypeMap[desktopImageTypeSequence[desktopIndex]]
            const width = imageType.width
            const height = imageType.height

            return (
              <div
                className={classNames(
                  imageType.colSpan,
                  'bpd-gallery-image-container'
                )}
                key={index}
              >
                <Image
                  alt={image.altText}
                  className={`bpd-gallery-image cursor-pointer`}
                  height={height}
                  onClick={() => {
                    setIsGalleryModelOpen(true)
                    setPhotoIndex(index)
                  }}
                  src={`${image.imageUrl}?w=${width}&h=${height}&auto=format&fit=crop&crop=focalpoint`}
                  width={width}
                  unoptimized
                />
              </div>
            )
          })}
        </div>
        {/* end: desktop grid */}

        {/* mobile grid */}
        <div
          className={classNames(
            'mt-0 grid grid-cols-2 gap-4 px-1',
            'lg:hidden lg:grid-cols-12'
          )}
        >
          {images.map((image, index) => {
            const width = 800
            const height = 600

            return (
              <div
                className={classNames('bpd-gallery-image-container')}
                key={index}
              >
                <Image
                  alt={image.altText}
                  className={`bpd-gallery-image cursor-pointer`}
                  height={height}
                  onClick={() => {
                    setIsGalleryModelOpen(true)
                    setPhotoIndex(index)
                  }}
                  src={`${image.imageUrl}?w=${width}&h=${height}&auto=format&fit=crop&crop=focalpoint`}
                  width={width}
                  unoptimized
                />
              </div>
            )
          })}
        </div>
        {/* end: mobile grid */}
      </section>
    </div>
  )
}

export default MomentsGallery
