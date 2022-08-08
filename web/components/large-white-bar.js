import React from 'react'

const LargeWhiteBar = ({ yMargin = 'my-12' }) => {
  return (
    <div
      className={`flex w-full items-center justify-center px-12 lg:px-0 ${yMargin}`}
    >
      <div className="h-px w-full bg-white lg:max-w-7xl"></div>
    </div>
  )
}
export default LargeWhiteBar
