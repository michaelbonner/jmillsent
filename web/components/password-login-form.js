import classNames from 'classnames'

export const PasswordLoginForm = ({ handleSubmit, passwordInputPrompt }) => {
  return (
    <div className="mx-auto min-h-screen max-w-3xl text-center">
      <div className="border py-12">
        <p className="mb-6 text-lg font-semibold">{passwordInputPrompt}</p>
        <form
          className="mx-auto flex w-1/2 items-center justify-center rounded"
          onSubmit={handleSubmit}
        >
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <input
            className="-mr-1 flex-1 rounded-l-md border-2 border-r-0 border-gray-300 bg-black bg-opacity-70 py-2 px-4 text-white focus:bg-opacity-90"
            name="password"
            type="text"
            placeholder="PASSWORD"
          />
          <button
            className={classNames(
              'group flex items-center gap-x-2 rounded-md border-2 border-gray-300 px-4 py-2 transition-colors',
              'hover:bg-gold hover:text-black'
            )}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
