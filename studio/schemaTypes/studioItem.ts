import {defineType, defineField, defineArrayMember} from 'sanity'
import {MdWeb as icon} from 'react-icons/md'

export const studioItem = defineType({
  name: 'studioItem',
  title: 'Studio Spaces',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'rightAlign',
      title: 'Right Align',
      type: 'boolean',
      description: 'If checked, the text will be aligned to the right',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      clientName: 'clientName',
      title: 'title',
      media: 'poster',
    },
    prepare(selection) {
      return {
        title: `${selection.clientName ? `${selection.clientName} | ` : ''}${selection.title || ''}`,
        media: selection.media,
      }
    },
  },
})
