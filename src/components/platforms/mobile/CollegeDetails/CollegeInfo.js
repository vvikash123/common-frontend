import CollageDetailInfo from "@/components/common/CollageDetailInfo/CollageDetailInfo";
import PopularProgrammes from "@/components/common/PopularProgrammes/PopularProgrammes";
import CoursesFeesOffered from "@/components/common/CoursesFeesOffered/CoursesFeesOffered";
import CampusGallery from "@/components/common/CampusGallery/CampusGallery";
import CoursesOffered from "@/components/common/CoursesOffered/CoursesOffered";
import CollegeFaq from "@/components/common/Faqs/CollegeFaq";
import RelatedColleges from "../../mobile/RelatedColleges/RelatedColleges";

const CollegeInfo = (props) => {
  const { isMobile, data, rhsWidget } = props;

  const faqData = data?.result?.faqInfo;
  const highlightInfo = data?.result?.highlightInfo;
  const courseInfo = data?.result?.courseInfo;
  const courseDetails = data?.result?.courseDetails || [];

  return (
    <>
      <CollageDetailInfo
        margin="0px 0 20px"
        title={`About ${data?.result?.collegeShortName}`}
        description={highlightInfo}
      />

      <CollageDetailInfo
        margin="0px 0 20px"
        title={`${data?.result?.collegeShortName
          } Popular Programmes ${new Date().getFullYear()}`}
        description={courseInfo}
      />

      <PopularProgrammes
        isMobile={isMobile}
        courseDetails={courseDetails}
        collegeId={data?.result?.collegeId}
        loadMore={true}
        data={data}
      />

      {data?.result?.relatedColleges && Array.isArray(data?.result?.relatedColleges?.data) && data?.result?.relatedColleges?.data.length > 0 && (
        <RelatedColleges data={data?.result?.relatedColleges} isMobile={true} isUtmParams = {true}/>
      )}
      <CollegeFaq data={faqData} />

      <CoursesFeesOffered
        isMobile={isMobile}
        courseDetails={courseDetails}
        loadMore={true}
      />

      {/* <CampusGallery margin="20px 0" isMobile={isMobile} /> */}
    </>
  );
};

export default CollegeInfo;
