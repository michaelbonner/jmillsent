import Image from 'next/image'
import React from 'react'

const EmailSignupForm = () => {
  return (
    <div className="mx-auto text-center">
      <form
        action="https://jmillsent.us20.list-manage.com/subscribe/post?u=c9523cc3e6ec26fbfdc141bc5&amp;id=3cb22c24eb"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
        noValidate
      >
        <div>
          <h2 className="uppercase text-gray-100 font-light">
            Be the first to see deep cuts
          </h2>
          <div className="flex justify-center mx-auto w-full max-w-lg mt-4">
            <div className="flex justify-center items-center w-full rounded">
              <label className="sr-only" htmlFor="mce-EMAIL">
                Email Address <span className="asterisk">*</span>
              </label>
              <input
                type="email"
                name="EMAIL"
                className="rounded-l-md flex-1 py-2 px-4 bg-transparent text-white border-2 border-r-0 border-white -mr-1 focus:bg-gray-800"
                id="mce-EMAIL"
                placeholder="EMAIL ADDRESS"
                required
              />
              <div
                style={{ position: 'absolute', left: '-5000px' }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_c9523cc3e6ec26fbfdc141bc5_3cb22c24eb"
                  tabIndex="-1"
                  value=""
                />
              </div>
              <button
                className="flex gap-x-2 px-4 py-2 border-2 border-white rounded-md hover:bg-gray-800 transition-colors"
                type="submit"
                name="subscribe"
                id="mc-embedded-subscribe"
              >
                <span>Submit</span>
                <Image
                  src="/images/jme-skull-white.png"
                  alt="skull"
                  width="24"
                  height="24"
                />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default EmailSignupForm
