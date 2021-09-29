import React from 'react'

const H1 = ({ children }) => {
  return (
    <h1 className="uppercase font-extrabold text-3xl lg:text-7xl mb-4">
      {children}
    </h1>
  )
}
const H2 = ({ children }) => {
  return (
    <h2 className="uppercase font-extrabold text-2xl lg:text-5xl mb-4">
      {children}
    </h2>
  )
}
const H3 = ({ children }) => {
  return (
    <h3 className="uppercase font-extrabold text-xl lg:text-5xl mb-4">
      {children}
    </h3>
  )
}
export { H1, H2, H3 }
