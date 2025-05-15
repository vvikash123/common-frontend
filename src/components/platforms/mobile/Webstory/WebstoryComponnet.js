import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import QuickStoriesListing from "@/components/platforms/desktop/Widgets/QuickStoriesListing/QuickStoriesListing";
import ShortStories from "@/components/platforms/mobile/Widgets/ShortStories/ShortStories";
import HealthAtoZ from "@/components/platforms/mobile/Widgets/HealthAtoZ/HealthAtoZ";
import NewsletterWidget from "@/components/platforms/mobile/Widgets/NewsletterWidget/NewsletterWidget";

const WebstoryComponnet = (props) => {
  const { responseData, isMobile, limit, deviceType } = props;
  const { sections = {} } = responseData;
  const quickStoriesData = sections?.tnn_health_photo_story || {};
  const shortStoriesData = sections?.tnn_health_151000443 || {};
  const healthAZData = sections?.tnn_health_HealthAtoZ || {};

  return (
    <section>
      <ContainerBox marginTop={20}>
        <QuickStoriesListing
          componentData={quickStoriesData}
          isMobile={isMobile}
          deviceType={deviceType}
          limit={limit}
        />

        <ShortStories componentData={shortStoriesData} />

        <HealthAtoZ componentData={healthAZData} />
        <NewsletterWidget />
      </ContainerBox>
    </section>
  );
};

export default WebstoryComponnet;
