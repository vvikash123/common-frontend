import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import HealthAtoZWidget from "./HealthAtoZWidget.js";
import BlackPageHeader from "@/components/platforms/mobile/Widgets/BlackPageHeader/BlackPageHeader";
import NewsletterWidget from "@/components/platforms/mobile/Widgets/NewsletterWidget/NewsletterWidget";
const HealthComponent = (props) => {
  const { responseData, topic = "", isMobile } = props;
  const { sections } = responseData;
  const healthAZData = sections?.tnn_health_HealthAtoZ || {};

  return (
    <section>
      <BlackPageHeader
        getMSID={healthAZData?.msid || ""}
        textTitle="Health Conditions A-Z"
        boldText={["Conditions", "A-Z"]}
        showSearchbar={true}
        isMobile={isMobile}
      />
      <ContainerBox marginTop={12}>
        <HealthAtoZWidget componentData={healthAZData} topic={topic} />
        <NewsletterWidget />
      </ContainerBox>
    </section>
  );
};

export default HealthComponent;
