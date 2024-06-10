import { ClientOnly } from '@/components/client-only'
import { H1 } from '@/components/headings'
import Layout from '@/components/layout'
import LittleWhiteBar from '@/components/little-white-bar'
import groq from 'groq'
import capitalize from 'just-capitalize'
import shuffle from 'just-shuffle'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { sanityClient } from '../lib/sanity'

const MomentsGallery = dynamic(
  () =>
    import('@/components/moments-gallery', {
      loading: () => <p>Loading...</p>,
      ssr: false,
    })
)

function Moments({ momentsPage }) {
  const shuffledImages = useMemo(() => {
    return shuffle(
      momentsPage.images
        .filter((image) => image.imageUrl)
        .map(
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
              ),
          }),
          { shuffleAll: true }
        )
    )
  }, [momentsPage.images])

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
      <LittleWhiteBar />

      <ClientOnly>
        <MomentsGallery images={shuffledImages} />
      </ClientOnly>
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

  return {
    props: {
      momentsPage,
    },
  }
}

export default Moments
