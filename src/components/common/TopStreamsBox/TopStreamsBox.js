import React from "react";
import s from "./TopStreamsBox.module.scss";

const TopStreamsBox = ({ iconUrl, title }) => {
  return (
    <div className={s['TopStreamsBox']}>
      <div>
        <i><img src={iconUrl} alt={title} /></i>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default TopStreamsBox;
