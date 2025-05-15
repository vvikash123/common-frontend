import Layout from "../../layouts/CustomLayout";
import { fetchPhotoStoriesData, testMockAPI } from '../api';
import DynamicMetasLinks from "@/helpers/seo/DynamicMetasLinks"
import { default as WebstoryDesktop } from "@/components/platforms/desktop/Webstory/WebstoryComponnet";
import { default as WebstoryMobile } from "@/components/platforms/mobile/Webstory/WebstoryComponnet";
import getCommonServerSideProps from "@/utils/dataFetching"
import ItemSchema from "@/helpers/seo/schemas/ItemSchema";

const WebStories = ({ data, isMobile, photoStoriesData, limit, deviceType}) => {
  const breadCrumbData =photoStoriesData?.seo?.seopath || '/web-stories'
  const customeEvent = {
    page_template:"Web Stories",
  }
  return (
    <>
    <DynamicMetasLinks seoData={photoStoriesData} customeEvent={customeEvent}  />
    <ItemSchema
        data={photoStoriesData?.sections.tnn_health_photo_story?.data?.items}
      />
    <Layout data={data}  isMobile={isMobile} breadCrumbData={breadCrumbData}>
    {
        isMobile
          ?
          <WebstoryMobile
            responseData={photoStoriesData}
            isMobile={isMobile}
            limit={limit}
            deviceType={deviceType}
          />
          :
          <WebstoryDesktop
            responseData={photoStoriesData}
            isMobile={isMobile}
            limit={limit}
            deviceType={deviceType}
          />
      }
    </Layout>
    </>
  );
};


export async function getServerSideProps(context) {
  const commonProps = await getCommonServerSideProps(context);
  const { deviceType } = commonProps?.props;
  const limit = 16;
  const pageNo=1;
  const photoStoriesData = await fetchPhotoStoriesData('web-stories', pageNo, limit, deviceType);
  return {
    props: {
      ...commonProps.props,
      photoStoriesData,
      limit,
      deviceType
    },
  };
}

export default WebStories;
