import classNames from 'classnames'
import React from 'react'

const LittleWhiteBar = ({ yMargin = 'my-12' }) => {
  return (
    <div
      className={classNames(`flex w-full items-center justify-center`, yMargin)}
    >
      <div className="h-px w-full max-w-[10rem] bg-white"></div>
    </div>
  )
}
export default LittleWhiteBar
