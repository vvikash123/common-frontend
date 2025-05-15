import style from "./Webstory.module.scss";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import GridLayout from "@/components/common/GridLayout/GridLayout";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import GridRhs from "@/components/common/GridRhs/GridRhs";
import QuickStoriesListing from "../Widgets/QuickStoriesListing/QuickStoriesListing";
import ShortStories from "../Widgets/ShortStories/ShortStories";
import HealthAtoZ from "../Widgets/HealthAtoZ/HealthAtoZ";
import NewsletterWidget from "../../mobile/Widgets/NewsletterWidget/NewsletterWidget";
import Advertisement from "@/components/ads/ads";
import { GOOGLE_AD_DESK } from "@/constants";
import { isFirstPhase } from "@/utils/common";
import Tags from "@/components/common/Rhs/RhsTags/Tags";

const WebstoryComponnet = (props) => {
  const { responseData={}, limit = 4, deviceType } = props;
  const sections = responseData?.sections || [];
  const quickStoriesData = sections?.tnn_health_photo_story;
  const shortStoriesData = sections?.tnn_health_151000443;
  const healthAZData = sections?.tnn_health_HealthAtoZ;
  const rhsWidgetData = quickStoriesData?.data?.rhs_widget || {};
  return (
    <section>
      <ContainerBox marginTop={20}>
        <GridLayout>
          <GridLhs>
            <QuickStoriesListing
              componentData={quickStoriesData}
              deviceType={deviceType}
              limit={limit}
            />
          </GridLhs>
          <GridRhs>
            <Tags data={rhsWidgetData?.children || []} title={rhsWidgetData?.title} />
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
        <ShortStories componentData={shortStoriesData} />
      </ContainerBox>
      <HealthAtoZ componentData={healthAZData} marginBottom={0} />
    </section>
  );
};

export default WebstoryComponnet;
