import { MdDeveloperBoard as icon } from 'react-icons/md'
import { slugValidation } from '../functions/slugValidation'

export default {
  name: 'service',
  title: 'Services',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of service',
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
      name: 'shortName',
      title: 'Short name',
      type: 'string',
      description: 'Used in the little highlighty menu thing',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'rightAlign',
      title: 'Right Align',
      type: 'boolean',
      description: 'If checked, the text will be aligned to the right',
      initialValue: false,
    },
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
}
