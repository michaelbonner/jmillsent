import Lottie from 'lottie-react'
import jmeAnimation from '../public/animations/JME_Logo_White_V2.json'

const LoadingAnimation = ({ setIsAnimationComplete }) => {
  return (
    <div className="relative top-[calc(50vh-140px)] mx-auto h-[220px] w-[220px] lg:top-[calc(50vh-110px)]">
      <Lottie
        animationData={jmeAnimation}
        loop={0}
        onComplete={() => {
          setIsAnimationComplete(true)
        }}
      />
    </div>
  )
}

export default LoadingAnimation
