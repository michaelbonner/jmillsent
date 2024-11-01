/* eslint-disable @next/next/no-img-element */
import DividerBar from '@/components/divider-bar'
import EmailSignupForm from '@/components/email-signup-form'
import { H1 } from '@/components/headings'
import Layout from '@/components/layout'
import LittleWhiteBar from '@/components/little-white-bar'
import { PortableText } from '@portabletext/react'
import groq from 'groq'
import dynamic from 'next/dynamic'
import { GrInstagram, GrLinkedin, GrVimeo } from 'react-icons/gr'
import { sanityClient } from '../lib/sanity'
import urlForSanitySource from '../lib/urlForSanitySource'
import LittleBlackBar from '@/components/little-black-bar'

const ContactForm = dynamic(() => import('@/components/contact-form'), {})
const Map = dynamic(() => import('@/components/map'), {})

function Contact({ contact }) {
  const backgroundImageUrl = urlForSanitySource(contact.backgroundImage)
    .width(1400)
    .url()
  return (
    <Layout title={contact.seoTitle} description={contact.seoDescription}>
      <div
        className="px-4 lg:pt-28"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="mx-auto max-w-5xl pt-12 text-center lg:px-4">
          <H1>{contact.title}</H1>
        </div>
        <div className="mx-auto mt-8 w-full max-w-7xl lg:mt-16 lg:px-4">
          <ContactForm
            interests={contact.interests}
            successMessage={contact.mainFormSuccessMessage}
          />
        </div>

        <DividerBar yMargin="my-12 lg:my-24" />

        <div>
          <div
            className="mx-auto flex max-w-7xl flex-wrap justify-center gap-y-10 text-center"
            id="contacts"
          >
            {contact.representationCards.map((card) => {
              return (
                <div className="w-full sm:w-1/2 lg:w-1/3" key={card.title}>
                  <div className="mx-5 flex h-full flex-col justify-center rounded-xl border border-gray-500 p-8">
                    <p className="text-xl font-bold tracking-wider">
                      {card.title}
                    </p>
                    <div className="mx-auto w-32">
                      <LittleWhiteBar yMargin="my-4" />
                    </div>
                    <div className="prose-white prose prose-lg mx-auto leading-9 text-gray-300">
                      <PortableText value={card.body} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <DividerBar yMargin="my-12 lg:my-24" />

          <div className="px-4">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-gray-500">
              <Map />
            </div>
          </div>

          <div
            className="mx-auto mt-12 flex max-w-7xl flex-wrap justify-center text-center lg:mt-16"
            id="contacts"
          >
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <div className="mx-5 rounded-xl bg-white p-8 text-black">
                <p className="text-xl font-bold uppercase tracking-wider">
                  Studio Address
                </p>
                <div className="mx-auto w-32">
                  <LittleBlackBar yMargin="my-4" />
                </div>
                <div className="prose prose-lg leading-8">
                  <a
                    className="no-underline hover:underline"
                    href="https://g.page/jmillsent?share"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Jmills Entertainment
                    <br />
                    1589 W 2225 S<br />
                    Woods Cross, UT 84087
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-12 grid gap-y-12 lg:my-16">
          <div className="flex items-center justify-center gap-16">
            <a
              href="https://www.instagram.com/jmillsent/"
              target="_blank"
              rel="noreferrer"
            >
              <GrInstagram size={24} />
            </a>
            <a
              href="https://vimeo.com/jmillsent"
              target="_blank"
              rel="noreferrer"
            >
              <GrVimeo size={24} />
            </a>
            <a
              href="https://www.linkedin.com/company/jmills-entertainment/"
              target="_blank"
              rel="noreferrer"
            >
              <GrLinkedin size={24} />
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-sm">
          <EmailSignupForm
            title={contact.subscribeFormTitle}
            successMessage={contact.subscribeFormSuccessMessage}
          />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      contact: await sanityClient.fetch(groq`
          *[_type == "contactPage"][0]{
            title,
            backgroundImage,
            seoTitle,
            seoDescription,
            representationTitle,
            representationCards,
            mainFormSuccessMessage,
            subscribeFormTitle,
            subscribeFormSuccessMessage,
            interests
          }
        `),
    },
  }
}

export default Contact
