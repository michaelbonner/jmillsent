import {defineType, defineField, defineArrayMember} from 'sanity'
import {MdCategory as icon} from 'react-icons/md'

export const workItemCategory = defineType({
  name: 'workItemCategory',
  title: 'Work Item Category',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'showOnWorkPage',
      title: 'Show on Work Page',
      type: 'boolean',
      description: 'If true, this category will be shown on the work page.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'The order in which this category should appear on the work page.',
    }),
    defineField({
      name: 'workItems',
      title: 'Work Items',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'workItem'}]})],
    }),
    defineField({
      name: 'imageGallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
          ],
        }),
      ],
    }),
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
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare(selection) {
      return {
        title: selection.name,
      }
    },
  },
})
