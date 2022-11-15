import Layout from '@/components/layout'
import groq from 'groq'
import { getClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import PortfolioItemTile from '@/components/portfolio-item-tile'
import MediumWhiteBar from '@/components/medium-white-bar'
import EmailSignupForm from '@/components/email-signup-form'
import { useEffect, useState } from 'react'

function Portfolio({ portfolioPage, portfolioItems }) {
  const [passwordString, setPasswordString] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const token = portfolioPage.password

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoggedIn(localStorage.getItem('private-portfolio') === token)
    }
  }, [token])

  function handleSubmit(e) {
    e.preventDefault()
    console.log('IM WORKING!')
    // if (passwordString === token) {
    //   localStorage.setItem('private-portfolio', token)
    //   setLoggedIn(true)
    // }
  }

  return (
    <Layout
      title={portfolioPage.seoTitle}
      description={portfolioPage.seoDescription}
    >
      {!loggedIn && (
        <div className="mx-auto text-center">
          <p>You don&apos;t have access, please input the password to view.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {loggedIn && (
        <div className="mx-1 grid grid-cols-1 gap-1 lg:grid-cols-3">
          {portfolioItems.map((portfolioItem, index) => {
            return (
              <PortfolioItemTile portfolioItem={portfolioItem} key={index} />
            )
          })}
        </div>
      )}
      <div className="container mx-auto mt-12 px-12 text-center text-white">
        {portfolioPage.portfolioPageDescription && (
          <div className="prose-lg mx-auto max-w-lg border py-1 text-center">
            <PortableText value={portfolioPage.portfolioPageDescription} />
          </div>
        )}
        <div className="mt-10">
          <EmailSignupForm
            title={portfolioPage.subscribeFormTitle}
            successMessage={portfolioPage.subscribeFormSuccessMessage}
            customReel={true}
          />
        </div>
        <MediumWhiteBar yMargin="mb-8 mt-12 lg:mt-24" />
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const portfolioPage = await getClient().fetch(
    groq`
  *[_type == "portfolioPage"][0]{
    poster,
    password,
    seoTitle,
    seoDescription,
    subscribeFormTitle,
    subscribeFormSuccessMessage,
    videoId,
    portfolioPageDescription,
  }
  `
  )
  const portfolioItems = await getClient().fetch(
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
