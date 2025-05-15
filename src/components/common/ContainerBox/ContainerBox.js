import React from "react";
import style from "./ContainerBox.module.scss";

function ContainerBox({
  children,
  marginBottom = 0,
  marginTop = 0,
  changeStyle = "",
  noGutterSpace = false,
}) {
  return (
    <div
      className={`${style["container"]} ${
        noGutterSpace ? style["no-gutter"] : ""
      } ${style[changeStyle]}`}
      style={{ marginBottom: `${marginBottom}px`, marginTop: `${marginTop}px` }}
    >
      {children}
    </div>
  );
}

export default ContainerBox;
