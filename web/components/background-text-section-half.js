import urlForSanitySource from '@/lib/urlForSanitySource'
import { PortableText } from '@portabletext/react'
import classNames from 'classnames'
import useIsDesktop from 'hooks/useIsDesktop'
import Image from 'next/image'
import { H3 } from './headings'
import LittleGoldBar from './little-gold-bar'
import ServicesThumbnails from './services-thumbnails'

const BackgroundTextSectionHalf = ({
  services,
  serviceShortNames,
  activeService,
  setActiveService,
}) => {
  const isDesktop = useIsDesktop()

  const service = services.at(activeService)

  const { image, name: title, shortName, description } = service

  const step = activeService + 1

  return (
    <div
      className={classNames(
        'relative border border-gray-300 px-4 pt-4 pb-2',
        'lg:px-6 lg:pt-6 lg:pb-3'
      )}
      id={`service-${shortName}`}
    >
      <div className="group w-full" style={{ lineHeight: 0 }}>
        <div className="relative">
          <div className="absolute inset-0 z-10 bg-opacity-40 bg-gradient-to-l from-black via-transparent to-transparent" />
          <div
            className={classNames(
              `absolute top-0 right-4 bottom-0 left-auto z-10 flex flex-col justify-between gap-y-2 text-right text-xs`,
              `lg:top-6 lg:text-sm`
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
                        'flex cursor-pointer items-center justify-end gap-x-2 lg:gap-x-4',
                        isCurrent ? 'font-bold text-white' : 'text-gray-200'
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
            <p
              className={classNames(
                'pb-2 font-outline text-2xl',
                'sm:text-3xl',
                'md:text-4xl',
                'lg:text-5xl'
              )}
            >
              0{step}
            </p>
          </div>
          <div className="absolute left-0 -top-4 z-10 pl-4 text-center lg:-top-6">
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/images/simple-badge-gold.svg"
                alt="Service Step"
                width={Math.floor(150 * (isDesktop ? 0.6 : 0.45))}
                height={Math.floor(135 * (isDesktop ? 0.6 : 0.45))}
              />
              <p className="absolute top-0 pt-2.5 text-3xl font-extrabold text-black lg:pt-4 lg:text-4xl">
                {step}
              </p>
            </div>
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
  )
}
export default BackgroundTextSectionHalf
