import AMPLayout from "@/layouts/AMPLayout";
import DynamicMetasLinks from "@/helpers/seo/DynamicMetasLinks"
import { default as PhotoShowAmp } from "@/components/platforms/amp/PhotoShowComponent/PhotoShowComponent";
import getCommonServerSideProps from "@/utils/dataFetching";
import { getDeviceType } from "@/utils/isMobile";
import { fetchPhotoShowData } from '../api';
import NewsSchema from "@/helpers/seo/schemas/NewsArticleSchema";
import { getSlug, getTargetURL } from "@/utils/common";
import WebPage from "@/helpers/seo/schemas/WebPage";
import ImageGallerySchema from "@/helpers/seo/schemas/ImageGallerySchema";
import { checkUrlRedirect } from "@/utils/checkUrlRedirect";
import { getSEOFriendlyEndDate } from "@/utils/dateUtils";

export const config = { amp: true };


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

      <amp-analytics type="gtag" data-credentials="include">
            <script type="application/json">
              {`
              {
                "vars": {
                  "gtag_id": "G-7TBMH5145P",
                  "config": {
                    "G-7TBMH5145P": {
                      "groups": "default"
                    }
                  }
                },
                "triggers": {
                  "trackPageview": {
                    "on": "visible",
                    "request": "pageview"
                  },
                  "trackClick": {
                    "on": "click",
                    "selector": "#my-button",
                    "request": "event",
                    "vars": {
                      "event_category": "button",
                      "event_action": "click",
                      "event_label": "my-button"
                    }
                  }
                }
              }
              `}
            </script>
          </amp-analytics>
      
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
     
      <AMPLayout data={data} isMobile={isMobile} breadCrumbData= {seoData }  >
        {
         
            <PhotoShowAmp
              responseData={photoShowPageData}
              isMobile={isMobile}
            />
        }
      </AMPLayout>
      <style jsx global>
      {`
   .PhotoShow{
    width: 100%;
    padding: 0 15px;
   }   

.PhotoShowIntro h1{
  color: rgb(15, 47, 79);
  font-size: 24px;
  font-weight: 900;
  line-height: 32px;
}

.Intro{
  color: rgb(15, 47, 79);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  display: block;
  padding: 8px 0 18px;
}

  .PhotoShowRow{
    width: 100%;
    border-bottom: 1px #E2E4EA solid;
    margin-bottom: 20px;
    padding-bottom: 18px;
  }
  .Img{
    width: 100%;
    position: relative;
    margin-bottom: 10px;
    overflow: hidden;
    border-radius: 12px;
  }
  .Img span{
    display: block;
  }
  .Img p{
    border-radius: 8px;
    background-color: rgb(244, 245, 250);
    color: #21409A;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    position: absolute;
    bottom: 10px;
    left: 10px;
    padding: 9px 14px;
    font-weight: normal;
   }
  .PhotoShowRow h2{
    color: rgb(15, 47, 79);
    font-size: 18px;
    font-weight: 700;
    line-height: 23px;
  }
  .PhotoShowRow p{ 
    color: #0F2F4F;
    font-size: 16px;
    line-height: 26px;
    padding-top: 4px;
}

.EndPage{
  width: 100%;
  text-align: center;
  position: relative;
  margin-bottom: 30px;
}
.EndPage span{
  opacity: 0.9;
  color: rgb(15, 47, 79);
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  background-color: #fff;
  position: relative;
  z-index: 1;
  padding: 0 20px;
}
.EndPage i{
  border-top: 1px dashed rgb(180, 180, 180);
  opacity: 0.5;
  content: "";
  position: absolute;
  top: 13px;
  left: 0;
  width: 100%;
}

  }

      `}
    </style>
    </>
  );
};

export async function getServerSideProps(context) {  
  const { req , params , query } = context;
        const deviceType = getDeviceType(req.headers);
        const msid = query?.id
      // console.log('queryyy' , query)
      
  //  const msid='151001202'
  const commonProps = await getCommonServerSideProps(context);
  const photoShowPageData = await fetchPhotoShowData({ msid:`${msid}`,  pageno:'1' , perpage:'5' , origin: `${deviceType || 'desktop' }`});
  if (!photoShowPageData || photoShowPageData?.sections?.photo_show?.data?.[0]?.cmstype !=='PHOTOGALLERYSLIDESHOWSECTION') {
    return {
      notFound: true,
    };
  }
  const photoShowSchema = photoShowPageData?.sections?.photo_show?.data[0] 
  const expectedPath = `/${photoShowSchema?.seo?.seopath}/amp`;
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
