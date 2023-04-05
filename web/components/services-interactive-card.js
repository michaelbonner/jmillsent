import ServicesThumbnails from '@/components/services-thumbnails'
import BackgroundTextSectionHalf from '@/components/background-text-section-half'
import { H2 } from '@/components/headings'
import { useState } from 'react'

const ServicesInteractiveCard = ({
  title,
  subtitle,
  services,
  serviceShortNames,
}) => {
  const [activeService, setActiveService] = useState(0)

  return (
    <div className="">
      <div className="container mx-auto px-8 text-center">
        <H2>{title}</H2>
        <p className="-mt-1.5 font-outline text-xl uppercase lg:text-5xl">
          {subtitle}
        </p>
      </div>

      {services.length > 0 && (
        <div className="mx-auto mt-4 grid max-w-7xl gap-6 lg:mt-10">
          <BackgroundTextSectionHalf
            step={+activeService + 1}
            serviceShortNames={serviceShortNames}
            services={services || []}
            activeService={activeService}
            setActiveService={setActiveService}
          />
        </div>
      )}
    </div>
  )
}

export default ServicesInteractiveCard
