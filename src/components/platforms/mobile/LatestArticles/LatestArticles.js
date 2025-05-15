import React from "react";
import s from "./LatestArticles.module.scss";
import SlickSlideWrapper from "@/components/common/SlickSlideWrapper/SlickSlideWrapper";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import LatestArticlesWidget from "@/components/common/LatestArticlesWidget/LatestArticlesWidget";
import { getNewImageUrl, isMobile } from "@/utils/common";


const LatestArticles = (props) => {
  const { isMobile, data , componentData } = props;
  return (
    <div className={s['LatestArticles']}>
      <ContainerBox changeStyle="Rightgutter">
      <TitleComponent
          title={ componentData?.seeMore?.text ??  "Latest Articles"}
          link={ componentData?.seeMore?.link }
          margin="0px 0 20px 0"
          headingLevel="h2"
        />

        <SlickSlideWrapper
          arrows={false}
          dots={isMobile ? false : true}
          slidesToShow={isMobile ? 1.2 : 3.2}
          infinite={false}
          changeBodyStyle={"LatestArticles"}
          marginBottom={0}
          
        >
          {data.map((article) => (
            <LatestArticlesWidget
              key={article.msid}
              iconUrl={getNewImageUrl({
                msid: article.msid,
                imageSize: article.leadImage?.thumbsize || '',
                imgWidth: 200, // Adjust width as needed
                imgHeight: 600,
                is1x1Img: false,
                isArticleBanner: false,
              })}
              title={article.title}
              category="" // Replace with dynamic category if available
              link={`/${article.seopath}`}
            />
          ))}
        </SlickSlideWrapper>
      </ContainerBox>
    </div>
  );
};

export default LatestArticles;
