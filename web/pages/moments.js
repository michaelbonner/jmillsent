import { ClientOnly } from '@/components/client-only'
import { H1 } from '@/components/headings'
import Layout from '@/components/layout'
import groq from 'groq'
import capitalize from 'just-capitalize'
import shuffle from 'just-shuffle'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { sanityClient } from '../lib/sanity'

const MomentsGallery = dynamic(() => import('@/components/moments-gallery'))

function Moments({ images, momentsPage }) {
  const shuffledImages = useMemo(() => {
    return shuffle(
      images.map(
        (image) => ({
          ...image,
          lightboxSource: `${image.imageUrl}?w=1800&auto=format`,
          altText:
            image.caption ||
            capitalize(
              (image.name || `image-${index}`)
                .replace(/-/g, ' ')
                .replace(/_/g, ' ')
                .replace('.jpg', '')
                .replace('.png', '')
            ),
        }),
        { shuffleAll: true }
      )
    )
  }, [images])

  const heroContent = (
    <div className="relative flex h-full min-h-[70svh] w-screen flex-col justify-end overflow-hidden px-5 pb-10 text-white sm:px-8 sm:pb-14 lg:min-h-0 lg:px-12 lg:pb-16">
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/15 to-black/25" />
      <div className="relative mx-auto w-full max-w-[100rem]">
        <p className="mb-4 font-mono text-sm tracking-wide text-white/70 uppercase sm:text-xs">
          Behind the scenes
        </p>
        <H1 className="max-w-[14ch]">{momentsPage.title}</H1>
        <h2 className="font-outline mt-2 max-w-[24ch] text-2xl text-balance text-white uppercase sm:text-3xl lg:text-5xl">
          {momentsPage.subtitle}
        </h2>
      </div>
    </div>
  )

  return (
    <Layout
      title={momentsPage.seoTitle}
      description={momentsPage.seoDescription}
      heroImageUrl={momentsPage.poster || null}
      heroVideoId={momentsPage.videoId}
      heroContent={heroContent}
    >
      <div className="px-4 lg:px-8">
        <div className="max-w-13xl mx-auto mb-16 text-black lg:mt-[4%] lg:mb-24 lg:p-4">
          <div className="rounded-xl bg-white p-5">
            <ClientOnly>
              <MomentsGallery images={shuffledImages} />
            </ClientOnly>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const momentsPage = await sanityClient.fetch(
    groq`
		*[_type == "momentsPage"][0]{
			poster,
			seoDescription,
			seoTitle,
			subtitle,
			videoId,
      title,
      images[]{
          caption,
          "imageUrl": asset->url,
          "name": asset->originalFilename,
      },
    }
    `
  )

  // take a random 500 images from the images array
  const { images: sanityImages, ...momentsPageData } = momentsPage

  const allImages = sanityImages
    .filter((image) => image.imageUrl)
    .map((image, index) => ({
      ...image,
      index,
    }))

  // always show the latest 100 images
  const latest100Images = allImages.slice(-100).map((image) => ({
    ...image,
    sortValue: Math.random(),
  }))

  // get the rest of the images in random order weighted by index
  // to show more recent images more often
  const otherImages = allImages
    // get only the images now in the "latest100Images" array
    .slice(0, -100)
    // add a random sort value weighted by index
    .map((image, index) => ({
      ...image,
      sortValue: Math.random() * (index / 100),
    }))
    // sort the images by the sort value
    .sort((a, b) => a.sortValue - b.sortValue)
    // get the first 400 images
    .slice(400)

  const images = [...latest100Images, ...otherImages].sort(
    () => Math.random() - 0.5
  )

  return {
    props: {
      images,
      momentsPage: momentsPageData,
    },
  }
}

export default Moments
