import {defineType, defineField, defineArrayMember} from 'sanity'
import {MdEmail as icon} from 'react-icons/md'
import {slugValidation} from './utils/slugValidation'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (should-be-kebab-case-like-this)',
      type: 'slug',
      validation: slugValidation,
      options: {
        source: 'title',
        maxLength: 100,
      },
    }),
    defineField({
      name: 'seoTitle',
      title: 'Seo title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Seo description',
      type: 'text',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'representationTitle',
      title: 'Representation title',
      type: 'string',
    }),
    defineField({
      name: 'representationCards',
      title: 'Representation cards',
      type: 'array',
      of: [defineArrayMember({type: 'representationCard'})],
    }),
    defineField({
      name: 'mainFormSuccessMessage',
      title: 'Main form success message',
      type: 'string',
    }),
    defineField({
      name: 'interests',
      title: 'Main form interests',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
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
    select: {title: 'title', media: 'backgroundImage'},
  },
})
