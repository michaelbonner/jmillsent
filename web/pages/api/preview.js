import { timingSafeEqual } from 'node:crypto'
import { previewClient } from '@/lib/sanity'
import groq from 'groq'

// The secret lives in Sanity at a dotted _id, which the public dataset hides from
// unauthenticated reads. Studio's "Preview post" action builds links from the same document.
const SECRET_ID = 'secrets.newsPreview'

const secretsMatch = (a, b) => {
  const left = Buffer.from(a)
  const right = Buffer.from(b)
  return left.length === right.length && timingSafeEqual(left, right)
}

// Shareable draft preview: /api/preview?secret=<secret>&slug=<news slug>
export default async function handler(req, res) {
  const { secret, slug } = req.query

  const expectedSecret = await previewClient.fetch(
    groq`*[_id == $id][0].secret`,
    { id: SECRET_ID },
    { perspective: 'raw' }
  )

  if (!expectedSecret) {
    return res.status(500).json({ message: 'Preview is not configured' })
  }

  if (typeof secret !== 'string' || !secretsMatch(secret, expectedSecret)) {
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
