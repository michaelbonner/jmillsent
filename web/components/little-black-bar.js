import classNames from 'classnames'
import React from 'react'

const LittleBlackBar = ({ yMargin = 'my-12' }) => {
  return (
    <div
      className={classNames(`flex w-full items-center justify-center`, yMargin)}
    >
      <div className="h-[2px] w-full max-w-[10rem] bg-black"></div>
    </div>
  )
}
export default LittleBlackBar
