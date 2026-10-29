import ArrowLink from '@/components/arrow-link'
import { ClientOnly } from '@/components/client-only'
import CreditsList from '@/components/credits-list'
import { Eyebrow, H1 } from '@/components/headings'
import Layout from '@/components/layout'
import { PasswordLoginForm } from '@/components/password-login-form'
import { sanityClient } from '@/lib/sanity'
import groq from 'groq'
import useIsLoggedIn from 'hooks/useIsLoggedIn'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useState } from 'react'

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
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn(
    portfolioPagePassword.password
  )

  const fullTitle = portfolioItem.clientName
    ? `${portfolioItem.clientName} | ${portfolioItem.title}`
    : portfolioItem.title

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
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {!isLoggedIn && (
        <PasswordLoginForm
          handleSubmit={handleSubmit}
          formError={formError}
          passwordInputPrompt={portfolioPagePassword.passwordInputPrompt}
        />
      )}

      {isLoggedIn && (
        <article className="mx-auto max-w-7xl px-5 pt-8 pb-20 lg:pt-12 lg:pb-28">
          <div className="mb-10 lg:mb-14">
            {portfolioItem.clientName && portfolioItem.title && (
              <Eyebrow className="mb-5">{portfolioItem.clientName}</Eyebrow>
            )}
            <H1 className="max-w-[24ch] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              {portfolioItem.title || portfolioItem.clientName}
              <span className="sr-only"> {fullTitle}</span>
            </H1>
          </div>

          <ClientOnly>
            <VideoPlayer
              client={portfolioItem.clientName}
              clientName={portfolioItem.clientName}
              description={portfolioItem.description}
              poster={portfolioItem.poster}
              title={portfolioItem.title}
              videoId={portfolioItem.videoId}
              videoHeightAspectRatio={
                portfolioItem.videoHeightAspectRatio || '9'
              }
              videoWidthAspectRatio={
                portfolioItem.videoWidthAspectRatio || '16'
              }
            />
          </ClientOnly>

          <CreditsList credits={portfolioItem.credits} />

          <div className="mt-16 border-t border-white/15 pt-6">
            <ArrowLink href="/private-gallery" className="uppercase">
              Back to portfolio
            </ArrowLink>
          </div>
        </article>
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
    console.error(error)
    return {
      props: {},
    }
  }
}

export default PortfolioItem
