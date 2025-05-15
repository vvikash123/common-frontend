import React from "react";
import s from "./ArticlesWidget.module.scss"; // Importing the styles
import ContainerBox from "../ContainerBox/ContainerBox";

const ArticlesHeroSection = ({ title }) => {
  return (
    <div className={s['ArticlesHeroSection']}>
      <ContainerBox>
      <h1>{title || "Latest Articles"}</h1>
      </ContainerBox>
    </div>
  );
};

export default ArticlesHeroSection;
