import { MdGridOn as icon } from 'react-icons/md'

export default {
  name: 'workPage',
  title: 'Work Page',
  type: 'document',
  icon,
  fields: [
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
      name: 'workPageDescription',
      title: 'Work Page Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'subscribeFormTitle',
      title: 'Subscribe form title',
      type: 'string',
    },
    {
      name: 'subscribeFormSuccessMessage',
      title: 'Subscribe form success message',
      type: 'string',
    },
  ],
  preview: {
    select: {},
    prepare(selection) {
      return {
        title: `Work Page`,
      }
    },
  },
}
