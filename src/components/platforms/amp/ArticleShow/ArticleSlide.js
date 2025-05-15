import React, { useState } from 'react';
import style from './ArticleSlide.module.scss'
import { getNewImageUrl } from '@/utils/common';

const SlickSliderWithCounter = ({slides}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <>
    <div className='articleShow-Slider'>
        {slides.map((slide, index) => (
          <div className={`${style["RowSlider"]}`} key={index}>
            <div>  
             <img 
          src={getNewImageUrl({
          msid: slide.msid ,
        imgWidth: 340,
        imgHeight: 220,
        imgSize: slide?.thumbsize ? slide?.thumbsize : '',
        isArticleBanner: true,
         })}
       alt={slide?.title}
      width={340}
      height={220}
    />
    </div>
          </div>
        ))}
      {/* <div className={`${style["counter"]}`}>
         {currentSlide + 1} / {slides.length}
      </div> */}
    </div>
    </>
  );
};

export default SlickSliderWithCounter;
