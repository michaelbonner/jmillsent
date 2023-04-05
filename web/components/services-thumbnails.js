import urlForSanitySource from '@/lib/urlForSanitySource'
import classNames from 'classnames'

const ServicesThumbnails = ({ services, activeService, setActiveService }) => {
  // grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-9 grid-cols-10 grid-cols-11 grid-cols-12
  return (
    <div className="top-0 z-20 mt-2 lg:block">
      <div
        className={`mx-auto mb-3 hidden max-w-7xl bg-black bg-opacity-80 p-1 pb-0 lg:grid grid-cols-${
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
              <button
                className={classNames(
                  `relative -mx-1 cursor-pointer bg-gold p-px transition-opacity duration-500`,
                  'hover:opacity-100',
                  activeService === index ? 'opacity-100' : 'opacity-60'
                )}
                key={service._id}
                onClick={() => setActiveService(index)}
                aria-label={`View ${service.name.toLowerCase()} services`}
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
                  )}?w=300&h=150&auto=format&fit=crop&crop=focalpoint`}
                  width={300}
                  style={{
                    clipPath,
                  }}
                />
                <div className="absolute inset-0 flex items-end justify-center pb-1.5">
                  <div className="text-shadow-md text-center text-sm font-bold uppercase tracking-wider text-white">
                    {service.name}
                  </div>
                </div>
              </button>
            )
          })}
      </div>
    </div>
  )
}
export default ServicesThumbnails
