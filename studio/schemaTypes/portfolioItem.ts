import {defineType, defineField, defineArrayMember} from 'sanity'
import {MdLocalMovies as icon} from 'react-icons/md'

export const portfolioItem = defineType({
  name: 'portfolioItem',
  title: 'Portfolio Items',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
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
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'shortClipMp4S3',
      title: 'Short hover clip - mp4 - S3',
      type: 's3-dam.media',
      options: {
        accept: {'video/*': []},
        storeOriginalFilename: true,
      },
    }),
    defineField({
      name: 'shortClipOgvS3',
      title: 'Short hover clip - ogv - S3',
      type: 's3-dam.media',
      options: {
        accept: {'video/*': []},
        storeOriginalFilename: true,
      },
    }),
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      description:
        'Enter the ID ( {{video_id}} ) of the video, not the whole url. https://player.vimeo.com/video/{{video_id}}?badge=0&autopause=0&player_id=0&app_id=58479',
    }),
    defineField({
      name: 'videoWidthAspectRatio',
      title: 'Video aspect ratio for width',
      type: 'string',
      description: 'What is the width of the aspect ratio',
      options: {
        list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'videoHeightAspectRatio',
      title: 'Video aspect ratio for height',
      type: 'string',
      description: 'What is the height of the aspect ratio',
      options: {
        list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Credit',
          type: 'object',
          fields: [
            defineField({
              title: 'Role',
              name: 'role',
              type: 'string',
            }),
            defineField({
              title: 'Value',
              name: 'value',
              type: 'string',
            }),
          ],
        }),
      ],
      options: {
        sortable: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      clientName: 'clientName',
      title: 'title',
      date: 'date',
      media: 'poster',
    },
    prepare(selection) {
      return {
        title: `${selection.clientName ? `${selection.clientName} | ` : ''}${selection.title || ''}`,
        date: selection.date,
        subtitle: selection.date,
        media: selection.media,
      }
    },
  },
})
