import WidgetCard from "@/components/common/WidgetCard/WidgetCard";
import React, { useState, useEffect } from "react";
import style from "./VideoLeadStory.module.scss";
import {
  getNewImageUrl,
  displayTime,
  generateUrlPath,
  removeHtmlTags,
} from "@/utils/common";
import { commonProperties, MIN_VIDEO_LENGTH } from "@/constants/index";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import ToggleSwitchButton from "@/components/common/ToggleSwitchButton/ToggleSwitchButton";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";

const VideoLeadStory = (props) => {
  const {
    marginBottom,
    key,
    data,
    imageWidth,
    nextVideo = [],
    pagetype,
  } = props;

  const [showNextVideo, setShowNextVideo] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    const storedAutoplay = JSON.parse(localStorage.getItem("autoplay"));
    if (storedAutoplay !== null) {
      setAutoplay(storedAutoplay);
    }
    setCurrentVideoIndex(0);
  }, [data]);

  const handleVideoStarted = () => {
    //console.log('Video Started:', { started: true });
    setShowNextVideo(false);
  };

  const handleVideoResumed = () => {
    //console.log('Video Resumed:', { resume: true });
    setShowNextVideo(false);
  };

  const handleVideoPaused = () => {
   // console.log('Video Paused:', { paused: true });
    setShowNextVideo(true);
  };

  const handleVideoEnded = () => {
    //console.log('Video Ended:', { ended: true });
    if (autoplay && currentVideoIndex < nextVideo.length) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setShowNextVideo(false);
    } else {
      setShowNextVideo(true);
    }
  };

  const handleVideoCompleted = () => {
    console.log('Video Completed:', { completed: true });
    // if (autoplay && currentVideoIndex < nextVideo.length) {
    //   setCurrentVideoIndex(currentVideoIndex + 1);
    //   setShowNextVideo(false);
    // } else {
    //   setShowNextVideo(true);
    // }
  };

  const calculateTime = (item = {}) => {
    if (item?.media?.durationms > MIN_VIDEO_LENGTH) {
      return displayTime(item?.media?.durationms);
    }
  };

  const handleAutoplayToggle = (checked) => {
    setAutoplay(checked);
    localStorage.setItem("autoplay", JSON.stringify(checked));
  };

  const currentVideo = data[currentVideoIndex] || nextVideo[currentVideoIndex - data.length];
  const remainingVideos = nextVideo.slice(currentVideoIndex - data.length + 2);
