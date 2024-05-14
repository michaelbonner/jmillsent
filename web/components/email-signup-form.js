import classNames from 'classnames'
import { useState } from 'react'

const SkullSvg = () => (
  <svg
    className="h-6 w-6 fill-current text-white group-hover:text-black"
    enableBackground="new 0 0 100 120"
    viewBox="0 0 100 120"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m6.9 71 2.2 1.3.3-.2c-.1-.5-.4-.9-.7-1.3-1.2-1.2-2.4-2.4-3.6-3.6-1.3-1.4-2.2-3.2-2.4-5.2-.5-4.1-.8-8.3-1.1-12.4 0-.6.1-1.1.3-1.7.7-2.4 1.5-4.8 2.3-7.2l-.4-.2-1.4 2c.3-3.1 1-6.1 2.1-9 .4-1.1.8-2.3 1.2-3.4 2.4-5.6 6.2-10.4 10.9-14.3 6.5-5.6 14.3-9.3 22.6-11 6-1.4 12.3-1.7 18.4-1 3.9.5 7.7 1.5 11.4 2.9 5 1.9 9.8 4.5 14.1 7.7 2.1 1.8 3.9 4 5.2 6.4.4.8.9 1.5 1.5 2.1 1.1 1.1 2 2.4 2.6 3.9.6 1.3 1.4 2.5 2.1 3.7 1.4 2.2 2.4 4.6 2.8 7.2.3 2.2.7 4.4 1.1 6.6v.9c-.1.5-.2 1-.2 1.6.4 7.4-1.4 14.7-2.1 22-.2 1.7-.5 3.3-1 4.9-.3.7-.2 1.5.2 2.2 1 1.5 1.3 3.4.8 5.2-.1.9 0 1.9.2 2.8.4 1.7.1 3.5-.9 4.9-1.4 2.1-3.4 3.6-5.8 4.4-.6.2-1.2.2-1.8 0-1.8-.7-3.8-.5-5.4.7-3.1 1.9-5.4 5-6.2 8.5-.1.2-.1.5-.1.7.3 2.2-.2 4.4.6 6.5.4.8.2 1.8-.4 2.5-.3.5-.4 1-.5 1.5-.1 1.1-.7 1.5-1.7 1.1-.7-.4-1.6-.4-2.4-.1-.1 0-.2 0-.3 0-1.6-.9-3.4-.6-5.1-1.1-.1 0-.2-.2-.4-.1-2.4.2-4.7-.8-7.1-.4-.9.2-1.8.4-2.7.5-.8-.1-1.6-.2-2.4-.5-.4-.1-.8-.1-1.2-.1-1.6.8-3.4 1-5.2.5-.2 0-.4 0-.6 0-.7.2-1.4.4-2.1.5-1.1.1-2.1.8-3.3.5-.6-.1-1.4.6-2.1.7-.6.1-1.3.1-1.9.1-1.6.2-3.1.5-4.7.8-.1 0-.1 0-.2 0-1.6.8-2.4-.4-3.3-1.3-.7-1-.8-2.3-.2-3.4.7-1.7.8-3.5.5-5.2-.4-3.9-2.6-6.6-5.9-8.5-.8-.3-1.6-.5-2.5-.5-2.8-.3-5.6-.4-8-2.3-1.1-.8-1.7-2-1.6-3.4s0-2.8 0-4.2c0-.1 0-.3 0-.4-.9-3-1.7-6-2.6-9-.4-2-1.1-4.3-1.9-6.8zm8.3-26.5.5-.1c.4.8.7 1.6 1 2.5.8 3.5.8 7.1-.1 10.6-.5 2.6-1.7 5.1-1.5 7.8.1 1.1.1 2.3 0 3.4 0 1.1-.3 2.3-1 3.2-.5.7-.8 1.5-.9 2.4 0 2.7.2 5.3.3 8 .2 1.7.2 3.4 0 5.1-.5 2.8.3 5.1 2.9 6.4 1.2.6 2.5 1.4 3.8 1.4 2.1.1 4.2.7 6.1 1.8 1.1.6 2 1.4 2.7 2.4 1.5 2 2.6 4.3 3.1 6.7.2.8.7 1.4 1.4 1 2.8-1.4 6.1-.6 8.8-2.2.1-.1.3 0 .5-.1 1.4-.6 2.9-1.1 4.3-1.8.5-.3 1-.6 1.6-.8 1.1-.3 2.3-.4 3.4-.6.5-.1 1-.3 1.4-.2 2.6.9 5.6.4 7.8 2.5.1.1.2.1.3.1 2.5.6 5 1.3 7.6 1.9 1.4.3 2.8-.1 3.7-1.1 1.1-1.2 1.7-2.7 1.9-4.3.4-2 1.6-3.4 2.7-4.8.9-1.1 1.9-2 3-2.8 1.8-1.5 4.1-2.2 6.5-2.1 1.7.1 3.1-.6 4.6-.8.3-.1.5-.2.6-.4 1.7-1.5 2.5-3.8 2.1-6-.3-1.9-.4-3.6-.3-5.3-.1-1-.3-1.9-.6-2.8 0-.1-.2-.2-.2-.3-.4-.6-.8-1.2-1.1-1.9-.6-1.3-.9-2.7-.9-4.2-.2-2.3-.5-4.6-1.1-6.9-.1-.3-.2-.6-.3-.9-.1-.2-.3-.4-.5-.5-1.5-.4-2.6-1.9-2.5-3.5 0-.4-.1-.9-.2-1.3-.7-1.6-1.1-3.3-.9-5.1 0-.4-.1-.8-.1-1.2 0-.5-.2-1.1-.1-1.6.9-1.9 1.8-3.7 2.8-5.5.4-.5.8-.9 1.3-1.2.4 4 .8 7.6 1.2 11.3h.2v-4l1.4 5.6h.2l-.5-8.1c.7 1.6.7 3.3 1.4 5 .6 1.3.4 3.1.5 4.6v1h.3c.9-3.2 1.9-6.3 1.4-9.7-.4-2.8-.8-5.6-1.3-8.3-.2-2-.7-4.1-1.4-6-3.2-7.4-8.5-13.7-15.2-18.2-2.8-2-5.8-3.7-9-4.9-2.4-.7-4.6-1.7-6.9-2.6-1-.4-2.1-.8-3.1-1.3-1.7-.9-3.8-1-5.6-.5-.5.2-.9.3-1.4.4-2.4.3-4.9.4-7.3.9-14.4 2.6-25.7 10.2-34.4 21.8-1.2 1.6-2.1 3.4-2.5 5.4-1 4-1.2 8.2-.6 12.3.4 1.9.7 3.8 1 5.7l.2-.1 1.5-3.4c-.6 4.1-.7 10.5 0 12.5-.1-3.9.1-7.6 1.8-10.9v13h.4c.1-.8.2-1.6.2-2.3.1-2.8.1-5.7.2-8.5.1-1 .3-1.9.7-2.9.2 1.1.2 2.1.2 3.2-.1 1-.3 2-.4 2.9 2.1-3.3 3.3-6.8 2.4-10.8zm41.1 68.4c2.3 0 3.1-1.1 2.3-3.3-.2-.4-.3-.8-.5-1.2-.6-1.7-1.6-2.1-3.7-1.6-1.5.4-1.9 1.2-1.5 3 0 .2.1.4.1.6.3 2.2.6 2.1 2.6 2.5zm-6.6.4c.8-.2 1.7-.5 2.5-.7.3-.2.4-.5.4-.8-.1-1-.3-2-.6-3-.3-1.3-1.3-1.8-2.9-1.6-1.1 0-1.9.8-2 1.9v.4c0 .6.1 1.1.2 1.7.4 1.8.4 1.9 2.4 2.1zm-4.8.2 1-.2c.8-.1 1.3-.5 1-1.5s-.7-2.2-.9-3.3c-.2-.9-.8-1.1-1.6-.9-.8.1-1.4.7-1.3 1.5 0 1 .2 2 .2 2.9-.2 1.3.6 1.4 1.6 1.5zm14.7-1c.6.1 1.3.1 1.9-.1.4-.1 1.1-.8 1-1.1-.2-1.3-.5-2.6-1-3.9-.2-.7-.9-1-1.6-.8-.1 0-.1.1-.2.1-.7.3-1 1.1-.8 1.9.3 1.3.5 2.5.7 3.9zm3.2-3.2.2.1c.1.8.2 1.6.3 2.4.1 1.1.5 1.4 1.5 1.3s1.6-.7 1.5-1.6-.3-1.8-.6-2.6c-.2-.5-.5-.9-.9-1.2-.3-.2-1.1-.3-1.3 0-.3.5-.6 1-.7 1.6zm-19.6 4.7c-.2-.6-.3-.9-.5-1.3-.4-1.1-.7-2.3-1.2-3.5-.1-.3-.5-.5-.8-.4-.1 0-.3.1-.4.3-.6.6-.6 3.3 0 3.8.5.4 1.1.7 1.7.9.5.1.9.2 1.2.2zm29.8-1.4c-.3-.7-.7-1.3-1.1-1.9-.2-.3-.7-.5-1-.7-.2.5-.4 1-.4 1.5 0 .7.2 1.3.4 1.9.1.3.3.5.6.6.8.3 1.3-.3 1.5-1.4zm-6.2.6c.1 0 .3.1.4.1 1.2.1 1.4-.1 1.2-1.4-.1-.7-.2-1.4-.4-2.1-.2-.5-.4-.9-.7-1.3h-.4c-.2.5-.3 1-.4 1.5.1 1 .2 2 .3 3.2zm-26.1 1.1-1.9-3.7c-1.1.8-1.2 1.1-.7 2.3.1.3.2.6.3.9-.1.9.5.9 1.1.8.3 0 .8-.1 1.2-.3zm-5.1 1c-.6-1.1-1.1-1.9-1.6-2.8-.1-.2-.4-.5-.5-.4-.2.1-.4.2-.6.5s-.4.8-.2 1c.2.7-.1 1.8 1 1.9.6 0 1.2-.1 1.9-.2zm2.3-.5.1-.4c-.4-.7-.7-1.4-1.2-2-.2-.3-.6-.4-.9-.4-.3.1-.9.6-.8.7.3.8.7 1.5 1.2 2.1.2.3 1 .1 1.6 0zm-5 .7c-1.1-1.1-.3-2.9-1.4-4.1-1 1.4-1.2 2.9-.4 3.9.4.5.9.7 1.8.2zm36.3-1.9c.2 0 .7 0 .9-.2s.2-.6.1-1c-.1-.7-.3-1.4-.5-2.1-.1-.3-.2-.6-.4-.9-.2.3-.4.6-.6 1-.1.2 0 .5.1.8zm4.1-3.4c-.1.2-.1.4-.2.6.1 1 .2 1.9.3 2.9 0 .1.3.4.4.3.2-.1.4-.2.5-.4.3-1.2-.1-2.5-1-3.4zm1.3 4.2.3.2c.2-.2.4-.3.5-.5.2-.9.4-1.8.5-2.7 0-.3-.2-.7-.4-.9-.2-.1-.5-.1-.7-.1-.1.3-.2.6-.1.9.2 1 .7 2-.1 3.1zm-44.4-3.5c-1.2 1.2-1.2 3.1 0 4.2z" />
    <path d="m42.3 62.2c0 4.7-.9 9.2-3.8 13.1-1.8 2.6-4.4 4.5-7.4 5.7-1.2.4-2.5.3-3.7-.1-2.7-1-4.8-2.9-5.4-6 0-.2-.1-.4-.2-.7-2.6-4.4-2.4-9-1-13.7.4-1.4 1.2-2.7 2.1-3.8 1.1-1.3 2.1-2.6 3.1-4 .8-1.1 2.1-1.9 3.4-2.2 1.9-.4 3.8-.6 5.6.7.1.1.2.1.4.1 1.6-.2 3.3.1 4.8.8.4.2.7.5.8.8.8 3.1 1.3 6.2 1.3 9.3z" />
    <path d="m62.9 63.3c0-4.1 1.2-8.1 3.6-11.4.2-.3.6-.5.9-.5 2.2-.6 4.4-.3 6.6 0 .2.1.5.1.7 0 1.4-.5 2.9.1 3.6 1.4.9 1.2 1.7 2.4 2.4 3.8 1.4 3 2.5 6.1 3.4 9.3 1.4 5.6-1.2 10.1-5 13.9-1.6 1.6-4 1.8-5.9.6-1.5-.8-2.9-1.9-4.1-3.2-1.6-1.8-2.9-3.9-4.4-5.9-1.3-1.9-1.9-4.1-1.8-6.3 0-.7 0-1.2 0-1.7z" />
    <path d="m51.4 88.6c-.3.9-.6 1.7-.8 2.6-.3 2-1.9 2.6-3.4 3.4-.8.4-1.6-.3-1.6-1.3.1-1.2.2-2.3.1-3.5-.7-4.2 1.2-7.7 2.6-11.3.6-1.6 2.2-2.5 3.9-2.4.3 0 .5.1.7.3.7.6 1.4 1.3 2.1 2 2.1 2.1 2.2 4.8 2.5 7.5.1 1 0 1.9 0 2.9.1 1.9-.9 3.1-2.2 4.2-.4.4-1.2.5-1.6.1-1-.6-1.8-1.3-1.7-2.7 0-.5-.1-1-.3-1.5z" />
  </svg>
)

