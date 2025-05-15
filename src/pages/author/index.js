// pages/author/[author].js
import DynamicMetasLinks from "@/helpers/seo/DynamicMetasLinks";
import Layout from "@/layouts/CustomLayout";
import { default as AuthorDesktop } from "@/components/platforms/desktop/Author/Author.js";
import { default as AuthorMobile } from "@/components/platforms/mobile/Author/Author.js";
import { fetchAuthorData } from "@/pages/api";
import getCommonServerSideProps from "@/utils/dataFetching";
import ItemSchema from "@/helpers/seo/schemas/ItemSchema";
import { checkUrlRedirect } from "@/utils/checkUrlRedirect";

const Author = ({
  data,
  isMobile,
  authorPageData,
  bredcrumData,
  isDocterPage,
}) => {
  const authorInfo = authorPageData?.sections?.author_show?.data || {};
  const customeEvent = {
  page_template:"Author",
  authors:authorInfo?.email || '',
  msid:authorInfo?.id || ''
}
  return (
    <>
      <DynamicMetasLinks seoData={authorPageData} customeEvent={customeEvent} />
      <ItemSchema data={authorPageData?.sections?.author_show?.data?.data} />
      <Layout data={data} isMobile={isMobile} breadCrumbData={bredcrumData}>
        {isMobile ? (
          <AuthorMobile
            responseData={authorPageData}
            isMobile={isMobile}
            isDocterPage={isDocterPage}
          />
        ) : (
          <AuthorDesktop
            responseData={authorPageData}
            isMobile={isMobile}
            isDocterPage={isDocterPage}
          />
        )}
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { msid, slug = "", page = 1, contenttype = "ARTICLE,VIDEO,AUDIO,IMAGE" } = context.query;

  const requestUrl = context.req.url;
  let isDocterPage = false;
  let pageSlug = "author"
  if (requestUrl.includes("doctor/")) {
    isDocterPage = true;
    pageSlug = "doctor"
  }

  const perpage = 13;
  const commonProps = await getCommonServerSideProps(context);
  const authorPageData = await fetchAuthorData(
    msid,
    perpage,
    page,
    contenttype
  );
  if (!authorPageData) {
    return {
      notFound: true,
    };
  }
  const expectedPath = `/${authorPageData?.seo?.seopath}`;
  const redirect = checkUrlRedirect(context.req, expectedPath);
  if (redirect) {
    return redirect;
  }

  return {
    props: {
      ...commonProps.props,
      authorPageData,
      bredcrumData: [{seopath:slug,msid:msid,pageSlug:pageSlug}],
      isDocterPage,
    },
  };
}

export default Author;
