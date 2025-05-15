import React, { useState } from "react";

import WidgetCard from "@/components/common/WidgetCard/WidgetCard";
import style from "./VideoListing.module.scss";
import {
  removeHtmlTags,
  getNewImageUrl,
  displayTime,
  generateUrlPath,
} from "@/utils/common";
import { commonProperties, MIN_VIDEO_LENGTH } from "@/constants/index";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import CommonGridBox from "@/components/common/CommonGridBox/CommonGridBox";
import Button from "@/components/common/Button/Button";
import { fetchLoadMoreWebStoriesData } from "@/pages/api";
const VideoListing = (props) => {
  const {
    marginTop,
    marginBottom = 60,
    componentData,
    data,
    imageWidth = 300,
    total_records,
  } = props;
  const [videosData, setVideosData] = useState(data || []);

  const totalRecords = total_records;

  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);

  const calculateTime = (item = {}) => {
    if (item?.media?.durationms > MIN_VIDEO_LENGTH) {
      return displayTime(item.media.durationms);
    }
  };

  // `api/getlisting?seopath=${seo}&pageno=${pageno}&itemcount=${itemcount}&origin=${origin}`
  const loadMoreData = async () => {
    const limit = 25;
    setLoading(true);
    const newPage = pageNo + 1;
    setPageNo(newPage);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/getlisting?seopath=videos&pageno=${newPage}&itemcount=${limit}&origin=descktop&channel=${process.env.NEXT_PUBLIC_HOST_ID}`;
    const response = await fetchLoadMoreWebStoriesData(url);
    let newVideosData =
      response?.sections?.tnn_health_detail?.data?.children || [];

    setVideosData([...videosData, ...newVideosData]);
    setLoading(false);
  };
  // console.log('datadata' , videosData)

  return (
    videosData?.length > 0 && (
      <>
        <section
          className={style["VideoListing"]}
          style={{ marginBottom: `${marginBottom}px` }}
          key={props.key}
        >
          <ContainerBox>
            <CommonGridBox
              gridType={"gridBox"}
              changeStyle={"grid-4"}
              xGap={34}
              yGap={24}
              marginBottom={50}
            >
              {videosData &&
                videosData?.map((item, index) => (
                  <div className={`${style["col"]}`} key={index}>
                    <a
                      key={`${item?.msid}`}
                      href={generateUrlPath(item)}
                      title={`${removeHtmlTags(`${item?.title}`)}`}
                    >
                      <WidgetCard
                        isConditionalRendering={true}
                        widgetCardType={"leadCard"}
                        cardSettingData={[
                          {
                            ...commonProperties,
                            type: "title",
                            widgetCardType: "leadCard",
                            widgetLayout: "vertical",
                            elementClass: "videos-caption-listing",
                            lineClamp: 2,
                            marginBottom: 4,
                            elementType: "p",
                            textIcon: "blackRoundPlayIcon",
                          },
                          {
                            ...commonProperties,
                            type: "small",
                            widgetCardType: "leadCard",
                            widgetLayout: "vertical",
                            elementClass: "videos-listing-small-tag",
                            lineClamp: "inherit",
                            marginBottom: 0,
                            elementType: "p",
                          },
                        ]}
                        verticalList={[
                          {
                            title: `${item?.title}`,
                            imgUrl: getNewImageUrl({
                              msid: item?.msid || null,
                              imageSize:
                                item?.imageSize || item?.thumbsize || "",
                              imgWidth: imageWidth || null,
                              imgHeight: 203,
                              is1x1Img: false,
                              isArticleBanner: false,
                              updatedAt: item?.updatedate
                                ? item?.updatedate
                                : "",
                            }),
                            time: calculateTime(item),
                          },
                        ]}
                        keywords={item?.keywords}
                        cardStyleV={"video-card"}
                        VerticalCardOrder={"videos"}
                        islazy={index >= 4}
                      />
                    </a>
                  </div>
                ))}
            </CommonGridBox>
            {totalRecords > videosData.length && (
              <div className={`${style["load-more"]}`} onClick={loadMoreData}>
                {loading ? (
                  <Button
                    buttonType={"text"}
                    buttonText={"Loading..."}
                    changeStyle={"video-load-more-disabled"}
                  />
                ) : (
                  <Button
                    buttonType={"text"}
                    buttonText={"Load More"}
                    changeStyle={"video-load-more"}
                  />
                )}
              </div>
            )}
          </ContainerBox>
        </section>
      </>
    )
  );
};

export default VideoListing;
