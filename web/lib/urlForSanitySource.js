import { sanityClient } from '@/lib/sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const urlForSanitySource = (source) => {
  return createImageUrlBuilder(sanityClient).image(source)
}
