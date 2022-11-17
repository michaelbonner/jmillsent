import Layout from '@/components/layout'
import groq from 'groq'
import { getClient } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import PortfolioItemTile from '@/components/portfolio-item-tile'
import MediumWhiteBar from '@/components/medium-white-bar'
import EmailSignupForm from '@/components/email-signup-form'
import classNames from 'classnames'
import useIsLoggedIn from 'hooks/useIsLoggedIn'

function Portfolio({ portfolioPage, portfolioItems }) {
  const token = portfolioPage.password
  const [isLoggedIn, setIsLoggedIn] = useIsLoggedIn(token)

  function handleSubmit(e) {
    e.preventDefault()

    if (e.target.password.value === token) {
      localStorage.setItem('private-portfolio', e.target.password.value)
      setIsLoggedIn(token)
    }
  }

  return (
    <Layout
      title={portfolioPage.seoTitle}
      description={portfolioPage.seoDescription}
    >
      {!isLoggedIn && (
        <div className="mx-auto min-h-screen max-w-3xl text-center">
          <div className="border py-12">
            <p className="mb-6 text-lg font-semibold">
              {portfolioPage.passwordInputPrompt}
            </p>
            <form
              className="mx-auto flex w-1/2 items-center justify-center rounded"
              onSubmit={handleSubmit}
            >
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                className="-mr-1 flex-1 rounded-l-md border-2 border-r-0 border-gray-300 bg-black bg-opacity-70 py-2 px-4 text-white focus:bg-opacity-90"
                name="password"
                type="text"
                placeholder="PASSWORD"
              />
              <button
                className={classNames(
                  'group flex items-center gap-x-2 rounded-md border-2 border-gray-300 px-4 py-2 transition-colors',
                  'hover:bg-gold hover:text-black'
                )}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <>
          <div className="mx-1 grid grid-cols-1 gap-1 lg:grid-cols-3">
            {portfolioItems.map((portfolioItem, index) => {
              return (
                <PortfolioItemTile portfolioItem={portfolioItem} key={index} />
              )
            })}
          </div>
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
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const portfolioPage = await getClient().fetch(
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
