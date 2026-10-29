import { useWindowSize } from '@uidotdev/usehooks'
import { clsx } from 'clsx'
import { LoadingAnimationContext } from 'context/LoadingAnimationContext'
import useIsDesktop from 'hooks/useIsDesktop'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { urlForSanitySource } from '../lib/urlForSanitySource'
import { ClientOnly } from './client-only'

const LoadingAnimation = dynamic(() => import('./loading-animation'))

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
  { name: 'About', href: '/about' },
  { name: 'Studio', href: '/studio' },
  { name: 'Moments', href: '/moments' },
  { name: 'News', href: '/news' },
]

const heroMinHeight = '420px'

const contactNavItem = { name: 'Contact', href: '/contact' }

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/jmillsent' },
  { name: 'Vimeo', href: 'https://vimeo.com/jmillsent' },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/jmillsentertainment',
  },
]

const Layout = ({
  children,
  title,
  description,
  heroImageUrl,
  heroVideoId,
  heroContent = '',
  heroVideoHeightInPixels = 0,
  heroVideoWidthInPixels = 0,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const [videoPlaying, setVideoPlaying] = useState(false)
  const { width: windowWidth } = useWindowSize()
  const isDesktop = useIsDesktop()
  const {
    showLoadingAnimation,
    setIsAnimationComplete,
    isOverlayVisible,
    isAnimationComplete,
  } = useContext(LoadingAnimationContext)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'inherit'
    }

    return () => {
      document.body.style.overflow = 'inherit'
    }
  }, [menuOpen])

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setMenuOpen(false)
    }
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router])

  const showHero = useMemo(() => {
    return heroImageUrl || heroVideoId
  }, [heroImageUrl, heroVideoId])

  const { heroVideoHeight, heroVideoWidth } = useMemo(() => {
    if (isDesktop === false && !heroVideoId) {
      return {
        heroVideoHeight: `60svh`,
        heroVideoWidth: `100vw`,
      }
    }

    if (heroVideoWidthInPixels && heroVideoHeightInPixels) {
      const scaleFactor = windowWidth / heroVideoWidthInPixels

      return {
        heroVideoHeight: `${heroVideoHeightInPixels * scaleFactor}px`,
        heroVideoWidth: `${heroVideoWidthInPixels * scaleFactor}px`,
      }
    }

    return {
      heroVideoHeight: `42vw`,
      heroVideoWidth: `100vw`,
    }
  }, [
    heroVideoId,
    isDesktop,
    heroVideoHeightInPixels,
    heroVideoWidthInPixels,
    windowWidth,
  ])

  const heroVideoAspectRatio =
    heroVideoWidthInPixels && heroVideoHeightInPixels
      ? heroVideoWidthInPixels / heroVideoHeightInPixels
      : 100 / 42

  const headerStyles = useMemo(() => {
    if (heroImageUrl || heroVideoId) {
      return {
        backgroundImage: heroImageUrl
          ? `url(${urlForSanitySource(heroImageUrl).width(1400).format('webp').quality(80).url()})`
          : '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: heroVideoHeight,
        width: heroVideoWidth,
        minHeight: heroMinHeight,
        maxHeight: `86svh`,
      }
    }

    return {}
  }, [heroImageUrl, heroVideoId, heroVideoHeight, heroVideoWidth])

  useEffect(() => {
    setTimeout(() => {
      setVideoPlaying(true)
    }, 1500)
  }, [])

  return (
    <div className="relative">
      <Head>
        <title>
          {title || 'JmillsENT | Motion Picture Studio + Film Agency'}
        </title>
        <link
          rel="canonical"
          href={`https://www.jmillsent.com${router.asPath.split('?')[0]}`}
        />
        <link
          rel="preload"
          href="https://player.vimeo.com/api/player.js"
          as="script"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <meta
          property="og:title"
          content={title || 'JmillsENT | Motion Picture Studio + Film Agency'}
        />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta
          property="og:url"
          content={`https://www.jmillsent.com${router.asPath.split('?')[0]}`}
        />
        <meta property="og:site_name" content="JmillsENT" />
        <meta
          property="og:image"
          content="https://www.jmillsent.com/og-image.jpg"
        />
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={title || 'JmillsENT | Motion Picture Studio + Film Agency'}
        />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://www.jmillsent.com/og-image.jpg"
        />
        <link
          rel="preconnect"
          href="https://cdn.sanity.io"
          crossOrigin="true"
        />
        <link
          rel="preconnect"
          href="https://player.vimeo.com"
          crossOrigin="true"
        />
        <link
          rel="preconnect"
          href="https://f.vimeocdn.com"
          crossOrigin="true"
        />
        <link
          rel="preconnect"
          href="https://i.vimeocdn.com"
          crossOrigin="true"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': 'https://www.jmillsent.com/#organization',
              name: 'Jmills Entertainment',
              url: 'https://www.jmillsent.com',
              logo: 'https://www.jmillsent.com/images/jme_film_co_circle_white.svg',
              sameAs: [
                'https://www.instagram.com/jmillsent',
                'https://vimeo.com/jmillsent',
                'https://www.linkedin.com/company/jmillsentertainment',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'JmillsENT',
              url: 'https://www.jmillsent.com',
              publisher: {
                '@id': 'https://www.jmillsent.com/#organization',
              },
            }),
          }}
        />
      </Head>

      <div
        className={clsx(
          'pointer-events-none fixed inset-0 z-30 bg-black transition-opacity duration-2400',
          isOverlayVisible ? 'opacity-100' : 'opacity-0',
          showLoadingAnimation ? 'delay-2700' : 'delay-700'
        )}
      >
        {showLoadingAnimation && !isAnimationComplete && (
          <ClientOnly>
            <LoadingAnimation setIsAnimationComplete={setIsAnimationComplete} />
          </ClientOnly>
        )}
      </div>

      <div
        className={clsx(
          'top-0 z-40 w-full',
          showHero && !menuOpen ? 'absolute' : 'relative',
          menuOpen && 'fixed bg-neutral-950'
        )}
      >
        <div className="max-w-13xl mx-auto flex items-center justify-between gap-8 px-5 py-5 lg:py-6">
          <Link
            href="/"
            aria-label="Homepage"
            className="w-24 shrink-0 lg:w-[120px]"
          >
            <Image
              alt="Jmills Entertainment logo"
              src="/images/jme-box-white.svg"
              width={120}
              height={68}
              className="h-auto w-full"
              priority
            />
          </Link>
          <nav aria-label="Main navigation">
            <div className="hidden items-center gap-6 text-sm font-medium tracking-[0.08em] uppercase lg:flex xl:gap-8">
              {navItems.map((navItem) => (
                <Link
                  key={navItem.href}
                  href={navItem.href}
                  className={clsx(
                    'border-b py-2 transition-colors',
                    router.pathname === navItem.href
                      ? 'border-white'
                      : 'border-transparent hover:border-white'
                  )}
                >
                  {navItem.name}
                </Link>
              ))}
              <Link
                href={contactNavItem.href}
                className="border border-white px-5 py-3 text-sm font-medium transition-colors hover:bg-white hover:text-neutral-950"
              >
                {contactNavItem.name}
              </Link>
            </div>
            <button
              type="button"
              className="flex min-h-12 items-center gap-3 border-b border-white text-sm font-medium tracking-[0.08em] uppercase lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? 'Close' : 'Menu'}
              <span className="text-xl leading-none" aria-hidden="true">
                {menuOpen ? '−' : '+'}
              </span>
            </button>
          </nav>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={clsx(
          'fixed inset-0 z-30 overflow-y-auto bg-neutral-950 px-5 pt-28 pb-10 sm:px-8 lg:hidden',
          !menuOpen && 'hidden'
        )}
      >
        <div className="flex flex-col border-t border-white/20">
          {[...navItems, contactNavItem].map((navItem) => (
            <Link
              key={navItem.href}
              href={navItem.href}
              className={clsx(
                'flex items-center justify-between border-b border-white/20 py-5',
                'text-3xl font-semibold tracking-[-0.04em] uppercase',
                router.pathname === navItem.href
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
              )}
            >
              {navItem.name}
              <span className="text-xl" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <header className="overflow-hidden">
        {isDesktop !== null && showHero && (
          <div
            className="relative isolate h-full bg-neutral-900"
            style={headerStyles}
          >
            {heroVideoId && (
              <div
                className={clsx(
                  {
                    'opacity-100': videoPlaying,
                    'opacity-0': !videoPlaying,
                  },
                  'absolute inset-0 -z-10 transition-opacity duration-1000'
                )}
              >
                <iframe
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen={true}
                  mozallowfullscreen="true"
                  src={`https://player.vimeo.com/video/${heroVideoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=true&background=true`}
                  webkitallowfullscreen="true"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    width: `max(${heroVideoWidth}, ${heroMinHeight} * ${heroVideoAspectRatio})`,
                    height: `max(${heroVideoHeight}, ${heroMinHeight})`,
                  }}
                />
              </div>
            )}
            <div className="absolute inset-0 bg-linear-to-r from-neutral-950/85 via-neutral-950/45 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-neutral-950/60 to-transparent" />
            {heroContent && (
              <div className="relative flex h-full items-end py-12 text-white lg:py-20">
                <div className="mx-auto w-full max-w-7xl px-5">
                  {heroContent}
                </div>
              </div>
            )}
          </div>
        )}
        {!showHero && heroContent && (
          <div className="pt-12 pb-8 text-white lg:pt-20">
            <div className="mx-auto w-full max-w-7xl px-5">{heroContent}</div>
          </div>
        )}
      </header>
      <main className="relative z-10 w-full bg-neutral-950 text-white">
        {children}
      </main>
      <Footer />
    </div>
  )
}

