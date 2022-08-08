import React from 'react'

const MediumWhiteBar = ({ yMargin = 'my-8' }) => {
  return (
    <div className={`flex w-full items-center justify-center ${yMargin}`}>
      <div className="h-px w-full max-w-xs bg-white lg:max-w-3xl"></div>
    </div>
  )
}
export default MediumWhiteBar
