import {defineType, defineField, defineArrayMember} from 'sanity'
import {MdBusiness as icon} from 'react-icons/md'
import {slugValidation} from './utils/slugValidation'

export const studioPage = defineType({
  name: 'studioPage',
  title: 'Studio Page',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
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
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'videoId',
      title: 'Video id',
      type: 'string',
      description:
        'Enter the ID ( {{video_id}} ) of the video, not the whole url. https://player.vimeo.com/video/{{video_id}}?badge=0&autopause=0&player_id=0&app_id=58479',
    }),
    defineField({
      name: 'headerVideoWidthInPixels',
      title: 'Header video width in pixels',
      type: 'number',
    }),
    defineField({
      name: 'headerVideoHeightInPixels',
      title: 'Header video height in pixels',
      type: 'number',
    }),
    defineField({
      name: 'videoIdMobile',
      title: 'Video ID (mobile)',
      type: 'string',
      description: 'Video ID to use on mobile. Leave blank to user the "Video ID" above on mobile',
    }),
    defineField({
      name: 'headerVideoWidthInPixelsMobile',
      title: 'Header video width in pixels (mobile)',
      type: 'number',
    }),
    defineField({
      name: 'headerVideoHeightInPixelsMobile',
      title: 'Header video height in pixels (mobile)',
      type: 'number',
    }),
    defineField({
      name: 'section1Title',
      title: 'Section 1 title',
      type: 'string',
    }),
    defineField({
      name: 'section1Body',
      title: 'Section 1 body',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'section3Title',
      title: 'Reel Section Title',
      type: 'string',
    }),
    defineField({
      name: 'section3Subtitle',
      title: 'Reel Section Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'tourVideoTitle',
      title: 'Tour video title',
      type: 'string',
    }),
    defineField({
      name: 'tourVideoClient',
      title: 'Tour video client',
      type: 'string',
    }),
    defineField({
      name: 'tourVideoDescription',
      title: 'Tour video description',
      type: 'text',
    }),
    defineField({
      name: 'tourVideoId',
      title: 'Tour video id',
      type: 'string',
    }),
    defineField({
      name: 'tourVideoIdShort',
      title: 'Tour video id (short)',
      type: 'string',
    }),
    defineField({
      name: 'tourVideoWidthAspectRatio',
      title: 'Tour video aspect ratio for width',
      type: 'string',
      description: 'What is the width of the aspect ratio',
      options: {
        list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'tourVideoHeightAspectRatio',
      title: 'Tour video aspect ratio for height',
      type: 'string',
      description: 'What is the height of the aspect ratio',
      options: {
        list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'tourVideoPoster',
      title: 'Tour poster image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'studioItemSectionTitle',
      title: 'Studio Items Section Title',
      type: 'string',
    }),
    defineField({
      name: 'studioItemSectionSubtitle',
      title: 'Studio Items Section Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'studioItems',
      title: 'Studio Spaces',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'studioItem'}]})],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: `${selection.title}`,
      }
    },
  },
})
