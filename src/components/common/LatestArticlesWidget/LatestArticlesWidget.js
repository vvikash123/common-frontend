import React, { useState } from "react";
import s from "./LatestArticlesWidget.module.scss";
import Image from "next/image";
import { IMG_DEFAULT } from "@/constants";

const LatestArticlesWidget = ({ iconUrl, title, category, link }) => {
  const [imgSrc, setImgSrc] = useState(iconUrl || IMG_DEFAULT);

  return (
    <div className={s['ArticlesWidget']}>
      <a href={link} className={s['Link']} aria-label={`Read more about ${title}`}>
        <Image
          src={imgSrc}
          priority
          alt={title || "Article image"}
          width={146}
          height={107}
          onError={() => setImgSrc(IMG_DEFAULT)} // Fallback to IMG_DEFAULT on error
        />
        <div className={s['Right']}>
          <p className={s['Category']}>{category}</p>
          <h3 className={s['Title']}>{title}</h3>
        </div>
      </a>
    </div>
  );
};

export default LatestArticlesWidget;
