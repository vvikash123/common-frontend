import React from "react";
import style from "./SymptomsChecker.module.scss";
import SymptomsCard from "./SymptomsCard";
import Button from "../Button/Button";
import SlickSlideWrapper from "../SlickSlideWrapper/SlickSlideWrapper";
import { getDeviceType } from "@/utils/isMobile";

function SymptomsChecker(props) {
  const {
    changeStyle,
    buttonText,
    buttonType,
    iconName,
    isAnchor,
    key,
    seopath,
    deviceType,
  } = props;
  return (
    <div className={`${style["symptoms-box"]}`}>
      <h3 className={`${style["box-title"]}`}>SYMPTOMS CHECKER</h3>

 
      <SlickSlideWrapper
        arrows={false}
        dots={true}
        slidesToShow={1}
        autoplay={true}
        centerMode={true}
        centerPadding={deviceType === 'mobile' ? 30 : 20}
        infinite={true}
        changeBodyStyle={"symptoms-checker"}
        marginBottom={0}
      >
        <SymptomsCard />
        <SymptomsCard />
        <SymptomsCard />
        <SymptomsCard />
        <SymptomsCard />
      </SlickSlideWrapper>
   

      <div className={`${style["button-box"]}`}>
        <Button
          buttonType={"text"}
          buttonText={"Check Symptoms"}
          changeStyle={"check-symptoms-button"}
        />
      </div>
    </div>
  );
}

SymptomsChecker.defaultProps = {
  changeStyle: "default",
  buttonText: "",
  iconName: "grayShareIcon",
  isAnchor: false,
  key: "",
  seopath: "",
};

export default SymptomsChecker;
