import {defineType, defineField, defineArrayMember} from 'sanity'
import {BsNewspaper as icon} from 'react-icons/bs'

export const newsPage = defineType({
  name: 'newsPage',
  title: 'News Page',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
    }),
    defineField({
      name: 'newsPageDescription',
      title: 'News Page Description',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'posterHeightInPixels',
      title: 'Poster height in pixels',
      type: 'number',
    }),
    defineField({
      name: 'posterWidthInPixels',
      title: 'Poster width in pixels',
      type: 'number',
    }),
    defineField({
      name: 'newsItems',
      title: 'News Articles',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'newsItem'}]})],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: 'News Page',
      }
    },
  },
})
