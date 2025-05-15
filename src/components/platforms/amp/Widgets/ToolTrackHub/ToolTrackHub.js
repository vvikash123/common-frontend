import React from "react";
import style from "./ToolTrackHub.module.scss";
import VisualTagLink from "@/components/common/VisualTagLink/VisualTagLink";

const ToolTrackHub = (props) => {
  return (
    <div className={style["tnn_container"]}>
      <h2> ToolTrackHub</h2>
      <VisualTagLink isConditionalRendering={true} />
    </div>
  );
};

ToolTrackHub.defaultProps = {};

export default ToolTrackHub;
