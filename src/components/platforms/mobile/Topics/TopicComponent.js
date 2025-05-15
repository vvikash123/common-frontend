import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";
import BlackPageHeader from "@/components/platforms/mobile/Widgets/BlackPageHeader/BlackPageHeader";
import TopicWidget from "./TopicWidget";
import NewsletterWidget from "@/components/platforms/mobile/Widgets/NewsletterWidget/NewsletterWidget";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import { useState } from "react";
import { capitalizeFirstLetter } from "@/utils/common";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import RhsRelatedTopic from "@/components/common/Rhs/RhsRelatedTopic/RhsRelatedTopic";
import { fetchLoadMoreWebStoriesData } from "@/pages/api";

const TopicComponent = (props) => {
  const { responseData, pagination, topic, isResultPage } = props;
  const [getTabName, setTabName] = useState("all");
  const allData = responseData?.all || [];
  const [storyData, setStoryData] = useState(allData);
  const relatedTopic = responseData?.relatedTopic || [];

  const tagsData = [
    { title: "All", seopath: "all" },
    { title: "News", seopath: "article" },
    { title: "Photos", seopath: "image" },
    { title: "Videos", seopath: "video" },
  ];

  const getTabItems = async(params) => {
    const channelId = process?.env?.NEXT_PUBLIC_HOST_ID;
    const API_URL = process?.env?.NEXT_PUBLIC_API_URL;
    const url = `${API_URL}/api/search?searchterms=${topic}&row=${10}&start=${0}&origin=desktop&contenttype=${params.seopath}&channel=${channelId}`;
    const response = await fetchLoadMoreWebStoriesData(url);
    setStoryData(response[params.seopath]);
    setTabName(params.seopath);
  };

  return (
    <>
      {isResultPage && (
        <BlackPageHeader
          marginBottom={12}
          textTitle={capitalizeFirstLetter(topic?decodeURIComponent(topic):"")}
          boldText={topic}
        />
      )}
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

        <TopicWidget
          data={storyData}
          seopath={topic || ""}
          pagination={pagination}
          isResultPage={isResultPage}
          getTabName={getTabName}
        />

        <NewsletterWidget />
        <RhsRelatedTopic data={relatedTopic} />
      </ContainerBox>
    </>
  );
};

export default TopicComponent;
