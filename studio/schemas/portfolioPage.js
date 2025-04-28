import { MdGridOn as icon } from 'react-icons/md'

export default {
  name: 'portfolioPage',
  title: 'Portfolio Page',
  type: 'document',
  icon,
  fields: [
    {
      name: 'password',
      title: 'Password',
      type: 'string',
    },
    {
      name: 'passwordInputPrompt',
      title: 'Password Input Prompt',
      type: 'string',
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
      name: 'portfolioPageDescription',
      title: 'Portfolio Page Description',
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
    prepare() {
      return {
        title: `Portfolio Page`,
      }
    },
  },
}
