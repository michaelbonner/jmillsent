import EmailSignupForm from '@/components/email-signup-form'
import { Eyebrow, H1, H2, H3 } from '@/components/headings'
import Layout from '@/components/layout'
import SectionIntro from '@/components/section-intro'
import { PortableText } from '@portabletext/react'
import groq from 'groq'
import dynamic from 'next/dynamic'
import { GrInstagram, GrLinkedin, GrVimeo } from 'react-icons/gr'
import { sanityClient } from '../lib/sanity'

const ContactForm = dynamic(() => import('@/components/contact-form'), {})
const Map = dynamic(() => import('@/components/map'), {})

function Contact({ contact }) {
  const heroContent = (
    <div className="flex max-w-5xl flex-col items-start gap-5 text-left">
      <Eyebrow className="border-b border-white/60 pb-3 text-white">
        Woods Cross, Utah
      </Eyebrow>
      <H1 className="max-w-[20ch]">{contact.title}</H1>
    </div>
  )

  return (
    <Layout
      title={contact.seoTitle}
      description={contact.seoDescription}
      heroImageUrl={contact.backgroundImage || null}
      heroContent={heroContent}
    >
      <section className="py-20 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow className="mb-5">Start a project</Eyebrow>
            <H2 className="max-w-[20ch]">Tell us what you&apos;re making.</H2>

            <div className="mt-10 grid gap-8 border-t border-white/20 pt-6">
              <div>
                <Eyebrow className="mb-3">Studio address</Eyebrow>
                <a
                  className="text-base/7 hover:underline"
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
              <div>
                <Eyebrow className="mb-3">Follow</Eyebrow>
                <div className="flex items-center gap-6">
                  <a
                    aria-label="Instagram"
                    href="https://www.instagram.com/jmillsent/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GrInstagram size={22} />
                  </a>
                  <a
                    aria-label="Vimeo"
                    href="https://vimeo.com/jmillsent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GrVimeo size={22} />
                  </a>
                  <a
                    aria-label="LinkedIn"
                    href="https://www.linkedin.com/company/jmills-entertainment/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GrLinkedin size={22} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ContactForm
              interests={contact.interests}
              successMessage={contact.mainFormSuccessMessage}
            />
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 py-20 lg:py-28" id="contacts">
        <div className="mx-auto max-w-7xl px-5">
          <div className="border-t border-white/30 pt-5">
            <SectionIntro
              eyebrow="Direct lines"
              title={contact.representationTitle || 'Who to contact'}
            />
          </div>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {contact.representationCards.map((card) => {
              return (
                <div className="border-t border-white/20 pt-6" key={card.title}>
                  <H3>{card.title}</H3>
                  <div className="prose prose-invert mt-2 text-neutral-300">
                    <PortableText value={card.body} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5">
          <div className="overflow-hidden">
            <Map />
          </div>
          <div className="mt-16 max-w-xl">
            <EmailSignupForm
              title={contact.subscribeFormTitle}
              successMessage={contact.subscribeFormSuccessMessage}
            />
          </div>
        </div>
      </section>
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
