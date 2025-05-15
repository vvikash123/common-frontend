import Layout from "@/layouts/CustomLayout";
import DynamicMetasLinks from "@/helpers/seo/DynamicMetasLinks";
import { default as TopicDesktop } from "@/components/platforms/desktop/Topics/TopicComponent";
import { default as TopicMobile } from "@/components/platforms/mobile/Topics/TopicComponent";
import getCommonServerSideProps from "@/utils/dataFetching";
import { fetchSearchResultData, fetchSearchTopicsData } from "../api";
import ItemSchema from "@/helpers/seo/schemas/ItemSchema";

const TopicList = ({ data, isMobile, topicsData, pagination, topic, isResultPage }) => {
  const customeEvent = {page_template:"search-result"}
  const bredcrumData = [{seopath:`/search-result`, pageSlug:topic}]
  return (
    <>
      <DynamicMetasLinks seoData={topicsData} customeEvent={customeEvent} />
      <ItemSchema data={topicsData?.all} />
      <Layout data={data} isMobile={isMobile} breadCrumbData={bredcrumData}>
        {isMobile ? (
          <TopicMobile
            responseData={topicsData}
            isMobile={isMobile}
            pagination={pagination}
            topic={topic}
            isResultPage={isResultPage}
          />
        ) : (
          <TopicDesktop
            responseData={topicsData}
            isMobile={isMobile}
            pagination={pagination}
            topic={topic}
            isResultPage={isResultPage}
          />
        )}
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { page = 1 } = context.query;
    const requestUrl=context.req.url;
    let isResultPage=false;
    if(requestUrl.includes("search-result/")){
      isResultPage=true;
    }
    const limit = 13;
    const pageNo = page;
    const topic = context?.query?.topic || "";
    const commonProps = await getCommonServerSideProps(context);

    const { deviceType } = commonProps?.props;
    let topicsData = {};
    if(isResultPage){
      topicsData = await fetchSearchResultData(
        deviceType,
        topic,
        pageNo - 1,
        limit
      );
    } else {
      topicsData = await fetchSearchTopicsData(
        deviceType,
        topic,
        pageNo - 1,
        limit
      );
    }
    
 
    const totalRecord = topicsData?.totalrecord || 0;
    const pagination = {
      page: parseInt(pageNo),
      totalPages: Math.ceil(totalRecord / limit),
      totalRecord
    };

    return {
      props: {
        ...commonProps.props,
        topicsData,
        pagination,
        topic,
        isResultPage,
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

export default TopicList;
