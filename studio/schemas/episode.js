import { MdDeveloperBoard as icon } from 'react-icons/md'
import { slugValidation } from '../functions/slugValidation'

export default {
  name: 'episode',
  title: 'Episodes',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of episode',
    },
    {
      name: 'episodeNum',
      title: 'Episode Number',
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
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
}
