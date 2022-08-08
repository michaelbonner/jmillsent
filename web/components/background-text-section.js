import urlForSanitySource from '@/lib/urlForSanitySource'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import React from 'react'
import { H3 } from './headings'
import LittleGoldBar from './little-gold-bar'

const BackgroundText = ({
  image,
  imageAlt,
  title,
  description,
  leftOrRight = 'left',
}) => {
  const styles = {
    left: {
      textAlign: 'text-center lg:text-left',
      barPosition: 'mx-auto lg:ml-0 lg:mr-auto',
      containerPosition: 'left-0 lg:pl-20',
      gradientDirection: 'bg-gradient-to-r',
    },
    right: {
      textAlign: 'text-center lg:text-right',
      barPosition: 'mx-auto lg:mr-0 lg:ml-auto',
      containerPosition: 'right-0 lg:pr-20',
      gradientDirection: 'bg-gradient-to-l',
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
              </div>
              <div className="prose-lg mx-auto mt-1.5 max-w-lg font-light leading-normal text-white">
                <PortableText value={description} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default BackgroundText
