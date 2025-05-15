import { useEffect } from "react";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../../layouts/CustomLayout"), { ssr: true });
const DynamicMetasLinks = dynamic(() => import("@/helpers/seo/DynamicMetasLinks"), { ssr: true });
const ShowSchema = dynamic(() => import("@/components/common/Schema/ShowSchema"), { ssr: true });
const NewsSchema = dynamic(() => import("@/helpers/seo/schemas/NewsArticleSchema"), { ssr: true });
const WebPage = dynamic(() => import("@/helpers/seo/schemas/WebPage"), { ssr: true });

// Only load the appropriate component for the device
const ArticleShowDesktop = dynamic(() => import("@/components/platforms/desktop/ArticleShow/ArticleShow"), { 
  ssr: false});
const ArticleShowMobile = dynamic(() => import("@/components/platforms/mobile/ArticleShow/ArticleShow"), { 
  ssr: false});

import { fetchArticleShowData } from '@/pages/api';
import getCommonServerSideProps from "@/utils/dataFetching";
import { getDeviceType } from "@/utils/isMobile";
import { getSlug, getTargetURL } from "@/utils/common";
import { checkUrlRedirect } from "@/utils/checkUrlRedirect";
import { getSEOFriendlyEndDate } from "@/utils/dateUtils";

const ArticleShow = ({ data, isMobile, articleShowPageData }) => {
  const articleSchema = articleShowPageData?.sections?.article_show?.data[0];
  let seoData = [{ seopath: articleSchema?.seopath, msid: articleSchema?.msid, cmsType: getSlug(articleSchema?.cmstype) }];
  const articleData = articleShowPageData?.sections?.article_show?.data?.[0] || {};
  const customeEvent = {
    page_template: "Article",
    authors: articleData?.createdby || '',
    section: articleData?.parenttitle || '',
    agency: articleData?.agency?.name || '',
    msid: articleData?.msid || '',
    published_date: getSEOFriendlyEndDate(articleData?.insertdate),
    update_date: getSEOFriendlyEndDate(articleData?.updatedate),
  };

  // useEffect(() => {
  //   // Preconnect to image domain to improve loading time
  //   if (articleSchema?.imageurl) {
  //     try {
  //       const imageOrigin = new URL(articleSchema.imageurl).origin;
  //       if (imageOrigin) {
  //         const link = document.createElement('link');
  //         link.rel = 'preconnect';
  //         link.href = imageOrigin;
  //         document.head.appendChild(link);
  //       }
  //     } catch (error) {
  //       console.warn('Invalid image URL:', articleSchema.imageurl);
  //     }
  //   }
  // }, [articleSchema]);


  return (
    <>
      {/* SEO and schema components */}
      <DynamicMetasLinks seoData={articleSchema} customeEvent={customeEvent} />
      <NewsSchema
        data={articleSchema}
        pathname={getTargetURL({
          ...(articleSchema?.overridelink && {
            overrideString: articleSchema?.overridelink,
          }),
          normalString: `${articleSchema?.seopath}-${getSlug(articleSchema?.cmstype)}-${articleSchema?.msid}`,
        })}
      />
      <ShowSchema data={data} isWebsiteShow={false} />
      <WebPage
        data={articleSchema}
        pathname={getTargetURL({
          ...(articleSchema?.overridelink && {
            overrideString: articleSchema?.overridelink,
          }),
          normalString: `${articleSchema?.seopath}-${getSlug(articleSchema?.cmstype)}-${articleSchema?.msid}`,
        })}
      />

      <Layout data={data} isMobile={isMobile} breadCrumbData={seoData}>
        {isMobile ? (
          <ArticleShowMobile responseData={articleShowPageData} isMobile={isMobile} />
        ) : (
          <ArticleShowDesktop responseData={articleShowPageData} isMobile={isMobile} />
        )}
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { req, query } = context;
  const { id } = query;
  const deviceType = getDeviceType(req.headers);

  try {
    const [commonProps, articleShowPageData] = await Promise.all([
      getCommonServerSideProps(context),
      fetchArticleShowData({ origin: deviceType, msid: id })
    ]);

    if (!articleShowPageData || articleShowPageData?.sections?.article_show?.data?.[0]?.cmstype !== 'ARTICLE') {
      return {
        notFound: true,
      };
    }

    const articleSchema = articleShowPageData?.sections?.article_show?.data[0];
    const expectedPath = `/${articleSchema?.seo?.seopath}`;
    const redirect = checkUrlRedirect(req, expectedPath);
    if (redirect) {
      return redirect;
    }

    return {
      props: {
        ...commonProps.props,
        articleShowPageData,
      },
    };
  } catch (error) {
    console.error('Error fetching article data:', error);
    return {
      notFound: true,
    };
  }
}

export default ArticleShow;