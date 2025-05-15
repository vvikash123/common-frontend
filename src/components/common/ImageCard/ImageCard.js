import React from "react";
import style from "./ImageCard.module.scss";
import NextImage from "@/utils/NextImage"
function ImageCard(props) {
  const { changeStyle='default', imgUrl='/assets/health-images/images/img1.png' } = props;
  return (
    <span className={`${style["image-con"]} ${style[changeStyle]}`}>
      {/*<LazyImage datasrc={imgUrl} alt={"title"} useOriginalSource />*/}
      <NextImage src={imgUrl} />
    </span>
  );
}

export default ImageCard;
