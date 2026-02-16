import { portableTextComponents, sanityClient } from '@/lib/sanity'
import { urlForSanitySource } from '@/lib/urlForSanitySource'
import { PortableText } from '@portabletext/react'
import clsx from 'clsx'
import groq from 'groq'
import Image from 'next/image'
import Head from 'next/head'
import { useCallback, useEffect, useMemo, useState } from 'react'

function SlideBackground({ slide }) {
  return (
    <>
      {slide.backgroundImage?.asset && (
        <Image
          src={urlForSanitySource(slide.backgroundImage)
            .width(1920)
            .height(1080)
            .format('webp')
            .url()}
          alt=""
          fill
          className="object-cover"
          priority
        />
      )}
      {slide.backgroundVideoURL && (
        <video
          src={slide.backgroundVideoURL}
          className="absolute inset-0 z-10 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      )}
    </>
  )
}

const placementClasses = {
  'top-left': 'items-start justify-start text-left',
  'top-center': 'items-center justify-start text-center',
  'top-right': 'items-end justify-start text-right',
  'center-left': 'items-start justify-center text-left',
  'center-center': 'items-center justify-center text-center',
  'center-right': 'items-end justify-center text-right',
  'bottom-left': 'items-start justify-end text-left',
  'bottom-center': 'items-center justify-end text-center',
  'bottom-right': 'items-end justify-end text-right',
}

function OverlayLogo({ type, clientLogo, customLogo, className }) {
  if (type === 'client' && clientLogo?.asset) {
    return (
      <div className={clsx('relative shrink-0', className)}>
        <Image
          src={urlForSanitySource(clientLogo).height(80).format('webp').url()}
          alt=""
          fill
          className="object-contain object-left"
        />
      </div>
    )
  }
  if (type === 'jme') {
    return (
      <div className={clsx('relative shrink-0', className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/jme-film-co-horizontal-white.webp"
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
    )
  }
  if (type === 'custom' && customLogo?.asset) {
    return (
      <div className={clsx('relative shrink-0', className)}>
        <Image
          src={urlForSanitySource(customLogo).height(80).format('webp').url()}
          alt=""
          fill
          className="object-contain object-left"
        />
      </div>
    )
  }
  return null
}

function SlideOverlay({ slide, clientLogo }) {
  if (slide.frameStyle !== 'border-tb') return null
  const topLogo = slide.topLogo || 'none'
  const bottomLogo = slide.bottomLogo || 'none'
  const hasTop = topLogo !== 'none'
  const hasBottom = slide.additionalText || bottomLogo !== 'none'
  if (!hasTop && !hasBottom) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* Top: logo + horizontal line */}
      {hasTop && (
        <div className="absolute left-8 right-8 top-6 flex items-center gap-4">
          <OverlayLogo
            type={topLogo}
            clientLogo={clientLogo}
            customLogo={slide.topLogoCustom}
            className="h-10 w-32"
          />
          <div className="h-px grow bg-white/60" />
        </div>
      )}

      {/* Bottom: additional text + horizontal line + logo */}
      {hasBottom && (
        <div className="absolute bottom-6 left-8 right-8 flex items-center gap-4">
          {slide.additionalText && (
            <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-white">
              {slide.additionalText}
            </span>
          )}
          <div className="h-px grow bg-white/60" />
          <OverlayLogo
            type={bottomLogo}
            clientLogo={clientLogo}
            customLogo={slide.bottomLogoCustom}
            className="h-8 w-24"
          />
        </div>
      )}
    </div>
  )
}

function TitleSlide({ slide, clientLogo }) {
  const textColor = slide.textColor || '#FFFFFF'
  const placement = slide.placement || 'center-center'

  const styles = {
    h1: clsx(
      'font-black uppercase',
      !slide.heading2 ? 'text-8xl scale-[1_1.3]' : 'text-7xl italic',
    ),
    h2: clsx(
      'text-2xl',
    ),
  }

  return (
    <>
      <div className={clsx('relative flex h-full w-full flex-col gap-2 p-24', placementClasses[placement])}>
        {slide.logo?.asset && (
          <div className="relative h-24 w-48">
            <Image
              src={urlForSanitySource(slide.logo)
                .width(400)
                .format('webp')
                .url()}
              alt=""
              fill
              className="object-contain"
            />
          </div>
        )}
        {slide.heading1 && (
          <h1
            className={styles.h1}
            style={{ color: textColor }}
          >
            {slide.heading1}
          </h1>
        )}
        {slide.heading2 && (
          <h2
            className={styles.h2}
            style={{ color: textColor }}
          >
            {slide.heading2}
          </h2>
        )}
        {slide.body && (
          <div
            className="prose prose-invert mt-0 max-w-3xl text-lg"
            style={{ color: textColor }}
          >
            <PortableText
              value={slide.body}
              components={portableTextComponents}
            />
          </div>
        )}
      </div>
      <SlideOverlay slide={slide} clientLogo={clientLogo} />
    </>
  )
}


function SlideFrame({ treatment, slide, currentIndex, totalSlides }) {
  const { standardSlideElements, clientLogo } = treatment
  const frameStyle = slide?.frameStyle || 'default'
  if (!standardSlideElements?.showFrame || frameStyle !== 'default') return null

  const {
    frameTopText,
    frameLeftText,
    showClientLogo,
    showJmeLogo,
    showPageNumbers,
  } = standardSlideElements

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* Top: text + horizontal line */}
      {frameTopText && (
        <div className="absolute left-8 right-0 top-6 flex items-center gap-4">
          <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-white">
            {frameTopText}
          </span>
          <div className="h-px grow bg-white/60" />
        </div>
      )}

      {/* Right: vertical line */}

      <div className="absolute top-4 right-6 flex flex-col items-center gap-4">
        <div className="h-64 w-px bg-white/60" />
      </div>

      {/* Left: vertical line + rotated text */}
      {frameLeftText && (
        <div className="absolute bottom-4 left-6 top-16 flex flex-col items-center gap-4">
          <div className="w-px grow bg-white/60" />
          <span
            className="origin-center text-xs font-bold uppercase tracking-widest text-white"
            style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
          >
            {frameLeftText} &gt;
          </span>
          <div className="h-12 w-px bg-white/60" />
        </div>
      )}

      {/* Bottom line + logos + page number */}
      <div className="absolute bottom-6 left-0 right-8 flex items-center">
        <div className="h-px grow bg-white/60" />
        <div className="flex shrink-0 items-center gap-6 pl-6">
          {showClientLogo && clientLogo?.asset && (
            <div className="relative h-8 w-24">
              <Image
                src={urlForSanitySource(clientLogo)
                  .height(64)
                  .format('webp')
                  .url()}
                alt=""
                fill
                className="object-contain object-right"
              />
            </div>
          )}
          {showJmeLogo && (
            <div className="relative h-8 w-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/jme-film-co-horizontal-white.webp"
                alt=""
                className="h-full w-full object-contain object-right"
              />
            </div>
          )}
          {showPageNumbers && (
            <span className="text-sm font-light text-white">
              {currentIndex + 1}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function SlideContent({ slide, clientLogo }) {
  if (slide._type === 'treatmentTitleSlide') {
    return <TitleSlide slide={slide} clientLogo={clientLogo} />
  }

  return null
}

const SLIDE_WIDTH = 1692
const SLIDE_HEIGHT = 952

function useSlideScale() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / SLIDE_WIDTH
      const scaleY = window.innerHeight / SLIDE_HEIGHT
      setScale(Math.min(scaleX, scaleY, 1))
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return scale
}

function collectAssetUrls(treatment) {
  const images = []
  const videos = []
  const slides = treatment?.slides || []

  if (treatment?.clientLogo?.asset) {
    images.push(urlForSanitySource(treatment.clientLogo).height(80).format('webp').url())
    images.push(urlForSanitySource(treatment.clientLogo).height(64).format('webp').url())
  }

  images.push('/images/jme-film-co-horizontal-white.webp')

  for (const slide of slides) {
    if (slide.backgroundImage?.asset) {
      images.push(
        urlForSanitySource(slide.backgroundImage).width(1920).height(1080).format('webp').url()
      )
    }
    if (slide.backgroundVideoURL) {
      videos.push(slide.backgroundVideoURL)
    }
    if (slide.logo?.asset) {
      images.push(urlForSanitySource(slide.logo).width(400).format('webp').url())
    }
    if (slide.topLogoCustom?.asset) {
      images.push(urlForSanitySource(slide.topLogoCustom).height(80).format('webp').url())
    }
    if (slide.bottomLogoCustom?.asset) {
      images.push(urlForSanitySource(slide.bottomLogoCustom).height(80).format('webp').url())
    }
  }

  return { images: [...new Set(images)], videos: [...new Set(videos)] }
}

function useAssetPreloader(treatment) {
  const [progress, setProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const { images, videos } = useMemo(() => collectAssetUrls(treatment), [treatment])

  useEffect(() => {
    const total = images.length + videos.length
    if (total === 0) {
      setLoaded(true)
      return
    }

    let completed = 0
    const tick = () => {
      completed++
      setProgress(Math.round((completed / total) * 100))
      if (completed >= total) setLoaded(true)
    }

    images.forEach((src) => {
      const img = new window.Image()
      img.onload = tick
      img.onerror = tick
      img.src = src
    })

    videos.forEach((src) => {
      const video = document.createElement('video')
      video.preload = 'auto'
      video.muted = true
      const done = () => {
        video.oncanplaythrough = null
        video.onerror = null
        tick()
      }
      video.oncanplaythrough = done
      video.onerror = done
      video.src = src
      // Don't wait forever for large videos
      setTimeout(done, 15000)
    })
  }, [images, videos])

  return { loaded, progress }
}

function PrintSlide({ slide, treatment, index, totalSlides }) {
  return (
    <div
      className="print-slide relative overflow-hidden"
      style={{
        width: SLIDE_WIDTH,
        height: SLIDE_HEIGHT,
        backgroundColor: slide.backgroundColor || '#000000',
        '--treatment-primary': treatment.primaryColor || '#967738',
        '--treatment-secondary': treatment.secondaryColor || '#FFFFFF',
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <SlideBackground slide={slide} />
      </div>
      <div className="relative z-10 h-full w-full">
        <SlideContent slide={slide} clientLogo={treatment.clientLogo} />
      </div>
      <SlideFrame
        treatment={treatment}
        slide={slide}
        currentIndex={index}
        totalSlides={totalSlides}
      />
    </div>
  )
}

export default function TreatmentPage({ treatment }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const scale = useSlideScale()
  const { loaded, progress } = useAssetPreloader(treatment)

  const slides = treatment?.slides || []
  const totalSlides = slides.length
  const currentSlide = slides[currentIndex]

  const goToSlide = useCallback(
    (newIndex) => {
      if (newIndex < 0 || newIndex >= totalSlides) return
      setVisible(false)
      setTimeout(() => {
        setCurrentIndex(newIndex)
        setVisible(true)
      }, 500)
    },
    [totalSlides]
  )

  const goNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) goToSlide(currentIndex + 1)
  }, [currentIndex, totalSlides, goToSlide])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) goToSlide(currentIndex - 1)
  }, [currentIndex, goToSlide])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  if (!treatment || totalSlides === 0) {
    return (
      <div
        className="flex h-dvh items-center justify-center text-white"
        style={{ backgroundColor: '#0C0C0D' }}
      >
        <p>No slides found.</p>
      </div>
    )
  }

  if (!loaded) {
    return (
      <div
        className="flex h-dvh flex-col items-center justify-center gap-6 text-white"
        style={{ backgroundColor: '#0C0C0D' }}
      >
        <div className="h-1 w-48 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    )
  }

  const { standardSlideElements } = treatment
  const showPageNumbers = standardSlideElements?.showPageNumbers

  return (
    <>
      <Head>
        <style>{`
          @media print {
            @page {
              size: ${SLIDE_WIDTH}px ${SLIDE_HEIGHT}px;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `}</style>
      </Head>

      {/* Print layout: all slides rendered for PDF */}
      <div className="hidden print:block">
        {slides.map((slide, i) => (
          <PrintSlide
            key={slide._key}
            slide={slide}
            treatment={treatment}
            index={i}
            totalSlides={totalSlides}
          />
        ))}
      </div>

      {/* Interactive presentation: hidden during print */}
      <div
        className="flex h-dvh w-full items-center justify-center overflow-hidden print:hidden"
        style={{ backgroundColor: '#0C0C0D' }}
      >
        <div
          className="group relative"
          style={{
            width: SLIDE_WIDTH,
            height: SLIDE_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            backgroundColor: currentSlide?.backgroundColor || '#000000',
            '--treatment-primary': treatment.primaryColor || '#967738',
            '--treatment-secondary': treatment.secondaryColor || '#FFFFFF',
          }}
        >
          {/* Background layer */}
          <div className="absolute inset-0 overflow-hidden">
            <SlideBackground slide={currentSlide} />
          </div>

          {/* Slide content with fade transition */}
          <div
            className="relative z-10 h-full w-full transition-opacity duration-500"
            style={{ opacity: visible ? 1 : 0 }}
          >
            <SlideContent slide={currentSlide} clientLogo={treatment.clientLogo} />
          </div>

          {/* Frame overlay */}
          <SlideFrame
            treatment={treatment}
            slide={currentSlide}
            currentIndex={currentIndex}
            totalSlides={totalSlides}
          />

          {/* Navigation arrows */}
          {currentIndex > 0 && (
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-black/50"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )}
          {currentIndex < totalSlides - 1 && (
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-black/50"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}

          {/* Export PDF button */}
          <button
            onClick={() => window.print()}
            className="absolute right-4 top-4 z-30 rounded-full bg-black/30 p-3 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-black/50"
            aria-label="Export PDF"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </button>

          {/* Page numbers (standalone, when frame is off) */}
          {showPageNumbers && !standardSlideElements?.showFrame && (
            <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-sm text-white/70">
              {currentIndex + 1} / {totalSlides}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "treatment"]{slug}`
  )

  return {
    paths: paths
      .filter((path) => path?.slug?.current)
      .map((path) => ({ params: { slug: path.slug.current } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { slug = '' } = params
  try {
    const treatment = await sanityClient.fetch(
      groq`
      *[_type == "treatment" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        clientName,
        clientLogo{asset->{url, _id, metadata}},
        primaryColor,
        secondaryColor,
        standardSlideElements,
        slides[]{
          _type,
          _key,
          backgroundImage{asset->{url, _id, metadata}},
          "backgroundVideoURL": backgroundVideo.asset->fileURL,
          backgroundColor,
          textColor,
          frameStyle,
          _type == "treatmentTitleSlide" => {
            logo{asset->{url, _id, metadata}},
            heading1,
            heading2,
            placement,
            body,
            frameStyle,
            topLogo,
            topLogoCustom{asset->{url, _id, metadata}},
            additionalText,
            bottomLogo,
            bottomLogoCustom{asset->{url, _id, metadata}},
          },
        }
      }
      `,
      { slug }
    )

    if (!treatment) {
      return { notFound: true }
    }

    return { props: { treatment } }
  } catch (error) {
    console.error(error)
    return { props: {} }
  }
}
