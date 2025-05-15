import React from "react";
import style from "./Typography.module.scss";
import SpriteIcon from "../Svg/SpriteIcon";
function Typography(props) {
  const {
    textValue='',
    elementType: ElementTypeTag,
    changeStyle='',
    marginBottom=0,
    lineClamp=1,
    smallTextIcon='',
  } = props;
  return (
    <>
      {smallTextIcon != "" ? (
        <div
          className={`${style["caption-with-icon"]} ${style[changeStyle]}`}
          style={{ marginBottom: `${marginBottom}px` }}
        >
          <SpriteIcon IconName={smallTextIcon} />
          <ElementTypeTag
            className={`${style["default"]} ${style[changeStyle]}`}
            style={{ WebkitLineClamp: `${lineClamp}` }}
            key={`tag_creator_${Date.now()}_${textValue}`}
          >
            {textValue}
          </ElementTypeTag>
        </div>
      ) : (
        <ElementTypeTag
          className={`${style["default"]} ${style[changeStyle]}`}
          style={{
            marginBottom: `${marginBottom}px`,
            WebkitLineClamp: `${lineClamp}`,
          }}
          key={`tag_creator_${Date.now()}_${textValue}`}
        >
          {textValue}
        </ElementTypeTag>
      )}
    </>
  );
}

export default Typography;
