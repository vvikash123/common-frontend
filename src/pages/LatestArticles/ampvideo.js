import AMPLayout from "@/layouts/AMPLayout";
import { getDeviceType } from "@/utils/isMobile";
import  VideoShowAmp  from "@/components/platforms/amp/VideoShowComponet/VideoShowComponet";
import {  fetchVideoShowData } from '../api';
import getCommonServerSideProps from "@/utils/dataFetching";
import DynamicMetasLinks from "@/helpers/seo/DynamicMetasLinks";
import VideoSchema from "@/helpers/seo/schemas/VideoSchema";
import WebPage from "@/helpers/seo/schemas/WebPage";
import { getSlug, getTargetURL } from "@/utils/common";
import { checkUrlRedirect } from "@/utils/checkUrlRedirect";
import { getSEOFriendlyEndDate } from "@/utils/dateUtils";

export const config = { amp: true };

const VideoShow = ({data,isMobile,videoShowPageData}) => {
  const videoShow = videoShowPageData?.sections?.featured?.data[0] 
  let seoData =  [{seopath:videoShow?.seopath,msid:videoShow?.msid,cmsType:getSlug(videoShow?.cmstype)}]
 
  const customeEvent = {
   page_template:"Video Article",
   authors: videoShow?.createdby || '',
   section:videoShow?.parenttitle || '',
   agency:videoShow?.agency?.name || '',
   msid:videoShow?.msid || '',
   published_date:getSEOFriendlyEndDate(videoShow?.insertdate),
   update_date:getSEOFriendlyEndDate(videoShow?.updatedate),
 }
 
  return(
    <>
      <DynamicMetasLinks seoData={videoShowPageData} customeEvent={customeEvent} />
    <VideoSchema
        data={videoShow}
        path={getTargetURL({
          ...(videoShow?.overridelink && {
            overrideString:
              videoShow?.overridelink,
          }),
          normalString: `${
            videoShow?.seopath
          }-${getSlug(videoShow?.cmstype)}-${
            videoShow?.msid
          }`,
        })}
      />
     
      <WebPage
        data={videoShow}
        pathname={getTargetURL({
          ...(videoShow?.overridelink && {
            overrideString:
              videoShow?.overridelink,
          }),
          normalString: `${
            videoShow?.seopath
          }-${getSlug(videoShow?.cmstype)}-${
            videoShow?.msid
          }`,
        })}
      />
     <AMPLayout data={data} isMobile={isMobile} breadCrumbData= {seoData  } >
       {
            <VideoShowAmp
              responseData={videoShowPageData}
              isMobile={isMobile}
            />
        }
  </AMPLayout>
    </>
  )
};

export async function getServerSideProps(context) {
    const { req , params , query } = context;
        const deviceType = getDeviceType(req.headers);
      // console.log('queryyyamp' , query)

        const msid = query.id; // Ext
        // const msid = '151001122'
    const commonProps = await getCommonServerSideProps(context);
    const videoShowPageData = await fetchVideoShowData({ msid:`${msid}`,  pageno:'1' , itemcount:'22' , origin: `${deviceType || 'desktop' }`});
    if (!videoShowPageData) {
      return {
        notFound: true,
      };
    }
    const videoShow = videoShowPageData?.sections?.featured?.data[0] 
    const expectedPath = `/${videoShow?.seo?.seopath}/amp`;
    const redirect = checkUrlRedirect(req, expectedPath);
    if (redirect) {
      return redirect;
    }
    return {
    props: {
      ...commonProps.props,
      videoShowPageData,
    },
  };
}
 
export default VideoShow;