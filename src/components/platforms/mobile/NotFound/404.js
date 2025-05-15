import { useState, useEffect } from "react";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import s from './NotFound.module.scss';
import NextImage from "@/utils/NextImage";
import CommonGridBox from "@/components/common/CommonGridBox/CommonGridBox";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import ArticlesWidget from "@/components/common/ArticlesWidget/ArticlesWidget";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import { fetchCategoryListingData } from "@/pages/api";
import { getNewImageUrl, getSlug, getTargetURL } from "@/utils/common";
import { getAuthorDetailDate } from "@/utils/dateUtils";

const NotFound404 = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const data = await fetchCategoryListingData("desktop", "news", 1, 10);
        const { sections = {} } = data;

        const sectionData =
          Object?.keys(sections).length > 0
            ? sections[Object.keys(sections)[0]]
            : [];
        const totalRecords = sectionData?.childcount || 0;

        // Update state with max 8 items
        setCategoryData((sectionData?.children || []).slice(0, 8));
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`${s['my-60']}`}>
      <ContainerBox>
        <div className={`${s['notfound']}`}>
          <div className={`${s['not_found_img']}`}>
            <NextImage
              src={`${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/assets/icons/education/404.svg`}
              alt="404 Not Found"
            />
          </div>
          <div className={`${s['not_found_text']}`}>
            <strong>Whoops, that page is gone</strong>
            <p>It might have been removed, had its name changed, or is temporarily unavailable.</p>
          </div>
        </div>
        <div className={`${s['back__button']}`}>
          <a href="/" className={`${s['back-link']}`}>
            Go to Homepage
            <SpriteIcon IconName="Links" />
          </a>
        </div>
      </ContainerBox>
      <ContainerBox marginTop={50}>
        <TitleComponent
          title="Latest Articles"
          link="/news"
          margin="0px 0 20px 0"
          headingLevel="h2"
        />
        <CommonGridBox gridType="gridBox" changeStyle="grid-1"
         yGap={16}
         xGap={23}>
          {isLoading ? (
            <p>Loading articles...</p> // Loading state message
          ) : categoryData.length > 0 ? (
            categoryData.map((item) => (
              <ArticlesWidget
                key={`${item?.msid}_articlelist_item`}
                imageUrl={getNewImageUrl({
                  msid: item?.msid || null,
                  imageSize: item?.imageSize || item?.thumbsize || "",
                  imgWidth: 200,
                  imgHeight: 200,
                  is1x1Img: false,
                  isArticleBanner: false,
                  updatedAt: item?.updatedate ? item?.updatedate : "",
                })}
                updatedDate={getAuthorDetailDate(item?.updatedate)}
                title={item?.title}
                description={item?.synopsis}
                readMoreLink={getTargetURL({
                  ...(item?.overridelink && {
                    overrideString: item?.overridelink,
                  }),
                  normalString: `${item?.seopath}-${getSlug(
                    item?.cmstype
                  )}-${item?.msid}`,
                })}
              />
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </CommonGridBox>
      </ContainerBox>
    </div>
  );
};

export default NotFound404;
