import Layout from "@/layouts/CustomLayout";
import { getDeviceType } from "@/utils/isMobile";
import VideosListDesktop from "@/components/platforms/desktop/VideosLisComponent/VideosLisComponent";
import VideosListMobile from "@/components/platforms/mobile/VideosLisComponent/VideosLisComponent";
import { fetchVideoData } from '../api';
import getCommonServerSideProps from "@/utils/dataFetching";
import DynamicMetasLinks from "@/helpers/seo/DynamicMetasLinks";
import ItemSchema from "@/helpers/seo/schemas/ItemSchema";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import GridLayout from "@/components/common/GridLayout/GridLayout";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import GridRhs from "@/components/common/GridRhs/GridRhs";
import CommonGridBox from "@/components/common/CommonGridBox/CommonGridBox";
import ArticlesWidget from "@/components/common/ArticlesWidget/ArticlesWidget";
import NotificationsRhs from "@/components/common/NotificationsRhs/NotificationsRhs";
import NewsUpdatesRhs from "@/components/common/NewsUpdatesRhs/NewsUpdatesRhs";
import ContactInformationRhs from "@/components/common/ContactInformationRhs/ContactInformationRhs";
import Pagination from "@/components/common/Pagination/Pagination";
import Faqs from "@/components/common/Faqs/Faqs";
import ArticlesDetailsHero from "@/components/common/ArticlesDetailsHero/ArticlesDetailsHero";
import TopManagementColleges from "@/components/common/TopManagementColleges/TopManagementColleges";
import ArticlesContent from "@/components/common/ArticlesContent/ArticlesContent";

const videoList = ({ data, isMobile, videoPageData }) => {
  const videoList = videoPageData?.sections?.tnn_health_detail?.data;
  let seoData = videoList?.seopath;
  const customeEvent = {
    page_template: "Videos",
  }

  const faqData = [
    {
      question: "Can you join MBA in SRM without entrance exam?",
      answer: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      question: "What is the eligibility criteria for MBA at SRM university Delhi NCR?",
      answer: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    {
      question: "How can I get admission to MBA at SRM IST Trichy?",
      answer: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.",
    },
    // More FAQ entries...
  ];

  return (
    <>
      <DynamicMetasLinks seoData={videoPageData} customeEvent={customeEvent} />
      <ItemSchema data={videoList?.children || []} />
      <Layout data={data} isMobile={isMobile} breadCrumbData={seoData}  >
        {/* {
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
         */}


        <ArticlesDetailsHero />

        <ContainerBox marginTop={30}>
          <GridLayout>
            <GridLhs>
           
            <ArticlesContent margin="0px 0 40px" />
<Faqs faqData={faqData} />
<Pagination margin="60px 0" />
            </GridLhs>
            <GridRhs>
              <NewsUpdatesRhs />
            </GridRhs>
          </GridLayout>
        </ContainerBox>
<TopManagementColleges />

      </Layout>
    </>
  )
};


export async function getServerSideProps(context) {
  const { req, params } = context;
  const deviceType = getDeviceType(req.headers);
  const commonProps = await getCommonServerSideProps(context);
  const videoPageData = await fetchVideoData({ seo: 'videos', pageno: '1', itemcount: '25', origin: `${deviceType || 'desktop'}` });

  return {
    props: {
      ...commonProps.props,
      videoPageData,
    },
  };
}

export default videoList;