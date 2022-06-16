import { MdPerson as icon } from 'react-icons/md'

export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'headerVideoWidthInPixels',
      title: 'Header video width in pixels',
      type: 'number',
    },
    {
      name: 'headerVideoHeightInPixels',
      title: 'Header video height in pixels',
      type: 'number',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'reelVideoSectionTitle',
      title: 'Reel video section title',
      description: 'Title above the reel video section',
      type: 'string',
    },
    {
      name: 'reelVideoSectionSubtitle',
      title: 'Reel video section subtitle',
      description: 'Subtitle above the reel video section',
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
      title: 'Section 1 subtitle',
      type: 'string',
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
    },
    {
      name: 'adFormatsTitle',
      title: 'Ad Formats Section Title',
      type: 'string',
    },
    {
      name: 'adFormatsSubtitle',
      title: 'Ad Formats Section Subtitle',
      type: 'string',
    },
    {
      name: 'adFormatsContent',
      title: 'Ad Formats Section Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'adFormats',
      title: 'Ad Formats',
      type: 'array',
      of: [{ type: 'adFormat' }],
    },
    {
      name: 'company3VideoTitle',
      title: 'Company 3 video title',
      type: 'string',
    },
    {
      name: 'company3VideoClient',
      title: 'Company 3 video client',
      type: 'string',
    },
    {
      name: 'company3VideoDescription',
      title: 'Company 3 video description',
      type: 'text',
    },
    {
      name: 'company3VideoId',
      title: 'Company 3 video id',
      type: 'string',
    },
    {
      name: 'company3VideoWidthAspectRatio',
      title: 'Company 3 video aspect ratio for width',
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
      name: 'company3VideoHeightAspectRatio',
      title: 'Company 3 video aspect ratio for height',
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
      name: 'company3VideoPoster',
      title: 'Company 3 poster image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'company3Title',
      title: 'Company 3 title',
      type: 'string',
    },
    {
      name: 'company3Body',
      title: 'Company 3 body',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'company3Link',
      title: 'Company 3 link',
      type: 'url',
    },
    {
      name: 'directorImage',
      title: 'Director image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'directorTitle',
      title: 'Director title',
      type: 'string',
    },
    {
      name: 'directorName',
      title: 'Director name',
      type: 'string',
    },
    {
      name: 'directorDescription',
      title: 'Director description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'teamMembers',
      title: 'Team members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'teamMember' }],
        },
      ],
    },
    {
      name: 'utahLocationsTitle',
      title: 'Utah locations title',
      type: 'string',
    },
    {
      name: 'utahLocationsDescription',
      description: 'Utah locations title',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'utahLocations',
      title: 'Utah Locations',
      type: 'array',
      of: [
        {
          type: 'image',
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
      name: 'ravensCards',
      title: 'Ravens Cards',
      type: 'array',
      of: [{ type: 'ravensCard' }],
    },
    {
      name: 'ravensCardsTitle',
      title: 'Ravens Title',
      type: 'string',
    },
    {
      name: 'ravensCardsSubtitle',
      title: 'Ravens Subtitle',
      type: 'string',
    },
    {
      name: 'ravensCardsContent',
      title: 'Ravens Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'brands',
      title: 'Brands',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'brand' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    media: 'poster',
    prepare(selection) {
      return {
        title: `About Page`,
      }
    },
  },
}
