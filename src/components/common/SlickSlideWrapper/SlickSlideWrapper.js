import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import style from "./SlickSlideWrapper.module.scss";
import { _isCSR } from "@/utils/common";

function SlickSlideWrapper({
  children,
  marginTop = 0,
  marginBottom = 0,
  changeBodyStyle = "d-flex",
  changeSliderStyle = "default",
  infinite = false,
  dots = false,
  arrows = true,
  slidesToShow = 2,
  slidesToScroll = 1,
  autoplay = false,
  pauseOnHover = true,
  speed = 500,
  autoplaySpeed = 5000,
  rows = 1,
  slidesPerRow = 1,
  centerMode = false,
  centerPadding = 10,
  slideId,
  isVarWidth = false,
}) {
  //====== Variable Width Configuration Start here ====//
  const [slickSlider, setSlickSlider] = useState(false);
  const [scrollTriggred, setScroll] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [paddingStyle, setPaddingStyle] = useState(0);

  useEffect(() => {
    slickeWidthHandler();
    const scrollHandler = () => {
      let scrollCount = scrollTriggred + 1;
      setScroll(scrollCount);
      if (scrollTriggred <= 1) {
        slickeWidthHandler();
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", scrollHandler, { passive: true });
    }
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const slickeWidthHandler = () => {
    if (_isCSR() && typeof window != "undefined") {
      let slickContainerWidth = document.querySelector(
        `#${slideId} .slick-list`
      )?.offsetWidth;
      let slickSlide = document.querySelectorAll(`#${slideId} .slick-slide`);
      let width = 0;
      for (var i = 0; i < slickSlide.length; i++) {
        width += slickSlide && slickSlide.length && slickSlide[i]?.offsetWidth;
        if (width > slickContainerWidth) {
          setSlickSlider(true);
          setChildCount(i);
          setPaddingStyle(1);
          return;
        }
      }
    }
  };

  const settings = {
    slidesToShow: slickSlider ? childCount - 1 : 20,
    infinite: false,
    className: `${style["default"]} ${style[changeSliderStyle]} ${
      paddingStyle === 0 ? style["pr-0"] : ""
    }`,
    variableWidth: true,
    swipeToSlide: true,

    afterChange: (currentSlide) => {
      if (_isCSR() && typeof window != "undefined") {
        let slickContainerWidth = document.querySelector(
          `#${slideId} .slick-list`
        )?.offsetWidth;
        let slickSlide = document.querySelectorAll(`#${slideId} .slick-slide`);
        let width = 0;
        for (var i = currentSlide; i < slickSlide.length; i++) {
          width +=
            slickSlide && slickSlide.length && slickSlide[i]?.offsetWidth;
        }
        if (width < slickContainerWidth) {
          document.querySelector(`#${slideId} .slick-next`).disabled = true;
        } else {
          document.querySelector(`#${slideId} .slick-next`).disabled = false;
        }
      }
    },
  };
  //====== Variable Width Configuration End here ====//

  const settingsWithModules = {
    infinite: infinite,
    dots: dots,
    arrows: arrows,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    autoplay: autoplay,
    pauseOnHover: pauseOnHover,
    speed: speed,
    autoplaySpeed: autoplaySpeed,
    rows: rows,
    slidesPerRow: slidesPerRow,
    swipeToSlide: true,
    centerMode: centerMode,
    centerPadding: `${centerPadding}px`,
    className: `${style["default"]} ${style[changeSliderStyle]}`,

    dotsClass: `${style["button__bar"]}`,
  };

  return (
    <>
      {isVarWidth ? (
        <div
          className={`${style["d-flex"]} ${style[changeBodyStyle]}`}
          style={{
            marginTop: `${marginTop}px`,
            marginBottom: `${marginBottom}px`,
          }}
          id={slideId}
        >
          <Slider {...settings}>{children}</Slider>
        </div>
      ) : (
        <div
          className={`${style["d-flex"]} ${style[changeBodyStyle]}`}
          style={{
            marginTop: `${marginTop}px`,
            marginBottom: `${marginBottom}px`,
          }}
          id={slideId}
        >
          <Slider {...settingsWithModules}>{children}</Slider>
        </div>
      )}
    </>
  );
}

export default SlickSlideWrapper;
