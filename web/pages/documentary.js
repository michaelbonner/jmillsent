import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import ArrowLink from '@/components/arrow-link'
import { ClientOnly } from '@/components/client-only'
import { Eyebrow, H1, H2, H3 } from '@/components/headings'
import Layout from '@/components/layout'
import { sanityClient } from '@/lib/sanity'
import { PortableText, toPlainText } from '@portabletext/react'
import groq from 'groq'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import { urlForSanitySource } from '../lib/urlForSanitySource'

const VideoPlayer = dynamic(() => import('@/components/video-player'), {})

/*
prevent purging of aspect ratio
aspect-w-1	aspect-h-1
aspect-w-2	aspect-h-2
aspect-w-3	aspect-h-3
aspect-w-4	aspect-h-4
aspect-w-5	aspect-h-5
aspect-w-6	aspect-h-6
aspect-w-7	aspect-h-7
aspect-w-8	aspect-h-8
aspect-w-9	aspect-h-9
aspect-w-10	aspect-h-10
aspect-w-11	aspect-h-11
aspect-w-12	aspect-h-12
aspect-w-13	aspect-h-13
aspect-w-14	aspect-h-14
aspect-w-15	aspect-h-15
aspect-w-16	aspect-h-16
*/

const Documentary = ({ documentaryPage }) => {
  const [isEpisodeLightBoxOpen, setIsEpisodeLightBoxOpen] = useState(false)
  const [episodePhotoIndex, setEpisodePhotoIndex] = useState(0)

  const episodeImages = documentaryPage.episodes.map((episode) => {
    return {
      caption: toPlainText(episode.description),
      src: urlForSanitySource(episode.image)
        .width(2400)
        .height(1600)
        .format('webp')
        .fit('crop')
        .crop('focalpoint')
        .url(),
      title: episode.title.toUpperCase(),
      episodeNum: episode.episodeNum,
    }
  })

  return (
    <Layout
      title={
        documentaryPage.seoTitle ||
        `${documentaryPage.title} | JmillsENT | Motion Picture Studio + Film Agency`
      }
      description={
        documentaryPage.seoDescription ||
        `${documentaryPage.title} | JmillsENT | Motion Picture Studio + Film Agency`
      }
    >
      <article className="mx-auto max-w-7xl px-5 pt-8 pb-20 lg:pt-12 lg:pb-28">
        <div className="mb-10 lg:mb-14">
          <Eyebrow className="mb-5">
            {documentaryPage.subtitle || 'Documentary'}
          </Eyebrow>
          <H1 className="max-w-[24ch]">{documentaryPage.title}</H1>
        </div>

        <ClientOnly>
          <VideoPlayer
            client={documentaryPage.title}
            description={''}
            poster={documentaryPage.poster}
            title={documentaryPage.subtitle}
            videoId={documentaryPage.videoId}
            clientName={documentaryPage.subtitle}
            videoHeightAspectRatio={
              documentaryPage.videoHeightAspectRatio || '9'
            }
            videoWidthAspectRatio={
              documentaryPage.videoWidthAspectRatio || '16'
            }
          />
        </ClientOnly>

        <section className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              alt="Documentary Poster"
              src={urlForSanitySource(documentaryPage.poster)
                .width(410)
                .height(630)
                .format('webp')
                .fit('crop')
                .crop('focalpoint')
                .url()}
              height={630}
              width={410}
              className="w-full max-w-[410px]"
            />
          </div>
          <div className="lg:col-span-8">
            {documentaryPage.bodySubheader && (
              <Eyebrow className="mb-5">
                {documentaryPage.bodySubheader}
              </Eyebrow>
            )}
            <H2 className="max-w-[24ch]">{documentaryPage.bodyHeader}</H2>
            <div className="prose prose-lg prose-invert mt-6 max-w-[65ch] text-pretty text-neutral-300">
              <PortableText value={documentaryPage.body} />
            </div>
            {documentaryPage.docLink && (
              <ArrowLink
                href={documentaryPage.docLink}
                className="mt-8 uppercase"
                rel="noreferrer"
                target="_blank"
              >
                Watch the documentary
              </ArrowLink>
            )}
          </div>
        </section>

        <section className="mt-20 lg:mt-28" id="episodes">
          <div className="border-t border-white/30 pt-5">
            <Eyebrow className="mb-5">Episodes</Eyebrow>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {documentaryPage.episodes.map((episode, index) => {
              return (
                <button
                  className="group relative isolate flex aspect-4/5 flex-col justify-end overflow-hidden bg-neutral-900 p-5 text-left text-white"
                  key={index}
                  onClick={() => {
                    setIsEpisodeLightBoxOpen(true)
                    setEpisodePhotoIndex(index)
                  }}
                  type="button"
                >
                  <Image
                    alt=""
                    className="-z-10 object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 320px"
                    src={urlForSanitySource(episode.image)
                      .width(800)
                      .height(1000)
                      .format('webp')
                      .fit('crop')
                      .crop('focalpoint')
                      .url()}
                  />
                  <div className="absolute inset-0 -z-10 bg-linear-to-t from-neutral-950/85 via-neutral-950/20 to-transparent" />
                  <Eyebrow className="mb-2 text-white/70">
                    Ep {episode.episodeNum}
                  </Eyebrow>
                  <H3 className="mb-0">{episode.title}</H3>
                </button>
              )
            })}
          </div>
        </section>
      </article>
      <Lightbox
        captions={{
          descriptionMaxLines: 100,
        }}
        close={() => setIsEpisodeLightBoxOpen(false)}
        controller={{
          closeOnBackdropClick: true,
          closeOnPullDown: true,
          closeOnPullUp: true,
        }}
        index={episodePhotoIndex}
        open={isEpisodeLightBoxOpen}
        plugins={[Captions]}
        slides={episodeImages.map((image) => ({
          src: image.src,
          description: (
            <div className="text-center md:text-lg">{image.caption}</div>
          ),
          title: (
            <div>
              <span className="flex items-center gap-4 text-lg md:text-2xl">
                <span className="text-white/60">EP {image.episodeNum}</span>
                <span>{image.title}</span>
              </span>
              <div className="my-2 h-px w-40 shrink-0 bg-white/30" />
            </div>
          ),
        }))}
        styles={{
          captionsTitleContainer: {
            backgroundColor: 'black',
            paddingBottom: 6,
          },
          captionsDescriptionContainer: {
            backgroundColor: 'black',
          },
        }}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const documentaryPage = await sanityClient.fetch(
    groq`
          *[_type == "documentaryPage"][0]{
            title,
            subtitle,
            slug,
            seoTitle,
            seoDescription,
            shortClipMp4S3,
            shortClipOgvS3,
            videoId,
            videoWidthAspectRatio,
            videoHeightAspectRatio,
            poster,
            bodyHeader,
            bodySubheader,
            body,
            episodes[]->,
            docLink,
        }
        `
  )

  return {
    props: {
      documentaryPage,
    },
  }
}

export default Documentary
