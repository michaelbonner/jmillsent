import {defineType, defineField, defineArrayMember} from 'sanity'
import {MdImportantDevices as icon} from 'react-icons/md'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon,
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'hero', title: 'Hero'},
    {name: 'section1', title: 'Section 1'},
    {name: 'latestCampaign', title: 'Latest campaign'},
    {name: 'section2', title: 'Section 2'},
    {name: 'reelVideo', title: 'Reel video'},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'Seo title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Seo description',
      type: 'text',
      group: 'seo',
    }),
    defineField({
      name: 'mainTitle',
      title: 'Main title',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: {hotspot: true},
      group: 'hero',
    }),
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      description:
        'Enter the ID ( {{video_id}} ) of the video, not the whole url. https://player.vimeo.com/video/{{video_id}}?badge=0&autopause=0&player_id=0&app_id=58479',
      group: 'hero',
    }),
    defineField({
      name: 'videoIdMobile',
      title: 'Video ID (mobile)',
      type: 'string',
      description: 'Video ID to use on mobile. Leave blank to user the "Video ID" above on mobile',
      group: 'hero',
    }),
    defineField({
      name: 'headerVideoWidthInPixelsMobile',
      title: 'Header video width in pixels (mobile)',
      type: 'number',
      group: 'hero',
    }),
    defineField({
      name: 'headerVideoHeightInPixelsMobile',
      title: 'Header video height in pixels (mobile)',
      type: 'number',
      group: 'hero',
    }),
    defineField({
      name: 'section1Title',
      title: 'Section 1 title',
      type: 'string',
      group: 'section1',
    }),
    defineField({
      name: 'section1Body',
      title: 'Section 1 body',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
      group: 'section1',
    }),
    defineField({
      name: 'latestCampaignTitle',
      title: 'Latest campaign title',
      type: 'string',
      group: 'latestCampaign',
    }),
    defineField({
      name: 'latestCampaignSubtitle',
      title: 'Latest campaign subtitle',
      type: 'string',
      group: 'latestCampaign',
    }),
    defineField({
      name: 'latestCampaignVideos',
      title: 'Latest campaign videos',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'workItem'}]})],
      group: 'latestCampaign',
    }),
    defineField({
      name: 'section2Title',
      title: 'Section 2 title',
      type: 'string',
    }),
    defineField({
      name: 'section2Subtitle',
      title: 'Section 2 subtitle',
      type: 'string',
      group: 'section2',
    }),
    defineField({
      name: 'reelVideoTitle',
      title: 'Reel video title',
      type: 'string',
      group: 'reelVideo',
    }),
    defineField({
      name: 'reelVideoClient',
      title: 'Reel video client',
      type: 'string',
      group: 'reelVideo',
    }),
    defineField({
      name: 'reelVideoDescription',
      title: 'Reel video description',
      type: 'text',
    }),
    defineField({
      name: 'reelVideoId',
      title: 'Reel video id',
      type: 'string',
      group: 'reelVideo',
    }),
    defineField({
      name: 'reelVideoIdShort',
      title: 'Reel video id (short)',
      type: 'string',
    }),
    defineField({
      name: 'reelVideoWidthInPixels',
      title: 'Reel video width in pixels',
      type: 'number',
      group: 'reelVideo',
    }),
    defineField({
      name: 'reelVideoHeightInPixels',
      title: 'Reel video height in pixels',
      type: 'number',
    }),
    defineField({
      name: 'reelVideoWidthAspectRatio',
      title: 'Reel video aspect ratio for width',
      type: 'string',
      description: 'What is the width of the aspect ratio',
      options: {
        list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        layout: 'dropdown',
      },
      group: 'reelVideo',
    }),
    defineField({
      name: 'reelVideoHeightAspectRatio',
      title: 'Reel video aspect ratio for height',
      type: 'string',
      description: 'What is the height of the aspect ratio',
      options: {
        list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'reelVideoPoster',
      title: 'Reel poster image',
      type: 'image',
      options: {hotspot: true},
      group: 'reelVideo',
    }),
    defineField({
      name: 'footerTitle',
      title: 'Footer title',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerSubtitle',
      title: 'Footer subtitle',
      type: 'string',
      group: 'footer',
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: 'Home Page',
      }
    },
  },
})
