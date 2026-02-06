import {defineType, defineField, defineArrayMember} from 'sanity'

export const photo = defineType({
  name: 'photo',
  title: 'Photos',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'object',
      title: 'Photo',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'title of image',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
        }),
      ],
      preview: {
        select: {title: 'title', media: 'image'},
      },
    }),
  ],
})