const defaultErrorMessage =
  'Something went wrong. Please double-check your email and try again.'

const EmailSignupForm = ({
  title = '',
  customReel = false,
  successMessage = '',
}) => {
  const [state, setState] = useState('initial')
  const [error, setError] = useState('')

  const submitCustomReel = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/custom-reel', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: e.target.email.value }),
      })

      if (response?.status === 201) {
        setState('submitted')
      } else {
        setError(defaultErrorMessage)
      }
    } catch (error) {
      console.error(error)
      setError(defaultErrorMessage)
    }
  }

  const submitFreshCuts = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/fresh-cuts', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: e.target.email.value }),
      })

      if (response?.status === 201) {
        setState('submitted')
      } else {
        const body = await response.json()
        setError(body?.error || defaultErrorMessage)
      }
    } catch (error) {
      setError(defaultErrorMessage)
    }
  }

  return (
    <div className="mx-auto text-center">
      {!customReel && state === 'initial' && (
        <form onSubmit={submitFreshCuts}>
          <div>
            <h2 className="font-light uppercase text-gray-100">{title}</h2>
            <div className="mx-auto mt-4 flex w-full max-w-lg justify-center">
              <div className="flex w-full items-center justify-center rounded">
                <label className="sr-only" htmlFor="mce-EMAIL">
                  Email Address <span className="asterisk">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="-mr-1 flex-1 rounded-l-md border-2 border-r-0 border-gray-300 bg-black bg-opacity-70 px-4 py-2 text-white focus:bg-opacity-90"
                  id="email"
                  placeholder="EMAIL ADDRESS"
                  required
                />
                <button
                  className={classNames(
                    'group flex items-center gap-x-2 rounded-md border-2 border-gray-300 px-4 py-2 transition-colors',
                    'hover:bg-gold hover:text-black'
                  )}
                  type="submit"
                  name="subscribe"
                >
                  <span>Submit</span>
                  <SkullSvg />
                </button>
              </div>
            </div>
          </div>
          {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
        </form>
      )}
      {!customReel && state === 'submitted' && (
        <div className="mx-auto flex w-full max-w-xl justify-center border px-8 py-4 lg:mt-20">
          <p className="font-light uppercase text-gray-100">{successMessage}</p>
        </div>
      )}

      {customReel && state === 'initial' && (
        <form onSubmit={submitCustomReel}>
          <div>
            <h2 className="font-light uppercase text-gray-100">{title}</h2>
            <div className="mx-auto mt-4 flex w-full max-w-lg justify-center">
              <div className="flex w-full items-center justify-center rounded">
                <label className="sr-only" htmlFor="email">
                  Email Address <span className="asterisk">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="-mr-1 flex-1 rounded-l-md border-2 border-r-0 border-gray-300 bg-black bg-opacity-70 px-4 py-2 text-white focus:bg-opacity-90"
                  id="email"
                  placeholder="EMAIL ADDRESS"
                  required
                />
                <button
                  className={classNames(
                    'group flex items-center gap-x-2 rounded-md border-2 border-gray-300 px-4 py-2 transition-colors',
                    'hover:bg-gold hover:text-black'
                  )}
                  type="submit"
                  name="subscribe"
                >
                  <span>Submit</span>
                  <SkullSvg />
                </button>
              </div>
            </div>
          </div>
          {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
        </form>
      )}
      {customReel && state === 'submitted' && (
        <div className="mx-auto flex w-full max-w-xl justify-center border px-8 py-4 lg:mt-20">
          <p className="font-light uppercase text-gray-100">{successMessage}</p>
        </div>
      )}
    </div>
  )
}
export default EmailSignupForm
