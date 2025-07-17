/* eslint-disable @next/next/no-img-element */
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import { ClientOnly } from '@/components/client-only'
import Layout from '@/components/layout'
import { sanityClient } from '@/lib/sanity'
import { PortableText, toPlainText } from '@portabletext/react'
import classNames from 'classnames'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { styles } from 'styles/styles'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import urlForSanitySource from '../lib/urlForSanitySource'

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
  const isDesktop = useIsDesktop()

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
      <div className="lg:pt-24">
        <ul
          className={classNames(
            'mx-6 mt-4 grid grid-cols-2 items-center justify-center border-t py-4 font-semibold',
            'lg:mx-36 lg:flex lg:divide-x lg:divide-white',
            'xl:mx-48'
          )}
        >
          <li
            className={classNames(
              'flex justify-center text-xs',
              'lg:px-12 lg:text-base',
              'border-r lg:border-r-0'
            )}
          >
            <Link
              className={classNames(
                'rounded-xl border px-2 py-1 uppercase transition-all',
                'lg:tracking-wider',
                'border-black hover:scale-110'
              )}
              href="/work"
            >
              Commercial
            </Link>
          </li>
          <li
            className={classNames(
              'flex justify-center text-xs',
              'lg:px-12 lg:text-base',
              'border-r lg:border-r-0'
            )}
          >
            <Link
              className={classNames(
                'rounded-xl border px-2 py-1 uppercase transition-all',
                'lg:tracking-wider',
                'border-black hover:scale-110'
              )}
              href="/work"
            >
              Branded Content
            </Link>
          </li>
          {/* <li
            className={classNames(
              'flex justify-center text-xs',
              'lg:px-12 lg:text-base'
            )}
          >
            <span
              className={classNames(
                'rounded-xl border px-2 py-1 uppercase transition-all',
                'lg:tracking-wider',
                'border-white'
              )}
            >
              Documentary
            </span>
          </li> */}
        </ul>
        <div className="container mx-auto max-w-7xl">
          <div className="mt-4 rounded-xl bg-white p-4 text-black lg:p-12">
            <div className="mb-12 rounded-2xl bg-black text-white">
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
            </div>

            <div className="mx-auto max-w-5xl gap-6 md:flex lg:gap-10">
              <div className="mb-6">
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
                  className="mx-auto"
                />
              </div>
              <div className="prose-lg md:w-3/4">
                <h2 className="mb-0 text-3xl font-bold uppercase lg:text-5xl">
                  {documentaryPage.bodyHeader}
                </h2>
                <h3 className="font-outline text-3xl uppercase lg:text-4xl">
                  {documentaryPage.bodySubheader}
                </h3>
                <div className="h-[2px] w-full max-w-lg bg-black" />
                <div className="text-base">
                  <PortableText value={documentaryPage.body} />
                </div>
              </div>
            </div>
            <section id="episodes">
              <div
                className={classNames(
                  'mt-4 grid gap-6',
                  'md:grid-cols-2',
                  'lg:grid-cols-4'
                )}
              >
                {documentaryPage.episodes.map((episode, index) => {
                  const imageSrc = urlForSanitySource(episode.image)
                    .width(800)
                    .height(600)
                    .format('webp')
                    .fit('crop')
                    .crop('focalpoint')
                    .url()

                  return (
                    <button
                      className={classNames(
                        'group relative rounded-xl',
                        'aspect-2 overflow-hidden',
                        'bg-cover bg-center bg-no-repeat'
                      )}
                      onClick={() => {
                        setIsEpisodeLightBoxOpen(true)
                        setEpisodePhotoIndex(index)
                      }}
                      style={{
                        backgroundImage: `url(${imageSrc})`,
                      }}
                      key={index}
                    >
                      <div
                        className={classNames(
                          'absolute inset-0 rounded-lg bg-linear-to-t from-black/100 via-black/30 to-black/0 opacity-50 transition-all duration-300',
                          'lg:from-transparent lg:via-transparent lg:to-transparent lg:opacity-0',
                          'group-hover:from-black/80 group-hover:via-black/80 group-hover:to-black/80 group-hover:opacity-100'
                        )}
                      />
                      <div
                        className={classNames(
                          'relative z-10 flex translate-y-0 flex-col items-center justify-center overflow-hidden py-3 transition-transform duration-300',
                          'group-hover:-translate-y-10'
                        )}
                      >
                        <div
                          className="font-outline text-5xl font-light text-white"
                          style={{
                            letterSpacing: 1,
                          }}
                        >
                          EP {episode.episodeNum}
                        </div>
                        <div className="bg-gold mx-auto my-2 h-1 w-40 shrink-0"></div>
                        <h4 className="mb-4 text-xl font-bold text-white uppercase">
                          {episode.title}
                        </h4>
                        <div
                          className={classNames(
                            'px-4 text-sm font-light text-white uppercase opacity-0 transition-opacity',
                            'group-hover:opacity-100'
                          )}
                        >
                          <PortableText value={episode.description} />
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>
            <div className="my-10 flex justify-center">
              <a
                href={documentaryPage.docLink}
                className={styles.buttonLink.blackBorder}
                rel="noreferrer"
                target="_blank"
              >
                <span className="font-outline text-2xl tracking-tighter lg:text-3xl">
                  Watch
                </span>
                <span className="text-2xl font-bold tracking-wide lg:text-3xl">
                  Documentary
                </span>
                <span className="font-outline text-2xl tracking-tighter lg:text-3xl">
                  Now
                </span>
              </a>
            </div>
          </div>

          {isDesktop === false && (
            <div className="mx-auto mt-12 -mb-5 flex w-full max-w-md justify-center px-12 lg:mt-24 lg:max-w-xl">
              <Image
                alt="JME Film Production Company"
                height={100}
                src={`/images/jmills-raven-gold.svg`}
                width={100}
              />
            </div>
          )}
          {isDesktop && (
            <div className="mx-auto mt-12 -mb-5 w-full max-w-md px-12 lg:mt-24 lg:max-w-xl">
              <Image
                alt="JME Film Production Company"
                height={202}
                src={`/images/JME-film-prod-co-white.svg`}
                width={600}
              />
            </div>
          )}
        </div>
      </div>
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
                <span className="font-outline">EP {image.episodeNum}</span>
                <span>{image.title}</span>
              </span>
              <div className="bg-gold my-2 h-1 w-40 shrink-0" />
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
