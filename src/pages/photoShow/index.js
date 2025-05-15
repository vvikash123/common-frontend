import Layout from "../../layouts/CustomLayout";
import DynamicMetasLinks from "@/helpers/seo/DynamicMetasLinks"
import { default as PhotoShowDesktop } from "@/components/platforms/desktop/PhotoShowComponent/PhotoShowComponent";
import { default as PhotoShowMobile } from "@/components/platforms/mobile/PhotoShowComponent/PhotoShowComponent";
import getCommonServerSideProps from "@/utils/dataFetching";
import { getDeviceType } from "@/utils/isMobile";
import { fetchPhotoShowData } from '../api';
import NewsSchema from "@/helpers/seo/schemas/NewsArticleSchema";
import { getSlug, getTargetURL } from "@/utils/common";
import WebPage from "@/helpers/seo/schemas/WebPage";
import ImageGallerySchema from "@/helpers/seo/schemas/ImageGallerySchema";
import { checkUrlRedirect } from "@/utils/checkUrlRedirect";
import { getSEOFriendlyEndDate } from "@/utils/dateUtils";


const PhotoShow = ({ data, isMobile, photoShowPageData,photoShowSchema }) => {
 
  let seoData =  [{seopath:photoShowSchema?.seopath,msid:photoShowSchema?.msid,cmsType:getSlug(photoShowSchema?.cmstype)}]
 const customeEvent = {
  page_template:"Photo Story",
  authors: photoShowSchema?.createdby || '',
  section:photoShowSchema?.parenttitle || '',
  agency:photoShowSchema?.agency?.name || '',
  msid:photoShowSchema?.msid || '',
  published_date:getSEOFriendlyEndDate(photoShowSchema?.insertdate),
  update_date:getSEOFriendlyEndDate(photoShowSchema?.updatedate),
}

  return (
    <>
      <DynamicMetasLinks seoData={photoShowSchema} customeEvent={customeEvent} />
      <>
      <NewsSchema
        data={photoShowSchema}
        pathname={getTargetURL({
          ...(photoShowSchema?.overridelink && {
            overrideString: photoShowSchema?.overridelink,
          }),
          normalString: `${
            photoShowSchema?.seopath
          }-${getSlug(photoShowSchema?.cmstype)}-${
            photoShowSchema?.msid
          }`,
        })}
      />
      <WebPage
        data={photoShowSchema}
        pathname={getTargetURL({
          ...(photoShowSchema?.overridelink && {
            overrideString: photoShowSchema?.overridelink,
          }),
          normalString: `${
            photoShowSchema?.seopath
          }-${getSlug(photoShowSchema?.cmstype)}-${
            photoShowSchema?.msid
          }`,
        })}
      />

  <ImageGallerySchema
        data={photoShowSchema}
        pathname={getTargetURL({
          ...(photoShowSchema?.overridelink && {
            overrideString: photoShowSchema?.overridelink,
          }),
          normalString: `${
            photoShowSchema?.seopath
          }-${getSlug(photoShowSchema?.cmstype)}-${
            photoShowSchema?.msid
          }`,
        })}
      />
      </>
  

      <Layout data={data} isMobile={isMobile} breadCrumbData= {seoData }  >
        {
          isMobile
            ?
            <PhotoShowMobile
              responseData={photoShowPageData}
              isMobile={isMobile}
            />
            :
            <PhotoShowDesktop
              responseData={photoShowPageData}
              isMobile={isMobile}
            />
        }
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {  
  const { req , params , query } = context;
        const deviceType = getDeviceType(req.headers);
        const msid = query?.id
      
      
  //  const msid='151001202'
  const commonProps = await getCommonServerSideProps(context);
  const photoShowPageData = await fetchPhotoShowData({ msid:`${msid}`,  pageno:'1' , perpage:'5' , origin: `${deviceType || 'desktop' }`});

 if (!photoShowPageData || photoShowPageData?.sections?.photo_show?.data?.[0]?.cmstype !=='PHOTOGALLERYSLIDESHOWSECTION') {
    return {
      notFound: true,
    };
  }
const photoShowSchema = photoShowPageData?.sections?.photo_show?.data[0] 
const expectedPath = `/${photoShowSchema?.seo?.seopath}`;
const redirect = checkUrlRedirect(req, expectedPath);
if (redirect) {
  return redirect;
}

  return {
    props: {
      ...commonProps.props,
      photoShowPageData,
      photoShowSchema
    },
  };
}

export default PhotoShow;
