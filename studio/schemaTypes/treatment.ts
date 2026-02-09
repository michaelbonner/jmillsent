import {defineType, defineField, defineArrayMember} from 'sanity'
import {MdSlideshow as icon} from 'react-icons/md'
import {slugValidation} from './utils/slugValidation'

export const treatment = defineType({
  name: 'treatment',
  title: 'Treatments',
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
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Color',
      type: 'string',
      description: 'Hex color (e.g. #967738)',
    }),
    defineField({
      name: 'secondaryColor',
      title: 'Secondary Color',
      type: 'string',
      description: 'Hex color (e.g. #FFFFFF)',
    }),
    defineField({
      name: 'standardSlideElements',
      title: 'Standard Slide Elements',
      type: 'object',
      fields: [
        defineField({
          name: 'showPageNumbers',
          title: 'Show Page Numbers',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'showBorder',
          title: 'Show Border',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'borderColor',
          title: 'Border Color',
          type: 'string',
          description: 'Hex color for the slide border',
          hidden: ({parent}) => !parent?.showBorder,
        }),
      ],
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        defineArrayMember({type: 'treatmentTitleSlide', title: 'Title Slide'}),
        defineArrayMember({type: 'treatmentWelcomeSlide', title: 'Welcome Slide'}),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      clientName: 'clientName',
      media: 'clientLogo',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Untitled Treatment',
        subtitle: selection.clientName,
        media: selection.media,
      }
    },
  },
})
