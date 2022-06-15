import SanityImage from '@/components/sanity-image'
import {
  createClient,
  createCurrentUserHook,
  createPreviewSubscriptionHook,
} from 'next-sanity'

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-03-25',
}

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)
// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Helper function for easily switching between normal client and preview client
export const getClient = (usePreview) =>
  usePreview ? previewClient : sanityClient

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)

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
