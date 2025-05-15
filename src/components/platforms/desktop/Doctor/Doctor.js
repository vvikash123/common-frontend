import { useState, useEffect } from "react";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import BlackPageHeader from "../Widgets/BlackPageHeader/BlackPageHeader";
import GridLayout from "@/components/common/GridLayout/GridLayout";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import GridRhs from "@/components/common/GridRhs/GridRhs";
import NewsletterWidget from "../../mobile/Widgets/NewsletterWidget/NewsletterWidget";
import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import Tags from "@/components/common/Rhs/RhsTags/Tags";
import DoctorWidget from "./DoctorWidget";
import TrendingSearch from "@/components/platforms/desktop/Widgets/TrendingSearch/TrendingSearch";
// import { useRouter } from 'next/router';

const Doctor = ({ responseData, isMobile, pagination }) => {
  const [getTabName, setTabName] = useState("all");
  const [data, setData] = useState([]);

  useEffect(()=>{
    setData(responseData?.sections?.author_show?.all);
  },[responseData]);
  // const router = useRouter();
  // console.log(pagination,'.....pagination......');

  const tagsData = [
    { title: "All", seopath: "all" },
    { title: "News", seopath: "news" },
    { title: "Photos", seopath: "photos" },
    { title: "Videos", seopath: "videos" },
  ];

  const componentData = {
    data: {
      title:responseData?.sections?.author_show?.data?.trending_search.title,
      children: responseData?.sections?.author_show?.data?.trending_search.children
    }
  }

  const getTabItems = (params) => {
    setTabName(params.seopath);
    if(params.seopath == 'all') {
      setData(responseData?.sections?.author_show?.all);
    }
    else if( params.seopath == 'news') {
      setData(responseData?.sections?.author_show?.article);
    }
    else if( params.seopath == 'photos') {
      setData(responseData?.sections?.author_show?.image);
    }
    else if( params.seopath == 'videos') {
      setData(responseData?.sections?.author_show?.video);
    }
  }

  // const { author } = router.query;
  // console.log('Rendering non-AMP page for:', author);
  return (
    <section>
      <BlackPageHeader marginBottom={12} textTitle={''} boldText={''} fromDoctor={true} responseData={responseData}/>

      <ContainerBox>
        <GridLayout>

          <GridLhs>
            <CustomSlideBox>
              {tagsData?.length &&
                tagsData?.map((data, idx) => (
                  <TrendingTags
                    key={idx}
                    isConditionalRendering={true}
                    bulletNumbers={idx + 1}
                    type={"strongText"}
                    textValue={data?.title || ""}
                    seopath={data?.seopath || ""}
                    changeStyle={"bg-gray-color"}
                    wrapper={""}
                    loadSubNavigationDataFn={getTabItems}
                    isActive={getTabName === data.seopath ? "active" : ""}
                  />
                ))}
            </CustomSlideBox>
            <DoctorWidget
              // componentData={responseData}
              data={data || []}
              seopath={responseData?.sections?.author_show?.data?.seopath || ''}
              getMSID={responseData?.sections?.author_show?.data?.msid}
              pagination={pagination}
            />

          </GridLhs>

          <GridRhs>
            <Tags
              data={responseData?.sections?.author_show?.data?.rhs_widget?.children || []}
              title={responseData?.sections?.author_show?.data?.rhs_widget?.title || ""}
            />
            <br/>
            {/* <AdCaller
              {...responseData?.ads.atf}
              className={`${style.bottomStickyAd} ${style['ads-title']}`}
            /> */}
            <NewsletterWidget />
          </GridRhs>
        </GridLayout>        
      </ContainerBox>
      <TrendingSearch componentData={componentData} />
    </section>
  );
};

export default Doctor;
