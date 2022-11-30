import { MdEmail as icon } from 'react-icons/md'
import { slugValidation } from '../functions/slugValidation'

export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (should-be-kebab-case-like-this)',
      type: 'slug',
      validation: slugValidation,
      options: {
        source: 'title',
        maxLength: 100,
      },
    },
    {
      name: 'seoTitle',
      title: 'Seo title',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'Seo description',
      type: 'text',
    },
    {
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'representationTitle',
      title: 'Representation title',
      type: 'string',
    },
    {
      name: 'representationCards',
      title: 'Representation cards',
      type: 'array',
      of: [{ type: 'representationCard' }],
    },
    {
      name: 'mainFormSuccessMessage',
      title: 'Main form success message',
      type: 'string',
    },
    {
      name: 'subscribeFormTitle',
      title: 'Subscribe form title',
      type: 'string',
    },
    {
      name: 'subscribeFormSuccessMessage',
      title: 'Subscribe form success message',
      type: 'string',
    },
  ],
  preview: {
    select: { title: 'title', media: 'backgroundImage' },
  },
}
