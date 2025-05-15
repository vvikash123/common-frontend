import React from "react";
import s from "./LatestnewsArticles.module.scss";
import ContainerBox from "../ContainerBox/ContainerBox";
import SlickSlideWrapper from "../SlickSlideWrapper/SlickSlideWrapper";
import { generateArticlePath } from "@/utils/common";
import { getAuthorDetailDate } from "@/utils/dateUtils";


const LatestnewsArticles = ({rhsWidget}) => {
  const latest_articles = rhsWidget?.latest_articles || {}
  return (
    <div className={s['LatestnewsArticles']}>
      <h4>Latest news and articles</h4>
          <SlickSlideWrapper
          arrows={true}
          dots={false}
          slidesToShow={3}
          isVarWidth={false}
          // autoplay={true}
          centerMode={true}
          // centerPadding={deviceType === 'mobile' ? 30 : 20}
          infinite={true}
          // changeBodyStyle={"TopStreamsBox"}
          marginBottom={0}
        >   
        {latest_articles?.children?.map((item, key) => (
          <div key={`latest-news-${key}`} className={s['NewsBox']}>
            <span>{item?.updatedate}</span>
            <h3><a href={generateArticlePath(item)}>{item?.title}</a></h3>
            <p>{item?.synopsis}</p>
           </div>
        ))}
  
        </SlickSlideWrapper>
      
    </div>
  );
};

export default LatestnewsArticles;
