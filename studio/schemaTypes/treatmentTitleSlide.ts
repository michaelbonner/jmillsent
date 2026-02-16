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
      name: 'frameStyle',
      title: 'Frame Style',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Border Top/Bottom', value: 'border-tb' },
          { title: 'None', value: 'none' },
        ],
      },
    }),
    defineField({
      name: 'topLogo',
      title: 'Top Left Logo',
      type: 'string',
      initialValue: 'none',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Client Logo', value: 'client' },
          { title: 'JME Logo', value: 'jme' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      hidden: ({ parent }) => parent?.frameStyle !== 'border-tb',
    }),
    defineField({
      name: 'topLogoCustom',
      title: 'Top Left Custom Logo',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.frameStyle !== 'border-tb' || parent?.topLogo !== 'custom',
    }),
    defineField({
      name: 'additionalText',
      title: 'Additional Text (Bottom Left)',
      type: 'string',
      description: 'Text displayed at the bottom left of the slide',
      hidden: ({ parent }) => parent?.frameStyle !== 'border-tb',
    }),
    defineField({
      name: 'bottomLogo',
      title: 'Bottom Right Logo',
      type: 'string',
      initialValue: 'none',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Client Logo', value: 'client' },
          { title: 'JME Logo', value: 'jme' },
          { title: 'Custom', value: 'custom' },
        ],
      },
      hidden: ({ parent }) => parent?.frameStyle !== 'border-tb',
    }),
    defineField({
      name: 'bottomLogoCustom',
      title: 'Bottom Right Custom Logo',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.frameStyle !== 'border-tb' || parent?.bottomLogo !== 'custom',
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
