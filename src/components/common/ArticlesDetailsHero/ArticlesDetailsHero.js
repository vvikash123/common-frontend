import React from "react";
import s from "./ArticlesDetailsHero.module.scss";
import SpriteIcon from "../Svg/SpriteIcon";
import ContainerBox from "../ContainerBox/ContainerBox";
import SocialIcons from "../SocialIcons/SocialIcons";
import CommonGridBox from "../CommonGridBox/CommonGridBox";
import AuthorInfo from "../AuthorInfo/AuthorInfo";

const ArticlesDetailsHero = () => {
  return (
    <div className={s['ArticlesDetailsHero']}>
      <img src="https://static.tnn.in/photo/msid-114063115,width-1440,height-200,resizemode-75/114063115.jpg?quality=100" alt=""/>
      <div className={s['DetailsCaption']}>
         <ContainerBox>
              <h1>New Education IIM-Kozhikode and AAI jointly launch free reading lounge</h1>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna</p>
         </ContainerBox>
         </div>
         <div className={s['author']}>
         <ContainerBox>
         <CommonGridBox gridType={'gridBox'} changeStyle={'grid-2'} yGap={20} xGap={16}>
          <AuthorInfo />
                <SocialIcons />
                </CommonGridBox>
                </ContainerBox>
              </div>
    </div>
  );
};

export default ArticlesDetailsHero;
