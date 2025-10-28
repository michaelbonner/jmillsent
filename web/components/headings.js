import { clsx } from 'clsx'

const H1 = ({ children, className = '' }) => {
  return (
    <h1
      className={clsx(
        className,
        'text-2xl font-extrabold uppercase lg:mb-4 lg:text-7xl'
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
        'mb-2 text-2xl font-extrabold uppercase lg:text-5xl'
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
        'mb-2 text-xl font-extrabold uppercase lg:text-3xl'
      )}
    >
      {children}
    </h3>
  )
}

export { H1, H2, H3 }
