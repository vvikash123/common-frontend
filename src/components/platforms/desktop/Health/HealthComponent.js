import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import dynamic from 'next/dynamic';
import BlackPageHeader from "@/components/platforms/desktop/Widgets/BlackPageHeader/BlackPageHeader";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import GridRhs from "@/components/common/GridRhs/GridRhs";
import GridLayout from "@/components/common/GridLayout/GridLayout";
const HealthAtoZWidget = dynamic(() => import('./HealthAtoZWidget'), { ssr: true });
const NewsletterWidget = dynamic(() => import('../../mobile/Widgets/NewsletterWidget/NewsletterWidget'), { ssr: true });
const Advertisement = dynamic(() => import('@/components/ads/ads'), { ssr: false });
import { GOOGLE_AD_DESK } from "@/constants";
import { isFirstPhase } from "@/utils/common";
import Tags from "@/components/common/Rhs/RhsTags/Tags";



const HealthComponent = (props) => {
  const { responseData, topic = "", isMobile } = props;
  const sections = responseData?.sections || {};
  const ads = responseData?.ads || {};
  const healthAZData = sections?.tnn_health_HealthAtoZ || {};
  const rhsWidget = responseData?.rhsWidget || {};
  return (
    <section>
      <BlackPageHeader
        getMSID={healthAZData?.msid || ""}
        textTitle="Health Conditions A-Z"
        boldText={["Conditions", "A-Z"]}
        showSearchbar={true}
        isMobile={isMobile}
      />
      <ContainerBox marginTop={10}>
        <GridLayout>
          <GridLhs>
            <HealthAtoZWidget componentData={healthAZData} topic={topic} />
          </GridLhs>
          <GridRhs>
            <Tags title={rhsWidget?.title || ''}  data={rhsWidget?.children || []} />
          {isFirstPhase !== false && (
              <Advertisement
              src={
                responseData?.ads?.btf || GOOGLE_AD_DESK["about_us"]["mid_1"]
              }
            />
            )}
            <NewsletterWidget />
          </GridRhs>
        </GridLayout>
      </ContainerBox>
    </section>
  );
};

export default HealthComponent;
