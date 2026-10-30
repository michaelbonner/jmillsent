import SanityImage from '@/components/sanity-image'
import { createClient } from 'next-sanity'

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-03-25',
}

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)

// Reads drafts on top of published content; only used in Next.js draft mode
export const previewClient = createClient({
  ...config,
  useCdn: false,
  apiVersion: '2025-02-19',
  perspective: 'drafts',
  token: process.env.SANITY_API_TOKEN,
})

export const getClient = (preview) => (preview ? previewClient : sanityClient)

export const portableTextComponents = {
  types: {
    image: ({ value }) => {
      return <SanityImage image={value} />
    },
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined
      return (
        <a href={value.href} rel={rel}>
          {children}
        </a>
      )
    },
  },
}
