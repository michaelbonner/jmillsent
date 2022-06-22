import urlForSanitySource from '@/lib/urlForSanitySource'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import React from 'react'
import { H3 } from './headings'
import LittleGoldBar from './little-gold-bar'

const BackgroundTextSectionHalf = ({
  image,
  imageAlt,
  title,
  description,
  step,
}) => {
  return (
    <div className="border relative p-4 lg:p-6 border-gray-300">
      <div className="absolute z-10 left-0 top-0 pl-10 text-center">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/images/simple-badge-gold.svg"
            alt="Service Step"
            width={Math.floor(135 * 0.45)}
            height={Math.floor(150 * 0.45)}
          />
          <p className="absolute text-black text-3xl font-extrabold">{step}</p>
        </div>
      </div>
      <div className="w-full group" style={{ lineHeight: 0 }}>
        <Image
          alt={imageAlt}
          height={800}
          src={`${urlForSanitySource(
            image
          )}?w=1246&h=800&auto=format&fit=crop&crop=focalpoint`}
          width={1246}
        />
        <div className="flex flex-col justify-center mx-auto gap-y-2">
          <H3 className="inline !mt-3 w-full uppercase text-center !mb-0 py-1">
            {title}
          </H3>
          {description && (
            <>
              <div className="mx-auto">
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
export default BackgroundTextSectionHalf
