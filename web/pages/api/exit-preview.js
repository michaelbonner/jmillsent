export default function handler(req, res) {
  res.setDraftMode({ enable: false })

  const { redirect } = req.query
  // Only allow same-site paths
  const location =
    typeof redirect === 'string' &&
    redirect.startsWith('/') &&
    !redirect.startsWith('//')
      ? redirect
      : '/'

  res.redirect(307, location)
}
