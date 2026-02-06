import {defineType, defineField, defineArrayMember} from 'sanity'
import {MdGridOn as icon} from 'react-icons/md'

export const portfolioPage = defineType({
  name: 'portfolioPage',
  title: 'Portfolio Page',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'password',
      title: 'Password',
      type: 'string',
    }),
    defineField({
      name: 'passwordInputPrompt',
      title: 'Password Input Prompt',
      type: 'string',
    }),
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
      name: 'portfolioPageDescription',
      title: 'Portfolio Page Description',
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
        title: 'Portfolio Page',
      }
    },
  },
})
