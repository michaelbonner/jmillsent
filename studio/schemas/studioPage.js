import { MdBusiness as icon } from 'react-icons/md'
import { slugValidation } from '../functions/slugValidation'

export default {
  name: 'studioPage',
  title: 'Studio Page',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
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
      title: 'SEO Title',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
    },
    {
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'videoId',
      title: 'Video id',
      type: 'string',
      description:
        'Enter the ID ( {{video_id}} ) of the video, not the whole url. https://player.vimeo.com/video/{{video_id}}?badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      name: 'headerVideoWidthInPixels',
      title: 'Header video width in pixels',
      type: 'number',
    },
    {
      name: 'headerVideoHeightInPixels',
      title: 'Header video height in pixels',
      type: 'number',
    },
    {
      name: 'videoIdMobile',
      title: 'Video ID (mobile)',
      type: 'string',
      description:
        'Video ID to use on mobile. Leave blank to user the "Video ID" above on mobile',
    },
    {
      name: 'headerVideoWidthInPixelsMobile',
      title: 'Header video width in pixels (mobile)',
      type: 'number',
    },
    {
      name: 'headerVideoHeightInPixelsMobile',
      title: 'Header video height in pixels (mobile)',
      type: 'number',
    },
    {
      name: 'section1Title',
      title: 'Section 1 title',
      type: 'string',
    },
    {
      name: 'section1Body',
      title: 'Section 1 body',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'section3Title',
      title: 'Reel Section Title',
      type: 'string',
    },
    {
      name: 'section3Subtitle',
      title: 'Reel Section Subtitle',
      type: 'string',
    },
    {
      name: 'tourVideoTitle',
      title: 'Tour video title',
      type: 'string',
    },
    {
      name: 'tourVideoClient',
      title: 'Tour video client',
      type: 'string',
    },
    {
      name: 'tourVideoDescription',
      title: 'Tour video description',
      type: 'text',
    },
    {
      name: 'tourVideoId',
      title: 'Tour video id',
      type: 'string',
    },
    {
      name: 'tourVideoIdShort',
      title: 'Tour video id (short)',
      type: 'string',
    },
    {
      name: 'tourVideoWidthAspectRatio',
      title: 'Tour video aspect ratio for width',
      type: 'string',
      description: 'What is the width of the aspect ratio',
      options: {
        list: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'tourVideoHeightAspectRatio',
      title: 'Tour video aspect ratio for height',
      type: 'string',
      description: 'What is the height of the aspect ratio',
      options: {
        list: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'tourVideoPoster',
      title: 'Tour poster image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'studioItemSectionTitle',
      title: 'Studio Items Section Title',
      type: 'string',
    },
    {
      name: 'studioItemSectionSubtitle',
      title: 'Studio Items Section Subtitle',
      type: 'string',
    },
    {
      name: 'studioItems',
      title: 'Studio Spaces',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'studioItem' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    media: 'poster',
    prepare(selection) {
      return {
        title: `${selection.title}`,
      }
    },
  },
}
