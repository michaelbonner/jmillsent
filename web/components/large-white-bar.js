import React from 'react'

const LargeWhiteBar = ({ yMargin = 'my-12' }) => {
  return (
    <div
      className={`w-full px-12 lg:px-0 flex items-center justify-center ${yMargin}`}
    >
      <div className="w-full lg:max-w-7xl h-px bg-white"></div>
    </div>
  )
}
export default LargeWhiteBar
