import classNames from 'classnames'
import React from 'react'

const LittleBlackBar = ({ yMargin = 'my-12', maxWidth = 'max-w-[10rem]' }) => {
  return (
    <div
      className={classNames(`flex w-full items-center justify-center`, yMargin)}
    >
      <div className={classNames('h-[2px] w-full bg-black', maxWidth)}></div>
    </div>
  )
}
export default LittleBlackBar
