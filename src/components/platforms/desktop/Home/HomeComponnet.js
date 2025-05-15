import TopCollages from "@/components/common/TopCollages/TopCollages";
import TopStreams from "@/components/common/TopStreams/TopStreams";
import HeroSection from "../HeroSection/HeroSection";
import FeaturedColleges from "../FeaturedColleges/FeaturedColleges";
import LatestArticles from "../LatestArticles/LatestArticles";
import WhereToStudy from "../WhereToStudy/WhereToStudy";

const HomeComponent = (props) => {
  const { responseData, isMobile } = props;
  const sections = responseData?.sections || {};

  const Widgets = {
    featured_colleges: FeaturedColleges,
    latest_articles: LatestArticles,
    top_10_colleges:TopCollages
    // Other widgets can be added here as needed
  };

  const componentRenderer = (widgetType) => {
    // Use Object.values() to search through sections if it's an object
    const componentData = Object.values(sections).find(
      (section) => section.widgetType === widgetType
    );

    const Widget = Widgets[widgetType];
    return (
      Widget && componentData ? (
        <Widget
          key={`widget_${widgetType}`}
          componentData={componentData || {}}
          data={componentData?.data?.children || []}
          isMobile={isMobile}
          origin={'desktop'}
        />
      ) : null
    );
  };

  return (
    <section>
      <HeroSection />
      {componentRenderer("latest_articles")}
      <TopStreams />
      {componentRenderer("featured_colleges")}
      <WhereToStudy />
      {componentRenderer("top_10_colleges")}

    </section>
  );
};

export default HomeComponent;
