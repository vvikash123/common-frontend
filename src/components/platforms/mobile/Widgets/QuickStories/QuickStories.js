import React from "react";
import style from "./QuickStories.module.scss";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";
import PhotoVideoCard from "@/components/common/PhotoVideoCard/PhotoVideoCard";
import { getNewImageUrl } from "@/utils/common";

const QuickStories = (props) => {
  const {
    componentData,
    getMSID,
    marginBottom = 30,
    data,
    imageWidth = 300,
  } = props;

  return (
    componentData?.data?.items?.length > 0 && (
      <section
        className={style["FeaturedMonth"]}
        style={{ marginBottom: `${marginBottom}px` }}
        key={props.key}
      >
        <ContainerBox>
          <TitleComponent
            titleType={componentData?.headingType || "h2"}
            moreButtonLink={componentData?.seeMore?.link || "/web-stories"}
            boldText={["Stories"]}
            titleText={componentData?.data?.title || "Quick Stories"}
            marginBottom={15}
          />
          <CustomSlideBox
            gridGap={15}
            changeStyle={"quick-stories-box"}
            marginBottom={0}
          >
            {componentData?.data?.items?.map((item, index) => (
              <div
                className={`${style["col"]}`}
                key={`quickStory_${props.key}_${index}`}
              >
                <PhotoVideoCard
                  isConditionalRendering={true}
                  cardType={"stories"}
                  imgUrl={getNewImageUrl({
                    msid: item?.msid || null,
                    imageSize: item?.imageSize || item?.thumbsize || "",
                    imgWidth: imageWidth || null,
                    imgHeight: 203,
                    is1x1Img: false,
                    isArticleBanner: false,
                    updatedAt: item?.updatedate ? item?.updatedate : "",
                  })}
                  titleText={item?.title}
                  seopath={item?.url || ""}
                  msid={item?.msid}
                />
              </div>
            ))}
          </CustomSlideBox>
        </ContainerBox>
      </section>
    )
  );
};

export default QuickStories;
