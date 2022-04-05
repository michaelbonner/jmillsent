import urlForSanitySource from '@/lib/urlForSanitySource'
import BlockContent from '@sanity/block-content-to-react'
import Image from 'next/image'
import React from 'react'
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
      containerPosition: 'left-0 lg:pl-12',
      gradientDirection: 'bg-gradient-to-r',
    },
    right: {
      textAlign: 'text-center lg:text-right',
      barPosition: 'mx-auto lg:mr-0 lg:ml-auto',
      containerPosition: 'right-0 lg:pr-12',
      gradientDirection: 'bg-gradient-to-l',
    },
  }
  return (
    <div className="border p-4 lg:p-6 border-white">
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
          className={`lg:absolute w-full ${styles[leftOrRight].containerPosition} top-0 bottom-0 h-full ${styles[leftOrRight].gradientDirection} from-black to-transparent opacity-80 group-hover:opacity-100 transition-all duration-500`}
        />
        <div
          className={`lg:absolute ${styles[leftOrRight].containerPosition} top-0 bottom-0 ${styles[leftOrRight].textAlign} flex flex-col justify-center items-start gap-y-2`}
        >
          <h3 className="font-bold text-3xl mt-8 font-outline w-full uppercase">
            {title}
          </h3>
          {description && (
            <>
              <div className={`${styles[leftOrRight].barPosition}`}>
                <LittleGoldBar />
              </div>
              <div className="mt-4 max-w-lg prose-lg mx-auto text-white font-light leading-normal">
                <BlockContent blocks={description} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default BackgroundText
