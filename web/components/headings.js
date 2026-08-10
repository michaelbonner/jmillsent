import { twMerge } from 'tailwind-merge'

const H1 = ({ children, className = '' }) => {
  return (
    <h1
      className={twMerge(
        'text-5xl font-semibold tracking-[-0.055em] text-balance uppercase sm:text-7xl lg:text-8xl xl:text-9xl',
        className
      )}
    >
      {children}
    </h1>
  )
}
const H2 = ({ children, className = '' }) => {
  return (
    <h2
      className={twMerge(
        'text-4xl font-medium tracking-[-0.045em] text-balance uppercase sm:text-5xl lg:text-7xl',
        className
      )}
    >
      {children}
    </h2>
  )
}
const H3 = ({ children, className = '' }) => {
  return (
    <h3
      className={twMerge(
        'text-2xl font-medium tracking-[-0.035em] text-balance uppercase lg:text-4xl',
        className
      )}
    >
      {children}
    </h3>
  )
}

export { H1, H2, H3 }
