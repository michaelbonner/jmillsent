const SINGLETON_PATHS = {
  homePage: ['/'],
  aboutPage: ['/about'],
  contactPage: ['/contact'],
  studioPage: ['/studio'],
  momentsPage: ['/moments'],
  documentaryPage: ['/documentary'],
  newsPage: ['/news'],
  workPage: ['/work'],
  portfolioPage: ['/private-gallery'],
}

const COLLECTION_PATHS = {
  treatment: { detail: '/treatment', listings: [] },
  workItem: { detail: '/work', listings: ['/', '/work'] },
  newsItem: { detail: '/news', listings: ['/news'] },
  portfolioItem: { detail: '/private-gallery', listings: ['/private-gallery'] },
  workItemCategory: { detail: '/work/category', listings: ['/work'] },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const secret = req.headers['x-sanity-webhook-secret']
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid secret' })
  }

  const { _type, slug } = req.body

  try {
    const paths = []

    // Singleton pages — fixed path, no slug needed
    if (SINGLETON_PATHS[_type]) {
      paths.push(...SINGLETON_PATHS[_type])
    }

    // Collection types — detail page + listing pages
    if (COLLECTION_PATHS[_type]) {
      const { detail, listings } = COLLECTION_PATHS[_type]
      if (slug?.current) {
        paths.push(`${detail}/${slug.current}`)
      }
      paths.push(...listings)
    }

    if (paths.length === 0) {
      return res.json({
        revalidated: false,
        message: `No revalidation rule for type "${_type}"`,
      })
    }

    await Promise.all(paths.map((path) => res.revalidate(path)))
    return res.json({ revalidated: true, paths })
  } catch (err) {
    console.error('Revalidation error:', err)
    return res.status(500).json({ message: 'Error revalidating' })
  }
}
