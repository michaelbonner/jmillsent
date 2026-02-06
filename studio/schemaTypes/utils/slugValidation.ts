import {type SlugRule} from 'sanity'

export function slugValidation(Rule: SlugRule) {
  return Rule.required().custom((slug) => {
    if (!slug?.current) return 'Slug is required'
    if (slug.current.includes(' ')) {
      return 'Slug should be kebab case (no spaces)'
    }
    if (/[A-Z]/.test(slug.current)) {
      return 'Slug should be all lowercase'
    }
    return true
  })
}
