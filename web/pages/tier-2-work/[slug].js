/* eslint-disable @next/next/no-img-element */
import { H3 } from '@/components/headings'
import Layout from '@/components/layout'
import MediumWhiteBar from '@/components/medium-white-bar'
import { PasswordLoginForm } from '@/components/password-login-form'
import { sanityClient } from '@/lib/sanity'
import groq from 'groq'
import useIsDesktop from 'hooks/useIsDesktop'
import useIsLoggedIn from 'hooks/useIsLoggedIn'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

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

const PortfolioItem = ({ portfolioItem = {}, portfolioPagePassword }) => {
  const [formError, setFormError] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn(
    portfolioPagePassword.password
  )
  const isDesktop = useIsDesktop()

  const fullTitle = portfolioItem.clientName
    ? `${portfolioItem.clientName} | ${portfolioItem.title}`
    : portfolioItem.title

  const column1Credits = portfolioItem?.credits?.length
    ? portfolioItem.credits.slice(
        0,
        Math.ceil(portfolioItem.credits.length / 2)
      )
    : []
  const column2Credits = portfolioItem?.credits?.length
    ? portfolioItem.credits.slice(column1Credits.length)
    : []

  function handleSubmit(e) {
    e.preventDefault()

    if (e.target.password.value === portfolioPagePassword.password) {
      localStorage.setItem('private-portfolio', e.target.password.value)
      setIsLoggedIn(true)
    } else {
      setFormError('Incorrect password')
    }
  }

  return (
    <Layout
      title={
        portfolioItem.seoTitle ||
        `${fullTitle} | JmillsENT | Motion Picture Studio + Film Agency`
      }
      description={
        portfolioItem.seoDescription ||
        `${fullTitle} | JmillsENT | Motion Picture Studio + Film Agency`
      }
    >
      {!isLoggedIn && (
        <PasswordLoginForm
          handleSubmit={handleSubmit}
          formError={formError}
          passwordInputPrompt={portfolioPagePassword.passwordInputPrompt}
        />
      )}

      {isLoggedIn && (
        <>
          <div className="px-4 lg:px-8">
            <div className="my-12 max-w-9xl border border-gray-300 p-4 px-4 xl:mx-auto xl:p-8">
              <VideoPlayer
                client={portfolioItem.clientName}
                description={portfolioItem.description}
                poster={portfolioItem.poster}
                title={portfolioItem.title}
                videoId={portfolioItem.videoId}
                clientName={portfolioItem.clientName}
                videoHeightAspectRatio={
                  portfolioItem.videoHeightAspectRatio || '9'
                }
                videoWidthAspectRatio={
                  portfolioItem.videoWidthAspectRatio || '16'
                }
              />
            </div>
          </div>

          <div className="mt-10">
            <div className="text-center">
              <Link
                href="/tier-2-work"
                className="inline-flex items-center justify-center border-2 border-gray-300 px-3 py-1 font-outline text-3xl uppercase transition-colors hover:bg-gold hover:text-black"
              >
                Back To Portfolio
              </Link>
            </div>
          </div>

          <div className="3xl:px-0 container mx-auto mt-4 px-4">
            {portfolioItem.credits && portfolioItem.credits.length > 0 && (
              <div className="my-12 mx-auto max-w-9xl">
                {isDesktop === false && (
                  <>
                    <button
                      onClick={(e) => {
                        setIsOpen(!isOpen)
                      }}
                      className="flex place-items-center"
                    >
                      <h3 className="text-xl font-extrabold uppercase">
                        Credits
                      </h3>
                      <div className={`${isOpen ? 'rotate-90 pl-0 pr-1' : ''}`}>
                        <p className="place-self-center pl-2 font-outline text-2xl lg:text-4xl">
                          &gt;
                        </p>
                      </div>
                    </button>
                    <div className={`${isOpen ? 'visible' : 'hidden'}`}>
                      <div className="h-auto overflow-hidden transition-all">
                        <div className="grid grid-cols-1">
                          <div>
                            {column1Credits.map((credit, index) => {
                              return (
                                <div
                                  className="grid grid-cols-2 items-center gap-x-4 pt-4"
                                  key={index}
                                >
                                  <div className="justify-self-end text-right font-bold uppercase">
                                    {credit.role}
                                  </div>
                                  <div className="space-x-4 text-lg font-light uppercase lg:text-xl">
                                    {credit.value}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          <div>
                            {column2Credits.map((credit, index) => {
                              return (
                                <div
                                  className="grid grid-cols-2 items-center gap-x-4 pt-4"
                                  key={index}
                                >
                                  <div className="justify-self-end text-right font-bold uppercase">
                                    {credit.role}
                                  </div>
                                  <div className="space-x-4 text-lg font-light uppercase lg:text-xl">
                                    {credit.value}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {isDesktop && (
                  <>
                    <H3>Credits</H3>
                    <div className="h-auto overflow-hidden transition-all lg:text-xl xl:mt-12">
                      <div className="mb-12 grid grid-cols-1 gap-x-20 gap-y-4 md:grid-cols-2 lg:grid-cols-2">
                        <div>
                          {column1Credits.map((credit, index) => {
                            return (
                              <div
                                className="grid grid-cols-2 items-center gap-2 pt-4"
                                key={index}
                              >
                                <div className="font-bold uppercase">
                                  {credit.role}
                                </div>
                                <div className="space-x-4 text-xl font-light uppercase">
                                  {credit.value}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                        <div>
                          {column2Credits.map((credit, index) => {
                            return (
                              <div
                                className="grid grid-cols-2 items-center gap-2 pt-4"
                                key={index}
                              >
                                <div className="font-bold uppercase">
                                  {credit.role}
                                </div>
                                <div className="space-x-4 text-xl font-light uppercase">
                                  {credit.value}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {isDesktop === false && (
            <div className="mx-auto -mb-5 mt-12 flex w-full max-w-md justify-center px-12 lg:mt-24 lg:max-w-xl">
              <Image
                alt="JME Film Production Company"
                height={100}
                src={`/images/jmills-raven-gold.svg`}
                width={100}
              />
            </div>
          )}
          {isDesktop && (
            <div className="mx-auto -mb-5 mt-12 w-full max-w-md px-12 lg:mt-24 lg:max-w-xl">
              <Image
                alt="JME Film Production Company"
                height={202}
                src={`/images/JME-film-prod-co-white.svg`}
                width={600}
              />
            </div>
          )}
          <MediumWhiteBar yMargin="mb-8 mt-12 lg:mt-24" />
        </>
      )}
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `
    *[_type == "portfolioItem"]{slug}
  `
  )

  return {
    paths: paths
      .filter((path) => {
        return path?.slug?.current
      })
      .map((path) => {
        return { params: { slug: path.slug.current } }
      }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = params
  try {
    const portfolioItem = await sanityClient.fetch(
      groq`
      *[_type == "portfolioItem" && slug.current == $slug][0]{
        _id,
        behindTheScenes,
        clientName,
        description,
        credits,
        extraPaddingOnVideo,
        frames,
        poster,
        slug,
        title,
        videoId,
        videoHeightAspectRatio,
        videoWidthAspectRatio,
      }
      `,
      { slug }
    )
    const portfolioItems = await sanityClient.fetch(
      groq`
      *[_type == "portfolioItem"][!(_id in path('drafts.**'))]|order(order asc){
        _id,
        slug,
        clientName,
        description,
        title,
        poster,
        "shortClipMp4URL": shortClipMp4.asset->url,
        "shortClipMp4S3URL": shortClipMp4S3.asset->fileURL,
        "shortClipOgvURL": shortClipOgv.asset->url,
        "shortClipOgvS3URL": shortClipOgvS3.asset->fileURL,
      }
    `
    )
    const portfolioPagePassword = await sanityClient.fetch(
      groq`
      *[_type == "portfolioPage"][0]{
        password,
        passwordInputPrompt,
      }`
    )

    if (!portfolioItem) {
      return {
        notFound: true,
      }
    }

    return {
      props: { portfolioItem, portfolioItems, portfolioPagePassword },
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}

export default PortfolioItem
