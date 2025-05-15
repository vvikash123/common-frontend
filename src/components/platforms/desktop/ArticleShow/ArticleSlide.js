import React, { useState } from 'react';
import Slider from 'react-slick';
import style from './ArticleSlide.module.scss'
import Image from 'next/image';
import NextImage from '@/utils/NextImage';
import { getNewImageUrl } from '@/utils/common';

const SlickSliderWithCounter = ({slides}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '340px',
    afterChange: (current) => setCurrentSlide(current),
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
          centerPadding: '30px',
        }
      },
    ]
  };
  return (
    <>
    <div className={`${style["articleShow-Slider"]}`}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <div>

       <NextImage 
          src={getNewImageUrl({
          msid: slide.msid ,
        imgWidth: 900,
        imgHeight: 525,
        imgSize: slide?.thumbsize ? slide?.thumbsize : '',
        isArticleBanner: true,
         })}
       alt={slide?.title}
      width={900}
      height={525}
      layout={'fixed'}
    />
            </div>
          </div>
        ))}
      </Slider>
      <div className={`${style["counter"]}`}>
         {currentSlide + 1} / {slides.length}
      </div>
    </div>
    </>
  );
};

export default SlickSliderWithCounter;
