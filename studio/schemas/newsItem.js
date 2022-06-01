import { BiNews as icon } from 'react-icons/bi';

export default {
  name: 'newsItem',
  title: 'News Items',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
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
      name: 'date',
      title: 'Date',
      type: 'datetime',
      options: {
        dateFormat: 'MM-DD-YYYY',
      },
    },
    {
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    },
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
        title: `${selection.clientName ? `${selection.clientName} | ` : ''}${
          selection.title || ''
        }`,
        date: selection.date,
        subtitle: selection.date,
        media: selection.media,
      };
    },
  },
};
