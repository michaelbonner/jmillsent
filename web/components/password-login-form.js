export const PasswordLoginForm = ({
  handleSubmit,
  formError,
  passwordInputPrompt,
}) => {
  return (
    <div className="mx-auto min-h-[60vh] max-w-7xl px-5 py-20 lg:py-28">
      <div className="max-w-xl border-t border-white/30 pt-6">
        <label
          className="text-sm font-medium tracking-[0.12em] text-neutral-400 uppercase"
          htmlFor="password"
        >
          {passwordInputPrompt}
        </label>
        <form className="mt-3 flex items-end gap-4" onSubmit={handleSubmit}>
          <input
            className="flex-1 border-0 border-b border-white/30 bg-transparent px-0 py-3 text-white placeholder:text-neutral-500 placeholder:uppercase focus:border-white focus:ring-0"
            id="password"
            name="password"
            type="text"
            placeholder="Password"
          />
          <button
            className="inline-flex min-h-12 items-center gap-3 border-b border-white py-2 text-sm font-medium tracking-[0.08em] uppercase transition-colors hover:border-white/50 hover:text-white/75"
            type="submit"
          >
            Enter
            <span aria-hidden="true">↗</span>
          </button>
        </form>
        {formError && <p className="mt-6 text-sm text-red-400">{formError}</p>}
      </div>
    </div>
  )
}
