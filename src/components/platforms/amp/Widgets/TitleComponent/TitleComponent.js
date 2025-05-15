import React from "react";
import Link from "next/link";
import style from "./TitleComponent.module.scss";
import SpriteIcon from "../Svg/SpriteIcon";

function TitleComponent({ title, link, margin, headingLevel = "h1" }) {
  const HeadingTag = headingLevel; 

  return (
    <div className={style['TitleComponent']} style={{ margin }}>
      {link ? (
        <Link href={link}>
          <HeadingTag className={style['title-link']}>{title} <SpriteIcon IconName="Links" /></HeadingTag>
        </Link>
      ) : (
        <HeadingTag className={style['title-link']}>{title}</HeadingTag>
      )}
    </div>
  );
}

export default TitleComponent;
