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
      name: 'order',
      title: 'Order',
      type: 'number',
      description:
        'The order in which this category should appear on the work page.',
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
