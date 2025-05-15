import ArticlesHeroSection from "@/components/common/ArticlesHeroSection/ArticlesWidget";
import ArticlesWidget from "@/components/common/ArticlesWidget/ArticlesWidget";
import CommonGridBox from "@/components/common/CommonGridBox/CommonGridBox";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import GridLayout from "@/components/common/GridLayout/GridLayout";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import GridRhs from "@/components/common/GridRhs/GridRhs";
import TopTenWidgetRhs from "@/components/common/TopTenWidgetRhs/TopTenWidgetRhs";
import DynamicMetasLinks from "@/helpers/seo/DynamicMetasLinks";
import ItemSchema from "@/helpers/seo/schemas/ItemSchema";
import { getNewImageUrl, getSlug, getTargetURL } from "@/utils/common";
import getCommonServerSideProps from "@/utils/dataFetching";
import { getAuthorDetailDate } from "@/utils/dateUtils";
import { useState } from "react";
import Layout from "../../layouts/CustomLayout";
import { fetchCategoryListingData } from "../api";
import Button from "@/components/common/Button/Button";

const Category = ({
  data,
  isMobile,
  sectionData,
  category,
  seoData,
  totalRecords,
  rhswidget,
  limit,
  pageNumber
}) => {
  const breadCrumbData = sectionData?.seopath || "/web-stories";
  const customeEvent = {
    page_template: "Category",
    section: category,
  };

  const [articleListData, setArticleListData] = useState(sectionData);
  const [currentPage, setCurrentPage] = useState(pageNumber || 2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    
    try {
      const nextPage = currentPage + 1;
      const newArticles = await fetchCategoryListingData(
        isMobile ? "mobile" : "desktop",
        category,
        nextPage,
        limit
      );
      
      const newSectionData = newArticles?.sections?.[Object.keys(newArticles.sections)[0]] || {};
      if (!newSectionData?.children?.length) {
        setHasMore(false);
      } else {
        setArticleListData((prevData) => ({
          ...prevData,
          children: [...prevData.children, ...newSectionData?.children],
        }));
        setCurrentPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching more articles:", error);
    }
    
    setLoading(false);
  };

  return (
    <>
      <DynamicMetasLinks
        seoData={{ seo: seoData }}
        customeEvent={customeEvent}
      />
      <ItemSchema data={articleListData?.children} />
      <Layout data={data} isMobile={isMobile} breadCrumbData={breadCrumbData}>
        <ArticlesHeroSection title="Latest Education News" />
        <ContainerBox marginTop={30} marginBottom={30}>
          <GridLayout>
            <GridLhs>
              {isMobile ? (
                <CommonGridBox
                  gridType={"gridBox"}
                  changeStyle={"grid-1"}
                  yGap={16}
                  xGap={23}
                  marginBottom={10}
                >
                  {articleListData?.children &&
                    articleListData?.children.map((item, index) => (
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
                    ))}
                </CommonGridBox>
              ) : (
                <CommonGridBox
                  gridType={"gridBox"}
                  changeStyle={"grid-3"}
                  yGap={16}
                  xGap={23}
                  marginBottom={20}
                >
                  {articleListData?.children &&
                    articleListData?.children.map((item, index) => (
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
                    ))}
                </CommonGridBox>
              )}

              {hasMore ? (
                <div>
                  <Button onClick={loadMoreData} buttonText={loading ? "Loading..." : "Show More"} />
                </div>
              ) : (
                <p style={{ textAlign: "center", marginTop: "20px", fontSize: "16px", color: "#666" }}>
                  No more data to display
                </p>
              )}
            </GridLhs>
            {!isMobile && (
              <GridRhs>
                {/* <NotificationsRhs /> */}
                {rhswidget?.top10Colleges && <TopTenWidgetRhs data={rhswidget?.top10Colleges} isListingPage = {true} />}
                {/* <ContactInformationRhs /> */}
              </GridRhs>
            ) }
          </GridLayout>
          {isMobile && rhswidget?.top10Colleges  && <TopTenWidgetRhs data={rhswidget?.top10Colleges} isListingPage = {true} />}
        </ContainerBox>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { page = 1 } = context.query;
    const limit = 30;
    const pageNo = page;
    const category = context?.query?.category || "";
    const commonProps = await getCommonServerSideProps(context);
    const { deviceType } = commonProps?.props;
    const CategoryData = await fetchCategoryListingData(
      deviceType,
      category,
      pageNo,
      limit
    );
    if (!CategoryData) {
      return {
        notFound: true,
      };
    }

    const { sections = {} } = CategoryData;
    const sectionData =
      Object?.keys(sections).length > 0
        ? sections[Object.keys(sections)[0]]
        : [];
    const totalRecords = sectionData?.childcount || 0;
    const rhswidget = CategoryData?.rhswidget;
    const seoData = CategoryData?.seo;

    if (totalRecords === 0) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        ...commonProps.props,
        sectionData,
        category,
        totalRecords,
        seoData,
        rhswidget,
        limit,
        pageNumber : Number(page)
      },
    };
  } catch (err) {
    return {
      props: {
        error: err.message,
      },
    };
  }
}

export default Category;
