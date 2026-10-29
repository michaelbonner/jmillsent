import Head from 'next/head'
import { Eyebrow, H1 } from '@/components/headings'
import Layout from '@/components/layout'
import { PasswordLoginForm } from '@/components/password-login-form'
import PortfolioItemTile from '@/components/portfolio-item-tile'
import { sanityClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import groq from 'groq'
import useIsLoggedIn from 'hooks/useIsLoggedIn'
import { useState } from 'react'

function Portfolio({ portfolioPage, portfolioItems }) {
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn(portfolioPage.password)
  const [formError, setFormError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (e.target.password.value === portfolioPage.password) {
      localStorage.setItem('private-portfolio', e.target.password.value)
      setIsLoggedIn(true)
    } else {
      setFormError('Incorrect password')
    }
  }

  return (
    <Layout
      title={portfolioPage.seoTitle}
      description={portfolioPage.seoDescription}
    >
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {!isLoggedIn && (
        <PasswordLoginForm
          handleSubmit={handleSubmit}
          formError={formError}
          passwordInputPrompt={portfolioPage.passwordInputPrompt}
        />
      )}

      {isLoggedIn && (
        <section className="max-w-13xl mx-auto px-5 pt-8 pb-20 lg:pt-12 lg:pb-28">
          <div className="mb-10 lg:mb-14">
            <Eyebrow className="mb-5">Private</Eyebrow>
            <H1>Portfolio</H1>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {portfolioItems.map((portfolioItem, index) => {
              return (
                <PortfolioItemTile portfolioItem={portfolioItem} key={index} />
              )
            })}
          </div>
          {portfolioPage.portfolioPageDescription && (
            <div className="prose prose-lg prose-invert mt-16 max-w-[65ch] text-neutral-300">
              <PortableText value={portfolioPage.portfolioPageDescription} />
            </div>
          )}
        </section>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const portfolioPage = await sanityClient.fetch(
    groq`
  *[_type == "portfolioPage"][0]{
    poster,
    password,
    passwordInputPrompt,
    seoTitle,
    seoDescription,
    subscribeFormTitle,
    subscribeFormSuccessMessage,
    videoId,
    portfolioPageDescription,
  }
  `
  )
  const portfolioItems = await sanityClient.fetch(
    groq`
    *[_type == "portfolioItem"][!(_id in path('drafts.**'))]|order(order asc){
      _id,
      slug,
      clientName,
      title,
      poster,
      "shortClipMp4URL": shortClipMp4.asset->url,
      "shortClipMp4S3URL": shortClipMp4S3.asset->fileURL,
      "shortClipOgvURL": shortClipOgv.asset->url,
      "shortClipOgvS3URL": shortClipOgvS3.asset->fileURL,
    }
  `
  )
  return {
    props: {
      portfolioPage,
      portfolioItems,
    },
  }
}

export default Portfolio
