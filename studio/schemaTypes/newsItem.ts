import {defineType, defineField, defineArrayMember} from 'sanity'
import {BiNews as icon} from 'react-icons/bi'
import {slugValidation} from './utils/slugValidation'

export const newsItem = defineType({
  name: 'newsItem',
  title: 'News Items',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'date',
      title: 'Date',
      type: 'datetime',
      options: {
        dateFormat: 'MM-DD-YYYY',
      },
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      description: 'Poster image for news item on news page.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      description: 'Hero image on the individual story page.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'externalArticlePreviews',
      title: 'External article previews',
      description:
        'Add a preview for a link in the Body. Put the link in its own paragraph; the preview will appear in its place.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'externalArticlePreview',
          title: 'External article preview',
          type: 'object',
          fields: [
            defineField({
              name: 'href',
              title: 'Article URL',
              type: 'url',
              validation: (rule) =>
                rule.required().uri({scheme: ['http', 'https']}),
            }),
            defineField({
              name: 'source',
              title: 'Publication',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Headline',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Preview image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'imageAlt',
              title: 'Image description',
              description: 'Describe the image for screen readers.',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'source', media: 'image'},
          },
        }),
      ],
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
      name: 'customButtonTextSection1',
      description: 'Leave blank to use default',
      placeholder: 'READ',
      title: 'Custom button text section 1',
      type: 'string',
    }),
    defineField({
      name: 'customButtonTextSection2',
      description: 'Leave blank to use default',
      placeholder: 'FULL',
      title: 'Custom button text section 2',
      type: 'string',
    }),
    defineField({
      name: 'customButtonTextSection3',
      description: 'Leave blank to use default',
      placeholder: 'STORY',
      title: 'Custom button text section 3',
      type: 'string',
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
})
