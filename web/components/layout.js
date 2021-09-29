import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import urlForSanitySource from '../lib/urlForSanitySource'
import ReactPlayer from 'react-player'

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
    name: 'Contact',
    href: '/contact',
  },
  {
    name: 'Moments',
    href: '/moments',
  },
]

const Layout = ({
  children,
  title,
  description,
  heroImageUrl,
  heroVideoId,
  heroContent = '',
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const router = useRouter()
  const [hoveredMenuItem, setHoveredMenuItem] = useState('')
  const [headerStyles, setHeaderStyles] = useState({})
  const [showHero, setShowHero] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)

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
        minHeight: '80vh',
      })
    }
  }, [heroVideoId, heroImageUrl])

  useEffect(() => {
    setTimeout(() => {
      setVideoPlaying(true)
    }, 1500)
  }, [])

  return (
    <div
      className={`${heroVideoId ? 'opacity-0' : null} ${
        heroVideoId && videoPlaying ? 'bpd-fade-in' : null
      }`}
    >
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
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
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
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin />
        <link rel="preconnect" href="https://player.vimeo.com" crossOrigin />
        <link rel="preconnect" href="https://f.vimeocdn.com" crossOrigin />
        <link rel="preconnect" href="https://i.vimeocdn.com" crossOrigin />
      </Head>

      <div className="bg-black absolute w-full">
        <div
          className={`${menuOpen ? 'opacity-100' : 'opacity-0'} ${
            menuVisible ? 'relative' : 'hidden'
          } w-full transition-all ease-in delay-500 duration-300 z-50 flex justify-between items-center overflow-visible text-white p-4`}
        >
          <Link href={`/`}>
            <a>
              <Image
                alt="JMills Logo"
                src="/images/JME-logo-white.png"
                width={100}
                height={60}
              />
            </a>
          </Link>
          <button
            className="w-12 h-8 focus:outline-none absolute top-8 right-4"
            onClick={() => toggleMenu(!menuOpen)}
            aria-label="Close menu"
          >
            <span style={{ width: '48px', height: '32px' }}>
              <Image
                alt="Close menu"
                className={`w-12 h-8 fill-current text-white stroke-2 stroke-current`}
                src={`/images/menu-close-white.svg`}
                layout="fill"
              />
            </span>
          </button>
        </div>
      </div>
      <nav
        className={`${menuOpen ? 'translate-x-0' : 'translate-x-4 opacity-0'} ${
          menuVisible ? 'fixed' : 'hidden'
        } bg-black inset-0 transform transition-all ease-in duration-300 z-40 text-right flex flex-col justify-center items-center`}
      >
        {navItems.map((navItem, index) => {
          return (
            <Link href={navItem.href} key={index}>
              <a
                className={`${
                  !hoveredMenuItem || hoveredMenuItem === navItem.href
                    ? 'text-white'
                    : 'text-gray-500'
                } font-bold relative group py-6 uppercase text-2xl md:text-4xl xl:text-6xl tracking-wider transition-all duration-700 w-96 text-center`}
                onMouseEnter={() => setHoveredMenuItem(navItem.href)}
                onMouseLeave={() => setHoveredMenuItem('')}
              >
                <span
                  className={`${
                    navItem.href === router.pathname ? 'text-gold ' : ''
                  }relative z-10`}
                >
                  {navItem.name}
                </span>
                <span
                  className={`${
                    hoveredMenuItem === navItem.href ? 'w-full' : 'w-0'
                  } transition-all duration-500 absolute z-0 left-0 right-0 bg-white`}
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
        <div className="relative flex items-center justify-between p-4 z-10 bg-black">
          <div>
            <Link href={`/`}>
              <a>
                <Image
                  alt="JMills Logo"
                  src="/images/JME-logo-white.png"
                  width={100}
                  height={60}
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
                  className={`${!menuOpen ? 'opacity-100' : 'opacity-0'} ${
                    !menuVisible ? 'absolute' : 'hidden'
                  } top-0 right-0 w-12 h-8 transform transition-all ease-in duration-300`}
                >
                  <Image
                    alt="Open menu"
                    className={`w-12 h-8 fill-current text-white stroke-2 stroke-current`}
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
          className={`relative h-full bg-black ${
            heroVideoId
              ? `lg:bg-gradient-to-b from-gray-400 to-white via-gray-100 lg:bg-opacity-25`
              : null
          }`}
          style={headerStyles}
        >
          {heroVideoId && (
            <div
              className={`bpd-hero-background absolute z-0 h-full w-full inset-0 ${
                videoPlaying ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ReactPlayer
                allow="autoplay; fullscreen; picture-in-picture"
                controls={false}
                frameBorder="0"
                height={`100%`}
                loop={true}
                muted={true}
                playing={true}
                playsinline={true}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  pointerEvents: 'none',
                  width: '140%',
                  transform: 'translate3d(-20%, 0, 0)',
                }}
                onPlay={() => setVideoPlaying(true)}
                title="Ravens Film Works"
                url={`https://player.vimeo.com/video/${heroVideoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=true&background=true`}
                width={`140%`}
              />
              {heroContent && (
                <div className="bpd-hero-foreground z-30 h-full w-full text-white relative">
                  {heroContent}
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <main className="bg-black text-white relative z-10 w-full">
        {children}
      </main>
      <footer className="bg-black relative z-10 py-8 text-center">
        <nav className="w-full container max-w-5xl px-12 lg:px-4 py-8 lg:mx-auto flex flex-wrap justify-center lg:justify-around space-x-4">
          {navItems.map((navItem, index) => {
            return (
              <Link key={index} href={navItem.href}>
                <a
                  className={`${
                    router.route === navItem.href ? 'border-b ' : ''
                  }font-bold text-white uppercase text-lg lg:text-2xl py-4`}
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
