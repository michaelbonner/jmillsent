import { MdImportantDevices as icon } from 'react-icons/md';

export default {
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon,
  fields: [
    {
      name: 'mainTitle',
      title: 'Main title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'seoTitle',
      title: 'Seo title',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'Seo description',
      type: 'text',
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
      name: 'videoId',
      title: 'Video id',
      type: 'string',
      description:
        'Enter the ID ( {{video_id}} ) of the video, not the whole url. https://player.vimeo.com/video/{{video_id}}?badge=0&autopause=0&player_id=0&app_id=58479',
    },
    {
      name: 'section1Title',
      title: 'Section 1 title',
      type: 'string',
    },
    {
      name: 'section1Body',
      title: 'Section 1 body',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'section2Title',
      title: 'Section 2 title',
      type: 'string',
    },
    {
      name: 'section2Subtitle',
      title: 'Section 2 subtitle',
      type: 'string',
    },
    {
      name: 'reelVideoTitle',
      title: 'Reel video title',
      type: 'string',
    },
    {
      name: 'reelVideoClient',
      title: 'Reel video client',
      type: 'string',
    },
    {
      name: 'reelVideoDescription',
      title: 'Reel video description',
      type: 'text',
    },
    {
      name: 'reelVideoId',
      title: 'Reel video id',
      type: 'string',
    },
    {
      name: 'reelVideoWidthInPixels',
      title: 'Reel video width in pixels',
      type: 'number',
    },
    {
      name: 'reelVideoHeightInPixels',
      title: 'Reel video height in pixels',
      type: 'number',
    },
    {
      name: 'reelVideoWidthAspectRatio',
      title: 'Reel video aspect ratio for width',
      type: 'string',
      description: 'What is the width of the aspect ratio',
      options: {
        list: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'reelVideoHeightAspectRatio',
      title: 'Reel video aspect ratio for height',
      type: 'string',
      description: 'What is the height of the aspect ratio',
      options: {
        list: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'reelVideoPoster',
      title: 'Reel poster image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'footerTitle',
      title: 'Footer title',
      type: 'string',
    },
    {
      name: 'footerSubtitle',
      title: 'Footer subtitle',
      type: 'string',
    },
  ],
  preview: {
    select: {},
    prepare(selection) {
      return {
        title: `Home Page`,
      };
    },
  },
};
