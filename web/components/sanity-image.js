import urlForSanitySource from '@/lib/urlForSanitySource'
import { getImageDimensions } from '@sanity/asset-utils'
import Image from 'next/image'

function SanityImage({ alt, className, image }) {
  if (!image?.asset) return null

  const { height, width } = getImageDimensions(image)

  return (
    <Image
      className={className}
      src={urlForSanitySource(image).width(width).height(height).url()}
      alt={alt ?? image?.asset._ref}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={urlForSanitySource(image)
        .width(24)
        .height(24)
        .blur(10)
        .url()}
      sizes="(max-width: 800px) 100vw, 800px"
    />
  )
}

export default SanityImage
