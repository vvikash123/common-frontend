import { useState, useEffect } from "react";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import BlackPageHeader from "../Widgets/BlackPageHeader/BlackPageHeader";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import NewsletterWidget from "../Widgets/NewsletterWidget/NewsletterWidget";
import DoctorWidget from "./DoctorWidget";
import s from "./Doctor.module.scss";
import Head from 'next/head';
// import { useRouter } from 'next/router';
import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";

const Doctor = ({ responseData, isMobile, pagination }) => {
  const [getTabName, setTabName] = useState("all");
  const [data, setData] = useState([]);

  useEffect(()=>{
    setData(responseData?.sections?.author_show?.all);
  },[responseData]);

  // const router = useRouter();
  // const { author } = router.query;
  // console.log(pagination, '.....pagination......');

  const tagsData = [
    { title: "All", seopath: "all" },
    { title: "News", seopath: "news" },
    { title: "Photos", seopath: "photos" },
    { title: "Videos", seopath: "videos" },
  ];

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

  const componentData = {
    data: {
      title: responseData?.sections?.author_show?.data?.trending_search.title,
      children: responseData?.sections?.author_show?.data?.trending_search.children
    }
  }
  // console.log('Rendering non-AMP page for:', author);
  return (
    <>
      {/* <BlackPageHeader
        marginBottom={12}
        textTitle={capitalizeFirstLetter(topic)}
        boldText={topic}
      /> */}

      <BlackPageHeader marginBottom={12} textTitle={''} boldText={''} fromDoctor={true} responseData={responseData} />

      <ContainerBox marginTop={20}>
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
          componentData={responseData}
          data={data || []}
          seopath={responseData?.sections?.author_show?.data?.seopath || ''}
          getMSID={responseData?.sections?.author_show?.data?.msid}
          pagination={pagination}
        />

        <NewsletterWidget />
      </ContainerBox>
    </>
  );
};

export default Doctor;
