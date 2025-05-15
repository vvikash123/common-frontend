import DynamicMetasLinks from "@/helpers/seo/DynamicMetasLinks";
import Layout from "@/layouts/CustomLayout";
import { default as StaticPageDesktop } from "@/components/platforms/desktop/StaticPage/StaticPage.js";
import { default as StaticPageMobile } from "@/components/platforms/mobile/StaticPage/StaticPage.js";
import {fetchStaticData } from '@/pages/api';
import getCommonServerSideProps from "@/utils/dataFetching";
import { getDeviceType } from "@/utils/isMobile";
import { STATIC_PAGES_MSID_PROD} from "@/constants/index"
import WebPage from "@/helpers/seo/schemas/WebPage";
import { getSlug, getTargetURL } from "@/utils/common";

const StaticPage = ({ data, isMobile, staticPage}) => {
  const articleSchema = staticPage?.sections?.article_show?.data[0] 
  let seoData = articleSchema?.seopath;
  const breadCrumbDataSchema = [
    {
      id: 'info',
      label: seoData,
      link: `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/info/${seoData}`,
    },
  ];
  const customeEvent = {
    page_template:articleSchema?.title || seoData,
  }

  return (
    <>
    <DynamicMetasLinks seoData={articleSchema} customeEvent={customeEvent} />
      <WebPage
        data={articleSchema}
        pathname={getTargetURL({
          ...(articleSchema?.overridelink && {
            overrideString: articleSchema?.overridelink,
          }),
          normalString: `${
            articleSchema?.seopath
          }/${getSlug(articleSchema?.cmstype)}/${
            articleSchema?.msid
          }`,
        })}
      />

    <Layout data={data}  isMobile={isMobile} breadCrumbData={seoData} customSchema={breadCrumbDataSchema} >
    {
        isMobile
          ?
          <StaticPageMobile
            responseData={staticPage}
            isMobile={isMobile}
          />
          :
          <StaticPageDesktop
            responseData={staticPage}
            isMobile={isMobile}
          />
      }
    </Layout>
    </>
  );
};
export async function getServerSideProps(context) {
  const { req,query } = context;
  const deviceType = getDeviceType(req.headers);
 const msid =STATIC_PAGES_MSID_PROD[query?.static_page] || '';

 if (!msid) {      
  return {
    notFound: true,
  };
} 
  const commonProps = await getCommonServerSideProps(context);
  const staticPage = await fetchStaticData({ msid:`${msid}`, origin: `${deviceType || 'desktop' }`});

  return {
    props: {
      ...commonProps.props,
      staticPage,
    },
  };
}


export default StaticPage;
