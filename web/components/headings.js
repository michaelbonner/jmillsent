import classNames from 'classnames'
import React from 'react'

const H1 = ({ children, className = '' }) => {
  return (
    <h1
      className={classNames(
        className,
        'uppercase font-extrabold text-3xl lg:text-7xl mb-2 lg:mb-4'
      )}
    >
      {children}
    </h1>
  )
}
const H2 = ({ children, className = '' }) => {
  return (
    <h2
      className={classNames(
        className,
        'uppercase font-extrabold text-2xl lg:text-5xl mb-2'
      )}
    >
      {children}
    </h2>
  )
}
const H3 = ({ children, className = '' }) => {
  return (
    <h3
      className={classNames(
        className,
        'uppercase font-extrabold text-xl lg:text-3xl mb-2'
      )}
    >
      {children}
    </h3>
  )
}
const H4 = ({ children, className = '' }) => {
  return (
    <h4
      className={classNames(
        className,
        'uppercase font-extrabold text-lg lg:text-2xl mb-2'
      )}
    >
      {children}
    </h4>
  )
}
export { H1, H2, H3, H4 }
