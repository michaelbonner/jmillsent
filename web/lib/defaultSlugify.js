import slugify from 'slugify'

export const defaultSlugify = (string) => {
  if (!string) return ''

  return slugify(string, { lower: true, strict: true })
}
