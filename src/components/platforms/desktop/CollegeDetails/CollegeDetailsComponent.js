import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import GridLayout from "@/components/common/GridLayout/GridLayout";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import GridRhs from "@/components/common/GridRhs/GridRhs";
import NotificationsRhs from "@/components/common/NotificationsRhs/NotificationsRhs";
import NewsUpdatesRhs from "@/components/common/NewsUpdatesRhs/NewsUpdatesRhs";
import ContactInformationRhs from "@/components/common/ContactInformationRhs/ContactInformationRhs";
import CollageDetailTop from "@/components/common/CollageDetailTop/CollageDetailTop";
import NavInfo from "@/components/common/NavInfo/NavInfo";
import CollegeInfo from "./CollegeInfo";
import Courses from "./Courses";
import Fees from "./Fees";
import Reviews from "./Reviews";
import Admissions from "./Admissions";
import Placements from "./Placements";
import CutOffs from "./CutOffs";
import Rankings from "./Rankings";
import Infrastructure from "./Infrastructure";
import Faculty from "./Faculty";
import Compare from "./Compare";
import News from "./News";

const CollegeDetailsComponent = (props) => {
  const { collegeNameSlug, category, isMobile, collegeData } = props;
  const data = collegeData?.data || {};
  const rhsWidget = collegeData?.rhsWidget || {};
  const getComponent = (category) => {
    switch (category) {
      case "courses":
        return <Courses isMobile={isMobile} data={data} rhsWidget={rhsWidget} />;
      case "fees":
        return <Fees isMobile={isMobile} />;
      case "reviews":
        return <Reviews isMobile={isMobile} />;
      case "admissions":
        return <Admissions isMobile={isMobile} data={data} />;
      case "placements":
        return <Placements isMobile={isMobile} data={data} />;
      case "cut-offs":
        return <CutOffs isMobile={isMobile} />;
      case "rankings":
        return <Rankings isMobile={isMobile} />;
      case "infrastructure":
        return <Infrastructure isMobile={isMobile} />;
      case "faculty":
        return <Faculty isMobile={isMobile} />;
      case "compare":
        return <Compare isMobile={isMobile} />;
      case "news":
        return <News isMobile={isMobile} />;
      default:
        return (
          <CollegeInfo isMobile={isMobile} data={data} rhsWidget={rhsWidget} />
        );
    }
  };
  return (
    <>
      <CollageDetailTop isMobile={isMobile} data={data} />

      <ContainerBox marginTop={30}>
        <NavInfo
          collegeNameSlug={collegeNameSlug}
          category={category}
          isMobile={isMobile}
        />

        <GridLayout>
          <GridLhs>{getComponent(category)}</GridLhs>
          <GridRhs>
            <NewsUpdatesRhs data={rhsWidget?.latest_articles?.children || []} />
            <ContactInformationRhs data={rhsWidget || {}} />
          </GridRhs>
        </GridLayout>
      </ContainerBox>
    </>
  );
};

export default CollegeDetailsComponent;
