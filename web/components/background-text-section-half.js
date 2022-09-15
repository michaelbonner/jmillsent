import urlForSanitySource from '@/lib/urlForSanitySource'
import { PortableText } from '@portabletext/react'
import classNames from 'classnames'
import useIsDesktop from 'hooks/useIsDesktop'
import Image from 'next/future/image'
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
}) => {
  const isDesktop = useIsDesktop()

  return (
    <div
      className="relative border border-gray-300 p-4 lg:p-6"
      id={`service-${shortName}`}
    >
      <div className="group w-full" style={{ lineHeight: 0 }}>
        <div className="relative">
          <div className="absolute inset-0 z-10 bg-opacity-40 bg-gradient-to-l from-black via-transparent to-transparent" />
          <div
            className={classNames(
              `absolute top-0 right-4 bottom-0 left-auto z-10 flex flex-col justify-center gap-y-2 text-right text-xs`,
              `lg:top-6 lg:justify-start lg:text-sm`
            )}
          >
            <div className="hidden lg:block">
              <h3 className="text-3xl font-bold">{title}</h3>
              <div className="flex justify-end py-1">
                <LittleGoldBar />
              </div>
            </div>
            {serviceShortNames?.map((serviceShortName, index) => {
              const isChecked = index + 1 <= step
              const isCurrent = index + 1 === step
              return (
                <SmoothScrollLink
                  to={`service-${serviceShortName}`}
                  smooth={true}
                  offset={-20}
                  duration={500}
                  className={classNames(
                    'flex cursor-pointer items-center justify-end gap-x-2 lg:gap-x-4',
                    isCurrent ? 'font-bold text-white' : 'text-gray-200'
                  )}
                  key={index}
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
                    {/* outline */}
                    <path
                      className="fill-current"
                      d="m110 10v100h-100v-100zm10-10h-10-100-10v10 100 10h10 100 10v-10-100z"
                    />
                  </svg>
                </SmoothScrollLink>
              )
            })}
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
          <Image
            alt={imageAlt}
            height={isDesktop ? 700 : 800}
            src={`${urlForSanitySource(image)}?w=1200&h=${
              isDesktop ? 700 : 800
            }&auto=format&fit=crop&crop=focalpoint`}
            width={1200}
          />
        </div>
        <div className="mx-auto flex flex-col justify-center gap-y-2">
          <H3 className="!mt-3 !mb-0 inline w-full py-1 text-center uppercase lg:hidden">
            {title}
          </H3>
          {description && (
            <>
              <div className="mx-auto lg:hidden">
                <LittleGoldBar />
              </div>
              <div className="prose-lg mx-auto mt-1.5 max-w-5xl font-light leading-normal text-white lg:pt-3">
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
