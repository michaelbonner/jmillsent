import classNames from 'classnames'
import useWindowSize from 'hooks/useWindowSize'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import urlForSanitySource from '../lib/urlForSanitySource'

const navItems = [
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
  {
    name: 'News',
    href: '/news',
  },
  {
    name: 'Moments',
    href: '/moments',
  },
  {
    name: 'Contact',
    href: '/contact',
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
  const [menuVisible, setMenuVisible] = useState(false)
  const router = useRouter()
  const [hoveredMenuItem, setHoveredMenuItem] = useState('')
  const [headerStyles, setHeaderStyles] = useState({})
  const [showHero, setShowHero] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const heroContainerRef = React.createRef()
  const [heroVideoHeight, setHeroVideoHeight] = useState('70vh')
  const [heroVideoWidth, setHeroVideoWidth] = useState('100vw')

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

  useEffect(() => {
    if (heroImageUrl || heroVideoId) {
      setShowHero(true)
      setHeaderStyles({
        backgroundImage: heroImageUrl
          ? `url(${urlForSanitySource(heroImageUrl).width(1400)})`
          : '',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: heroVideoHeight,
        width: heroVideoWidth,
      })
    }
  }, [heroVideoId, heroImageUrl, heroVideoHeight, heroVideoWidth])

  useEffect(() => {
    setTimeout(() => {
      setVideoPlaying(true)
    }, 1500)
  }, [])

  useEffect(() => {
    if (heroVideoWidthInPixels && heroVideoHeightInPixels) {
      const scaleFactor = windowWidth / heroVideoWidthInPixels

      setHeroVideoHeight(`${heroVideoHeightInPixels * scaleFactor}px`)
      setHeroVideoWidth(`${heroVideoWidthInPixels * scaleFactor}px`)
    }
  }, [
    heroContainerRef,
    heroVideoHeightInPixels,
    heroVideoWidthInPixels,
    windowHeight,
    windowWidth,
  ])

  return (
    <div>
      <Head>
        <title>
          {title || 'JmillsENT | Motion Picture Studio + Film Agency'}
        </title>
        <link rel="stylesheet" href="https://use.typekit.net/apl0yxr.css" />
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
          content="https://jmillsent.vercel.app/og-image.jpg"
        />
        <meta name="description" content={description} />
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
      </Head>

      <div
        className={`
        bg-black pointer-events-none fixed inset-0 transition-opacity duration-[3000ms] z-20
          ${heroVideoId && !videoPlaying ? `opacity-100` : `opacity-0`}
            `}
      >
        <div
          className={`${
            heroVideoId && !videoPlaying
              ? `opacity-100 animate-pulse`
              : `opacity-0`
          } w-full h-full flex items-center justify-center duration-1500`}
        >
          <Image
            alt="JMills Logo"
            className="max-w-full px-8"
            src="/images/jme_film_co_x_white.svg"
            width={Math.floor(192 * 1.4)}
            height={Math.floor(150 * 1.4)}
          />
        </div>
      </div>

      <div className="bg-black absolute w-full">
        <div
          className={classNames(
            {
              'opacity-100': menuOpen,
              'opacity-0': !menuOpen,
              relative: menuVisible,
              hidden: !menuVisible,
            },
            'w-full transition-all ease-in delay-500 duration-300',
            'z-50 flex justify-between items-center overflow-visible text-white py-4 px-6'
          )}
        >
          <Link href={`/`}>
            <a>
              <Image
                alt="JMills Logo"
                src="/images/jme_film_co_x_white.png"
                width={Math.floor(192 * 0.6)}
                height={Math.floor(150 * 0.6)}
              />
            </a>
          </Link>
          <button
            className="w-12 h-8 focus:outline-none absolute top-8 right-6"
            onClick={() => toggleMenu(!menuOpen)}
            aria-label="Close menu"
          >
            <span style={{ width: '48px', height: '32px' }}>
              <Image
                alt="Close menu"
                className="w-12 h-8 fill-current text-white stroke-2 stroke-current"
                src={`/images/menu-close-white.svg`}
                layout="fill"
              />
            </span>
          </button>
        </div>
      </div>
      <nav
        className={classNames(
          {
            'translate-x-0': menuOpen,
            'translate-x-4 opacity-0': !menuOpen,
            fixed: menuVisible,
            hidden: !menuVisible,
          },
          'bg-black inset-0 transform transition-all ease-in',
          'duration-300 z-40 text-right flex flex-col justify-center items-center'
        )}
      >
        {navItems.map((navItem, index) => {
          return (
            <Link href={navItem.href} key={index}>
              <a
                className={classNames(
                  `${
                    !hoveredMenuItem || hoveredMenuItem === navItem.href
                      ? 'text-white'
                      : 'text-gray-500'
                  }`,
                  `font-bold relative group py-6 uppercase`,
                  `text-2xl md:text-4xl xl:text-6xl tracking-wider`,
                  `transition-all duration-700 w-96 text-center`
                )}
                onMouseEnter={() => setHoveredMenuItem(navItem.href)}
                onMouseLeave={() => setHoveredMenuItem('')}
              >
                <span
                  className={classNames(
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
                  className={classNames(
                    {
                      'w-full': hoveredMenuItem === navItem.href,
                      'w-0': hoveredMenuItem !== navItem.href,
                    },
                    'transition-all duration-500 absolute z-0 left-0 right-0 bg-white'
                  )}
                  style={{
                    bottom: 'calc(50% - 1px)',
                    height: '2px',
                  }}
                ></span>
              </a>
            </Link>
          )
        })}
      </nav>

      <header className="overflow-hidden">
        <div className="relative flex items-center justify-between py-4 px-6 z-10 bg-black">
          <div>
            <Link href={`/`}>
              <a className="flex items-center">
                <Image
                  alt="JMills Logo"
                  src="/images/jme_film_co_x_white.png"
                  width={Math.floor(202 * 0.6)}
                  height={Math.floor(158 * 0.6)}
                />
              </a>
            </Link>
          </div>
          <div className="flex justify-end items-center">
            <div className="relative lg:ml-8 lg:mr-0">
              <button
                className="w-12 h-8 focus:outline-none relative"
                onClick={() => toggleMenu(!menuOpen)}
                aria-label="Open menu"
              >
                <span
                  className={classNames(
                    {
                      'opacity-100': !menuOpen,
                      'opacity-0': menuOpen,
                      absolute: !menuVisible,
                      hidden: menuVisible,
                    },
                    'top-0 right-0 w-12 h-8 transform transition-all ease-in duration-300'
                  )}
                >
                  <Image
                    alt="Open menu"
                    className="w-12 h-8 fill-current text-white stroke-2 stroke-current"
                    src={
                      showHero ? `/images/menu-white.svg` : `/images/menu.svg`
                    }
                    layout="fill"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div
          className={classNames(
            {
              'lg:bg-gradient-to-b from-gray-700 to-black via-gray-800 lg:bg-opacity-25':
                heroVideoId,
            },
            `relative h-full bg-black`
          )}
          style={headerStyles}
        >
          {heroVideoId ? (
            <div
              className={classNames(
                {
                  'opacity-100': videoPlaying,
                  'opacity-0': !videoPlaying,
                },
                `absolute z-0 inset-0`
              )}
              height={heroVideoHeight}
              width={heroVideoWidth}
              ref={heroContainerRef}
            >
              <ReactPlayer
                allow="autoplay; fullscreen; picture-in-picture"
                controls={false}
                frameBorder="0"
                height={heroVideoHeight}
                loop={true}
                muted={true}
                playing={true}
                playsinline={true}
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
                onPlay={() => setVideoPlaying(true)}
                title="Ravens Film Works"
                url={`https://player.vimeo.com/video/${heroVideoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=true&background=true`}
                width={heroVideoWidth}
              />
              {heroContent && (
                <div className="z-30 h-full w-full text-white relative">
                  {heroContent}
                </div>
              )}
            </div>
          ) : (
            heroContent && (
              <div
                className="flex items-center z-30 h-full w-full text-white relative"
                style={{ minHeight: `20vh` }}
              >
                {heroContent}
              </div>
            )
          )}
        </div>
      </header>
      <main className="bg-black text-white relative z-10 w-full">
        {children}
      </main>
      <footer className="bg-black relative z-10 pb-8 text-center">
        <nav className="w-full container max-w-5xl px-12 lg:px-4 pb-8 lg:mx-auto flex flex-wrap justify-center lg:justify-around space-x-4">
          {navItems.map((navItem, index) => {
            return (
              <Link key={index} href={navItem.href}>
                <a
                  className={classNames(
                    {
                      'border-b': router.route === navItem.href,
                    },
                    `font-bold text-white uppercase pb-1 text-lg lg:text-2xl`
                  )}
                >
                  {navItem.name}
                </a>
              </Link>
            )
          })}
        </nav>
        &copy; Jeremy Miller {new Date().getFullYear()}
      </footer>
    </div>
  )
}
export default Layout
