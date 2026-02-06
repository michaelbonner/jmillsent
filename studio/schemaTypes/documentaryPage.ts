import {defineType, defineField, defineArrayMember} from 'sanity'
import {MdPerson as icon} from 'react-icons/md'
import {slugValidation} from './utils/slugValidation'

export const documentaryPage = defineType({
  name: 'documentaryPage',
  title: 'Documentary Page',
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
      name: 'shortClipMp4S3',
      title: 'Short hover clip - mp4 - S3',
      type: 's3-dam.media',
      options: {
        accept: 'video/*',
        storeOriginalFilename: true,
      },
    }),
    defineField({
      name: 'shortClipOgvS3',
      title: 'Short hover clip - ogv - S3',
      type: 's3-dam.media',
      options: {
        accept: 'video/*',
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
      name: 'bodyHeader',
      title: 'Body Header',
      type: 'string',
    }),
    defineField({
      name: 'bodySubheader',
      title: 'Body Subheader',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'episodes',
      title: 'Episodes',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'episode'}]})],
    }),
    defineField({
      name: 'docLink',
      title: 'Doc Link',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare() {
      return {
        title: 'Documentary Page',
      }
    },
  },
})
