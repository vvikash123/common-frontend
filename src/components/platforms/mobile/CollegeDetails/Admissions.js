import CollageDetailInfo from "@/components/common/CollageDetailInfo/CollageDetailInfo";
import CollegeFaq from "@/components/common/Faqs/CollegeFaq";

const Admissions = (props) => {
  const { isMobile, data } = props;
  const admissionInfo = data?.result?.admissionInfo || ""
  const faqData = data?.result?.faqInfo;
  return (
    <>
       <CollageDetailInfo
        margin="0px 0 20px"
        title={`About ${data?.result?.collegeShortName}`}
        description={admissionInfo}
      />
      <CollegeFaq data={faqData} />
    </>
  );
};

export default Admissions;
