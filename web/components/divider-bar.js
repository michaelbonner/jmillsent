import React from 'react'
import Image from 'next/image'

const DividerBar = ({ yMargin = 'my-24 lg:my-36' }) => {
  return (
    <div
      className={`flex w-full max-w-5xl mx-auto px-4 lg:px-0 gap-4 lg:gap-8 items-center justify-center ${yMargin}`}
    >
      <div className="w-full lg:max-w-7xl h-[2px] bg-gold"></div>
      <svg
        className="w-[40px]"
        enableBackground="new 0 0 220 210"
        viewBox="0 0 220 210"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="text-gold fill-current"
          d="m153.2 205.4-43.5-67.2-43.5 67.2h-61.2l69.9-102.6-65.4-97.5h60.9l39.3 62.7 38.7-62.7h61.2l-65.1 97.2 69.6 102.9z"
        />
      </svg>
      <div className="w-full lg:max-w-7xl h-[2px] bg-gold"></div>
    </div>
  )
}
export default DividerBar
