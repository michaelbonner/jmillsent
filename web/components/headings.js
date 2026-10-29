import { clsx } from 'clsx'

const Eyebrow = ({ children, className = '' }) => {
  return (
    <p
      className={clsx(
        'text-sm font-medium tracking-[0.12em] text-neutral-400 uppercase',
        className
      )}
    >
      {children}
    </p>
  )
}

const H1 = ({ children, className = '' }) => {
  return (
    <h1
      className={clsx(
        className,
        'text-5xl font-semibold tracking-[-0.06em] text-balance uppercase sm:text-6xl lg:text-7xl xl:text-8xl'
      )}
    >
      {children}
    </h1>
  )
}
const H2 = ({ children, className = '' }) => {
  return (
    <h2
      className={clsx(
        className,
        'mb-2 text-4xl font-semibold tracking-[-0.05em] text-balance uppercase lg:text-5xl'
      )}
    >
      {children}
    </h2>
  )
}
const H3 = ({ children, className = '' }) => {
  return (
    <h3
      className={clsx(
        className,
        'mb-2 text-xl font-semibold tracking-tight text-balance uppercase lg:text-2xl'
      )}
    >
      {children}
    </h3>
  )
}

export { Eyebrow, H1, H2, H3 }
