import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import Faqs from "@/components/common/Faqs/Faqs";
import GridRhs from "@/components/common/GridRhs/GridRhs";
import NewsUpdatesRhs from "@/components/common/NewsUpdatesRhs/NewsUpdatesRhs";
import { PhotoTopStrip } from "@/components/common/PhotoTopStrip/PhotoTopStrip";
import TopManagementColleges from "@/components/common/TopManagementColleges/TopManagementColleges";
import NextImage from "@/utils/NextImage";
import { getNewImageUrl } from "@/utils/common";
import ArticlePara from "./ArticlePara";
import style from "./ArticleShow.module.scss";
import SlickSliderWithCounter from "./ArticleSlide";

const ArticleShow = (props) => {
  const { responseData, isMobile } = props;
  const { sections } = responseData;

  const CoverVDOAndImg = ({ data, agency }) => {
    let selectedItem =
      data?.find((item) => item.cmstype === "IMAGES" || item.cmstype === "MEDIAVIDEO") || {};

    const imgUrl = getNewImageUrl({
      msid: selectedItem.msid,
      imgWidth: 1600,
      imgHeight: 328,
      imgSize: selectedItem.thumbsize || "",
      isArticleBanner: true,
    });

    return (
      <>
        <NextImage
          src={imgUrl}
          alt={selectedItem?.title || "Image"}
          width={1600}
          height={328}
          layout="fixed"
        />
        {agency?.name && <p className={style.Intro}>Photo: {agency.name}</p>}
      </>
    );
  };

  const componentRenderer = (componentData, sectionIndex) => {
    const { data } = componentData;
    const articleData = data?.[0] || {};
    const embedData = articleData.embedData || [];

    const photoSlider = embedData.filter((item) => item.photoType?.list?.length > 1);
    const sliderBreakPoint = embedData.findIndex((item) => item.photoType?.list?.length > 1);
    const photoArray = photoSlider.flatMap((item) => item.photoType.list);

    const articleEmbedFirstFold =
      sliderBreakPoint === -1 ? embedData : embedData.slice(0, sliderBreakPoint + 1);
      
      // console.log("@@sections?.top_10", sections?.top_10);
    return (
      <section key={sectionIndex}>
        <div className={style["Hero-Section"]}>
          <div className={style.articleTitle}>
            <ContainerBox>
              <h1 dangerouslySetInnerHTML={{ __html: articleData?.title }} />
              <span dangerouslySetInnerHTML={{ __html: articleData?.synopsis }} />
            </ContainerBox>
          </div>
          <CoverVDOAndImg data={articleData?.cmsassoc} agency={articleData?.agency} />
          <PhotoTopStrip
            authors={articleData?.authors || articleData?.agency}
            byline={articleData?.Byline}
            metainfo={articleData?.metainfo}
            updatedate={
              articleData?.metainfo?.LastPublishMilliTime?.value || ""
            }
            isAuthor={false}
            item={articleData}
          />
        </div>

        <ContainerBox>
          <div className={style["grid-layout"]}>
            <div className={style["grid-lhs"]}>
              <div className={style["articleShow-rhs"]}>
                {articleEmbedFirstFold.map((item, key) => (
                  <ArticlePara key={key} item={item} msid={articleData?.msid} />
                ))}
                <div className={style.articleShowAd}></div>
              </div>
            </div>
            {!isMobile && (
              <div className={style["grid-rhs"]}>
                <GridRhs>
                  {responseData?.rhs_widget?.latest_articles?.children && (
                    <NewsUpdatesRhs
                      data={responseData.rhs_widget.latest_articles.children}
                      isListingPage={false}
                    />
                  )}
                </GridRhs>
              </div>
            )}
          </div>
        </ContainerBox>

        {photoArray.length > 0 && <SlickSliderWithCounter slides={photoArray} />}
        {sliderBreakPoint !== -1 && (
          <ContainerBox>
            <div className={style["grid-layout"]}>
              <div className={style["grid-lhs"]}>
                <div className={style["articleShow-rhs"]}>
                  {embedData.slice(sliderBreakPoint).map((item, key) => (
                    <ArticlePara key={key} item={item} msid={articleData?.msid} />
                  ))}
                  <div className={style.articleShowAd}></div>
                </div>
              </div>
            </div>
          </ContainerBox>
        )}

        <ContainerBox>
          <div className={style["grid-layout"]}>
            <div className={style["grid-lhs"]}>
              {/* <div className={style.EndPage}>
                <span>End of Article</span>
              </div> */}
              {sections?.article_show?.data?.[0]?.seoschema && (
                <Faqs data={sections.article_show.data[0].seoschema} />
              )}
            </div>
            <div  className={style["grid-rhs"]}></div>
          </div>
        </ContainerBox>

       { sections?.top_10 && <TopManagementColleges isMobile={false} data={sections?.top_10} />}
      </section>
    );
  };

 // Pass only one section
 const selectedSectionKey = "article_show"; // Replace with the desired section key
 const selectedSection = sections[selectedSectionKey];

 return (
   <div>
     {selectedSection &&
       componentRenderer(selectedSection, selectedSectionKey)}
   </div>
 );
};

export default ArticleShow;
