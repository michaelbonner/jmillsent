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
  const [state, setState] = useState('initial')
  const contactForm = {
    name: '',
    emailAddress: '',
    phoneNumber: '',
    message: '',
    preference: [],
  }

  // split interests into two columns, first 2 and then the next 3
  const interestsSplit = interests.reduce(
    (acc, interest, index) => {
      if (index < 2) {
        acc[0].push(interest)
      } else {
        acc[1].push(interest)
      }
      return acc
    },
    [[], []]
  )

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
              console.error(error)
              setSubmitting(false)
              toast('Save failed', {
                type: toast.TYPE.ERROR,
              })
            }
          }}
        >
          {({ isSubmitting, isValid, handleChange, handleBlur, values }) => (
            <Form className={classNames('grid gap-8', 'lg:gap-12')}>
              <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6">
                <div className="relative rounded-lg border-gray-300 bg-white">
                  <Field
                    as="input"
                    autoComplete="name"
                    name="name"
                    placeholder="FULL NAME"
                    className="block w-full rounded-lg bg-transparent px-4 py-3 text-lg text-gray-900 placeholder-black shadow-xs focus:border-indigo-500 focus:ring-indigo-500 lg:px-8"
                  />
                  <ErrorMessage
                    name="name"
                    className="absolute right-0 -bottom-2 px-4 py-3 text-left text-xs leading-3 text-red-700"
                    component="div"
                  />
                </div>

                <div className="relative rounded-lg border-gray-300 bg-white">
                  <Field
                    as="input"
                    autoComplete="name"
                    name="emailAddress"
                    placeholder="EMAIL ADDRESS"
                    className="block w-full rounded-lg bg-transparent px-4 py-3 text-lg text-gray-900 placeholder-black shadow-xs focus:border-indigo-500 focus:ring-indigo-500 lg:px-8"
                  />
                  <ErrorMessage
                    name="emailAddress"
                    className="absolute right-0 -bottom-2 px-4 py-3 text-left text-xs leading-3 text-red-700"
                    component="div"
                  />
                </div>

                <div className="relative rounded-lg border-gray-300 bg-white">
                  <Field
                    as="input"
                    autoComplete="tel"
                    name="phoneNumber"
                    placeholder="PHONE NUMBER"
                    className="block w-full rounded-lg bg-transparent px-4 py-3 text-lg text-gray-900 placeholder-black shadow-xs focus:border-indigo-500 focus:ring-indigo-500 lg:px-8"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    className="absolute right-0 -bottom-2 px-4 py-3 text-left text-xs leading-3 text-red-700"
                    component="div"
                  />
                </div>
                <div className="relative rounded-lg border-gray-300 bg-white">
                  <TextareaAutosize
                    className="block w-full rounded-lg border-gray-300 bg-transparent px-4 py-3 text-lg text-gray-900 placeholder-black shadow-xs focus:border-indigo-500 focus:ring-indigo-500 lg:px-8"
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
              </div>
              <div
                className={classNames(
                  'mx-auto w-full',
                  'lg:pt-4',
                  'xl:border-t'
                )}
              >
                <div
                  className={classNames(
                    'relative mx-auto grid w-full items-center gap-4',
                    'sm:flex sm:justify-center',
                    'md:gap-8 md:px-8'
                  )}
                >
                  <p className="shrink-0 text-lg font-bold uppercase">
                    Interests:
                  </p>
                  {/* Mobile interests */}
                  <div
                    className={classNames(
                      'grid gap-3 text-[13px]',
                      'sm:text-sm',
                      'lg:text-base'
                    )}
                  >
                    <div
                      className={classNames(
                        'col-span-2 flex flex-wrap justify-start gap-y-2 divide-x divide-white border-t border-gray-200 pt-3',
                        'md:justify-center',
                        'xl:hidden'
                      )}
                    >
                      {interestsSplit[0].map((interest) => (
                        <div className={classNames('px-2')} key={interest}>
                          <label
                            className={classNames(
                              'flex cursor-pointer items-center gap-x-3 divide-x divide-white border-2 px-1 py-1 font-light uppercase',
                              'md:px-2',
                              values.preference.includes(interest)
                                ? 'border-white'
                                : 'border-black'
                            )}
                          >
                            <Field
                              className="hidden appearance-none border-none bg-transparent"
                              type="checkbox"
                              name="preference"
                              onChange={handleChange}
                              value={interest}
                            />
                            {interest}
                          </label>
                        </div>
                      ))}
                      <ErrorMessage
                        name="preference"
                        className="px-4 py-2 text-left text-xs leading-3 text-red-300 md:-bottom-7"
                        component="div"
                      />
                    </div>
                    <div
                      className={classNames(
                        'col-span-2 flex flex-wrap justify-start gap-y-2 divide-x divide-white border-t border-gray-200 pt-3',
                        'xl:hidden'
                      )}
                    >
                      {interestsSplit[1].map((interest) => (
                        <div className={classNames('px-2')} key={interest}>
                          <label
                            className={classNames(
                              'flex cursor-pointer items-center gap-x-3 divide-x divide-white border-2 px-1 py-1 font-light uppercase',
                              'md:px-2',
                              values.preference.includes(interest)
                                ? 'border-white'
                                : 'border-black'
                            )}
                          >
                            <Field
                              className="hidden appearance-none border-none bg-transparent"
                              type="checkbox"
                              name="preference"
                              onChange={handleChange}
                              value={interest}
                            />
                            {interest}
                          </label>
                        </div>
                      ))}
                      <ErrorMessage
                        name="preference"
                        className="px-4 py-2 text-left text-xs leading-3 text-red-300 md:-bottom-7"
                        component="div"
                      />
                    </div>
                  </div>
                  {/* Desktop interests */}
                  <div
                    className={classNames(
                      'col-span-2 hidden flex-wrap justify-start gap-y-2 divide-x divide-white',
                      'xl:flex xl:gap-y-4'
                    )}
                  >
                    {[...interestsSplit[0], ...interestsSplit[1]].map(
                      (interest) => (
                        <div
                          className={classNames('px-2', 'lg:px-4')}
                          key={interest}
                        >
                          <label
                            className={classNames(
                              'font-lights flex cursor-pointer items-center gap-x-3 divide-x-2 divide-white border-2 px-3 py-1 uppercase',
                              values.preference.includes(interest)
                                ? 'border-white'
                                : 'border-black'
                            )}
                          >
                            <Field
                              className="hidden appearance-none border-none bg-transparent"
                              type="checkbox"
                              name="preference"
                              onChange={handleChange}
                              value={interest}
                            />
                            {interest}
                          </label>
                        </div>
                      )
                    )}
                    <ErrorMessage
                      name="preference"
                      className="px-4 py-2 text-left text-xs leading-3 text-red-300 md:-bottom-7"
                      component="div"
                    />
                  </div>
                  {/* End interests */}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className={classNames(
                    'mx-auto inline-block w-full max-w-[450px] rounded-xl text-lg font-bold uppercase',
                    'border border-gray-500 px-8 py-2.5 tracking-wider',
                    'bg-black/50 transition-all',
                    'hover:bg-gold hover:text-black',
                    'focus:bg-gold focus:text-black',
                    {
                      'opacity-50': isSubmitting || !isValid,
                    }
                  )}
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {state === 'submitted' && (
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center rounded-lg border py-14 text-center shadow-md">
          <h2 className="text-xl font-bold tracking-wide text-gray-300">
            {successMessage}
          </h2>
        </div>
      )}
    </div>
  )
}
export default ContactForm
