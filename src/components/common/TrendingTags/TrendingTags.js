import React from "react";
import style from "./TrendingTags.module.scss";
import { removeHtmlTags, tagReturnFromType } from "@/utils/common";
import TagButton from "./TagButton";

const TrendingTags = (props) => {
  const {
    changeStyle,
    textValue,
    secondTextValue,
    bulletNumbers = 0,
    icons = "",
    type,
    isActive,
    wrapper, // anchor tag || button tag
    key,
    tab,
    loadSubNavigationDataFn,
    msid,
    seopath,
    imgUrl,
    overridelink,
    fromVideosWidget,    
    fromAmp = false
  } = props;
  
  /**
   * @param type holds tag type value
   * @param textValue holds tag name value
   * @param img  holds tag img path
   *
   */
  return (
    <>
      {wrapper === "anchor" ? (
        <a
          key={key}
          href={overridelink? overridelink : (fromVideosWidget ? `search-result/${seopath}` : `${seopath.startsWith("health/")?`${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/${seopath}`:seopath}`)}
          className={fromAmp ? `${isActive}` : `${style["default"]} ${style[isActive]} ${style[changeStyle]}`}
          title={`${removeHtmlTags(textValue)}`}
          
        >          
          {tagReturnFromType(
            type,
            textValue,
            secondTextValue,
            icons,
            style,
            bulletNumbers,
            isActive,
            imgUrl          
          )}          
        </a>
      ) : (        
        <TagButton
          style={style}
          loadSubNavigationDataFn={loadSubNavigationDataFn}
          type={type}
          textValue={textValue}
          secondTextValue={secondTextValue}
          icons={icons}
          fromAtoZ={props.fromAtoZ || null}
          seopath={seopath || null}
          bulletNumbers={bulletNumbers}
          isActive={isActive}
          changeStyle={changeStyle}
          imgUrl={imgUrl}
        />        
      )}
    </>
  );
};

export default TrendingTags;
