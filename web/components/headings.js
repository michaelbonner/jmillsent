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
        <h1 className="uppercase font-extrabold text-2xl lg:text-5xl mb-4">
            {children}
        </h1>
    )
}
export { H1, H2 }
