import classNames from 'classnames'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

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

const ContactForm = () => {
  const [state, setState] = useState('initial')
  const contactForm = {
    name: '',
    emailAddress: '',
    phoneNumber: '',
    message: '',
  }

  return (
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
          {({ isSubmitting, isValid, handleChange, handleBlur, values }) => (
            <Form className="grid grid-cols-1 gap-y-6 mx-auto max-w-3xl">
              <div className="border-gray-300 rounded-md bg-white bg-opacity-100 relative">
                <Field
                  as="input"
                  autoComplete="name"
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
                  autoComplete="name"
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
                  autoComplete="tel"
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
  )
}
export default ContactForm
