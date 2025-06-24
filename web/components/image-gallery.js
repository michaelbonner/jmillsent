import 'slick-carousel/slick/slick.css'

import Slider from 'react-slick'
import Image from 'next/image'

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
    className: '',
    dots: true,
    dotsClass: 'slick-dots slick-thumb !flex !items-center !gap-x-3 mt-2',
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
            width={1080}
            height={1920}
            key={image.imageUrl}
          />
        ))}
      </Slider>
    </div>
  )
}
