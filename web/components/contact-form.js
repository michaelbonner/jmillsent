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
  preference: Yup.array().min(1, 'Please select at least one option'),
})

const ContactForm = ({ interests, successMessage = '' }) => {
  console.log('interests', interests)
  const [state, setState] = useState('initial')
  const contactForm = {
    name: '',
    emailAddress: '',
    phoneNumber: '',
    message: '',
    preference: [],
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
            <Form className="mx-auto grid max-w-3xl grid-cols-1 gap-y-6">
              <div className="relative rounded-md border-gray-300 bg-white bg-opacity-100">
                <Field
                  as="input"
                  autoComplete="name"
                  name="name"
                  placeholder="FULL NAME"
                  className="block w-full bg-transparent py-3 px-4 text-lg text-gray-900 placeholder-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:px-8"
                />
                <ErrorMessage
                  name="name"
                  className="absolute right-0 -bottom-2 px-4 py-3 text-left text-xs leading-3 text-red-700"
                  component="div"
                />
              </div>

              <div className="relative rounded-md border-gray-300 bg-white bg-opacity-100">
                <Field
                  as="input"
                  autoComplete="name"
                  name="emailAddress"
                  placeholder="EMAIL ADDRESS"
                  className="block w-full bg-transparent py-3 px-4 text-lg text-gray-900 placeholder-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:px-8"
                />
                <ErrorMessage
                  name="emailAddress"
                  className="absolute right-0 -bottom-2 px-4 py-3 text-left text-xs leading-3 text-red-700"
                  component="div"
                />
              </div>

              <div className="relative rounded-md border-gray-300 bg-white bg-opacity-100">
                <Field
                  as="input"
                  autoComplete="tel"
                  name="phoneNumber"
                  placeholder="PHONE NUMBER"
                  className="block w-full bg-transparent py-3 px-4 text-lg text-gray-900 placeholder-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:px-8"
                />
                <ErrorMessage
                  name="phoneNumber"
                  className="absolute right-0 -bottom-2 px-4 py-3 text-left text-xs leading-3 text-red-700"
                  component="div"
                />
              </div>
              <div className="relative rounded-md border-gray-300 bg-white bg-opacity-100">
                <TextareaAutosize
                  className="block w-full rounded-md border-gray-300 bg-transparent py-3 px-4 text-lg text-gray-900 placeholder-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:px-8"
                  minRows={4}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="MESSAGE"
                  name="message"
                  value={values.message}
                />
                <ErrorMessage
                  name="message"
                  className="absolute right-0 -bottom-2 px-4 py-3 text-left text-xs leading-3 text-red-700"
                  component="div"
                />
              </div>
              <div>
                <div className="relative mx-auto grid gap-4 px-4 sm:flex md:gap-8 md:px-8">
                  <p className="shrink-0 text-lg uppercase">
                    I&apos;m interested in:
                  </p>
                  <div
                    className={classNames(
                      'col-span-2 flex flex-wrap gap-x-4 gap-y-2 px-2',
                      'md:gap-x-8 md:gap-y-4'
                    )}
                  >
                    {interests.map((interest) => (
                      <label
                        key={interest}
                        className="flex items-center gap-x-3 uppercase"
                      >
                        <Field
                          className="border-white bg-black p-2 text-gold focus:ring-1 focus:ring-white"
                          type="checkbox"
                          name="preference"
                          onChange={handleChange}
                          value={interest}
                        />
                        {interest}
                      </label>
                    ))}
                  </div>
                </div>
                <ErrorMessage
                  name="preference"
                  className="px-4 py-2 text-right text-xs leading-3 text-red-300 md:-bottom-7"
                  component="div"
                />
              </div>
              <button
                type="submit"
                className={classNames(
                  `mx-auto inline-block w-full max-w-[450px] rounded-md text-lg font-bold uppercase`,
                  `border border-gray-500 py-2.5 px-8 tracking-wider`,
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
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center rounded-md border py-14 text-center shadow-md">
          <h2 className="text-xl font-bold tracking-wide text-gray-300">
            {successMessage}
          </h2>
        </div>
      )}
    </div>
  )
}
export default ContactForm
