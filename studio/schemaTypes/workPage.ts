import {defineType, defineField, defineArrayMember} from 'sanity'
import {MdGridOn as icon} from 'react-icons/md'

export const workPage = defineType({
  name: 'workPage',
  title: 'Work Page',
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
      name: 'workPageDescription',
      title: 'Work Page Description',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'subscribeFormTitle',
      title: 'Subscribe form title',
      type: 'string',
    }),
    defineField({
      name: 'subscribeFormSuccessMessage',
      title: 'Subscribe form success message',
      type: 'string',
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: 'Work Page',
      }
    },
  },
})
