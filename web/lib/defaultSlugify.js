import slugify from 'slugify'

export const defaultSlugify = (string) => {
  return slugify(string, { lower: true, strict: true })
}
