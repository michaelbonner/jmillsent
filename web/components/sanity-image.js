import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/image'
import { sanityClient } from '../lib/sanity'

function SanityImage({ alt, className, image }) {
  const imageProps = useNextSanityImage(sanityClient, image)

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...imageProps}
      alt={alt}
      className={className}
      layout="responsive"
      sizes="(max-width: 800px) 100vw, 800px"
    />
  )
}

export default SanityImage
