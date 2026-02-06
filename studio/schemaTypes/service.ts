import {defineType, defineField, defineArrayMember} from 'sanity'
import {MdDeveloperBoard as icon} from 'react-icons/md'
import {slugValidation} from './utils/slugValidation'

export const service = defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of service',
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
      name: 'shortName',
      title: 'Short name',
      type: 'string',
      description: 'Used in the little highlighty menu thing',
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
    defineField({
      name: 'rightAlign',
      title: 'Right Align',
      type: 'boolean',
      description: 'If checked, the text will be aligned to the right',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'name', media: 'image'},
  },
})
