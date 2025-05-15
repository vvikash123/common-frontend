import style from "./VerticalCard.module.scss";
import Typography from "../Typography/Typography";
import {
  displayTime,
  generateUrlPath,
  getArticleIcon,
  getNewImageUrl,
  mutateArrayOfObject,
  removeHtmlTags
} from "@/utils/common";
import AuthorDetails from "../AuthorDetails/AuthorDetails";
import Button from "../Button/Button";
import CustomSlideBox from "../CustomSlideBox/CustomSlideBox";
import TrendingTags from "../TrendingTags/TrendingTags";
import TitleComponent from "../TitleComponent/TitleComponent";
import ContainerBox from "../ContainerBox/ContainerBox";
import NextImage from "@/utils/NextImage";
import dynamic from "next/dynamic";
import LinkWrapper from "../LinkWrapper/LinkWrapper";

import { CATEGORY_TYPE_VIDEO, MIN_VIDEO_LENGTH } from "@/constants/index";
import React, { useEffect, useState } from "react";
import Head from "next/head";

const MultiVideoPlayer = dynamic(() => import("@/components/common/MultiVideoPlayer/MultiVideoPlayer"), { ssr: false });

function VerticalCard(props) {
  const {
    VerticalCardOrder = "default",
    changeStyle = "figure",    
    imgUrl = "",
    isMoreButtons = false,
    buttonText = "",
    buttonType = "",
    changeButtonStyle = "",
    featuredList = [],
    featuredListStyle = "",
    featuredListType = "",
    cardSettingData,
    defaultTextValues,
    author = "",
    time,
    productLogo = "",
    msid,
    data,
    buttonTextSeo,
    keywords,
    imageWidth,
    item,
    fromHealthMilestones,
    isLazzy,
    nextVideoData=[],
    isMobile=false,
    onVideoStarted ,
    onVideoResumed,
    onVideoPaused,
    onVideoEnded,
    onVideoCompleted,
    autoplay=false,
    playerListData,
    showNextVideocondition,
    CustomClass=false

  } = props;
  const updatedSettingCardData = mutateArrayOfObject(
    cardSettingData,
    defaultTextValues,
    "text"
  );
  const [main, setMain] = useState(data);
  const autoPlay = autoplay ?? false;

  useEffect(() => {
    setMain(data?.[0]);
  }, [msid, data]);

  const [nextPlay, setNextPlay] = useState(nextVideoData);



  const mainData = main || {};
  const continue_watching = typeof window !== "undefined" && typeof localStorage !== "undefined"
    ? JSON.parse(localStorage.getItem("continue_watching")) || []
    : [];

  const filteredWatching = continue_watching.filter(ele => ele?.msid == mainData?.msid);
  const videoStartTime = filteredWatching.length ? filteredWatching[0]?.media?.startTime : "";
  const siteURL = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;
  const articleClass = getArticleIcon(item?.cmstype || '')

  const calculateTime = (item = {}) => {
    if (item?.media?.durationms > MIN_VIDEO_LENGTH) {
      return displayTime(item.media.durationms);
    }
  };

  const nextVideo = () => {

    if (autoPlay) {
      const currentAutoplayIndex = nextPlay.findIndex(
        (o) => o.msid === main.msid
      );
      const nextVideoToPlay =
        nextPlay[
        currentAutoplayIndex >= nextPlay.length - 1 ? 0 : currentAutoplayIndex + 1
        ];
      setMain(nextVideoToPlay);
      if(autoPlay){
        const newPath = `${getTargetURL({
          normalString: nextVideoToPlay?.seopath,
        })}-video-${nextVideoToPlay?.msid}`;
        window.history.replaceState(null, nextVideoToPlay?.title, newPath);
      }
      

      let pagetargetObj = setPageTargetData(
        'video',
        '',
        navigation,
        data.data,
        null,
        nextVideoToPlay?.msid,
      );
      setHandlePageTargetingDataFn(pagetargetObj);

      let newMsid = nextVideoToPlay?.msid;
      let info = { data, navigation, userInfo, newMsid };
      sendGAPageView(
        window?.location?.pathname,
        nextVideoToPlay?.title,
        getGoogleTagCustomDimensions(info, newMsid),
      );
    }
  };
  
  return (
    <>
     

      {VerticalCardOrder === "default" && (
        <figure className={`${style[changeStyle]} ${CustomClass?style['trendingExtraCl']:''}`}>
          <LinkWrapper
            condition={item?.seopath || ""}
            wrapper={child =>
              fromHealthMilestones ? (
                child
              ) : (
                <a
                  href={generateUrlPath(item) || ""}
                  className={`${style["w-100"]} ${style["d-flex"]}`}
                  title={item.title || ''}
                >
                  {child}
                </a>
              )
            }
          >
            {isLazzy &&(
              <Head>
                 <link rel="preload" as="image" href={imgUrl} />
              </Head>
            )}
           <div className={`${style["IconRow"]}`}>
            <NextImage
              changeStyle={changeStyle}
              src={imgUrl}
              priority={isLazzy}
              alt={item?.title || ""}
             //loading="lazy"
            />
            <div className={`${style["Icon"]} ${style[articleClass]}`}>{articleClass}</div>
            </div>
          </LinkWrapper>
          <figcaption className={`${style["figcaption"]}`}>
            {productLogo && (
              <div className={`${style["product-logo"]}`}>
                <NextImage src={productLogo} alt={item?.title || ""} />
              </div>
            )}

            {updatedSettingCardData.map((elem, index) => (
              <LinkWrapper
                key={index}
                condition={index < 3 || ""}
                wrapper={child =>
                  index === 0 && updatedSettingCardData?.length > 1 ? (
                    <a
                      href={`${siteURL}/${removeHtmlTags(elem?.text) || ""}`}
                      className={`${style["w-100"]} ${style["d-flex"]}`}
                      title={elem?.text}
                    >
                      {child}
                    </a>
                  ) : (
                    <a
                      href={generateUrlPath(item) || ""}
                      className={`${style["w-100"]} ${style["d-flex"]}`}
                      title={item?.title}
                    >
                      {child}
                    </a>
                  )
                }
              >
                <Typography
                  elementType={elem?.elementType || "p"}
                  textValue={removeHtmlTags(elem?.text)}
                  smallTextIcon={elem?.textIcon}
                  changeStyle={elem?.elementClass}
                  lineClamp={elem?.lineClamp}
                  marginBottom={elem?.marginBottom}
                />
              </LinkWrapper>
            ))}

            {author && (
              <div className={`${style["footer"]}`}>
                <AuthorDetails author={author} />
                {isMoreButtons && (
                  <div className={`${style["footer-rhs"]}`}>
                    <Button buttonType={"icon"} changeStyle={"share-icon"} />
                    <Button
                      buttonType={"text"}
                      buttonText={"Read More"}
                      changeStyle={"read-more"}
                    />
                  </div>
                )}
              </div>
            )}

            {featuredList.length > 0 && (
              <CustomSlideBox marginBottom={0}>
                {featuredList.map((data, idx) => (
                  <TrendingTags
                    key={idx}
                    isConditionalRendering={true}
                    type={featuredListType}
                    textValue={data.name}
                    icons={data.icon}
                    changeStyle={featuredListStyle}
                  />
                ))}
              </CustomSlideBox>
            )}
          </figcaption>
        </figure>
      )}
      {VerticalCardOrder === "reverse" && (
        <figure className={`${style[changeStyle]}`}>
          <figcaption className={`${style["figcaption"]}`}>
            <TitleComponent
              titleType={"h2"}
              moreButtonLink={""}
              boldText={defaultTextValues.title.split(" ")}
              titleText={defaultTextValues.title}
              marginBottom={12}
              changeStyle={"health-milestones"}
            />

            {updatedSettingCardData.map((item, index) => (
              <Typography
                key={index}
                elementType={item?.elementType || "p"}
                textValue={item?.text}
                smallTextIcon={item?.textIcon}
                changeStyle={item?.elementClass}
                lineClamp={item?.lineClamp}
                marginBottom={item?.marginBottom}
              />
            ))}

            {featuredList.map((data, idx) => (
              <TrendingTags
                key={idx}
                isConditionalRendering={true}
                type={featuredListType}
                textValue={
                  data?.title?.length > 80
                    ? data?.title?.substring(0, 80) + "..."
                    : data?.title
                }
                icons={data.icon}
                changeStyle={featuredListStyle}
                seopath={generateUrlPath(data)}
                wrapper={"anchor"}
              />
            ))}
          </figcaption>

          <NextImage
            changeStyle={changeStyle}
            src={imgUrl}
            layout={"fixed"}
            fill
            alt={item?.title || ""}
            loading="lazy"
          />
        </figure>
      )}
      {VerticalCardOrder === "videos" && (
     <figure className={`${style[changeStyle]}`}>
          <span className={`${style["position-relative"]}`}>
            <NextImage
              changeStyle={changeStyle}
              src={imgUrl}
              alt={item?.title || ""}
              loading="lazy"
            />
            <span className={`${style["duration"]}`}>
              {time && <span className={`${style["time"]}`}>{time}</span>}
            </span>
          </span>
          <figcaption className={`${style["figcaption"]}`}>
            {updatedSettingCardData?.map((item, index) => (
              <Typography
                key={index}
                elementType={item?.elementType || "p"}
                textValue={item?.text}
                smallTextIcon={item?.textIcon}
                changeStyle={item?.elementClass}
                lineClamp={item?.lineClamp}
                marginBottom={item?.marginBottom}
                keywords={keywords}
                VerticalCardOrder={true}
              />
            ))}
          </figcaption>
        </figure>
      )}
      {VerticalCardOrder === "leadVideo" && (
        <figure className={`${style[changeStyle]}`}>
          <figcaption className={`${style["figcaption"]}  ${showNextVideocondition ? null : style['active'] }`}>
            <ContainerBox changeStyle={"container-position"}>
              {isMoreButtons && (
                <div className={`${style["footer-rhs"]}`}>
                  <a
                    key={`${buttonText}`}
                    href={`/search-result/${buttonTextSeo || "health-news"}`}
                    title={`${buttonText}`}
                  >
                    <Button
                      buttonType={buttonType}
                      buttonText={buttonText}
                      changeStyle={changeButtonStyle}
                    />
                  </a>
                </div>
              )}
              {updatedSettingCardData.map((item, index) => (
                <Typography
                  key={index}
                  elementType={item?.elementType || "p"}
                  textValue={item?.text}
                  smallTextIcon={item?.textIcon}
                  changeStyle={item?.elementClass}
                  lineClamp={item?.lineClamp}
                  marginBottom={item?.marginBottom}
                  isMobile={isMobile}
                />
              ))}
            </ContainerBox>
          </figcaption>

          <span className={`${style["position-relative"]} ${showNextVideocondition ? null : style['active'] }`}>
            {mainData?.media &&
            mainData?.media?.id &&
            mainData?.media?.rmname == "Kaltura" ? (
              <>
              <div
                data-attr-slk={mainData?.media?.id}
                title={mainData?.msid}
                style={{ width: "100%" }}
              >
                <MultiVideoPlayer 
                  data={{
                    media: {
                      id: mainData?.media?.id,
                      msid: mainData?.msid,
                    },
                  }}
                  index={11}
                  style={style}
                  articleLength={1}
                  mainData={mainData}
                  videoCount={1}
                  channelTitle={mainData?.media?.id}
                  categoryType={CATEGORY_TYPE_VIDEO}
                  videoId={{
                    id: mainData?.media?.id || "",
                    startTime: videoStartTime || "",
                  }}
                  thumbImg={getNewImageUrl({
                    msid: mainData?.msid || null,
                    imageSize: mainData?.imageSize || mainData?.thumbsize || '',
                    imgWidth: imageWidth || null,
                    imgHeight: 203,
                    is1x1Img: false,
                    isArticleBanner: true,
                    updatedAt: mainData?.updatedate ? mainData?.updatedate : '',
                  })}
                  placeholder
                  msid={mainData?.msid}
                  playerId={mainData?.media?.id}
                  nextVideo={nextVideo} // pass the nextVideo function
                  isAutoplay={autoPlay}
                  isMobile={isMobile}
                  onVideoStarted ={onVideoStarted}
                  onVideoResumed={onVideoResumed}
                  onVideoPaused={onVideoPaused}
                  onVideoEnded={onVideoEnded}
                  onVideoCompleted={onVideoCompleted}
                  playerListData={playerListData}
                />
              </div>

              </>

              
            ) : (
              <div data-attr-slk={mainData?.media?.id} title={mainData?.msid}>
                <iframe
                  src={`https://www.youtube.com/embed/${mainData?.media?.id}`}
                  title="YouTube video player"
                  width="100%"
                  height="500px"
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </span>
          

        </figure>
      )}


    </>
  );
}

export default React.memo(VerticalCard);
