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
import { JsonLd } from './json-ld'

const LoadingAnimation = dynamic(() => import('./loading-animation'))

const navItems = [
  [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Work',
      href: '/work',
    },
    {
      name: 'About',
      href: '/about',
    },
    {
      name: 'Studio',
      href: '/studio',
    },
  ],
  [
    {
      name: 'Moments',
      href: '/moments',
    },
    {
      name: 'News',
      href: '/news',
    },
    {
      name: 'Contact',
      href: '/contact',
    },
  ],
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
  const [menuVisible, setMenuVisible] = useState(false)
  const router = useRouter()
  const [hoveredMenuItem, setHoveredMenuItem] = useState('')
  const [videoPlaying, setVideoPlaying] = useState(false)
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const heroContainerRef = React.createRef()
  const isDesktop = useIsDesktop()
  const {
    showLoadingAnimation,
    setIsAnimationComplete,
    isOverlayVisible,
    isAnimationComplete,
  } = useContext(LoadingAnimationContext)

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(!menuOpen)
      setTimeout(() => {
        setMenuVisible(!menuOpen)
      }, 100)
    } else {
      setMenuVisible(!menuOpen)
      setTimeout(() => {
        setMenuOpen(!menuOpen)
      }, 100)
    }
  }

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
      setMenuVisible(false)
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
        heroVideoHeight: `27.5vh`,
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
        maxHeight: `70vh`,
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
          property="og:image"
          content="https://www.jmillsent.com/og-image.jpg"
        />
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
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
        <JsonLd
          data={{
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
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'JmillsENT',
            url: 'https://www.jmillsent.com',
            publisher: {
              '@id': 'https://www.jmillsent.com/#organization',
            },
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
          'top-0 z-50 w-full lg:absolute',
          !menuOpen && 'absolute',
          menuOpen && 'sticky'
        )}
      >
        <div
          className={clsx(
            {
              'opacity-100': menuOpen,
              'opacity-0': !menuOpen,
              relative: menuVisible,
              hidden: !menuVisible,
            },
            'w-full transition-all delay-500 duration-300 ease-in',
            'z-50 flex items-start justify-between overflow-visible px-6 py-4 text-white'
          )}
        >
          <div className="hidden lg:flex">
            <Link href={`/`} className="flex items-center">
              <Image
                alt="JMills Logo"
                src="/images/jme_film_co_circle_white.svg"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <Link href={`/`} className="flex items-center">
              <Image
                alt="JMills Logo"
                src="/images/jme_film_co_circle_white.svg"
                width={80}
                height={80}
              />
            </Link>
          </div>
          <button
            className="absolute top-10 right-6 h-8 w-12 focus:outline-hidden lg:top-10"
            onClick={() => toggleMenu(!menuOpen)}
            aria-label="Close menu"
          >
            <span style={{ width: '48px', height: '32px' }}>
              <Image
                alt="Close menu"
                className="h-8 w-12 fill-current stroke-current stroke-2 text-white"
                src={`/images/menu-close-white.svg`}
                width="48"
                height="32"
              />
            </span>
          </button>
        </div>
      </div>
      <nav
        className={clsx(
          {
            'translate-x-0': menuOpen,
            'translate-x-4 opacity-0': !menuOpen,
            fixed: menuVisible,
            hidden: !menuVisible,
          },
          'inset-0 transform bg-black/92 backdrop-blur-lg pb-[20px] transition-all ease-in',
          'z-40 flex flex-col items-center justify-center overflow-y-scroll text-right duration-300'
        )}
      >
        {[...navItems[0], ...navItems[1]].map((navItem, index) => {
          return (
            <Link
              href={navItem.href}
              key={index}
              className={clsx(
                `${!hoveredMenuItem || hoveredMenuItem === navItem.href
                  ? 'text-white'
                  : 'text-gray-500'
                }`,
                `group relative max-w-[80vw] py-[3vh] font-bold uppercase lg:py-6`,
                `text-2xl tracking-wider md:text-4xl xl:text-6xl`,
                `w-96 text-center transition-all duration-700`
              )}
              onMouseEnter={() => setHoveredMenuItem(navItem.href)}
              onMouseLeave={() => setHoveredMenuItem('')}
            >
              <span
                className={clsx(
                  {
                    'text-gold': navItem.href === router.pathname,
                    'text-gold opacity-50': navItem.href === router.pathname,
                  },
                  `relative z-10`
                )}
              >
                {navItem.name}
              </span>
              <span
                className={clsx(
                  {
                    'w-full': hoveredMenuItem === navItem.href,
                    'w-0': hoveredMenuItem !== navItem.href,
                  },
                  'absolute right-0 left-0 z-0 bg-white transition-all duration-500'
                )}
                style={{
                  bottom: 'calc(50% - 1px)',
                  height: '2px',
                }}
              ></span>
            </Link>
          )
        })}
      </nav>

      <div
        className={clsx(
          'top-0 z-20 flex w-full items-center justify-between px-6 py-4 lg:absolute',
          menuOpen && 'fixed',
          !menuOpen && 'sticky bg-black lg:bg-transparent'
        )}
      >
        <div className="hidden lg:flex">
          <Link href={`/`} className="flex items-center">
            <Image
              alt="JMills Logo"
              src="/images/jme_film_co_circle_white.svg"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Link href={`/`} className="flex items-center">
            <Image
              alt="JMills Logo"
              src="/images/jme_film_co_circle_white.svg"
              width={80}
              height={80}
            />
          </Link>
        </div>
        <div className="flex items-center justify-end">
          <div className="relative lg:mr-0 lg:ml-8">
            <button
              className="relative h-8 w-12 hover:animate-pulse focus:outline-hidden"
              onClick={() => toggleMenu(!menuOpen)}
              aria-label="Open menu"
            >
              <span
                className={clsx(
                  {
                    'opacity-100': !menuOpen,
                    'opacity-0': menuOpen,
                    absolute: !menuVisible,
                    hidden: menuVisible,
                  },
                  'top-0 right-0 h-8 w-12 transform transition-all duration-300 ease-in'
                )}
              >
                <Image
                  alt="Open menu"
                  className="h-8 w-12 fill-current stroke-current stroke-2 text-white"
                  src={showHero ? `/images/menu-white.svg` : `/images/menu.svg`}
                  height="48"
                  width="32"
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <header className="overflow-hidden">
        {isDesktop !== null && (
          <div
            className={clsx(
              {
                'from-gray-700 via-gray-800 to-black lg:bg-linear-to-b lg:from-gray-700/25 lg:via-gray-800/25 lg:to-black/25':
                  heroVideoId,
              },
              `relative h-full bg-black`
            )}
            style={headerStyles}
          >
            {heroVideoId ? (
              <div
                className={clsx(
                  {
                    'opacity-100': videoPlaying,
                    'opacity-0': !videoPlaying,
                  },
                  `absolute inset-0 z-0`
                )}
                height={heroVideoHeight}
                width={heroVideoWidth}
                ref={heroContainerRef}
              >
                <iframe
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen={true}
                  mozallowfullscreen="true"
                  src={`https://player.vimeo.com/video/${heroVideoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=true&background=true`}
                  webkitallowfullscreen="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    pointerEvents: 'none',
                    width: heroVideoWidth,
                    height: heroVideoHeight,
                  }}
                />
                {heroContent && (
                  <div className="relative z-30 h-full w-screen text-white">
                    {heroContent}
                  </div>
                )}
              </div>
            ) : (
              heroContent && (
                <div
                  className="relative z-0 flex h-full w-screen items-center text-white"
                  style={{ minHeight: `20vh` }}
                >
                  {heroContent}
                </div>
              )
            )}
          </div>
        )}
      </header>
      <main className="relative z-10 w-full bg-black text-white">
        {children}
      </main>
      <footer className="text-center">
        <MobileFooterMenu />
        <DesktopFooterMenu />
        <p className="mt-8 mb-2 text-gray-500">
          &copy; Jmills Entertainment {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}

