/* eslint-disable @next/next/no-img-element */
import DividerBar from '@/components/divider-bar'
import EmailSignupForm from '@/components/email-signup-form'
import { H1, H3, H4 } from '@/components/headings'
import LargeWhiteBar from '@/components/large-white-bar'
import Layout from '@/components/layout'
import LittleWhiteBar from '@/components/little-white-bar'
import Map from '@/components/map'
import MediumWhiteBar from '@/components/medium-white-bar'
import { PortableText } from '@portabletext/react'
import classNames from 'classnames'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import groq from 'groq'
import { useState } from 'react'
import { GrInstagram, GrLinkedin, GrVimeo } from 'react-icons/gr'
import TextareaAutosize from 'react-textarea-autosize'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { getClient } from '../lib/sanity'
import urlForSanitySource from '../lib/urlForSanitySource'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short')
    .max(120, 'Too long')
    .required('Full name is required'),
  emailAddress: Yup.string()
    .email('Invalid email')
    .required('Email address is required'),
  phoneNumber: Yup.string()
    .label('Phone number')
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Valid Phone number is Required'),
  message: Yup.string().min(2, 'Too short').required('Message is Required'),
})

function Contact({ contact }) {
  const [state, setState] = useState('initial')
  const contactForm = {
    name: '',
    emailAddress: '',
    phoneNumber: '',
    message: '',
  }

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
        <div className="grid">
          <div className="max-w-5xl mx-auto px-4 lg:px-0 pt-12 text-center">
            <H1>{contact.title}</H1>
          </div>
          <div className="max-w-7xl w-full mx-auto px-4 mt-8 lg:mt-16">
            <div>
              {state === 'initial' && (
                <Formik
                  initialValues={contactForm}
                  validationSchema={contactSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const response = await fetch('/api/contact', {
                        method: 'post',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(values),
                      })

                      if (response?.status === 201) {
                        setState('submitted')
                        setSubmitting(false)
                      } else {
                        setSubmitting(false)
                        toast('Save failed', {
                          type: toast.TYPE.ERROR,
                        })
                      }
                    } catch (error) {
                      setSubmitting(false)
                      toast('Save failed', {
                        type: toast.TYPE.ERROR,
                      })
                    }
                  }}
                >
                  {({
                    isSubmitting,
                    isValid,
                    handleChange,
                    handleBlur,
                    values,
                  }) => (
                    <Form className="grid grid-cols-1 gap-y-6 mx-auto">
                      <div className="border-gray-300 rounded-md bg-white bg-opacity-100 relative">
                        <Field
                          as="input"
                          name="name"
                          placeholder="FULL NAME"
                          className="bg-transparent block w-full shadow-sm py-3 px-4 lg:px-8 text-gray-900 text-lg placeholder-black focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <ErrorMessage
                          name="name"
                          className="absolute right-0 -bottom-2 text-left text-xs text-red-700 px-4 py-3 leading-3"
                          component="div"
                        />
                      </div>

                      <div className="border-gray-300 rounded-md bg-white bg-opacity-100 relative">
                        <Field
                          as="input"
                          name="emailAddress"
                          placeholder="EMAIL ADDRESS"
                          className="bg-transparent block w-full shadow-sm py-3 px-4 lg:px-8 text-gray-900 text-lg placeholder-black focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <ErrorMessage
                          name="emailAddress"
                          className="absolute right-0 -bottom-2 text-left text-xs text-red-700 px-4 py-3 leading-3"
                          component="div"
                        />
                      </div>

                      <div className="border-gray-300 rounded-md bg-white bg-opacity-100 relative">
                        <Field
                          as="input"
                          name="phoneNumber"
                          placeholder="PHONE NUMBER"
                          className="bg-transparent block w-full shadow-sm py-3 px-4 lg:px-8 text-gray-900 text-lg placeholder-black focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          className="absolute right-0 -bottom-2 text-left text-xs text-red-700 px-4 py-3 leading-3"
                          component="div"
                        />
                      </div>
                      <div className="border-gray-300 rounded-md bg-white bg-opacity-100 relative">
                        <TextareaAutosize
                          className="py-3 px-4 lg:px-8 block w-full shadow-sm focus:ring-indigo-500 text-gray-900 text-lg placeholder-black focus:border-indigo-500 border-gray-300 rounded-md bg-transparent"
                          minRows={4}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="MESSAGE"
                          name="message"
                          value={values.message}
                        />
                        <ErrorMessage
                          name="message"
                          className="absolute right-0 -bottom-2 text-left text-xs text-red-700 px-4 py-3 leading-3"
                          component="div"
                        />
                      </div>
                      <button
                        type="submit"
                        className={classNames(
                          `inline-block rounded-md text-lg font-bold uppercase w-full max-w-[450px] mx-auto`,
                          `tracking-wider border border-gray-500 py-2.5 px-8`,
                          `bg-black bg-opacity-50 transition-all`,
                          `hover:bg-gold hover:text-black`,
                          `focus:bg-gold focus:text-black`,
                          {
                            'opacity-50': isSubmitting || !isValid,
                          }
                        )}
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                    </Form>
                  )}
                </Formik>
              )}
              {state === 'submitted' && (
                <div className="relative h-full flex flex-col justify-center items-center text-center bg-white rounded-md shadow-md py-24 px-8 text-gray-900">
                  <h2 className="font-medium text-2xl relative z-20">
                    Thank you for contacting us!
                    <br />
                    We will be in touch soon.
                  </h2>
                </div>
              )}
            </div>
          </div>

          <DividerBar yMargin="my-12 lg:my-24" />

          <div>
            <div
              className="flex flex-wrap max-w-7xl justify-center mx-auto text-center gap-y-10"
              id="contacts"
            >
              {contact.representationCards.map((card) => {
                return (
                  <div className="w-full lg:w-1/3" key={card.title}>
                    <div className="border border-gray-500 p-8 mx-5">
                      <p className="tracking-wider font-bold text-xl">
                        {card.title}
                      </p>
                      <div className="w-32 mx-auto">
                        <LittleWhiteBar yMargin="my-4" />
                      </div>
                      <div className="leading-9 prose prose-lg prose-white text-gray-300">
                        <PortableText value={card.body} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <DividerBar yMargin="my-12 lg:my-24" />

            <div className="mx-auto max-w-7xl border border-gray-500 rounded-lg">
              <Map />
            </div>

            <div
              className="flex flex-wrap max-w-7xl justify-center mx-auto text-center mt-12"
              id="contacts"
            >
              <div className="w-full lg:w-1/3">
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
