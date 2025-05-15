import dynamic from "next/dynamic";

const TopCollages = dynamic(() => import("@/components/common/TopCollages/TopCollages"), { ssr: true });
const TopStreams = dynamic(() => import("@/components/common/TopStreams/TopStreams"), { ssr: true });
const HeroSection = dynamic(() => import("../HeroSection/HeroSection"), { ssr: true });
const FeaturedColleges = dynamic(() => import("../FeaturedColleges/FeaturedColleges"), { ssr: true });
const LatestArticles = dynamic(() => import("../LatestArticles/LatestArticles"), { ssr: true });
const WhereToStudy = dynamic(() => import("../WhereToStudy/WhereToStudy"), { ssr: true });

const HomeComponent = (props) => {
  const { responseData, isMobile } = props;
  const sections = responseData?.sections || {};

  const Widgets = {
    featured_colleges: FeaturedColleges,
    latest_articles: LatestArticles,
    top_10_colleges: TopCollages
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
          origin={'Mobile'}
        />
      ) : null
    );
  };

  return (
    <section>
      <HeroSection />
      {componentRenderer("latest_articles")}
      <TopStreams isMobile={true} />
      {componentRenderer("featured_colleges")}
      <WhereToStudy />
      {componentRenderer("top_10_colleges")}
    </section>
  );
};

export default HomeComponent;
