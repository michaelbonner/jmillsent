import {defineType, defineField, defineArrayMember} from 'sanity'
import {BiNews as icon} from 'react-icons/bi'
import {slugValidation} from './utils/slugValidation'

const normalizeArticleUrl = (value: string | undefined) => {
  if (!value) return null

  try {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol)) return null
    url.pathname = url.pathname.replace(/\/+$/, '') || '/'
    return url.href
  } catch {
    return null
  }
}

const getYouTubeVideoId = (value: string | undefined) => {
  if (!value) return null

  try {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol)) return null

    const host = url.hostname.toLowerCase()
    let id: string | null = null

    if (host === 'youtu.be' || host === 'www.youtu.be') {
      id = url.pathname.split('/')[1]
    } else if (
      ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(host)
    ) {
      id = url.pathname === '/watch'
        ? url.searchParams.get('v')
        : url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ?? null
    }

    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null
  } catch {
    return null
  }
}

const bodyHasLinkedUrl = (body: unknown, matchesUrl: (href: string) => boolean) => {
  if (!Array.isArray(body)) return false

  return body.some((block) => {
    if (block?._type !== 'block' || block.listItem || !Array.isArray(block.children)) {
      return false
    }

    const links = block.markDefs?.filter((mark: {_type: string}) => mark._type === 'link') ?? []
    if (links.length !== 1 || !matchesUrl(links[0].href)) {
      return false
    }

    const firstLinkedIndex = block.children.findIndex((child: {marks?: string[]}) =>
      child.marks?.includes(links[0]._key),
    )

    return (
      firstLinkedIndex >= 0 &&
      block.children
        .slice(firstLinkedIndex)
        .every((child: {text?: string; marks?: string[]}) =>
          !child.text?.trim() || child.marks?.includes(links[0]._key),
        )
    )
  })
}

const bodyHasArticleLink = (body: unknown, href: string) => {
  const targetUrl = normalizeArticleUrl(href)
  return targetUrl
    ? bodyHasLinkedUrl(body, (linkedHref) => normalizeArticleUrl(linkedHref) === targetUrl)
    : false
}

const bodyHasYouTubeLink = (body: unknown, url: string) => {
  const targetId = getYouTubeVideoId(url)
  return targetId
    ? bodyHasLinkedUrl(body, (linkedHref) => getYouTubeVideoId(linkedHref) === targetId)
    : false
}

export const newsItem = defineType({
  name: 'newsItem',
  title: 'News Items',
  type: 'document',
  icon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'rightAlign',
      title: 'Right Align',
      type: 'boolean',
      description: 'If checked, the text will be aligned to the right',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'Slug (should-be-kebab-case-like-this)',
      type: 'slug',
      validation: slugValidation,
      options: {
        source: 'title',
        maxLength: 100,
      },
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      options: {
        dateFormat: 'MM-DD-YYYY',
      },
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      description: 'Poster image for news item on news page.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      description: 'Hero image on the individual story page.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'externalArticlePreviews',
      title: 'External article previews',
      description:
        'Add a preview for a Body link. The link must be at the end of its paragraph; any text before it stays above the preview.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'externalArticlePreview',
          title: 'External article preview',
          type: 'object',
          fields: [
            defineField({
              name: 'href',
              title: 'Article URL',
              type: 'url',
              validation: (rule) =>
                rule
                  .required()
                  .uri({scheme: ['http', 'https']})
                  .custom((href, context) =>
                    !href || bodyHasArticleLink(context.document?.body, href)
                      ? true
                      : 'Add a matching link at the end of a Body paragraph. Query parameters must also match.',
                  ),
            }),
            defineField({
              name: 'source',
              title: 'Publication',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Headline',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Preview image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'source', media: 'image'},
          },
        }),
      ],
    }),
    defineField({
      name: 'youtubeEmbeds',
      title: 'YouTube video embeds',
      description:
        'Add an embed for a YouTube link in the Body. The link must be at the end of its paragraph; any text before it stays above the video. The poster image loads before the visitor clicks play.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'youtubeEmbed',
          title: 'YouTube video embed',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'YouTube URL',
              type: 'url',
              validation: (rule) =>
                rule
                  .required()
                  .uri({scheme: ['http', 'https']})
                  .custom((url, context) => {
                    if (!url) return true
                    if (!getYouTubeVideoId(url)) return 'Enter a YouTube video URL.'
                    return bodyHasYouTubeLink(context.document?.body, url)
                      ? true
                      : 'Add a matching YouTube link at the end of a Body paragraph.'
                  }),
            }),
            defineField({
              name: 'title',
              title: 'Video title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'poster',
              title: 'Poster image',
              description: 'This image is shown before the visitor clicks play.',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'url', media: 'poster'},
          },
        }),
      ],
      validation: (rule) => rule.custom((embeds) => {
        const ids = embeds?.map((embed) => getYouTubeVideoId((embed as {url?: string})?.url)).filter(Boolean) ?? []
        return new Set(ids).size === ids.length ? true : 'Add each YouTube video only once.'
      }),
    }),
    defineField({
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      description:
        'Enter the ID ( {{video_id}} ) of the video, not the whole url. https://player.vimeo.com/video/{{video_id}}?badge=0&autopause=0&player_id=0&app_id=58479',
    }),
    defineField({
      name: 'videoWidthAspectRatio',
      title: 'Video aspect ratio for width',
      type: 'string',
      description: 'What is the width of the aspect ratio',
      options: {
        list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'videoHeightAspectRatio',
      title: 'Video aspect ratio for height',
      type: 'string',
      description: 'What is the height of the aspect ratio',
      options: {
        list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'customButtonTextSection1',
      description: 'Leave blank to use default',
      placeholder: 'READ',
      title: 'Custom button text section 1',
      type: 'string',
    }),
    defineField({
      name: 'customButtonTextSection2',
      description: 'Leave blank to use default',
      placeholder: 'FULL',
      title: 'Custom button text section 2',
      type: 'string',
    }),
    defineField({
      name: 'customButtonTextSection3',
      description: 'Leave blank to use default',
      placeholder: 'STORY',
      title: 'Custom button text section 3',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'poster',
    },
    prepare(selection) {
      return {
        title: selection.title,
        date: selection.date,
        subtitle: selection.date,
        media: selection.media,
      }
    },
  },
})
