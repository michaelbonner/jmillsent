import urlForSanitySource from '@/lib/urlForSanitySource'
import { Link as SmoothScrollLink } from 'react-scroll'

const ServicesThumbnails = ({ services }) => {
  // grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12
  return (
    <div className="lg:block z-20 top-0 mt-6">
      <div
        className={`hidden max-w-6xl bg-black bg-opacity-80 p-1 mx-auto lg:grid grid-cols-${
          services?.length || 1
        }`}
      >
        {services.length > 0 &&
          services.map((service, index) => {
            // center
            let clipPath =
              'polygon(100% 50%, 91% 75%, 91% 100%, 0% 100%, 0% 75%, 8% 50%, 0% 24%, 0% 0%, 91% 0%, 91% 25%)'

            // left edge
            if (index === 0) {
              clipPath =
                'polygon(100% 50%, 91% 75%, 91% 100%, 0% 100%, 0% 0%, 91% 0%, 91% 25%)'
            }

            // right edge
            if (index + 1 === services.length) {
              clipPath =
                'polygon(100% 0%, 100% 100%, 0% 100%, 0% 75%, 8% 50%, 0% 24%, 0% 0%)'
            }
            return (
              <SmoothScrollLink
                to={`service-${service.shortName}`}
                smooth={true}
                offset={-20}
                duration={500}
                className={`relative bg-gold p-px cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-500 -mx-1`}
                key={service._id}
                style={{
                  clipPath,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={service.name}
                  height={150}
                  src={`${urlForSanitySource(
                    service.image
                  )}?w=239&h=150&auto=format&fit=crop&crop=focalpoint`}
                  width={239}
                  style={{
                    clipPath,
                  }}
                />
                <div className="absolute inset-0 flex items-end justify-center pb-1.5">
                  <div className="text-white text-center text-sm font-bold uppercase tracking-wider text-shadow-md">
                    {service.name}
                  </div>
                </div>
              </SmoothScrollLink>
            )
          })}
      </div>
    </div>
  )
}
export default ServicesThumbnails
