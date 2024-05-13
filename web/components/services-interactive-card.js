import BackgroundTextSectionHalf from '@/components/background-text-section-half'
import urlForSanitySource from '@/lib/urlForSanitySource'
import { PortableText } from '@portabletext/react'
import classNames from 'classnames'
import useIsDesktop from 'hooks/useIsDesktop'
import Image from 'next/image'
import { useState } from 'react'
import { H3 } from './headings'
import LittleGoldBar from './little-gold-bar'
import ServicesThumbnails from './services-thumbnails'

const ServicesInteractiveCard = ({ services, serviceShortNames }) => {
  const [activeService, setActiveService] = useState(0)
  const isDesktop = useIsDesktop()

  const service = services.at(activeService)

  const { image, name: title, shortName, description } = service

  const step = activeService + 1

  const stepNumber = '0' + step
  return (
    <div>
      {services.length > 0 && (
        <div className="mx-auto mt-4 grid max-w-7xl gap-6 lg:mt-10">
          {isDesktop && (
            <div
              className={classNames(
                'relative border border-gray-300 rounded-xl px-4 pt-4 pb-2',
                'lg:px-6 lg:pt-6 lg:pb-3'
              )}
              id={`service-${shortName}`}
            >
              <div className="group w-full" style={{ lineHeight: 0 }}>
                <div className="relative">
                  <div className="absolute inset-0 z-10 bg-opacity-40 bg-gradient-to-l from-black via-transparent to-transparent" />
                  <div
                    className={classNames(
                      `absolute top-0 right-0 left-auto z-10 flex flex-col justify-between gap-y-2 pr-7 pt-6 text-right text-xs`,
                      `lg:text-sm`
                    )}
                  >
                    <div>
                      <div className="hidden lg:block">
                        <h3 className="text-3xl font-bold">{title}</h3>
                        <div className="flex justify-end py-1">
                          <LittleGoldBar />
                        </div>
                      </div>
                      <div className={classNames('grid gap-2 pt-4', 'lg:pt-2')}>
                        {serviceShortNames?.map((serviceShortName, index) => {
                          const isChecked = index + 1 < step
                          const isCurrent = index + 1 === step
                          return (
                            <button
                              className={classNames(
                                'flex cursor-pointer items-center justify-end gap-x-2',
                                'lg:gap-x-4',
                                'hover:scale-110',
                                isCurrent
                                  ? 'font-bold text-white'
                                  : 'text-gray-200'
                              )}
                              onClick={() => setActiveService(index)}
                              key={index}
                              aria-label={`View ${title.toLowerCase()} services`}
                            >
                              <p
                                className={classNames(
                                  'uppercase tracking-wider',
                                  !isCurrent && 'opacity-60',
                                  isCurrent && 'scale-110 tracking-widest'
                                )}
                              >
                                {serviceShortName}
                              </p>
                              <svg
                                className="h-4 w-4 lg:h-6 lg:w-6"
                                enableBackground="new 0 0 120 120"
                                viewBox="0 0 120 120"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {isChecked && (
                                  <path
                                    className="fill-current text-gold"
                                    d="m5 5h110v110h-110z"
                                  />
                                )}
                                {isCurrent && (
                                  <path
                                    className="fill-current text-gold"
                                    d="m5 5h110v110h-110z"
                                  />
                                )}
                                {/* outline */}
                                <path
                                  className="fill-current"
                                  d="m110 10v100h-100v-100zm10-10h-10-100-10v10 100 10h10 100 10v-10-100z"
                                />
                              </svg>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <div
                    className={classNames(
                      'absolute left-0 top-0 z-10 flex justify-center text-center'
                    )}
                  >
                    <div className="pt-6 pl-7">
                      <p
                        className={classNames(
                          'font-outline text-2xl',
                          'sm:text-3xl',
                          'md:text-4xl',
                          'lg:text-5xl'
                        )}
                      >
                        {stepNumber}
                      </p>
                    </div>
                  </div>
                  <div
                    className={classNames(
                      'absolute bottom-0 z-10 flex w-full justify-between px-7 pb-7 text-3xl'
                    )}
                  >
                    <button
                      aria-label="previous service step"
                      onClick={() => {
                        if (step > 1) {
                          setActiveService(activeService - 1)
                        } else {
                          setActiveService(services.length - 1)
                        }
                      }}
                    >
                      <Image
                        className="opacity-50 hover:opacity-100"
                        alt="previous service step"
                        src="/images/left_arrow.svg"
                        width={isDesktop ? 37.8 : 18.9}
                        height={isDesktop ? 85.4 : 42.7}
                      />
                    </button>
                    <button
                      aria-label="next service step"
                      onClick={() => {
                        if (step < services.length) {
                          setActiveService(activeService + 1)
                        } else {
                          setActiveService(0)
                        }
                      }}
                    >
                      <Image
                        className="opacity-50 hover:opacity-100"
                        alt="previous service step"
                        src="/images/right_arrow.svg"
                        width={isDesktop ? 37.8 : 18.9}
                        height={isDesktop ? 85.4 : 42.7}
                      />
                    </button>
                  </div>
                  <div className="w-full">
                    <Image
                      alt={title}
                      src={`${urlForSanitySource(image)}?w=1200&h=${
                        isDesktop ? 500 : 800
                      }&auto=format&fit=crop&crop=focalpoint`}
                      height={isDesktop ? 500 : 800}
                      width={1200}
                    />
                  </div>
                </div>
                <div className="w-full border-b border-gold" />
                <ServicesThumbnails
                  services={services || []}
                  activeService={activeService}
                  setActiveService={setActiveService}
                />
                <div className="mx-auto flex flex-col justify-center gap-y-2">
                  <H3 className="!mt-3 !mb-0 inline w-full py-1 text-center uppercase lg:hidden">
                    {title}
                  </H3>
                  {description && (
                    <>
                      <div className="mx-auto lg:hidden">
                        <LittleGoldBar />
                      </div>
                      <div className="prose-lg mx-auto max-w-5xl font-light leading-normal text-white">
                        <PortableText value={description} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {!isDesktop && (
            <>
              {services.map((service, index) => {
                return (
                  <BackgroundTextSectionHalf
                    image={service.image}
                    imageAlt={service.name}
                    title={service.name}
                    shortName={service.shortName}
                    description={service.description}
                    step={index + 1}
                    key={service._id}
                    services={services || []}
                    serviceShortNames={serviceShortNames}
                  />
                )
              })}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ServicesInteractiveCard
