import style from "./TopicComponent.module.scss";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import TopicWidget from "./TopicWidget.js";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";
import GridLayout from "@/components/common/GridLayout/GridLayout";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import GridRhs from "@/components/common/GridRhs/GridRhs";
import Advertisement from "@/components/ads/ads";
import BlackPageHeader from "../Widgets/BlackPageHeader/BlackPageHeader";
import { GOOGLE_AD_DESK } from "@/constants";
import { useState } from "react";
import { capitalizeFirstLetter, isFirstPhase } from "@/utils/common";
import TrendingSearch from "../Widgets/TrendingSearch/TrendingSearch";
import Tags from "@/components/common/Rhs/RhsTags/Tags";
import RhsRelatedTopic from "@/components/common/Rhs/RhsRelatedTopic/RhsRelatedTopic";
import NewsletterWidget from "../../mobile/Widgets/NewsletterWidget/NewsletterWidget";
import BGWidgetCard from "@/components/common/BGWidgetCard/BGWidgetCard";
import { fetchLoadMoreWebStoriesData } from "@/pages/api";

const TopicComponent = (props) => {
  const { responseData, pagination, topic, isResultPage } = props;

  const [getTabName, setTabName] = useState("all");
  const allData=responseData?.all || [];
  const [storyData, setStoryData] = useState(allData)
  const trendingSearch = responseData?.trending_search || {};
  const rhsWidget = responseData?.rhsWidget || {}
  const relatedTopic = responseData?.relatedTopic || []
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

  const getTabItems = async (params) => {
    const channelId = process?.env?.NEXT_PUBLIC_HOST_ID;
    const API_URL = process?.env?.NEXT_PUBLIC_API_URL;
    const url = `${API_URL}/api/search?searchterms=${topic}&row=${10}&start=${0}&origin=desktop&contenttype=${params.seopath}&channel=${channelId}`;
    const response = await fetchLoadMoreWebStoriesData(url);
   setStoryData(response[params.seopath])
   setTabName(params.seopath)
  };
  return (
    <section>
      {isResultPage && (
        <BlackPageHeader
        marginBottom={12}
        textTitle={capitalizeFirstLetter(topic?decodeURIComponent(topic):"")}
        boldText={topic}
      />
      )}
      
      <ContainerBox marginTop={isResultPage?0:20}>
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
            <TopicWidget
              data={storyData}
              seopath={topic || ""}
              pagination={pagination}
              isResultPage={isResultPage}
              getTabName={getTabName}
            />
          </GridLhs>

          <GridRhs>
            <Tags data={rhsWidget?.children || []} title={rhsWidget?.title || ''} />
            {isFirstPhase !== false && (
              <Advertisement
              src={responseData?.ads.btf1 || GOOGLE_AD_DESK["about_us"]["btf"]}
            />
            )}
            <RhsRelatedTopic data={relatedTopic} />
            <NewsletterWidget />
          </GridRhs>
        </GridLayout>
      </ContainerBox>
      <TrendingSearch componentData={{'data':trendingSearch}} />
    </section>
  );
};

export default TopicComponent;
