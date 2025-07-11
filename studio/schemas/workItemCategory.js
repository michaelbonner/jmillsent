import { MdCategory as icon } from 'react-icons/md'

export default {
  name: 'workItemCategory',
  title: 'Work Item Category',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'showOnWorkPage',
      title: 'Show on Work Page',
      type: 'boolean',
      description: 'If true, this category will be shown on the work page.',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description:
        'The order in which this category should appear on the work page.',
    },
    {
      name: 'workItems',
      title: 'Work Items',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'workItem' } }],
    },
    {
      name: 'imageGallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: {
                isHighlighted: true, // <-- make this field easily accessible
              },
            },
          ],
        },
      ],
    },
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
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    },
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
}
