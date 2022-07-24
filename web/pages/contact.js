/* eslint-disable @next/next/no-img-element */
import DividerBar from '@/components/divider-bar'
import EmailSignupForm from '@/components/email-signup-form'
import { H1 } from '@/components/headings'
import Layout from '@/components/layout'
import LittleWhiteBar from '@/components/little-white-bar'
import MediumWhiteBar from '@/components/medium-white-bar'
import { PortableText } from '@portabletext/react'
import groq from 'groq'
import dynamic from 'next/dynamic'
import { GrInstagram, GrLinkedin, GrVimeo } from 'react-icons/gr'
import { getClient } from '../lib/sanity'
import urlForSanitySource from '../lib/urlForSanitySource'

const ContactForm = dynamic(() => import('@/components/contact-form'), {})
const Map = dynamic(() => import('@/components/map'), {})

function Contact({ contact }) {
  const backgroundImageUrl = urlForSanitySource(contact.backgroundImage)
    .width(1400)
    .url()
  return (
    <Layout title={contact.seoTitle} description={contact.seoDescription}>
      <div
        className="px-4 lg:px-0"
        style={{
          backgroundColor: '#ccc',
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 lg:px-0 pt-12 text-center">
          <H1>{contact.title}</H1>
        </div>
        <div className="max-w-7xl w-full mx-auto px-4 mt-8 lg:mt-16">
          <ContactForm />
        </div>

        <DividerBar yMargin="my-12 lg:my-24" />

        <div>
          <div
            className="flex flex-wrap max-w-7xl justify-center mx-auto text-center gap-y-10"
            id="contacts"
          >
            {contact.representationCards.map((card) => {
              return (
                <div className="w-full sm:w-1/2 lg:w-1/3" key={card.title}>
                  <div className="border border-gray-500 p-8 mx-5 h-full flex flex-col justify-center">
                    <p className="tracking-wider font-bold text-xl">
                      {card.title}
                    </p>
                    <div className="w-32 mx-auto">
                      <LittleWhiteBar yMargin="my-4" />
                    </div>
                    <div className="leading-9 prose prose-lg prose-white text-gray-300 mx-auto">
                      <PortableText value={card.body} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <DividerBar yMargin="my-12 lg:my-24" />

          <div className="px-4">
            <div className="mx-auto max-w-7xl border border-gray-500 rounded-lg">
              <Map />
            </div>
          </div>

          <div
            className="flex flex-wrap max-w-7xl justify-center mx-auto text-center mt-12 lg:mt-16"
            id="contacts"
          >
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <div className="border border-gray-500 p-8 mx-5">
                <p className="tracking-wider font-bold text-xl uppercase">
                  Studio Address
                </p>
                <div className="w-32 mx-auto">
                  <LittleWhiteBar yMargin="my-4" />
                </div>
                <div className="leading-9 prose prose-lg prose-white text-gray-300">
                  <a
                    className="no-underline"
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

        <div className="my-12 lg:my-16 grid gap-y-12">
          <div className="flex gap-16 items-center justify-center">
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
        <div className="px-8">
          <EmailSignupForm title={contact.subscribeFormTitle} />
        </div>
        <MediumWhiteBar yMargin="my-12" />
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      contact: await getClient().fetch(groq`
          *[_type == "contactPage"][0]{
            title,
            backgroundImage,
            seoTitle,
            seoDescription,
            representationTitle,
            representationCards,
            subscribeFormTitle,
          }
        `),
    },
  }
}

export default Contact
