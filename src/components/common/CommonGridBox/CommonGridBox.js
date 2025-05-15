import React from "react";
import style from "./CommonGridBox.module.scss";

function CommonGridBox({
  children,
  gridType = "flexBox",
  changeStyle = "",
  xGap = 0,
  yGap = 0,
  marginTop = 0,
  marginBottom = 0,
  flexWrap = "",
}) {
  return (
    <>
      {gridType === "divFlexBox" && (
        <div
          className={`${style["d-flex"]} ${style[changeStyle]}`}
          style={{
            gap: `${xGap}px ${yGap}px`,
            marginTop: `${marginTop}px`,
            marginBottom: `${marginBottom}px`,
            flexWrap: flexWrap,
          }}
        >
          {children}
        </div>
      )}
      {gridType === "flexBox" && (
        <ul
          className={`${style["d-flex"]} ${style[changeStyle]}`}
          style={
            flexWrap
              ? {
                  gap: `${xGap}px ${yGap}px`,
                  marginTop: `${marginTop}px`,
                  marginBottom: `${marginBottom}px`,
                  flexWrap: flexWrap,
                }
              : {
                  gap: `${xGap}px ${yGap}px`,
                  marginTop: `${marginTop}px`,
                  marginBottom: `${marginBottom}px`,
                }
          }
        >
          {children}
        </ul>
      )}
      {gridType === "gridBox" && (
        <div
          className={`${style["d-grid"]} ${style[changeStyle]}`}
          style={{
            gridGap: `${xGap}px ${yGap}px`,
            marginBottom: `${marginBottom}px`,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default CommonGridBox;
