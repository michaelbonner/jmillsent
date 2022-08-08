import React from 'react'

const LargeGoldBar = ({ yMargin = 'my-12' }) => {
  return (
    <div
      className={`flex w-full items-center justify-center px-12 lg:px-0 ${yMargin}`}
    >
      <div className="h-px w-full bg-gold"></div>
    </div>
  )
}
export default LargeGoldBar
