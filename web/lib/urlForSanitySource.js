import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from '../lib/sanity'

const urlForSanitySource = (source) => {
  return imageUrlBuilder(sanityClient).image(source)
}
export default urlForSanitySource
