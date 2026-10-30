import { previewClient } from '@/lib/sanity'
import groq from 'groq'

// Shareable draft preview: /api/preview?secret=<SANITY_PREVIEW_SECRET>&slug=<news slug>
export default async function handler(req, res) {
  const { secret, slug } = req.query

  if (!process.env.SANITY_PREVIEW_SECRET) {
    return res.status(500).json({ message: 'Preview is not configured' })
  }

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  if (typeof slug !== 'string' || !slug) {
    return res.status(400).json({ message: 'Missing slug' })
  }

  const newsItem = await previewClient.fetch(
    groq`*[_type == "newsItem" && slug.current == $slug][0]{ "slug": slug.current }`,
    { slug }
  )

  if (!newsItem) {
    return res.status(404).json({ message: 'News item not found' })
  }

  res.setDraftMode({ enable: true })
  // Redirect to the slug from Sanity rather than the query string to avoid open redirects
  res.redirect(307, `/news/${encodeURIComponent(newsItem.slug)}`)
}
