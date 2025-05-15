import Faqs from "@/components/common/Faqs/Faqs";
import CollageDetailInfo from "@/components/common/CollageDetailInfo/CollageDetailInfo";
import CoursesFeesOffered from "@/components/common/CoursesFeesOffered/CoursesFeesOffered";
import CoursesOffered from "@/components/common/CoursesOffered/CoursesOffered";

const Fees = (props) => {
  const { faqData, isMobile } = props;
  return (
    <>
      {/* <CollageDetailInfo
        margin="0px 0 20px"
        title={"About SRM"}
        description={
          "SRM Institute of Science and Technology is one of the top ranking universities in India with over 52,000 full time students and more than 3200 faculty across all the campuses – Kattankulathur, Ramapuram, Vadapalani Campus – all in and around Chennai, Tiruchirappalli (in TN), Modinagar (in UP) & Sonepat (in Haryana) – both of which are located near Delhi NCR, Amaravati (in AP), Gangtok (in Sikkim) – offering a wide range of undergraduate, postgraduate and doctoral programs in six Faculties – Engineering & Technology, Management, Medicine & Health sciences, Science & Humanities, Law and Agricultural Sciences."
        }
      />

      <CollageDetailInfo
        margin="0px 0 20px"
        title="What’s new?"
        description="SRM Institute of Science and Technology is one. of the top ranking universities in India with over 52,000 full time students and more than. 3200 faculty across all the campuses – Kattankulathur, Ramapuram, Vadapalani Campus – all in and around Chennai, Tiruchirappalli (in TN), Modinagar (in UP) & Sonepat (in Haryana) – both of which are located near Delhi NCR, Amaravati (in AP), Gangtok (in Sikkim) – offering a wide range of undergraduate, postgraduate and doctoral programs in six Faculties – Engineering & Technology, Management, Medicine & Health sciences, Science & Humanities, Law and Agricultural Sciences."
      /> */}
<CoursesFeesOffered />
      <Faqs faqData={faqData} />
      
    </>
  );
};

export default Fees;
