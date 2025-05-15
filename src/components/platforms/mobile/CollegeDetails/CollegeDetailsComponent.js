import dynamic from 'next/dynamic';
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import NewsUpdatesRhs from "@/components/common/NewsUpdatesRhs/NewsUpdatesRhs";
import ContactInformationRhs from "@/components/common/ContactInformationRhs/ContactInformationRhs";
import CollageDetailTop from "@/components/common/CollageDetailTop/CollageDetailTop";
import NavInfo from "@/components/common/NavInfo/NavInfo";

const CollegeInfo = dynamic(() => import('./CollegeInfo'), { ssr: true });
const Courses = dynamic(() => import('./Courses'), { ssr: true });
const Fees = dynamic(() => import('./Fees'), { ssr: true });
const Reviews = dynamic(() => import('./Reviews'), { ssr: true });
const Admissions = dynamic(() => import('./Admissions'), { ssr: true });
const Placements = dynamic(() => import('./Placements'), { ssr: true });
const CutOffs = dynamic(() => import('./CutOffs'), { ssr: true });
const Rankings = dynamic(() => import('./Rankings'), { ssr: true });
const Infrastructure = dynamic(() => import('./Infrastructure'), { ssr: true });
const Faculty = dynamic(() => import('./Faculty'), { ssr: true });
const Compare = dynamic(() => import('./Compare'), { ssr: true });
const News = dynamic(() => import('./News'), { ssr: true });

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
        return <CollegeInfo isMobile={isMobile} data={data} rhsWidget={rhsWidget} />;
    }
  };

  return (
    <>
      <CollageDetailTop isMobile={isMobile} data={data} />
      <ContainerBox marginTop={10}>
        <NavInfo
          collegeNameSlug={collegeNameSlug}
          category={category}
          isMobile={isMobile}
        />
        <GridLhs>{getComponent(category)}</GridLhs>
        <NewsUpdatesRhs data={rhsWidget?.latest_articles?.children || []} />
        <ContactInformationRhs data={rhsWidget || {}} />
      </ContainerBox>
    </>
  );
};

export default CollegeDetailsComponent;