import React from "react";
import s from "./Button.module.scss";
import { SpriteIcon } from "../Svg/SpriteIcon"; 

function Button({ iconName, buttonText, className = "", onClick }) {
  return (
    <button className={`${s['DownloadBrochure']} ${className}`} onClick={onClick}>
      {iconName && <SpriteIcon IconName={iconName} />} 
      {buttonText} 
    </button>
  );
}

export default Button;
