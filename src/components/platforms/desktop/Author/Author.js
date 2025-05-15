import { useState } from "react";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import BlackPageHeader from "../Widgets/BlackPageHeader/BlackPageHeader";
import GridLayout from "@/components/common/GridLayout/GridLayout";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import GridRhs from "@/components/common/GridRhs/GridRhs";
import NewsletterWidget from "../../mobile/Widgets/NewsletterWidget/NewsletterWidget";
import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import Tags from "@/components/common/Rhs/RhsTags/Tags";
import AuthorWidget from "./AuthorWidget";
import TrendingSearch from "@/components/platforms/desktop/Widgets/TrendingSearch/TrendingSearch";
import { fetchLoadMoreWebStoriesData } from "@/pages/api";

const Author = ({ responseData, isMobile, isDocterPage = false }) => {
  const authorShowData = responseData?.sections?.author_show || {};
  const [getTabName, setTabName] = useState("all");
  const [data, setData] = useState(authorShowData?.all || []);

  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showLoadingBtn, setShowLoadingBtn] = useState(authorShowData?.all?.length-1 < 12 ? false : true);

  const tagsData = [
    { title: "All", seopath: "all" },
    { title: "News", seopath: "article" },
    { title: "Photos", seopath: "image" },
    { title: "Videos", seopath: "video" },
  ];
  const contentTypeMap = new Map([
    ["all", "ARTICLE,VIDEO,AUDIO,IMAGE"],
    ["article", "ARTICLE"],
    ["image", "IMAGE"],
    ["video", "VIDEO"],
  ])

  const trendingSearchData = {
    data: {
      title: authorShowData?.data?.trending_search?.title || '',
      children: authorShowData?.data?.trending_search?.children || [],
    },
  };

  const getTabItems = (params) => {
    setTabName(params.seopath);
    setData(authorShowData[params.seopath]);
    setShowLoadingBtn(authorShowData[params.seopath]?.length < 9 ? false : true);
    setPageNo(1);
  };

  const loadMoreData = async () => {
    setLoading(true);
    const newPage = pageNo + 1;
    setPageNo(newPage);
    const channelId = process?.env?.NEXT_PUBLIC_HOST_ID;
    const API_URL = process?.env?.NEXT_PUBLIC_API_URL;
    const limit = 13;
    const contenttype = contentTypeMap?.has(getTabName) ? contentTypeMap.get(getTabName) : contentTypeMap.get('all');
    const url = `${API_URL}/request/authorprofile?authorid=${authorShowData?.data?.id}&perpage=${limit}&pageno=${newPage}&origin=desktop&contenttype=${contenttype}&channel=${channelId}`;
    const response = await fetchLoadMoreWebStoriesData(url);
    const showData = response?.sections?.author_show || {};
    if (getTabName === "all") {
      setData([...data, ...showData?.all]);
      setShowLoadingBtn(showData?.all?.length < 9 ? false : true);
    } else if (getTabName === "article") {
      setData([...data, ...showData?.article]);
      setShowLoadingBtn(showData?.article?.length < 9 ? false : true);
    } else if (getTabName === "image") {
      setData([...data, ...showData?.image]);
      setShowLoadingBtn(showData?.image?.length < 9 ? false : true);
    } else if (getTabName === "video") {
      setData([...data, ...showData?.video]);
      setShowLoadingBtn(showData?.video?.length < 9 ? false : true);
    }
    setLoading(false);
  };

  return (
    <section>

      <BlackPageHeader
        marginBottom={12}
        textTitle={""}
        boldText={""}
        fromAuthor={true}
        fromDoctor={isDocterPage}
        responseData={responseData}
      />


      <ContainerBox>
        <GridLayout>
          <GridLhs>
            <CustomSlideBox>
              {tagsData?.length &&
                tagsData?.map((data, idx) => (
                  <TrendingTags
                    key={idx}
                    isConditionalRendering={true}
                    bulletNumbers={idx + 1}
                    type={"strongText"}
                    textValue={data?.title || ""}
                    seopath={data?.seopath || ""}
                    changeStyle={"bg-gray-color"}
                    wrapper={""}
                    loadSubNavigationDataFn={getTabItems}
                    isActive={getTabName === data.seopath ? "active" : ""}
                  />
                ))}
            </CustomSlideBox>
            <AuthorWidget
              data={data || []}
              seopath={responseData?.sections?.author_show?.data?.seopath || ""}
              getMSID={responseData?.sections?.author_show?.data?.msid}
              loadMoreData={loadMoreData}
              loading={loading}
              showLoadingBtn={showLoadingBtn}
            />
          </GridLhs>

          <GridRhs>
            <Tags
              data={
                responseData?.sections?.author_show?.data?.rhs_widget
                  ?.children || []
              }
              title={
                responseData?.sections?.author_show?.data?.rhs_widget?.title ||
                ""
              }
            />
            <br />
            {/* <AdCaller
              {...responseData?.ads.atf}
              className={`${style.bottomStickyAd} ${style['ads-title']}`}
            /> */}
            <NewsletterWidget />
          </GridRhs>
        </GridLayout>
      </ContainerBox>
      <TrendingSearch componentData={trendingSearchData} />
    </section>
  );
};

export default Author;