const Footer = () => {
  return (
    <footer className="bg-neutral-900 px-5 pt-16 pb-8 text-white sm:px-8 lg:pt-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Link href="/" aria-label="Homepage" className="block w-28">
            <Image
              alt="Jmills Entertainment logo"
              src="/images/jme-box-white.svg"
              width={120}
              height={68}
              className="h-auto w-full"
            />
          </Link>
          <p className="mt-8 max-w-[36ch] text-base/7 text-neutral-400">
            Motion picture studio and film agency in Salt Lake City, Utah.
          </p>
        </div>
        <div className="lg:col-span-3">
          <nav
            className="flex flex-col items-start gap-3 text-base"
            aria-label="Footer navigation"
          >
            {[...navItems, contactNavItem].map((navItem) => (
              <Link
                key={navItem.href}
                href={navItem.href}
                className="underline-offset-4 hover:underline"
              >
                {navItem.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="lg:col-span-3">
          <p className="mb-5 text-sm font-medium tracking-[0.12em] text-neutral-400 uppercase">
            Find us
          </p>
          <a
            className="text-base/7 hover:underline"
            href="https://maps.google.com/?q=1589+W+2225+S+Woods+Cross+UT+84087"
            target="_blank"
            rel="noopener nofollow"
          >
            1589 W 2225 S<br />
            Woods Cross, UT 84087
          </a>
          <div className="mt-6 flex flex-col items-start gap-3 text-base">
            {socialLinks.map((socialLink) => (
              <a
                key={socialLink.href}
                href={socialLink.href}
                target="_blank"
                rel="noopener"
                className="underline-offset-4 hover:underline"
              >
                {socialLink.name} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-3 border-t border-white/15 pt-6 text-sm text-neutral-400 sm:flex-row sm:flex-wrap sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Jmills Entertainment</p>
        <a className="hover:underline" href="https://theravenspace.com/">
          Ravenspace studio rental ↗
        </a>
      </div>
    </footer>
  )
}

export default Layout
