import React from "react";
import style from "./VideoHub.module.scss";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import WidgetCard from "@/components/common/WidgetCard/WidgetCard";
import { commonProperties, MIN_VIDEO_LENGTH } from "@/constants";
import { getNewImageUrl, removeHtmlTags, displayTime, generateUrlPath } from "@/utils/common";

const VideoHub = (props) => {
  const {
    componentData,
    getMSID,
    sectionIndex,
    marginBottom = 30,
    imageWidth = 300,
    data,
  } = props;

  const nextAvailablePage = componentData?.data?.pg?.np || "";
  const loadMorePageLimit = componentData?.loadMore?.pageLimit || 0;
  const seeMoreLink = componentData?.seeMore?.link || false;
  let moreLink;
  let moreText;

  if (nextAvailablePage && loadMorePageLimit >= nextAvailablePage) {
    moreLink = "/";
    moreText = componentData?.loadMore?.text || "";
  } else if (seeMoreLink) {
    moreLink = seeMoreLink;
    moreText = componentData?.seeMore?.text || "";
  }

  let headers = componentData?.headers || [];
  let header = [];
  for (var i = 0; i < headers.length; i++) {
    if (headers[i].msid != 82290714) {
      header.push(headers[i]);
    }
  }
  const calculateTime = (item = {}) => {
    if (item?.media?.durationms > MIN_VIDEO_LENGTH) {
      return displayTime(item.media.durationms);
    }
  };

  return (
    <>
      <section
        className={style["VideoGuidance"]}
        style={{ marginBottom: `${marginBottom}px` }}
        key={props.key}
      >
        <ContainerBox>
          <TitleComponent
            titleType={"h2"}
            changeStyle={"white-title"}
            moreButtonLink={
              componentData?.data?.seopath ? componentData?.data?.seopath : "/"
            }
            boldText={
              componentData?.data?.title &&
              componentData?.data?.title.split(" ")?.length > 0
                ? [componentData?.data?.title.split(" ")[0]]
                : ""
            }
            titleText={
              componentData?.data?.title ? componentData?.data?.title : ""
            }
            marginBottom={20}
          />
          <CustomSlideBox marginBottom={20}>
            {componentData?.data?.children[0]?.keywords &&
              componentData?.data?.children[0]?.keywords?.map((item, idx) => (
                <TrendingTags
                  key={idx}
                  isConditionalRendering={true}
                  type={"strongText"}
                  textValue={item?.name}
                  msid={item?.keywordseo}
                  seopath={item?.keywordseo}
                  changeStyle={"video-guidance"}
                  /**
                   * Tab props:
                   * To populate the data onclick of tags on the same widget.. without redirecting.
                   */
                  tab={{
                    sectionIndex: sectionIndex,
                    widgetType: componentData?.widgetType,
                    isTabView: true,
                  }}
                  wrapper={'anchor'}
                  fromVideosWidget={true}
                />
              ))}
          </CustomSlideBox>
          <div className={`${style["grid-1"]}`}>
            {componentData?.data?.children &&
              componentData?.data?.children.slice(0, 1).map((item, index) => (
                <div
                  className={`${style["col"]} ${style["lead-col"]}`}
                  key={index}
                >
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
                          elementClass: "videos-caption",
                          lineClamp: 2,
                          marginBottom: 8,
                          elementType: "p",
                          textIcon: "whiteRoundPlayIcon",
                        },
                        {
                          ...commonProperties,
                          type: "small",
                          widgetCardType: "leadCard",
                          widgetLayout: "vertical",
                          elementClass: "videos-small-tag",
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
                            imageSize: item?.imageSize || item?.thumbsize || "",
                            imgWidth: imageWidth || null,
                            imgHeight: 203,
                            is1x1Img: false,
                            isArticleBanner: false,
                            updatedAt: item?.updatedate ? item?.updatedate : "",
                          }),
                          time: calculateTime(item),
                        },
                      ]}
                      cardStyleV={"video-card"}
                      VerticalCardOrder={"videos"}
                    />
                  </a>
                </div>
              ))}

            <CustomSlideBox
              gridGap={15}
              changeStyle={"slide-100-60"}
              marginBottom={0}
            >
              {componentData?.data?.children &&
                componentData?.data?.children.slice(1, 5).map((item, index) => (
                  <div className={`${style["col"]}`} key={index}>
                    <a
                      key={`${item?.msid}`}
                      href={generateUrlPath(item)}
                      title={`${removeHtmlTags(`${item?.title}`)}`}
                    >
                      <WidgetCard
                        isConditionalRendering={true}
                        widgetCardType={"leadCard"}
                       
                          cardSettingData={
                            [
                              { ...commonProperties, type: 'title', widgetCardType: 'leadCard', widgetLayout: 'vertical', elementClass: 'videos-caption', lineClamp: 2, marginBottom: 8, elementType: 'p', textIcon: 'whiteRoundPlayIcon' },
                              { ...commonProperties, type: 'small', widgetCardType: 'leadCard' ,widgetLayout: 'vertical', elementClass: 'videos-small-tag', lineClamp : 'inherit', marginBottom: 0, elementType: 'p' },
                            ]
                          }
                       
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

                        cardStyleV={'video-card'}
                        VerticalCardOrder={'videos'}
                      />
                    </a>
                  </div>
                ))}
            </CustomSlideBox>
          </div>
        </ContainerBox>
      </section>
    </>
  );
};

export default VideoHub;
