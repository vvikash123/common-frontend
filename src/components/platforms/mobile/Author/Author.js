import { useState, useEffect } from "react";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import BlackPageHeader from "../Widgets/BlackPageHeader/BlackPageHeader";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import NewsletterWidget from "../Widgets/NewsletterWidget/NewsletterWidget";
import AuthorWidget from "./AuthorWidget";

import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";
import { fetchLoadMoreWebStoriesData } from "@/pages/api";
import Tags from "@/components/common/Rhs/RhsTags/Tags";

const Author = ({ responseData, isMobile, isDocterPage = false }) => {
  const authorShowData = responseData?.sections?.author_show || {};
  const [getTabName, setTabName] = useState("all");
  const [data, setData] = useState(authorShowData?.all || []);
  const trendingSearchData = responseData?.sections?.tnn_health_trending_search;

  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showLoadingBtn, setShowLoadingBtn] = useState(authorShowData?.all?.length < 9 ? false : true);

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
  const getTabItems = (params) => {
    setTabName(params.seopath);
    setData(authorShowData[params.seopath]);
  };

  const loadMoreData = async () => {
    setLoading(true);
    const newPage = pageNo + 1;
    setPageNo(newPage);
    const channelId = process?.env?.NEXT_PUBLIC_HOST_ID;
    const API_URL = process?.env?.NEXT_PUBLIC_API_URL;
    const limit = 9;
    const contenttype = contentTypeMap?.has(getTabName) ? contentTypeMap.get(getTabName) : contentTypeMap.get('all');
    const url = `${API_URL}/request/authorprofile?authorid=${authorShowData?.data?.id}&perpage=${limit}&pageno=${newPage}&origin=desktop&contenttype=${contenttype}&channel=${channelId}`;
    const response = await fetchLoadMoreWebStoriesData(url);
    const showData = response?.sections?.author_show || {};
    if (getTabName === "all") {
      setData([...data, ...showData?.all]);
    } else if (getTabName === "article") {
      setData([...data, ...showData?.article]);
    } else if (getTabName === "image") {
      setData([...data, ...showData?.image]);
    } else if (getTabName === "video") {
      setData([...data, ...showData?.video]);
    }
    setShowLoadingBtn(showData?.all?.length < 9 ? false : true);
    setLoading(false);
  };

  return (
    <>
      <BlackPageHeader
        marginBottom={12}
        textTitle={""}
        boldText={""}
        fromAuthor={true}
        fromDoctor={isDocterPage}
        responseData={responseData}
      />

      <ContainerBox marginTop={20}>
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
          componentData={responseData}
          data={data || []}
          seopath={responseData?.sections?.author_show?.data?.seopath || ""}
          getMSID={responseData?.sections?.author_show?.data?.msid}
          loadMoreData={loadMoreData}
          loading={loading}
          showLoadingBtn={showLoadingBtn}
        />

        <NewsletterWidget />
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

      </ContainerBox>
    </>
  );
};

export default Author;
