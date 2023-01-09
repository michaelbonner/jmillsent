import urlForSanitySource from '@/lib/urlForSanitySource'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { H3 } from './headings'
import LittleGoldBar from './little-gold-bar'
import Date from './date'

const BackgroundText = ({
  image,
  imageAlt,
  title,
  description,
  leftOrRight = 'left',
  date,
  customButtonText1,
  customButtonText2,
  customButtonText3,
  slug,
}) => {
  const styles = {
    left: {
      textAlign: 'text-center lg:text-left',
      barPosition: 'mx-auto lg:ml-0 lg:mr-auto',
      containerPosition: 'left-0 lg:pl-20',
      gradientDirection: 'bg-gradient-to-r',
      buttonPosition: 'lg:self-start',
    },
    right: {
      textAlign: 'text-center lg:text-right',
      barPosition: 'mx-auto lg:mr-0 lg:ml-auto',
      containerPosition: 'right-0 lg:pr-20',
      gradientDirection: 'bg-gradient-to-l',
      buttonPosition: 'lg:self-end',
    },
  }
  const titleStyle = leftOrRight === 'left' ? 'lg:text-left' : 'lg:text-right'
  return (
    <div className="border border-gray-300 p-4 lg:p-6">
      <div className="group relative w-full" style={{ lineHeight: 0 }}>
        <Image
          alt={imageAlt}
          height={600}
          src={`${urlForSanitySource(
            image
          )}?w=1246&h=600&auto=format&fit=crop&crop=focalpoint`}
          width={1246}
        />
        <div
          className={`w-full lg:absolute ${styles[leftOrRight].containerPosition} top-0 bottom-0 h-full ${styles[leftOrRight].gradientDirection} from-black to-transparent opacity-70 transition-all duration-500 group-hover:opacity-80`}
        />
        <div
          className={`lg:absolute ${styles[leftOrRight].containerPosition} top-0 bottom-0 ${styles[leftOrRight].textAlign} flex flex-col items-start justify-center sm:gap-y-2`}
        >
          <H3
            className={`${titleStyle} !mt-3 !mb-0 inline w-full py-1 text-center uppercase`}
          >
            {title}
          </H3>
          {description && (
            <>
              <div className={`${styles[leftOrRight].barPosition}`}>
                <LittleGoldBar />
                {date && (
                  <div className="pt-2 text-2xl">
                    <Date dateString={date} />
                  </div>
                )}
              </div>
              <div className="prose-lg mx-auto mt-1.5 max-w-xl font-light leading-normal text-white lg:mx-0">
                <PortableText value={description} />
              </div>
              {customButtonText1 && customButtonText2 && customButtonText3 && (
                <div
                  className={`self-center ${styles[leftOrRight].buttonPosition}`}
                >
                  <Link
                    href={slug}
                    className="inline-flex items-center justify-center gap-3 border-2 border-gray-300 px-3 py-1 text-2xl uppercase text-gray-300 transition-colors hover:bg-gold hover:text-black"
                  >
                    <span className="font-outline tracking-tighter">
                      {customButtonText1}
                    </span>

                    <span className="font-bold tracking-wide">
                      {customButtonText2}
                    </span>

                    <span className="font-outline tracking-tighter">
                      {customButtonText3}
                    </span>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default BackgroundText
