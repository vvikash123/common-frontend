import React, { useState } from "react";
import style from "./Typography.module.scss";
import SpriteIcon from "../Svg/SpriteIcon";


function Typography(props) {
  const {
    textValue = '',
    elementType: ElementTypeTag,
    changeStyle = '',
    marginBottom = 0,
    lineClamp = 1,
    smallTextIcon = '',
    keywords,
    isMobile,
    VerticalCardOrder=false
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {smallTextIcon != "" ? (
        <div
          className={`${style["caption-with-icon"]} ${style[changeStyle]}`}
          style={{ marginBottom: `${marginBottom}px` }}
        >
          <SpriteIcon IconName={smallTextIcon} />
          <ElementTypeTag
            className={`${style["default"]} ${style[changeStyle]} ${style["collapsed"]}`}
            style={{ WebkitLineClamp: `${lineClamp}` }}
            key={`tag_creator_${Date.now()}_${textValue}`}
          >
            {textValue}
          </ElementTypeTag>
        
        </div>
      ) : (
        <ElementTypeTag
          className={`${style["default"]} ${style[changeStyle]} ${isExpanded ? style["expanded"] : style["collapsed"]}`}
          style={{
            marginBottom: `${marginBottom}px`,
            WebkitLineClamp: `${isExpanded ? 'none' : lineClamp}`,
          }}
          key={`tag_creator_${Date.now()}_${textValue}`}
        >
          {isTruncated && !isExpanded ? `${textValue.substring(0, 591)}...` : textValue}
          {(keywords?.keywordseo && VerticalCardOrder === false) && (
            <a href={`/search-result/${keywords?.keywordseo}`}>
              {keywords.name}
            </a>
          )}
        </ElementTypeTag>
      )}
      {isTruncated && (
        <button onClick={toggleExpand} className={style["toggle-button"]}>
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </>
  );
}

export default Typography;
