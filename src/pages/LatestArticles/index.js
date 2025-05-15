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
import ArticlesHeroSection from "@/components/common/ArticlesHeroSection/ArticlesWidget";
import Pagination from "@/components/common/Pagination/Pagination";

const videoList = ({ data, isMobile, videoPageData }) => {
  const videoList = videoPageData?.sections?.tnn_health_detail?.data;
  let seoData = videoList?.seopath;
  const customeEvent = {
    page_template: "Videos",
  }
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
        <ArticlesHeroSection title="Trending Articles" />
        <ContainerBox marginTop={30}>
          <GridLayout>
            <GridLhs>
            {
          isMobile
            ?   <CommonGridBox gridType={'gridBox'} changeStyle={'grid-1'} yGap={16} xGap={23}>

            <ArticlesWidget
              imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
              updatedDate="Updated Jun 20, 2024, 18:25 IST"
              title="The Ultimate MBA Degree Guide For International Students"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
              readMoreLink="https://example.com/read-more"
            />
            <ArticlesWidget
              imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
              updatedDate="Updated Jun 20, 2024, 18:25 IST"
              title="The Ultimate MBA Degree Guide For International Students"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
              readMoreLink="https://example.com/read-more"
            />
            <ArticlesWidget
              imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
              updatedDate="Updated Jun 20, 2024, 18:25 IST"
              title="The Ultimate MBA Degree Guide For International Students"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
              readMoreLink="https://example.com/read-more"
            />
            <ArticlesWidget
              imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
              updatedDate="Updated Jun 20, 2024, 18:25 IST"
              title="The Ultimate MBA Degree Guide For International Students"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
              readMoreLink="https://example.com/read-more"
            />
            <ArticlesWidget
              imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
              updatedDate="Updated Jun 20, 2024, 18:25 IST"
              title="The Ultimate MBA Degree Guide For International Students"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
              readMoreLink="https://example.com/read-more"
            />
            <ArticlesWidget
              imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
              updatedDate="Updated Jun 20, 2024, 18:25 IST"
              title="The Ultimate MBA Degree Guide For International Students"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
              readMoreLink="https://example.com/read-more"
            />
            <ArticlesWidget
              imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
              updatedDate="Updated Jun 20, 2024, 18:25 IST"
              title="The Ultimate MBA Degree Guide For International Students"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
              readMoreLink="https://example.com/read-more"
            />
            <ArticlesWidget
              imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
              updatedDate="Updated Jun 20, 2024, 18:25 IST"
              title="The Ultimate MBA Degree Guide For International Students"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
              readMoreLink="https://example.com/read-more"
            />
            <ArticlesWidget
              imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
              updatedDate="Updated Jun 20, 2024, 18:25 IST"
              title="The Ultimate MBA Degree Guide For International Students"
              description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
              readMoreLink="https://example.com/read-more"
            />

          </CommonGridBox> : 


              <CommonGridBox gridType={'gridBox'} changeStyle={'grid-3'} yGap={16} xGap={23}>

                <ArticlesWidget
                  imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
                  updatedDate="Updated Jun 20, 2024, 18:25 IST"
                  title="The Ultimate MBA Degree Guide For International Students"
                  description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
                  readMoreLink="https://example.com/read-more"
                />
                <ArticlesWidget
                  imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
                  updatedDate="Updated Jun 20, 2024, 18:25 IST"
                  title="The Ultimate MBA Degree Guide For International Students"
                  description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
                  readMoreLink="https://example.com/read-more"
                />
                <ArticlesWidget
                  imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
                  updatedDate="Updated Jun 20, 2024, 18:25 IST"
                  title="The Ultimate MBA Degree Guide For International Students"
                  description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
                  readMoreLink="https://example.com/read-more"
                />
                <ArticlesWidget
                  imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
                  updatedDate="Updated Jun 20, 2024, 18:25 IST"
                  title="The Ultimate MBA Degree Guide For International Students"
                  description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
                  readMoreLink="https://example.com/read-more"
                />
                <ArticlesWidget
                  imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
                  updatedDate="Updated Jun 20, 2024, 18:25 IST"
                  title="The Ultimate MBA Degree Guide For International Students"
                  description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
                  readMoreLink="https://example.com/read-more"
                />
                <ArticlesWidget
                  imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
                  updatedDate="Updated Jun 20, 2024, 18:25 IST"
                  title="The Ultimate MBA Degree Guide For International Students"
                  description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
                  readMoreLink="https://example.com/read-more"
                />
                <ArticlesWidget
                  imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
                  updatedDate="Updated Jun 20, 2024, 18:25 IST"
                  title="The Ultimate MBA Degree Guide For International Students"
                  description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
                  readMoreLink="https://example.com/read-more"
                />
                <ArticlesWidget
                  imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
                  updatedDate="Updated Jun 20, 2024, 18:25 IST"
                  title="The Ultimate MBA Degree Guide For International Students"
                  description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
                  readMoreLink="https://example.com/read-more"
                />
                <ArticlesWidget
                  imageUrl="https://static.tnn.in/photo/msid-114039744,width-200,height-200,resizemode-75/114039744.jpg?quality=100"
                  updatedDate="Updated Jun 20, 2024, 18:25 IST"
                  title="The Ultimate MBA Degree Guide For International Students"
                  description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy."
                  readMoreLink="https://example.com/read-more"
                />
              </CommonGridBox>  
}
<Pagination margin="60px 0" />
            </GridLhs>
            <GridRhs>
              <NotificationsRhs />
              <NewsUpdatesRhs />
              <ContactInformationRhs />
            </GridRhs>
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