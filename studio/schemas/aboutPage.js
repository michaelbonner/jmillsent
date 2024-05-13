import { MdPerson as icon } from 'react-icons/md'
import { slugValidation } from '../functions/slugValidation'

export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon,
  groups: [
    {
      name: 'general',
      title: 'General',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'reel',
      title: 'Sizzle Reel',
    },
    {
      name: 'section1',
      title: 'Section 1',
    },
    {
      name: 'section2',
      title: 'Section 2',
    },
    {
      name: 'services',
      title: 'Services',
    },
    {
      name: 'adFormats',
      title: 'Ad Formats',
    },
    {
      name: 'company3',
      title: 'Company3',
    },
    {
      name: 'director',
      title: 'Director',
    },
    {
      name: 'team',
      title: 'Team',
    },
    {
      name: 'utahLocations',
      title: 'Utah Locations',
    },
    {
      name: 'ravensCards',
      title: 'Ravens Cards',
    },
    {
      name: 'brands',
      title: 'Brands',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'general',
    },
    {
      name: 'slug',
      title: 'Slug (should-be-kebab-case-like-this)',
      type: 'slug',
      validation: slugValidation,
      options: {
        source: 'title',
        maxLength: 100,
      },
      group: 'general',
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
    },
    {
      name: 'poster',
      title: 'Poster',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'general',
    },
    {
      name: 'videoId',
      title: 'Video id',
      type: 'string',
      description:
        'Enter the ID ( {{video_id}} ) of the video, not the whole url. https://player.vimeo.com/video/{{video_id}}?badge=0&autopause=0&player_id=0&app_id=58479',
      group: 'general',
    },
    {
      name: 'headerVideoWidthInPixels',
      title: 'Header video width in pixels',
      type: 'number',
      group: 'general',
    },
    {
      name: 'headerVideoHeightInPixels',
      title: 'Header video height in pixels',
      type: 'number',
      group: 'general',
    },
    {
      name: 'videoIdMobile',
      title: 'Video ID (mobile)',
      type: 'string',
      description:
        'Video ID to use on mobile. Leave blank to use the "Video ID" above on mobile',
      group: 'general',
    },
    {
      name: 'headerVideoWidthInPixelsMobile',
      title: 'Header video width in pixels (mobile)',
      type: 'number',
      group: 'general',
    },
    {
      name: 'headerVideoHeightInPixelsMobile',
      title: 'Header video height in pixels (mobile)',
      type: 'number',
      group: 'general',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      group: 'general',
    },
    {
      name: 'reelVideoSectionTitle',
      title: 'Reel video section title',
      description: 'Title above the reel video section',
      type: 'string',
      group: 'reel',
    },
    {
      name: 'reelVideoSectionSubtitle',
      title: 'Reel video section subtitle',
      description: 'Subtitle above the reel video section',
      type: 'string',
      group: 'reel',
    },
    {
      name: 'reelVideoTitle',
      title: 'Reel video title',
      type: 'string',
      group: 'reel',
    },
    {
      name: 'reelVideoClient',
      title: 'Reel video client',
      type: 'string',
      group: 'reel',
    },
    {
      name: 'reelVideoDescription',
      title: 'Reel video description',
      type: 'text',
      group: 'reel',
    },
    {
      name: 'reelVideoId',
      title: 'Reel video id',
      type: 'string',
      group: 'reel',
    },
    {
      name: 'reelVideoIdShort',
      title: 'Reel video id (short)',
      type: 'string',
      group: 'reel',
    },
    {
      name: 'reelVideoWidthInPixels',
      title: 'Reel video width in pixels',
      type: 'number',
      group: 'reel',
    },
    {
      name: 'reelVideoHeightInPixels',
      title: 'Reel video height in pixels',
      type: 'number',
      group: 'reel',
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
      group: 'reel',
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
      group: 'reel',
    },
    {
      name: 'reelVideoPoster',
      title: 'Reel poster image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'reel',
    },
    {
      name: 'section1Title',
      title: 'Section 1 title',
      type: 'string',
      group: 'section1',
    },
    {
      name: 'section1Body',
      title: 'Section 1 body',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'section1',
    },
    {
      name: 'section1Images',
      title: 'Images',
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
      group: 'section1',
    },
    {
      name: 'section2Title',
      title: 'Section 2 title',
      type: 'string',
      group: 'section2',
    },
    {
      name: 'section2Subtitle',
      title: 'Section 2 subtitle',
      type: 'string',
      group: 'section2',
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
      group: 'services',
    },
    {
      name: 'adFormatsTitle',
      title: 'Ad Formats Section Title',
      type: 'string',
      group: 'adFormats',
    },
    {
      name: 'adFormatsSubtitle',
      title: 'Ad Formats Section Subtitle',
      type: 'string',
      group: 'adFormats',
    },
    {
      name: 'adFormatsContent',
      title: 'Ad Formats Section Content',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'adFormats',
    },
    {
      name: 'adFormats',
      title: 'Ad Formats',
      type: 'array',
      of: [{ type: 'adFormat' }],
      group: 'adFormats',
    },
    {
      name: 'company3VideoTitle',
      title: 'Company 3 video title',
      type: 'string',
      group: 'company3',
    },
    {
      name: 'company3VideoClient',
      title: 'Company 3 video client',
      type: 'string',
      group: 'company3',
    },
    {
      name: 'company3VideoDescription',
      title: 'Company 3 video description',
      type: 'text',
      group: 'company3',
    },
    {
      name: 'company3VideoId',
      title: 'Company 3 video id',
      type: 'string',
      group: 'company3',
    },
    {
      name: 'company3VideoIdShort',
      title: 'Company 3 video id (short)',
      type: 'string',
      group: 'company3',
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
      group: 'company3',
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
      group: 'company3',
    },
    {
      name: 'company3VideoPoster',
      title: 'Company 3 poster image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'company3',
    },
    {
      name: 'company3Title',
      title: 'Company 3 title',
      type: 'string',
      group: 'company3',
    },
    {
      name: 'company3Body',
      title: 'Company 3 body',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'company3',
    },
    {
      name: 'company3Link',
      title: 'Company 3 link',
      type: 'url',
      group: 'company3',
    },
    {
      name: 'directorImage',
      title: 'Director image',
      type: 'image',
      options: {
        hotspot: true,
      },
      group: 'director',
    },
    {
      name: 'directorImageTitle',
      title: 'Director image title',
      type: 'string',
      group: 'director',
    },
    {
      name: 'directorImageSubtitle',
      title: 'Director image subtitle',
      type: 'string',
      group: 'director',
    },
    {
      name: 'directorTitle',
      title: 'Director title',
      type: 'string',
      group: 'director',
    },
    {
      name: 'directorName',
      title: 'Director name',
      type: 'string',
      group: 'director',
    },
    {
      name: 'directorDescription',
      title: 'Director description',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'director',
    },
    {
      name: 'teamTitle',
      title: 'Team title',
      type: 'string',
      group: 'team',
    },
    {
      name: 'teamSubtitle',
      title: 'Team Subtitle',
      type: 'string',
      group: 'team',
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
      group: 'team',
    },
    {
      name: 'utahLocationsTitle',
      title: 'Utah locations title',
      type: 'string',
      group: 'utahLocations',
    },
    {
      name: 'utahLocationsDescription',
      description: 'Utah locations title',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'utahLocations',
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
      group: 'utahLocations',
    },
    {
      name: 'ravensCards',
      title: 'Ravens Cards',
      type: 'array',
      of: [{ type: 'ravensCard' }],
      group: 'ravensCards',
    },
    {
      name: 'ravensCardsTitle',
      title: 'Ravens Title',
      type: 'string',
      group: 'ravensCards',
    },
    {
      name: 'ravensCardsSubtitle',
      title: 'Ravens Subtitle',
      type: 'string',
      group: 'ravensCards',
    },
    {
      name: 'ravensCardsContent',
      title: 'Ravens Content',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'ravensCards',
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
      group: 'brands',
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
