import React from "react";
import s from "./CollageDetailInfo.module.scss";

const CollageDetailInfo = ({ title="", description="", margin }) => {
  //const descriptionParagraphs = description.split('. ').map((sentence, index) => sentence.trim() + '.');
  let modifiedDescription = description.replace(/<font color="white">(.*?)<\/font>/g, '<span style="color: black;">$1</span>');

  return (
    <div className={s['CollageDetailInfo']} style={{ margin }}>
      <h2>{title}</h2>
      <div  dangerouslySetInnerHTML={{ __html: modifiedDescription }}></div>
    </div>
  );
};

export default CollageDetailInfo;
