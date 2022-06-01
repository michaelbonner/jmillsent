import { BsNewspaper as icon } from 'react-icons/bs';

export default {
  name: 'newsPage',
  title: 'News Page',
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
      name: 'newsPageDescription',
      title: 'News Page Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'newsItems',
      title: 'News Articles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'newsItem' }],
        },
      ],
    },
  ],
  preview: {
    select: {},
    prepare(selection) {
      return {
        title: `News Page`,
      };
    },
  },
};
