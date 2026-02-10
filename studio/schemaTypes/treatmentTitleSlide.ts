import { defineType, defineField } from 'sanity'

export const treatmentTitleSlide = defineType({
  name: 'treatmentTitleSlide',
  title: 'Title Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video (S3)',
      type: 's3-dam.media',
      options: {
        accept: { 'video/*': [] },
        storeOriginalFilename: true,
      },
      description: 'Upload a background video file',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color (e.g. #000000)',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Hex color (e.g. #FFFFFF)',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heading1',
      title: 'Heading 1',
      type: 'string',
    }),
    defineField({
      name: 'heading2',
      title: 'Heading 2',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'hideFrame',
      title: 'Hide Frame',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'placement',
      title: 'Content Placement',
      type: 'string',
      initialValue: 'center-center',
      options: {
        list: [
          { title: 'Top Left', value: 'top-left' },
          { title: 'Top Center', value: 'top-center' },
          { title: 'Top Right', value: 'top-right' },
          { title: 'Center Left', value: 'center-left' },
          { title: 'Center Center', value: 'center-center' },
          { title: 'Center Right', value: 'center-right' },
          { title: 'Bottom Left', value: 'bottom-left' },
          { title: 'Bottom Center', value: 'bottom-center' },
          { title: 'Bottom Right', value: 'bottom-right' },
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      heading1: 'heading1',
      heading2: 'heading2',
      media: 'backgroundImage',
    },
    prepare(selection) {
      return {
        title: selection.heading1 || 'Title Slide',
        subtitle: selection.heading2,
        media: selection.media,
      }
    },
  },
})
