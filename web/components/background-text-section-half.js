import urlForSanitySource from '@/lib/urlForSanitySource'
import { PortableText } from '@portabletext/react'
import classNames from 'classnames'
import useIsDesktop from 'hooks/useIsDesktop'
import { useIsInViewport } from 'hooks/useIsInViewport'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Link as SmoothScrollLink } from 'react-scroll'
import { H3 } from './headings'
import LittleGoldBar from './little-gold-bar'

const BackgroundTextSectionHalf = ({
  image,
  imageAlt,
  title,
  shortName,
  description,
  step,
  serviceShortNames,
  serviceCurrentlyVisible,
  setServiceCurrentlyVisible,
}) => {
  const isDesktop = useIsDesktop()
  const ref = useRef(null)
  const isInViewport = useIsInViewport(ref)

  useEffect(() => {
    if (isInViewport) {
      setServiceCurrentlyVisible(`service-${shortName}`)
    }
  }, [isInViewport, setServiceCurrentlyVisible, shortName])

  return (
    <div
      className="border relative p-4 lg:p-6 border-gray-300"
      id={`service-${shortName}`}
      ref={ref}
    >
      <div className="w-full group" style={{ lineHeight: 0 }}>
        <div className="relative">
          <div className="absolute inset-0 z-10 bg-gradient-to-l from-black via-transparent to-transparent bg-opacity-40" />
          <div
            className={classNames(
              `absolute top-0 right-4 bottom-0 left-auto flex flex-col justify-center gap-y-2 z-10 text-right text-xs`,
              `lg:top-12 lg:justify-start lg:text-sm`
            )}
          >
            <div className="hidden lg:block">
              <h3 className="text-3xl font-bold">{title}</h3>
              <div className="flex justify-end py-1">
                <LittleGoldBar />
              </div>
            </div>
            {serviceShortNames?.map((serviceShortName, index) => {
              const isChecked = index + 1 < step
              const isCurrent = index + 1 === step
              return (
                <SmoothScrollLink
                  to={`service-${serviceShortName}`}
                  smooth={true}
                  offset={-20}
                  duration={500}
                  className={`flex items-center gap-x-2 lg:gap-x-4 justify-end cursor-pointer ${
                    isCurrent ? 'text-white font-bold' : 'text-gray-200'
                  }`}
                  key={index}
                >
                  <p
                    className={`uppercase tracking-wider ${
                      !isCurrent && 'opacity-60'
                    }`}
                  >
                    {serviceShortName}
                  </p>
                  {isChecked ? (
                    <svg
                      className="w-4 h-4 lg:w-6 lg:h-6"
                      enableBackground="new 0 0 120 120"
                      viewBox="0 0 120 120"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* box */}
                      <path
                        className="text-gold fill-current"
                        d="m5 5h110v110h-110z"
                      />
                      {/* outline */}
                      <path
                        className={`fill-current ${!isCurrent && 'opacity-60'}`}
                        d="m110 10v100h-100v-100zm10-10h-10-100-10v10 100 10h10 100 10v-10-100z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 lg:w-6 lg:h-6"
                      enableBackground="new 0 0 120 120"
                      viewBox="0 0 120 120"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* outline */}
                      <path
                        className="fill-current"
                        d="m110 10v100h-100v-100zm10-10h-10-100-10v10 100 10h10 100 10v-10-100z"
                      />
                    </svg>
                  )}
                </SmoothScrollLink>
              )
            })}
          </div>
          <div className="absolute z-10 left-0 -top-4 lg:-top-6 pl-4 text-center">
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/images/simple-badge-gold.svg"
                alt="Service Step"
                width={Math.floor(150 * (isDesktop ? 0.6 : 0.45))}
                height={Math.floor(135 * (isDesktop ? 0.6 : 0.45))}
              />
              <p className="absolute top-0 pt-2.5 lg:pt-4 text-black text-3xl lg:text-4xl font-extrabold">
                {step}
              </p>
            </div>
          </div>
          <Image
            alt={imageAlt}
            height={isDesktop ? 500 : 800}
            src={`${urlForSanitySource(image)}?w=1200&h=${
              isDesktop ? 500 : 800
            }&auto=format&fit=crop&crop=focalpoint`}
            width={1200}
          />
        </div>
        <div className="flex flex-col justify-center mx-auto gap-y-2">
          <H3 className="inline lg:hidden !mt-3 w-full uppercase text-center !mb-0 py-1">
            {title}
          </H3>
          {description && (
            <>
              <div className="mx-auto lg:hidden">
                <LittleGoldBar />
              </div>
              <div className="lg:pt-3 max-w-5xl prose-lg mx-auto text-white font-light leading-normal mt-1.5">
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
