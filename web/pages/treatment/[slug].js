import { portableTextComponents, sanityClient } from '@/lib/sanity'
import { urlForSanitySource } from '@/lib/urlForSanitySource'
import { PortableText } from '@portabletext/react'
import clsx from 'clsx'
import groq from 'groq'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

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

function TitleSlide({ slide }) {
  const textColor = slide.textColor || '#FFFFFF'
  const placement = slide.placement || 'center-center'

  const styles = {
    h1: clsx(
      'font-black uppercase italic',
      !slide.heading2 ? 'text-8xl' : 'text-7xl',
    ),
    h2: clsx(
      'text-2xl',
    ),
  }

  return (
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
  )
}


function SlideFrame({ treatment, slide, currentIndex, totalSlides }) {
  const { standardSlideElements, clientLogo } = treatment
  if (!standardSlideElements?.showFrame || slide?.hideFrame) return null

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

function SlideContent({ slide }) {
  if (slide._type === 'treatmentTitleSlide') {
    return <TitleSlide slide={slide} />
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

export default function TreatmentPage({ treatment }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const scale = useSlideScale()

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

  const { standardSlideElements } = treatment
  const showPageNumbers = standardSlideElements?.showPageNumbers

  return (
    <div
      className="flex h-dvh w-full items-center justify-center overflow-hidden"
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
          <SlideContent slide={currentSlide} />
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

        {/* Page numbers (standalone, when frame is off) */}
        {showPageNumbers && !standardSlideElements?.showFrame && (
          <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-sm text-white/70">
            {currentIndex + 1} / {totalSlides}
          </div>
        )}
      </div>
    </div>
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
    fallback: false,
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
          hideFrame,
          _type == "treatmentTitleSlide" => {
            logo{asset->{url, _id, metadata}},
            heading1,
            heading2,
            placement,
            body,
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