const FooterNavItem = ({ navItem, className }) => {
  const router = useRouter()

  return (
    <Link
      href={navItem.href}
      className={clsx(
        'px-2 text-sm font-semibold text-white uppercase',
        'lg:px-4 lg:text-lg',
        'xl:text-2xl',
        className
      )}
    >
      <div
        className={clsx(
          'px-2 py-1 transition-all',
          router.route === navItem.href
            ? 'border border-white'
            : 'hover:scale-110'
        )}
      >
        {navItem.name}
      </div>
    </Link>
  )
}

const MobileFooterMenu = () => {
  return (
    <div className={clsx('mt-12 px-5 text-center', 'lg:hidden')}>
      <div
        className={clsx(
          'flex flex-wrap justify-center gap-y-4 border-t border-gray-400 pt-4 pb-4',
          'divide-x divide-white'
        )}
      >
        {navItems[0].map((navItem, index) => {
          return <FooterNavItem key={index} navItem={navItem} />
        })}
      </div>
      <div
        className={clsx(
          'flex flex-wrap justify-center gap-y-4 border-t border-gray-400 pt-4 pb-4',
          'divide-x divide-white'
        )}
      >
        {navItems[1].map((navItem, index) => {
          return <FooterNavItem key={index} navItem={navItem} />
        })}
      </div>
    </div>
  )
}

const DesktopFooterMenu = () => {
  return (
    <div
      className={clsx(
        'hidden',
        'px-24 lg:mt-24 lg:flex lg:flex-wrap lg:items-start lg:justify-center lg:text-center'
      )}
    >
      <div
        className={clsx(
          'flex flex-wrap justify-center gap-y-4 border-t border-gray-400 pt-4 pb-4',
          'divide-x divide-white',
          'xl:px-8'
        )}
      >
        {[...navItems[0], ...navItems[1]].map((navItem, index) => {
          return <FooterNavItem key={index} navItem={navItem} />
        })}
      </div>
    </div>
  )
}

export default Layout
