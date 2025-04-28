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
    <div className="flex h-full w-full flex-col items-center justify-center text-white">
      <H1>{momentsPage.title}</H1>
      <h2 className="font-outline text-2xl uppercase lg:text-6xl">
        {momentsPage.subtitle}
      </h2>
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
        <div className="max-w-13xl mx-auto mb-16 rounded-2xl bg-white p-6 text-black lg:mt-[4%] lg:mb-24 lg:p-10">
          <ClientOnly>
            <MomentsGallery images={shuffledImages} />
          </ClientOnly>
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
