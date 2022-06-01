import React from 'react'

const LargeGoldBar = ({ yMargin = 'my-12' }) => {
  return (
    <div
      className={`w-full px-12 lg:px-0 flex items-center justify-center ${yMargin}`}
    >
      <div className="w-full h-px bg-gold"></div>
    </div>
  )
}
export default LargeGoldBar
