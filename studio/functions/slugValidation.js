export function slugValidation(Rule) {
  return Rule.required().custom((slug) => {
    if (slug.current.includes(' ')) {
      return 'Slug should be kebab case (no spaces)'
    }
    if (new RegExp('[A-Z]').test(slug.current)) {
      return 'Slug should be all lowercase'
    }
    return true
  })
}
