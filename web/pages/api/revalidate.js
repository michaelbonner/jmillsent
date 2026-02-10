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
    if (_type === 'treatment' && slug?.current) {
      await res.revalidate(`/treatment/${slug.current}`)
      return res.json({ revalidated: true, path: `/treatment/${slug.current}` })
    }

    return res.json({ revalidated: false, message: `No revalidation rule for type "${_type}"` })
  } catch (err) {
    console.error('Revalidation error:', err)
    return res.status(500).json({ message: 'Error revalidating' })
  }
}
