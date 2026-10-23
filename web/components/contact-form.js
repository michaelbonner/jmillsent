import { clsx } from 'clsx'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

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

const inputClassName =
  'block w-full border-0 border-b border-white/30 bg-transparent px-0 py-4 text-lg text-white placeholder:text-neutral-500 placeholder:uppercase focus:border-white focus:ring-0'

const errorClassName = 'pb-2 text-sm text-red-400'

const ContactForm = ({ interests, successMessage = '' }) => {
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
              console.error(error)
              setSubmitting(false)
              toast('Save failed', {
                type: toast.TYPE.ERROR,
              })
            }
          }}
        >
          {({ isSubmitting, isValid, handleChange, handleBlur, values }) => (
            <Form className="grid gap-12">
              <div className="grid gap-x-10 gap-y-2 md:grid-cols-2">
                <div className="relative">
                  <label className="sr-only" htmlFor="name">
                    Full name
                  </label>
                  <Field
                    as="input"
                    autoComplete="name"
                    className={inputClassName}
                    id="name"
                    name="name"
                    placeholder="Full name"
                  />
                  <ErrorMessage
                    name="name"
                    className={errorClassName}
                    component="div"
                  />
                </div>
                <div className="relative">
                  <label className="sr-only" htmlFor="emailAddress">
                    Email address
                  </label>
                  <Field
                    as="input"
                    autoComplete="email"
                    className={inputClassName}
                    id="emailAddress"
                    name="emailAddress"
                    placeholder="Email address"
                  />
                  <ErrorMessage
                    name="emailAddress"
                    className={errorClassName}
                    component="div"
                  />
                </div>
                <div className="relative">
                  <label className="sr-only" htmlFor="phoneNumber">
                    Phone number
                  </label>
                  <Field
                    as="input"
                    autoComplete="tel"
                    className={inputClassName}
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone number"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    className={errorClassName}
                    component="div"
                  />
                </div>
                <div className="relative md:col-span-2">
                  <label className="sr-only" htmlFor="message">
                    Message
                  </label>
                  <TextareaAutosize
                    className={inputClassName}
                    id="message"
                    minRows={4}
                    name="message"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Message"
                    value={values.message}
                  />
                  <ErrorMessage
                    name="message"
                    className={errorClassName}
                    component="div"
                  />
                </div>
              </div>

              <fieldset>
                <legend className="mb-5 text-sm font-medium tracking-[0.12em] text-neutral-400 uppercase">
                  Interests
                </legend>
                <div className="flex flex-wrap gap-3">
                  {interests.map((interest) => (
                    <label
                      className={clsx(
                        'cursor-pointer border px-4 py-2.5 text-sm font-medium tracking-[0.08em] uppercase transition-colors has-focus-visible:ring-2 has-focus-visible:ring-white',
                        values.preference.includes(interest)
                          ? 'border-white bg-white text-neutral-950'
                          : 'border-white/30 hover:border-white'
                      )}
                      key={interest}
                    >
                      <Field
                        className="sr-only"
                        name="preference"
                        onChange={handleChange}
                        type="checkbox"
                        value={interest}
                      />
                      {interest}
                    </label>
                  ))}
                </div>
                <ErrorMessage
                  name="preference"
                  className="mt-3 text-sm text-red-400"
                  component="div"
                />
              </fieldset>

              <div>
                <button
                  type="submit"
                  className={clsx(
                    'inline-flex min-h-12 items-center gap-3 border border-white px-8 py-3 text-sm font-medium tracking-[0.08em] uppercase transition-colors',
                    'hover:bg-white hover:text-neutral-950',
                    {
                      'opacity-50': isSubmitting || !isValid,
                    }
                  )}
                  disabled={isSubmitting}
                >
                  Send message
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {state === 'submitted' && (
        <div className="border-t border-white/30 pt-6">
          <p className="text-2xl font-semibold tracking-tight uppercase lg:text-3xl">
            {successMessage}
          </p>
        </div>
      )}
    </div>
  )
}
export default ContactForm
