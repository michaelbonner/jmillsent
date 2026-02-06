import {defineType, defineField, defineArrayMember} from 'sanity'
import {MdDeveloperBoard as icon} from 'react-icons/md'
import {slugValidation} from './utils/slugValidation'

export const episode = defineType({
  name: 'episode',
  title: 'Episodes',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of episode',
    }),
    defineField({
      name: 'episodeNum',
      title: 'Episode Number',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'image'},
  },
})
