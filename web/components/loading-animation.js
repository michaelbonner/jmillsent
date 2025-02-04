import dynamic from 'next/dynamic'
import jmeAnimation from '../public/animations/loading-animation.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

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
