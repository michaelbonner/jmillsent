import 'slick-carousel/slick/slick.css'

import urlForSanitySource from '@/lib/urlForSanitySource'
import classNames from 'classnames'
import Image from 'next/image'
import Slider from 'react-slick'

export const ImageGallery = ({ images }) => {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <Image
            alt={images[i].caption || images[i].name}
            className="rounded-lg"
            height={600 / 2}
            src={urlForSanitySource(images[i].asset)
              .width(160 * 4)
              .height(90 * 4)
              .url()}
            width={1400 / 2}
          />
        </a>
      )
    },
    className: classNames(
      'relative',
      '[&_.slick-slide]:aspect-[2.4/1]',
      '[&_.slick-slide>div]:h-full',
      '[&_.slick-slide>div>img]:size-full [&_.slick-slide>div>img]:object-cover [&_.slick-slide>div>img]:object-center'
    ),
    dots: true,
    dotsClass: classNames(
      'ui-slick-dots !flex !items-stretch !gap-x-2 mt-2 w-full',
      '[&>li]:size-full [&>li_img]:size-full [&>li]:relative [&>li]:aspect-[16/9]'
    ),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <Image
        alt="next arrow"
        src="/images/chevron-arrow.svg"
        width={81 / 2}
        height={172 / 2}
      />
    ),
    prevArrow: (
      <Image
        alt="chevron-arrow"
        src="/images/chevron-arrow.svg"
        width={81 / 2}
        height={172 / 2}
      />
    ),
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image) => (
          <Image
            alt={image.caption || image.name}
            className="rounded-xl object-cover"
            height={600}
            key={image.asset._id}
            src={urlForSanitySource(image.asset).width(1400).height(600).url()}
            width={1400}
          />
        ))}
      </Slider>
    </div>
  )
}
