import { BiNews as icon } from 'react-icons/bi'

export default {
  name: 'newsItem',
  title: 'News Items',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
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
      name: 'date',
      title: 'Date',
      type: 'datetime',
      options: {
        dateFormat: 'MM-DD-YYYY',
      },
    },
    {
      name: 'poster',
      title: 'Poster Image',
      description: 'Poster image for news item on news page.',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      description: 'Hero image on the individual story page.',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      description:
        'Enter the ID ( {{video_id}} ) of the video, not the whole url. https://player.vimeo.com/video/{{video_id}}?badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      name: 'videoWidthAspectRatio',
      title: 'Video aspect ratio for width',
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
      name: 'videoHeightAspectRatio',
      title: 'Video aspect ratio for height',
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
      name: 'customButtonTextSection1',
      description: 'Leave blank to use default',
      placeholder: 'READ',
      title: 'Custom button text section 1',
      type: 'string',
    },
    {
      name: 'customButtonTextSection2',
      description: 'Leave blank to use default',
      placeholder: 'FULL',
      title: 'Custom button text section 2',
      type: 'string',
    },
    {
      name: 'customButtonTextSection3',
      description: 'Leave blank to use default',
      placeholder: 'STORY',
      title: 'Custom button text section 3',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'poster',
    },
    prepare(selection) {
      return {
        title: selection.title,
        date: selection.date,
        subtitle: selection.date,
        media: selection.media,
      }
    },
  },
}
