import { clsx } from 'clsx'

const LittleWhiteBar = ({ yMargin = 'my-12' }) => {
  return (
    <div className={clsx(`flex w-full items-center justify-center`, yMargin)}>
      <div className="h-px w-full max-w-[10rem] bg-white"></div>
    </div>
  )
}
export default LittleWhiteBar
