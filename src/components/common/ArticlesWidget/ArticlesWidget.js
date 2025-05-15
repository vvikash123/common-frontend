import React, { useState } from "react";
import s from "./ArticlesWidget.module.scss"; // Importing the styles
import SpriteIcon from "../Svg/SpriteIcon";
import Image from "next/image";
import { IMG_DEFAULT } from "@/constants";

const ArticlesWidget = ({ 
  imageUrl, 
  updatedDate, 
  title, 
  description, 
  readMoreLink 
}) => {
  const [imgSrc, setImgSrc] = useState(imageUrl || IMG_DEFAULT);

  return (
    <div className={s['ArticlesWidget']}>
      <div className={s['Img']}>
      <a href={readMoreLink} className={s['TitleLink']}>
        <Image 
          src={imgSrc} 
          alt={title} 
          width={20}
          height={20}
          className={s['ArticleImage']} 
          onError={() => setImgSrc(IMG_DEFAULT)} // Fallback to IMG_DEFAULT on error

        />
        </a>
      </div>
      <div className={s['Intro']}>
        <span className={s['UpdatedDate']}>{updatedDate}</span>
        <h2 className={s['Title']}>
          <a href={readMoreLink} className={s['TitleLink']}>
            {title}
          </a>
        </h2>
        <p className={s['Description']}>{description}</p>
        <a href={readMoreLink} className={s['ReadMore']}>Read More <SpriteIcon IconName="Links" /></a>
      </div>
    </div>
  );
};

export default ArticlesWidget;
