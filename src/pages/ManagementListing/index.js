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
import CollagesWidget from "@/components/common/CollagesWidget/CollagesWidget";
import SearchWidget from "@/components/common/SearchWidget/SearchWidget";
import FilterBox from "@/components/common/FilterBox/FilterBox";
import Checkbox from "@/components/common/CheckBox/CheckBox";
import Pagination from "@/components/common/Pagination/Pagination";
import ListingTopSection from "@/components/common/ListingTopSection/ListingTopSection";
import MobileFilter from "@/components/platforms/mobile/MobileFilter/MobileFilter";

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
        } */}



        <ListingTopSection />
        <div>
          {/* <MobileFilter /> */}
        </div>
        <ContainerBox marginTop={30}>
          <GridLayout>
            <GridRhs className="grid-rhs2">
              <div className="rhshead">
                <p>Management Colleges</p>
                <span>(Total 2200 Colleges)</span>
              </div>
              <FilterBox
                title="Sort By"
                radioOptions={["Radio 1", "Radio 2", "Radio 3"]}
                margin="0 0 20px"
              />

              <FilterBox
                title="Filters By"
                checkboxOptions={[
                  'Finance ( 2000 ) ',
                  'Sales & Marketing ( 1500 ) ',
                  'Human Resources ( 850 )',
                  'IT & Systems ( 658 )',
                  'Operations ( 874 )'
                ]}
                margin="0 0 20px"
              />
              <FilterBox
                title="Program Type"
                checkboxOptions={['Finance ( 2000 ) ', 'Sales & Marketing ( 1500 ) ', 'Human Resources ( 850 )', 'IT & Systems ( 658 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )']}
                margin="0 0 20px"
              />

              <FilterBox
                title="Location/State"
                checkboxOptions={['Finance ( 2000 ) ', 'Sales & Marketing ( 1500 ) ', 'Human Resources ( 850 )', 'IT & Systems ( 658 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )']}
                margin="0 0 20px"
              />
              <FilterBox
                title="College Type"
                checkboxOptions={['Finance ( 2000 ) ', 'Sales & Marketing ( 1500 ) ', 'Human Resources ( 850 )', 'IT & Systems ( 658 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )']}
                margin="0 0 20px"
              />
              <FilterBox
                title="City"
                checkboxOptions={['Finance ( 2000 ) ', 'Sales & Marketing ( 1500 ) ', 'Human Resources ( 850 )', 'IT & Systems ( 658 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )']}
                margin="0 0 20px"
              />
              <FilterBox
                title="Course Type"
                radioOptions={[
                  'Degree - ( 6589 )',
                  'Diploma - ( 1581 )',
                  'Certification - ( 704 )',
                ]}
                margin="0 0 20px"
              />
              <FilterBox
                title="Course Duration"
                checkboxOptions={['Finance ( 2000 ) ', 'Sales & Marketing ( 1500 ) ', 'Human Resources ( 850 )', 'IT & Systems ( 658 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )']}
                margin="0 0 20px"
              />

              <FilterBox
                title="Total Fees (Annually)"
                checkboxOptions={['Finance ( 2000 ) ', 'Sales & Marketing ( 1500 ) ', 'Human Resources ( 850 )', 'IT & Systems ( 658 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )', 'Operations ( 874 )']}
                margin="0 0 20px"
              />

            </GridRhs>
            <GridLhs>
              <SearchWidget margin="0px 0 20px" whiteBg={true} />
              <CollagesWidget className="grid-1" />
              <CollagesWidget className="grid-1" />
              <CollagesWidget className="grid-1" />
              <CollagesWidget className="grid-1" />
              <CollagesWidget className="grid-1" />
              <CollagesWidget className="grid-1" />
              <Pagination margin={"20px 0 90px"} />
            </GridLhs>

          </GridLayout>
        </ContainerBox>

      </Layout>
    </>
  )
};


export async function getServerSideProps(context) {
  const { req, params } = context;
  const deviceType = getDeviceType(req.headers);
  const commonProps = await getCommonServerSideProps(context);
  const videoPageData = await fetchVideoData({ seo: 'videos', pageno: '1', itemcount: '25', origin: `${deviceType || 'desktop'}` });
  // console.log('videoPageData..',videoPageData)

  return {
    props: {
      ...commonProps.props,
      videoPageData,
    },
  };
}

export default videoList;