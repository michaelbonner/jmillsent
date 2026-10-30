export function getYouTubeVideoId(value) {
  if (!value) return null

  try {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol)) return null

    const host = url.hostname.toLowerCase()
    let id = null

    if (host === 'youtu.be' || host === 'www.youtu.be') {
      id = url.pathname.split('/')[1]
    } else if (
      [
        'youtube.com',
        'www.youtube.com',
        'm.youtube.com',
        'youtube-nocookie.com',
        'www.youtube-nocookie.com',
      ].includes(host)
    ) {
      id =
        url.pathname === '/watch'
          ? url.searchParams.get('v')
          : (url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ??
            null)
    }

    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null
  } catch {
    return null
  }
}

export function getYouTubeStartSeconds(value) {
  try {
    const url = new URL(value)
    if (!getYouTubeVideoId(value)) return 0

    const start = url.searchParams.get('start') ?? url.searchParams.get('t')
    if (!start) return 0
    if (/^\d+$/.test(start)) return Number(start)

    const match = start.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/)
    if (!match || !match.slice(1).some(Boolean)) return 0
    return (
      Number(match[1] ?? 0) * 3600 +
      Number(match[2] ?? 0) * 60 +
      Number(match[3] ?? 0)
    )
  } catch {
    return 0
  }
}
