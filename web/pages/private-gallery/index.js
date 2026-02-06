import Head from 'next/head'
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
      <div className="mt-28">
        {!isLoggedIn && (
          <PasswordLoginForm
            handleSubmit={handleSubmit}
            formError={formError}
            passwordInputPrompt={portfolioPage.passwordInputPrompt}
          />
        )}

        {isLoggedIn && (
          <>
            <div className="mx-1 grid grid-cols-1 gap-1 lg:grid-cols-3">
              {portfolioItems.map((portfolioItem, index) => {
                return (
                  <PortfolioItemTile
                    portfolioItem={portfolioItem}
                    key={index}
                  />
                )
              })}
            </div>
            {portfolioPage.portfolioPageDescription && (
              <div className="container mx-auto mt-12 px-12 text-center text-white">
                <div className="prose prose-lg prose-invert mx-auto max-w-lg border py-1 text-center">
                  <PortableText
                    value={portfolioPage.portfolioPageDescription}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
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
