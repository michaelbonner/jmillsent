import { clsx } from 'clsx'

export const PasswordLoginForm = ({
  handleSubmit,
  formError,
  passwordInputPrompt,
}) => {
  return (
    <div className="mx-auto min-h-screen max-w-3xl text-center">
      <div className="border py-12">
        <p className="mb-6 text-lg font-semibold">{passwordInputPrompt}</p>
        <form
          className="mx-auto flex w-1/2 items-center justify-center rounded-sm"
          onSubmit={handleSubmit}
        >
          <label className="sr-only" htmlFor="password">
            Password
          </label>
          <input
            className="-mr-1 flex-1 rounded-l-md border-2 border-r-0 border-gray-300 bg-black/70 px-4 py-2 text-white focus:bg-black/90"
            name="password"
            type="text"
            placeholder="PASSWORD"
          />
          <button
            className={clsx(
              'group flex items-center gap-x-2 rounded-md border-2 border-gray-300 px-4 py-2 transition-colors',
              'hover:bg-gold hover:text-black'
            )}
            type="submit"
          >
            Submit
          </button>
        </form>
        {formError && (
          <p className="mt-6 text-sm font-semibold text-red-500">{formError}</p>
        )}
      </div>
    </div>
  )
}
