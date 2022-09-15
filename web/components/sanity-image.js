import { useNextSanityImage } from 'next-sanity-image'
import Image from 'next/future/image'
import { getClient } from '../lib/sanity'

function SanityImage({ alt, className, image }) {
  const imageProps = useNextSanityImage(getClient(), image)

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
