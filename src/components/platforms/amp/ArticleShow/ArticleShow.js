import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import { PhotoTopStrip } from "@/components/platforms/amp/Widgets/PhotoTopStrip/PhotoTopStrip";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import QuickStories from "@/components/platforms/amp/Widgets/QuickStories/QuickStories";
import { getNewImageUrl } from "@/utils/common";
import SlickSliderWithCounter from "./ArticleSlide";
import ArticlePara from "./ArticlePara";
import style from "./ArticleShowMsite.module.scss";
import Faqs from "../Widgets/Faqs/Faqs";
import TopManagementColleges from "../Widgets/TopManagementColleges/TopManagementColleges";
import NewsUpdatesRhs from "../Widgets/NewsUpdatesRhs/NewsUpdatesRhs";

const ArticleShow = (props) => {
  const { responseData, isMobile=true } = props;
  const { sections } = responseData;

  const CoverVDOAndImg = ({ data: data , agency:agency  , backgroundImageUrl}) => {
    let val = [];
    if (data?.length > 0) {
      val =
        data[0]?.cmstype == "IMAGES" || data[0]?.cmstype == "MEDIAVIDEO"
          ? data[0]
          : [];
      if (data?.length > 0 && val?.length == 0) {
        val = data?.find(
          (el) => el?.cmstype == "IMAGES" || el?.cmstype == "MEDIAVIDEO"
        );
      }
    }
    let type = val?.cmstype || "DEFAULT_IMAGES";
    let imgUrl = getNewImageUrl({
      msid: val?.msid,
      imgWidth: 390,
      imgHeight: 220,
      imgSize: val?.thumbsize ? val?.thumbsize : "",
      isArticleBanner: true,
    });
if (backgroundImageUrl) {
  return imgUrl ;
  
} 

    return (
      <>
      <img
        src={imgUrl}
        alt={val?.title}
        width={390}
        height={220}
      />
      {agency?.name && <p className="Info">Photo : {agency?.name}</p> }
</>
    );
    // switch (type) {
    //   case "IMAGES":
    //     return <NextImage src={imgUrl} alt={val?.title} />;
    //   case "MEDIAVIDEO":
    //     return null;

    //   case "DEFAULT_IMAGES":
    //     return null;
    //   //   <Image
    //   //   src={getNewImageUrl({
    //   //     msid : imgUrl
    //   //   })}
    //   //   alt="Description of the image"
    //   //   layout="responsive"
    //   //   width={500} // Provide a natural width
    //   //   height={525} // Provide a natural height
    //   // />
    //   default:
    //     return "";
    // }
  };

  const componentRenderer = (componentData, sectionIndex) => {
    const { data } = componentData;
    let articleData = data?.length > 0 && data[0];
    let embedData = articleData?.embedData;
  

    let photoSlider = embedData?.filter(
      (item) => item?.photoType?.list?.length > 1
    );

    let sliderBreakPoint = embedData?.findIndex(
      (item) => item?.photoType?.list?.length > 1
    );
    let photoArray = [];
    photoSlider?.map((item) => {
      photoArray = [...photoArray, ...item?.photoType?.list];
    });
    let articleEmbedFirstFold =
      sliderBreakPoint == -1
        ? embedData
        : embedData?.slice(0, sliderBreakPoint + 1);
    return (
      <section>
        
        <div 
        className="Hero-Section" 
        style={{
          backgroundImage: `url(${CoverVDOAndImg({ data: articleData?.cmsassoc, agency: articleData?.agency , backgroundImageUrl:true })})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* {CoverVDOAndImg({ data: articleData?.cmsassoc , agency:articleData?.agency })} */}
        <div className="articleTitle">
        <ContainerBox>
               <h1
                  dangerouslySetInnerHTML={{ __html: articleData?.title }}
                ></h1>
                <span
                dangerouslySetInnerHTML={{ __html: articleData?.synopsis }}
>
                </span>
              </ContainerBox>
       
          
          <PhotoTopStrip
        authors={
          articleData?.authors
            ? articleData?.authors
            : articleData?.agency
        }
        byline={articleData?.Byline}
        metainfo={articleData?.metainfo}
        updatedate={`${
          articleData &&
          articleData?.metainfo &&
          articleData?.metainfo?.LastPublishMilliTime?.value
            ? articleData?.metainfo?.LastPublishMilliTime?.value
            : ''
        }`}
        isAuthor={false}
        item = {articleData}
        />
         </div>
        </div>
        
        <div className={`${style["articleShow-layout"]}`}>
        <div className="articleShow">
        <div className="articleShowRow">
                {articleEmbedFirstFold?.map((item, key) => {
                  return (
                    <ArticlePara
                      key={key}
                      item={item}
                      msid={articleData?.msid}
                    />
                  );
                })}
              </div>
              </div>
        {photoArray?.length > 0 && (
          <SlickSliderWithCounter slides={photoArray} />
        )}
        {sliderBreakPoint != -1 && (
         <div className="articleShow">
           <div className="articleShowRow">
         {embedData?.slice(sliderBreakPoint)?.map((item, key) => {
           return (
             <ArticlePara
               key={key}
               item={item}
               msid={articleData?.msid}
             />
           );
         })}
       </div>
       </div>
        )}
</div>
        <ContainerBox>
          <div className={`${style["grid-layout"]}`}>
          
              <div className={`${style["grid-lhs"]}`}>
              {/* <div className={`${style["EndPage"]}`}>
              <span>End of Article</span>
            </div> */}
            { sections?.article_show?.data?.[0]?.seoschema &&
            <Faqs data={sections?.article_show?.data?.[0]?.seoschema} />
           }
            </div>
            <div className={`${style["grid-rhs"]}`}>

</div>
           
          </div>
          
         
          </ContainerBox>
          { sections?.top_10 &&  <TopManagementColleges  data={sections?.top_10}  isMobile={true}/>}

          <ContainerBox>
         
                {responseData?.rhs_widget?.latest_articles?.children && <NewsUpdatesRhs data={responseData?.rhs_widget?.latest_articles?.children} isListingPage={false} />}
            
          
        </ContainerBox>
     
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
