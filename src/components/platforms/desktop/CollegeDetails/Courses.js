import Faqs from "@/components/common/Faqs/Faqs";
import CollageDetailInfo from "@/components/common/CollageDetailInfo/CollageDetailInfo";
import CoursesFeesOffered from "@/components/common/CoursesFeesOffered/CoursesFeesOffered";
import CoursesFeesStructure from "@/components/common/CoursesFeesStructure/CoursesFeesStructure.js";
import PopularProgrammes from "@/components/common/PopularProgrammes/PopularProgrammes";
import CollegeFaq from "@/components/common/Faqs/CollegeFaq";

const Courses = (props) => {
  const { isMobile, data, rhsWidget } = props;

  const faqData = data?.result?.faqInfo;
  const highlightInfo = data?.result?.highlightInfo;
  const courseInfo = data?.result?.courseInfo;
  const feeInfo = data?.result?.feeInfo;
  const courseDetails = data?.result?.courseDetails || [];
  return (
    <>
       <CollageDetailInfo
        margin="0px 0 20px"
        title={`${
          data?.result?.collegeShortName
        } Fee Structure`}
        description={feeInfo}
      />

{courseDetails?.length  && <CoursesFeesOffered 
        isMobile={isMobile}
        courseDetails={courseDetails}
        title={`${
          data?.result?.collegeShortName
        } Courses & Fees Offered`}
        loadMore={true} />}
    
    {courseDetails?.length && <CoursesFeesStructure 
        isMobile={isMobile}
        courseDetails={courseDetails}
        title={`${
          data?.result?.collegeShortName
        } Fee Structure`}
        loadMore={true} />}

        <CollageDetailInfo
        margin="0px 0 20px"
        title={`${
          data?.result?.collegeShortName
        } Popular Programmes ${new Date().getFullYear()}`}
        description={courseInfo}
      />
      {courseDetails?.length && <PopularProgrammes
        isMobile={isMobile}
        courseDetails={courseDetails}
        collegeId={data?.result?.collegeId}
        loadMore={true}
        data={data}

      />}

 <CollegeFaq data={faqData} /> 
      
    </>
  );
};

export default Courses;
