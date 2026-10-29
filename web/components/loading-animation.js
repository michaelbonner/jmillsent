import dynamic from 'next/dynamic'
import jmeAnimation from '../public/animations/loading-animation.json'

// lottie-react v3 dropped the default export; the component is named `Lottie`.
const Lottie = dynamic(() => import('lottie-react').then((mod) => mod.Lottie), {
  ssr: false,
})

const LoadingAnimation = ({ loop = false, setIsAnimationComplete }) => {
  return (
    <div className="relative top-[calc(50vh-140px)] mx-auto h-[220px] w-[220px] lg:top-[calc(50vh-110px)]">
      <Lottie
        src={jmeAnimation}
        loop={loop}
        autoplay
        subscriptions={{
          complete: () => {
            setIsAnimationComplete(true)
          },
        }}
      />
    </div>
  )
}

export default LoadingAnimation
