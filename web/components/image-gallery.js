import 'slick-carousel/slick/slick.css'

import classNames from 'classnames'
import Image from 'next/image'
import Slider from 'react-slick'

export const ImageGallery = ({ images }) => {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <Image
            className="rounded-lg"
            src={images[i].imageUrl}
            alt={images[i].caption || images[i].name}
            width={200}
            height={120}
          />
        </a>
      )
    },
    className: classNames(
      '[&_.slick-slide]:aspect-[2.4/1]',
      '[&_.slick-slide>div]:h-full',
      '[&_.slick-slide>div>img]:size-full [&_.slick-slide>div>img]:object-cover [&_.slick-slide>div>img]:object-center'
    ),
    dots: true,
    dotsClass: classNames(
      'ui-slick-dots !flex !items-stretch !gap-x-3 mt-2 w-full',
      '[&>li]:size-full [&>li_img]:size-full [&>li]:relative [&>li]:aspect-[16/9]'
    ),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <Image
        alt="chevron-arrow"
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
            className="rounded-xl object-cover"
            src={image.imageUrl}
            alt={image.caption || image.name}
            width={image.width}
            height={image.height}
            key={image.imageUrl}
          />
        ))}
      </Slider>
    </div>
  )
}
