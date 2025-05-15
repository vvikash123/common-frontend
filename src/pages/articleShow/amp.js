import AMPLayout from "../../layouts/AMPLayout";
import DynamicMetasLinks from "@/helpers/seo/DynamicMetasLinks";
import { default as ArticleShowMobile } from "@/components/platforms/amp/ArticleShow/ArticleShow";
import { fetchArticleShowData, fetchHomeData } from "@/pages/api";
import getCommonServerSideProps from "@/utils/dataFetching";
import { getDeviceType } from "@/utils/isMobile";
import NewsSchema from "@/helpers/seo/schemas/NewsArticleSchema";
import WebPage from "@/helpers/seo/schemas/WebPage";
import { getSlug, getTargetURL } from "@/utils/common";
import { checkUrlRedirect } from "@/utils/checkUrlRedirect";
import { getSEOFriendlyEndDate } from "@/utils/dateUtils";
import ShowSchema from "@/components/common/Schema/ShowSchema";
export const config = { amp: true };

const ArticleShow = ({ data, isMobile, articleShowPageData }) => {
  const articleSchema = articleShowPageData?.sections?.article_show?.data[0];
  let seoData =  [{seopath:articleSchema?.seopath,msid:articleSchema?.msid,cmsType:getSlug(articleSchema?.cmstype)}]
  const articleData = articleShowPageData?.sections?.article_show?.data?.[0] || {};
  const customeEvent = {
    page_template:"Article",
    authors: articleData?.createdby || '',
    section:articleData?.parenttitle || '',
    agency:articleData?.agency?.name || '',
    msid:articleData?.msid || '',
    published_date:getSEOFriendlyEndDate(articleData?.insertdate),
    update_date:getSEOFriendlyEndDate(articleData?.updatedate),
  }

  return (
    <>
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
       <ShowSchema  data={data} isWebsiteShow={false}/>

      <WebPage
        data={articleSchema}
        pathname={getTargetURL({
          ...(articleSchema?.overridelink && {
            overrideString: articleSchema?.overridelink,
          }),
          normalString: `${articleSchema?.seopath}-${getSlug(articleSchema?.cmstype)}-${articleSchema?.msid}`,
        })}
      />

      <AMPLayout data={data} isMobile={isMobile} breadCrumbData={seoData}>
        <ArticleShowMobile
          responseData={articleShowPageData}
          isMobile={isMobile}
        />
      </AMPLayout>
      <style jsx global>
      {`
     

    * {
      padding: 0;
      margin: 0;
    }
  @font-face {
          font-family: 'Manrope';
          font-style: normal;
          font-weight: 200 800;
          src: url('https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSvfedN4.woff2') format('woff2');
        }
   
.articleShow{
      background-color: #f8f8f8;
    padding: 15px;
    width: 100%;
}
.articleShowRow {
    background-color: #fff;
    padding: 14px;
    border-radius: 5px;
    width: 100%;
    color: #000;
    font-size: 16px;
    font-weight: 500;
    line-height: 28px;
}

.articleShowRow p {
    padding-bottom: 17px;
}


.Hero-Section {
    width: 100%;
    position: relative;
}

.Hero-Section:after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    background: #000;
    height: 100%;
    bottom: 0;
    opacity: 0.8;
}

.articleTitle {
    position: relative;
    top: 0;
    color: #fff;
    z-index: 1;
    padding: 15px;
}

.articleTitle h1 {
    font-weight: bold;
    font-size: 22px;
    line-height: 1.45;
    padding-bottom: 10px;
}

.articleTitle span {
    font-weight: normal;
    line-height: 1.45;
    color:#fff;
}


.Faqs {
  width: 100%;
      padding: 15px;
}

.Faqs .Heading {
  color: #000000;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 6px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.Faqs .Heading img {
  margin-right: 8px;
  width: 30px;
  height: 30px;
}

.Faqs .FaqsRow {
  box-shadow: 0px 17px 19px #0000000D;
  width: 100%;
  margin-bottom: 14px;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  background: #FFFFFF;
  transition: box-shadow 0.3s;
}

.Faqs .FaqsRow:hover {
  box-shadow: 0px 17px 25px rgba(0, 0, 0, 0.1);
}

.FaqsHeading {
  font-weight: bold;
  cursor: pointer;
  background-image: url("https://static.tnn.in/photo/113702904.cms");
  background-repeat: no-repeat;
  background-position: 100%;
  display: block;
  background-size: 20px;
  padding-right: 30px;
}



.Faqs .FaqsRow .FaqsIntro {
  letter-spacing: 0px;
  color: #000000;
  font-size: 14px;
  line-height: 24px;
  padding-top: 10px;
  padding-right: 60px;
}

.Faqs .FaqsRow.active .FaqsIntro {
  display: block;
}


.rhsWidget {
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 1px solid #D5D5D5;
  border-radius: 5px;
    width: calc(100% - 30px);
    margin: 0 auto 30px;
}

.rhsWidget .rhsWidgetTop {
  background: #22409a08 0% 0% no-repeat padding-box;
  width: 100%;
  padding: 15px 10px;
  display: flex;
  align-items: flex-start;
}

.rhsWidget .rhsWidgetTop i {
  min-width: 50px;
  height: 50px;
  margin-right: 5px;
}

.rhsWidget .rhsWidgetTop i svg {
  width: 54px;
  height: 54px;
}

.rhsWidget .rhsWidgetTop p {
  color: #000000;
  font-size: 16px;
  line-height: 22px;
  font-weight: bold;
}

.rhsWidget .rhsWidgetTop p span {
  display: block;
  font-size: 11px;
  line-height: 16px;
}

.rhsWidget .NewsUpdates {
  width: 100%;
  margin-bottom: 20px;
}

.rhsWidget .NewsUpdates li {
  padding: 14px 10px;
  border-bottom: 1px solid #D5D5D5;
  position: relative;
  list-style-type: none;
}

.rhsWidget .NewsUpdates li:last-child {
  padding-bottom: 0;
  border: 0;
}

.rhsWidget .NewsUpdates .Newsinfo {
  width: calc(100% - 126px);
}

.rhsWidget .NewsUpdates .Newsinfo h3 {
  color: #000000;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rhsWidget .NewsUpdates .Newsinfo span {
  display: block;
  color: #000000;
  font-size: 10px;
  font-weight: bold;
  line-height: 15px;
}

.rhsWidget .NewsUpdates a {
  display: flex;
  align-items: flex-start;
  color: #000000;
  text-decoration: none;
}

.rhsWidget .NewsUpdates a img {
  width: 116px;
  height: 72px;
  display: block;
  border-radius: 10px;
  margin-right: 10px;
}

.rhsWidget .filter {
  display: flex;
  align-items: center;
  padding: 20px 0 5px;
}

.rhsWidget .filter li {
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #707070;
  border-radius: 5px;
  flex: 1;
  text-align: center;
  height: 32px;
  line-height: 32px;
  color: #8D8D8D;
  font-size: 11px;
  margin: 0 10px;
  cursor: pointer;
  list-style-type: none;
}

.rhsWidget .filter li.active {
  background: #224099 0% 0% no-repeat padding-box;
  color: #fff;
}

.rhsWidget .filter li:hover {
  background: #224099 0% 0% no-repeat padding-box;
  color: #fff;
}

.rhsWidget .btn {
  background: #224099 0% 0% no-repeat padding-box;
  box-shadow: 0px 5px 4px #00000029;
  border-radius: 5px;
  width: 100%;
  border: 0;
  appearance: none;
  height: 41px;
  color: #FFFFFF;
  font-size: 13px;
  cursor: pointer;
  display: block;
  line-height: 41px;
  text-decoration: none;
  text-align: center;
  font-weight: 500;
}



 `}
  </style>
    </>
  );
};

export async function getServerSideProps(context) {
  const commonProps = await getCommonServerSideProps(context);
  const { req, query } = context;
  const { id } = query;
  const deviceType = getDeviceType(req.headers);
  const articleShowPageData = await fetchArticleShowData({
    origin: deviceType,
    msid: id,
    pathname: req.url,
  });
  if (!articleShowPageData || articleShowPageData?.sections?.article_show?.data?.[0]?.cmstype !=='ARTICLE') {
    return {
      notFound: true,
    };
  }
  const articleSchema = articleShowPageData?.sections?.article_show?.data[0];
  const expectedPath = `/${articleSchema?.seo?.seopath}/amp`;
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
}

export default ArticleShow;
