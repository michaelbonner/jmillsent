import { sanityClient } from '@/lib/sanity'
import imageUrlBuilder from '@sanity/image-url'

export const urlForSanitySource = (source) => {
  return imageUrlBuilder(sanityClient).image(source)
}
