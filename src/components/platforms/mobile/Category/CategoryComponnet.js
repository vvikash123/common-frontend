import ContainerBox from "@/components/common/ContainerBox/ContainerBox.js";
import TrendingSearch from "../Widgets/TrendingSearch/TrendingSearch.js";
import CategoryWidget from "./CategoryWidget.js";
import NewsletterWidget from "@/components/platforms/mobile/Widgets/NewsletterWidget/NewsletterWidget";

const CategoryComponent = (props) => {
  const { responseData, pagination } = props;
  const { sections } = responseData;
  const trendingSearchData = sections?.tnn_health_trending_search;

  const Widgets = {
    FEATURED: CategoryWidget,
  };

  const componentRenderer = (componentData, sectionIndex) => {
    const { widgetType, params, msid } = componentData;
    const Widget = Widgets[widgetType];
    // const { params, getMSID } = componentData;
    if (!Widget) {
      /*return (
        <div>{`component for ${componentData.widgetType} to come here`}</div>
      );
      */
      return null;
    }

    return (
      <Widget
        key={`widget_${componentData.widgetType}`}
        params={params}
        componentData={componentData || {}}
        data={componentData?.data?.children || []}
        isConditionalRendering={true}
        getMSID={msid}
        sectionIndex={sectionIndex}
        pageType={`category`}
        pagination={pagination}
      />
    );
  };
  return (
    <>
      <ContainerBox marginTop={20}>
      {Object.keys(sections).map((section) =>
        componentRenderer(sections[section], section)
      )}
      <NewsletterWidget />
      <TrendingSearch componentData={trendingSearchData} />
      </ContainerBox>
    </>
  );
};

export default CategoryComponent;
