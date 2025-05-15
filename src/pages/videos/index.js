import Layout from "@/layouts/CustomLayout";
import { getDeviceType } from "@/utils/isMobile";
import  VideosListDesktop  from "@/components/platforms/desktop/VideosLisComponent/VideosLisComponent";
import VideosListMobile from "@/components/platforms/mobile/VideosLisComponent/VideosLisComponent";
import { fetchVideoData } from '../api';
import getCommonServerSideProps from "@/utils/dataFetching";
import DynamicMetasLinks from "@/helpers/seo/DynamicMetasLinks";
import ItemSchema from "@/helpers/seo/schemas/ItemSchema";

const videoList = ({data,isMobile,videoPageData}) => {
  const videoList = videoPageData?.sections?.tnn_health_detail?.data;
 let seoData = videoList?.seopath;
 const customeEvent = {
  page_template:"Videos",
}
  return(
    <>
    <DynamicMetasLinks seoData={videoPageData} customeEvent={customeEvent} />
    <ItemSchema data={videoList?.children || []} />
     <Layout data={data} isMobile={isMobile} breadCrumbData= {seoData }  >
       {
          isMobile
            ?
            <VideosListMobile
              responseData={videoPageData}
              isMobile={isMobile}
            />
            : 
            <VideosListDesktop
              responseData={videoPageData}
              isMobile={isMobile}
            />
        }
  </Layout>
    </>
  )
};


  export async function getServerSideProps(context) {
    const { req , params } = context;
    const deviceType = getDeviceType(req.headers);
    const commonProps = await getCommonServerSideProps(context);
    const videoPageData = await fetchVideoData({seo:'videos' , pageno:'1' , itemcount:'25' , origin: `${deviceType || 'desktop' }`});
   // console.log('videoPageData..',videoPageData)
 
    return {
      props: {
        ...commonProps.props,
        videoPageData,
      },
    };
  }
 
export default videoList;