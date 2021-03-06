import React from 'react'

const MediumWhiteBar = ({ yMargin = 'my-8' }) => {
  return (
    <div className={`w-full flex items-center justify-center ${yMargin}`}>
      <div className="w-full max-w-xs lg:max-w-3xl h-px bg-white"></div>
    </div>
  )
}
export default MediumWhiteBar
