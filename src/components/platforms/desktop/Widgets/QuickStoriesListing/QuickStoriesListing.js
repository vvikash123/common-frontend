import React, { useState } from "react";
import style from "./QuickStoriesListing.module.scss";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import PhotoVideoCard from "@/components/common/PhotoVideoCard/PhotoVideoCard";
import { getNewImageUrl } from "@/utils/common";
import CommonGridBox from "@/components/common/CommonGridBox/CommonGridBox";
import Button from "@/components/common/Button/Button";
import { fetchLoadMoreWebStoriesData } from "@/pages/api";

const QuickStoriesListing = (props) => {
  const {
    componentData,
    marginBottom=60,
    imageWidth=300,
    isMobile,
    limit,
    deviceType,
  } = props;
  const [storyData, setStoryData] = useState(componentData?.data?.items || []);
  const totalRecords = componentData?.data?.total_records;
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMoreData = async () => {
    setLoading(true);
    const newPage = pageNo + 1;
    setPageNo(newPage);
    const channelId = process?.env?.NEXT_PUBLIC_HOST_ID;
    const API_URL = process?.env?.NEXT_PUBLIC_API_URL;
    const url = `${API_URL}/request/photostory?seopath=web-stories&pageno=${newPage}&itemcount=${limit}&origin=${deviceType}&channel=${channelId}`;
    const response = await fetchLoadMoreWebStoriesData(url);
    let newStoryData =
      response?.sections?.tnn_health_photo_story?.data?.items || [];
    setStoryData([...storyData, ...newStoryData]);
    setLoading(false);
  };
  return (
    storyData?.length > 0 && (
      <section
        className={style["FeaturedMonth"]}
        style={{ marginBottom: `${marginBottom}px` }}
        key={props.key}
      >
        <TitleComponent
          titleType={componentData?.headingType || "h2"}
          moreButtonLink={""}
          boldText={["Quick"]}
          titleText={componentData?.data?.title || "Quick Stories"}
          marginBottom={20}
        />
        <CommonGridBox
          gridType={"gridBox"}
          changeStyle={isMobile ? "grid-2" : "grid-4"}
          yGap={20}
          xGap={20}
        >
          {storyData?.map((item, index) => (
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
                priority={index > 0 ? true : false }
              />
            </div>
          ))}
        </CommonGridBox>
        {totalRecords > storyData.length && (
          <div className={`${style["load-more"]}`}>
            {loading ? (
              <Button
                buttonType={"text"}
                buttonText={"Loading..."}
                changeStyle={"video-load-more-disabled"}
              />
            ) : (
              <div onClick={loadMoreData}>
                <Button
                buttonType={"text"}
                buttonText={"Load More"}
                changeStyle={"video-load-more"}
              />
              </div>
            )}
          </div>
        )}
      </section>
    )
  );
};

export default QuickStoriesListing;
