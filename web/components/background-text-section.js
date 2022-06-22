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
    <div className="border p-4 lg:p-6 border-gray-300">
      <div className="w-full relative group" style={{ lineHeight: 0 }}>
        <Image
          alt={imageAlt}
          height={600}
          src={`${urlForSanitySource(
            image
          )}?w=1246&h=600&auto=format&fit=crop&crop=focalpoint`}
          width={1246}
        />
        <div
          className={`lg:absolute w-full ${styles[leftOrRight].containerPosition} top-0 bottom-0 h-full ${styles[leftOrRight].gradientDirection} from-black to-transparent opacity-70 group-hover:opacity-80 transition-all duration-500`}
        />
        <div
          className={`lg:absolute ${styles[leftOrRight].containerPosition} top-0 bottom-0 ${styles[leftOrRight].textAlign} flex flex-col justify-center items-start sm:gap-y-2`}
        >
          <H3
            className={`${titleStyle} inline !mt-3 w-full uppercase text-center !mb-0 py-1`}
          >
            {title}
          </H3>
          {description && (
            <>
              <div className={`${styles[leftOrRight].barPosition}`}>
                <LittleGoldBar />
              </div>
              <div className="max-w-lg prose-lg mx-auto text-white font-light leading-normal mt-1.5">
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
