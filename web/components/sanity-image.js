import urlForSanitySource from '@/lib/urlForSanitySource'
import Image from 'next/image'
import { getImageDimensions } from '@sanity/asset-utils'

function SanityImage({ alt, className, image }) {
  if (!image?.asset) return null

  const { height, width } = getImageDimensions(image)

  return (
    <Image
      className={className}
      src={urlForSanitySource(image).width(1920).height(1080).dpr(2).url()}
      alt={alt ?? image?.asset._ref}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={urlForSanitySource(image)
        .width(24)
        .height(24)
        .blur(10)
        .url()}
      sizes="
          (max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          40vw"
    />

    // eslint-disable-next-line jsx-a11y/alt-text
    // <Image
    //   {...imageProps}
    //   alt={alt}
    //   className={className}
    //   fill={imageProps.width ? false : true}
    //   sizes="(max-width: 800px) 100vw, 800px"
    //   unoptimized
    // />
  )
}

export default SanityImage
