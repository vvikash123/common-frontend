import React, { useEffect, useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import customSliderStyles from './CustomSlider.scss';

export const CarouselItem = ({ children, width }) => {
  return (
    <div
      className={customSliderStyles['carousel-item']}
      style={{ width: width }}
    >
      {children}
    </div>
  );
};

const Carousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(props.children) - 1;
    } else if (newIndex >= React.Children.count(props.children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
    props.chageSlide(0, newIndex);
  };

  return (
    <>
      <div
        className={`${customSliderStyles['carousel']} ${
          customSliderStyles[props?.liveTvSlider ?? '']
        }`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={customSliderStyles['inner']}
          style={{ left: activeIndex * -100 + '%' }}
        >
          {React.Children.map(props.children, (child, index) => {
            return React.cloneElement(child, { width: '100%' });
          })}
        </div>
      </div>
      <div className={customSliderStyles['indicators']}>
        <button
          className={`${customSliderStyles['left-arrow']} ${
            activeIndex === 0 ? customSliderStyles['disabled'] : ''
          }`}
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </button>
        <button
          className={`${customSliderStyles['right-arrow']} ${
            React.Children.count(props.children) === activeIndex + 1
              ? customSliderStyles['disabled']
              : ''
          }`}
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default withStyles(customSliderStyles)(Carousel);
