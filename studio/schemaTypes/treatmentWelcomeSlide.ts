import {defineType, defineField} from 'sanity'

export const treatmentWelcomeSlide = defineType({
  name: 'treatmentWelcomeSlide',
  title: 'Welcome Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video (S3)',
      type: 's3-dam.media',
      options: {
        accept: {'video/*': []},
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
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      media: 'backgroundImage',
    },
    prepare(selection) {
      return {
        title: 'Welcome Slide',
        media: selection.media,
      }
    },
  },
})
