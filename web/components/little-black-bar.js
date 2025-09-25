import { clsx } from 'clsx'

const LittleBlackBar = ({ yMargin = 'my-12', maxWidth = 'max-w-[10rem]' }) => {
  return (
    <div className={clsx(`flex w-full items-center justify-center`, yMargin)}>
      <div className={clsx('h-[2px] w-full bg-black', maxWidth)}></div>
    </div>
  )
}
export default LittleBlackBar
