import urlForSanitySource from '@/lib/urlForSanitySource'
import Image from 'next/image'
import { getImageDimensions } from '@sanity/asset-utils'

function SanityImage({ alt, className, image }) {
  if (!image?.asset) return null

  const { height, width } = getImageDimensions(image)

  const trimmedWidth = width > 2000 ? 2000 : width
  const trimmedHeight = width > 2000 ? height * (2000 / width) : height

  return (
    <Image
      className={className}
      src={urlForSanitySource(image)
        .dpr(2)
        .width(trimmedWidth)
        .height(trimmedHeight)
        .url()}
      alt={alt ?? image?.asset._ref}
      width={trimmedWidth}
      height={trimmedHeight}
      placeholder="blur"
      blurDataURL={urlForSanitySource(image)
        .width(24)
        .height(24)
        .blur(10)
        .url()}
      sizes="(max-width: 800px) 100vw, 800px"
      fill={width ? false : true}
    />
  )
}

export default SanityImage
