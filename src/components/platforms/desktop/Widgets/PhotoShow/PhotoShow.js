import { useEffect, useState, useRef, useCallback } from "react";
import style from "./PhotoShow.module.scss";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import { PhotoTopStrip } from "../../../../common/PhotoTopStrip/PhotoTopStrip";
import NextImage from "@/utils/NextImage";
import { getNewImageUrl, getGoogleTagCustomDimensions } from "@/utils/common";
import { sendGAPageView } from "@/helpers/analytics/gaUtils";
import HealthAtoZ from "@/components/platforms/desktop/Widgets/HealthAtoZ/HealthAtoZ";
import QuickStories from "@/components/platforms/desktop/Widgets/QuickStories/QuickStories";
import GridLayout from "@/components/common/GridLayout/GridLayout";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import GridRhs from "@/components/common/GridRhs/GridRhs";
import Advertisement from "@/components/ads/ads";
import NewsletterWidget from "@/components/platforms/mobile/Widgets/NewsletterWidget/NewsletterWidget";
import RhsRelatedTopic from '@/components/common/Rhs/RhsRelatedTopic/RhsRelatedTopic';


import { useRouter } from "next/router";
const PhotoShow = (props) => {
  const { data, isMobile, componentData, msid, params } = props;
  const fullSlideList = data[0].slides;
  const photoSlideRefs = useRef([]);
  const [photoSlideIndices, setPhotoSlideIndices] = useState([]);
  let photoSlideIndex = 0;

  const countNonAdItems = data[0]?.slides.filter(
    (item) => !item.hasOwnProperty("ad")
  ).length;

  const updateUrlAndTitle = useCallback(
    (id, jumpid) => {
      const currentItemId = parseInt(id.split("_").pop());
      const currentArticleData = fullSlideList?.filter(
        (value) => value.msid === currentItemId
      );

      if (currentArticleData?.length > 0) {
        const data = {};
        data["data"] = fullSlideList;
        const { title, parentid, seopath } = currentArticleData[0];
        const photomsid = fullSlideList[0]?.msid;
        const info = { data, msid: photomsid };
        let correctSeoPathArr = seopath?.split("/");
        correctSeoPathArr?.pop();
        const newUrl = `/${correctSeoPathArr?.join(
          "/"
        )}-photostory-${parentid}/${jumpid}`;
        window.history.replaceState(null, title, newUrl);
        // Assuming sendGAPageView and getGoogleTagCustomDimensions are defined elsewhere
        sendGAPageView(
          newUrl,
          title,
          getGoogleTagCustomDimensions(info, currentItemId)
        );
      }
    },
    [fullSlideList]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.1) {
            const jumpid = entry.target.getAttribute("data-index");
            if (jumpid > 1) {
              updateUrlAndTitle(entry.target.id, jumpid);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    photoSlideRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      photoSlideRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [photoSlideRefs.current, updateUrlAndTitle]);

  useEffect(() => {
    const newPhotoSlideIndices = data[0].slides.reduce((acc, slide, index) => {
      if (slide.widgetType === "PHOTO_SLIDE") {
        acc.push(index + 1);
      }
      return acc;
    }, []);
    setPhotoSlideIndices(newPhotoSlideIndices);
  }, [data]);

  if (!data || !data[0]) return null;
  const Widgets = {
    health_widget: HealthAtoZ,
    web_stories: QuickStories,
  };

  const WidgetsRenderer = (widgetData, index) => {
    const widgetsToRender = [];

    if (widgetData?.web_stories) {
      widgetsToRender.push({
        type: "web_stories",
        widget: Widgets["web_stories"],
        data: widgetData.web_stories,
      });
    }

    if (widgetData?.health_widget) {
      widgetsToRender.push({
        type: "health_widget",
        widget: Widgets["health_widget"],
        data: widgetData.health_widget,
      });
    }

    return widgetsToRender.map((widgetItem, idx) => {
      const Widget = widgetItem.widget;
      return (
        <div
          id="checkview"
          key={`article_list_widget_${widgetData.msid}_${widgetItem.type}_${idx}`}
        >
          <Widget
            key={`widget_${widgetData.msid}_${widgetItem.type}`}
            params={params}
            componentData={widgetItem || {}}
            data={widgetItem.data || []}
            isConditionalRendering={true}
            getMSID={msid}
            sectionIndex={index}
            pageType={`photoStory`}
            showAds={true}
            isMobile={isMobile}
          />
        </div>
      );
    });
  };


let mainData = data.length > 0 && data[0];
  return (
    <section>
      <PhotoTopStrip 
        authors={
          mainData.authors
            ? mainData?.authors
            : mainData?.agency
        }
        byline={mainData?.Byline}
        metainfo={mainData.metainfo}
        updatedate={`${
          mainData &&
          mainData?.metainfo &&
          mainData?.metainfo?.LastPublishMilliTime?.value
            ? mainData?.metainfo?.LastPublishMilliTime?.value
            : ''
        }`}
        isAuthor={false}
        item = {mainData}
      />
      <ContainerBox>
        <GridLayout>
          <GridLhs>
            <div className={style["grid-layout"]}>
              <div className={style["grid-lhs"]}>
                <div className={style["PhotoShow"]}>
                  <div className={style["PhotoShowIntro"]}>
                    <h1>{data[0].title}</h1>
                    <div
                      className={style["Intro"]}
                      dangerouslySetInnerHTML={{ __html: data[0].synopsis }}
                    ></div>
                  </div>

                  {data[0].slides.map((slide, index) => {
                    if (slide.widgetType === "PHOTO_SLIDE") {
                      photoSlideIndex++;
                      return (
                        <div
                          className={`${style["PhotoShowRow"]}`}
                          id={`slide_${slide?.msid}`}
                          ref={(el) => (photoSlideRefs.current[index] = el)}
                          data-index={photoSlideIndex}
                          key={index}
                        >
                          <div className={`${style["Img"]}`}>
                            <NextImage
                              src={getNewImageUrl({
                                msid: slide?.msid || null,
                                imageSize:
                                  slide?.imageSize || slide?.thumbsize || "",
                                imgWidth: 200 || null,
                                imgHeight: 203,
                              })}
                            />
                            <p>
                              <strong>{photoSlideIndex}</strong>/
                              {countNonAdItems}
                            </p>
                          </div>
                          <h2>{slide?.title}</h2>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: slide?.synopsis,
                            }}
                          ></div>
                        </div>
                      );
                    } else if (slide?.widgetType === "ad") {
                      return (
                        // <div key={index}>
                        //           <Advertisement src={ slide?.ad} />

                        // </div>
                        null
                      );
                    } else {
                      return null;
                    }
                  })}

                  <div className={style["EndPage"]}>
                    <span>End of Article</span>
                  </div>
                </div>
              </div>
            </div>
          </GridLhs>
          <GridRhs>
            {data?.ads && <Advertisement src={responseData?.ads.atf} />}
            <RhsRelatedTopic data={data[0]?.related_topic_widget} />
            <NewsletterWidget />
          </GridRhs>
        </GridLayout>
        
      </ContainerBox>
      {data.map((item, index) => WidgetsRenderer(item, index))}
    </section>
  );
};

export default PhotoShow;
