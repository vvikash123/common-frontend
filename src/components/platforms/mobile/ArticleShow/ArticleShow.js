import dynamic from 'next/dynamic';
import Head from 'next/head';
import style from "./ArticleShowMsite.module.scss";
import { getNewImageUrl } from "@/utils/common";
import { PhotoTopStrip } from "@/components/common/PhotoTopStrip/PhotoTopStrip";
import ArticlePara from "./ArticlePara";
import Image from "next/image";

const ContainerBox = dynamic(() => import('@/components/common/ContainerBox/ContainerBox'), { ssr: true });
const Faqs = dynamic(() => import('@/components/common/Faqs/Faqs'), { ssr: false });
const TopManagementColleges = dynamic(() => import('@/components/common/TopManagementColleges/TopManagementColleges'), { ssr: false });
const NewsUpdatesRhs = dynamic(() => import('@/components/common/NewsUpdatesRhs/NewsUpdatesRhs'), { ssr: false });
const SlickSliderWithCounter = dynamic(() => import('./ArticleSlide'), { ssr: false });

const ArticleShow = ({ responseData, isMobile = true }) => {
  const { sections } = responseData;
  const selectedSection = sections["article_show"];

  const CoverVDOAndImg = (data) => {
    const selectedItem = data?.find(item => item.cmstype === "IMAGES" || item.cmstype === "MEDIAVIDEO") || {};
    return getNewImageUrl({
      msid: selectedItem.msid,
      imgWidth: isMobile ? 400 : 1600,
      imgHeight: 328,
      imgSize: selectedItem.thumbsize || "",
      isArticleBanner: false,
    });
  };

  if (!selectedSection) return null;

  const articleData = selectedSection.data?.[0] || {};
  const embedData = articleData?.embedData || [];
  const photoSlider = embedData.filter(item => item?.photoType?.list?.length > 1);
  const photoArray = photoSlider.flatMap(item => item.photoType.list);
  const heroImgUrl = CoverVDOAndImg(articleData.cmsassoc);

  return (
    <div>
      <section>
        <div className={style["Hero-Section"]} style={{ minHeight: "380px" }}> 
          <Image
            src={heroImgUrl}
            alt={articleData.title || "Hero image"}
            width={isMobile ? 400 : 1600}
            height={328}
            priority
            fetchpriority="high"
            sizes="100vw"
            style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
          />
          <div className={style["articleTitle"]}>
            <ContainerBox>
              <h1 dangerouslySetInnerHTML={{ __html: articleData.title }}></h1>
              <span className={style["IntroRow"]} dangerouslySetInnerHTML={{ __html: articleData.synopsis }}></span>
            </ContainerBox>
            <PhotoTopStrip
              authors={articleData.authors || articleData.agency}
              byline={articleData.Byline}
              metainfo={articleData.metainfo}
              updatedate={articleData?.metainfo?.LastPublishMilliTime?.value || ''}
              isAuthor={false}
              item={articleData}
            />
          </div>
        </div>

        <ContainerBox>
          <div className={style["grid-layout"]}>
          <div className={style["articleShow-rhs"]}>
          
            {embedData.map((item, key) => (
              <ArticlePara key={key} item={item} msid={articleData.msid} />
            ))}
          </div>
          </div>
        </ContainerBox>

        {photoArray.length > 0 && <SlickSliderWithCounter slides={photoArray} />}

        {selectedSection?.data?.[0]?.seoschema && (
          <ContainerBox>
            <Faqs data={selectedSection.data[0].seoschema} />
          </ContainerBox>
        )}

        {sections?.top_10 && (
          <TopManagementColleges data={sections.top_10} isMobile={true} />
        )}

        {responseData?.rhs_widget?.latest_articles?.children && (
          <ContainerBox>
            <NewsUpdatesRhs data={responseData.rhs_widget.latest_articles.children} isListingPage={false} />
          </ContainerBox>
        )}
      </section>
    </div>
  );
};

export default ArticleShow;
