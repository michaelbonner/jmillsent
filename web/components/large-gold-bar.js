const LargeGoldBar = ({ yMargin = 'my-12' }) => {
  return (
    <div
      className={`flex w-full items-center justify-center px-12 lg:px-0 ${yMargin}`}
    >
      <div className="bg-gold h-px w-full"></div>
    </div>
  )
}
export default LargeGoldBar