const playerListData= [];
remainingVideos.length > 0 && remainingVideos.map(item => {
  const playerObj = {
    'title': {
      vdtitle: removeHtmlTags(item.title)
    },
    'imagepath': getNewImageUrl({
      msid: item?.msid || null,
      imageSize: item?.imageSize || item?.thumbsize || "",
      imgWidth: imageWidth || null,
      imgHeight: 203,
      is1x1Img: false,
      isArticleBanner: false,
      updatedAt: item?.updatedate || "",
    }),
    'msid': generateUrlPath(item),
    'id': item?.msid,
    'playerid': "24",
    'description': item?.synopsis,
    'totalcnt': " ",
    'entryid': `/videomediainfo_v1/${item?.msid}.cms?feedtype=json`,
    'seopath': item?.seopath,
    'kalturaid': item?.media?.id,
    'embedId': item?.media?.id,
    'agency': item?.agency?.name || "BCCL",
    'mediadate': new Date(item?.updatedate).toLocaleString(),
    'su': item?.media?.sourcexml ,
  }
  playerListData.push(playerObj)
})

  return (
    currentVideo && (
      <>
        <section
          className={style["VideoLeadStory"]}
          style={{ marginBottom: `${marginBottom}px` }}
          key={key}
        >
          <ContainerBox changeStyle={"container"}>
            <div className={`${style["lead-story-col"]}`}>
              <WidgetCard
                isConditionalRendering={true}
                widgetCardType={"leadCard"}
                isMoreButtonsV={true}
                buttonTypeV={"text"}
                data={[currentVideo]}
                buttonTextV={
                  currentVideo?.keywords?.[0]?.name || "Health News"
                }
                buttonTextSeo={currentVideo?.keywords?.[0]?.keywordseo}
                changeButtonStyleV={"video-lead-story-button"}
                cardSettingData={[
                  {
                    ...commonProperties,
                    type: "title",
                    widgetCardType: "leadCard",
                    widgetLayout: "vertical",
                    elementClass: "videos-caption",
                    lineClamp: 3,
                    marginBottom: 8,
                    elementType: pagetype === "show" ? "h1" : "p",
                  },
                  {
                    ...commonProperties,
                    type: "para",
                    widgetCardType: "leadCard",
                    widgetLayout: "vertical",
                    elementClass: "videos-para",
                    lineClamp: 3,
                    marginBottom: 8,
                    elementType: "p",
                    textValue:
                      "Heart Health: Blood-thinning foods are necessary for the treatment or prevention of certain medical conditions that increase the risk of blood clots.",
                  },
                ]}
                verticalList={[
                  {
                    title: `${currentVideo?.title}`,
                    imgUrl: getNewImageUrl({
                      msid: currentVideo?.msid || null,
                      imageSize: currentVideo?.imageSize || currentVideo?.thumbsize || "",
                      imgWidth: imageWidth || null,
                      imgHeight: 203,
                      is1x1Img: false,
                      isArticleBanner: false,
                      updatedAt: currentVideo?.updatedate ? currentVideo?.updatedate : "",
                    }),
                    time: calculateTime(currentVideo),
                    synopsis: currentVideo?.synopsis,
                    smallText: currentVideo?.smallText,
                  },
                ]}
                cardStyleV={"video-lead-card"}
                VerticalCardOrder={"leadVideo"}
                marginBottom={-90}
                nextVideo={remainingVideos}
                autoplay={autoplay}
                onVideoStarted={handleVideoStarted}
                onVideoResumed={handleVideoResumed}
                onVideoPaused={handleVideoPaused}
                onVideoEnded={handleVideoEnded}
                onVideoCompleted={handleVideoCompleted}
                playerListData={playerListData}
                showNextVideocondition={showNextVideo}
              />
            </div>
          </ContainerBox>
          {showNextVideo && remainingVideos.length > 0 && (
            <div className={style["video-Hover-relative"]}>
              <div className={style["head-section"]}>
                <TitleComponent
                  titleType={"h2"}
                  changeStyle={"up-next-title"}
                  moreButtonLink={""}
                  boldText={["Next"]}
                  titleText={"Up Next"}
                  marginBottom={0}
                />
                <ToggleSwitchButton onToggle={handleAutoplayToggle} />
              </div>

              <div className={style["video-Hover"]}>
                {remainingVideos.slice(0, 15).map((item, index) =>
                  item?.media &&
                  item.media.id &&
                  item.media.rmname === "Kaltura" ? (
                    <div key={index} className={style["video-Row"]}>
                      <a
                        key={`${item?.msid}`}
                        href={generateUrlPath(item)}
                        title={`${removeHtmlTags(item?.title)}`}
                      >
                        <div className={style["video-Row-img"]}>
                          <img
                            src={getNewImageUrl({
                              msid: item?.msid || null,
                              imageSize:
                                item?.imageSize || item?.thumbsize || "",
                              imgWidth: imageWidth || null,
                              imgHeight: 203,
                              is1x1Img: false,
                              isArticleBanner: false,
                              updatedAt: item?.updatedate || "",
                            })}
                            alt={`${item?.title}`}
                          />
                          <span>{calculateTime(item)}</span>
                        </div>
                        <div className={style["Intro"]}>
                          <SpriteIcon IconName="blackRoundPlayIcon" />
                          <h2>{removeHtmlTags(item?.title)}</h2>
                        </div>
                      </a>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}
        </section>
      </>
    )
  );
};

VideoLeadStory.defaultProps = {
  marginBottom: 60,
  imageWidth: 300,
};

export default VideoLeadStory;
