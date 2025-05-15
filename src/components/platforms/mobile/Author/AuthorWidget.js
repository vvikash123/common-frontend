import style from "./Author.module.scss";
import WidgetCard from "@/components/common/WidgetCard/WidgetCard";
import { commonProperties } from "@/constants";
import Button from "@/components/common/Button/Button";

const AuthorWidget = (props) => {
  const {
    marginTop = 0,
    marginBottom = 60,
    data,
    loadMoreData,
    loading,
    showAds = false,
    showLoadingBtn,
    seopath,
  } = props;
  
  return data?.length > 0 ? (
    <section
      className={style["TrendingTopicHub"]}
      style={{
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
      }}
      key={props.key}
    >
      
      <WidgetCard
        isConditionalRendering={true}
        cardSettingData={[
          {
            ...commonProperties,
            type: "small",
            widgetCardType: "listCard",
            widgetLayout: "horizontal",
            elementClass: "small",
            lineClamp: "inherit",
            marginBottom: 6,
            elementType: "p",
          },
          {
            ...commonProperties,
            type: "title",
            widgetCardType: "listCard",
            widgetLayout: "horizontal",
            elementClass: "v-title",
            lineClamp: 2,
            marginBottom: 8,
            elementType: "p",
          },
          {
            ...commonProperties,
            type: "para",
            widgetCardType: "listCard",
            widgetLayout: "horizontal",
            elementClass: "para",
            lineClamp: 2,
            marginBottom: 16,
            elementType: "p",
          },
        ]}
        widgetCardType={"listCard"}
        horizontalList={data?.length ? data.slice(0, 1) : []}
        cardStyleH={"trending-topics-widget"}
        inLineStyleH={"default"}
        isMoreButtonsH={true}
        widgetListingStyleH={""}
        marginBottom={25}
      />
    
      <WidgetCard
        isConditionalRendering={true}
        cardSettingData={[
          {
            ...commonProperties,
            type: "small",
            widgetCardType: "listCard",
            widgetLayout: "vertical",
            elementClass: "small",
            lineClamp: "inherit",
            marginBottom: 6,
            elementType: "p",
          },
          {
            ...commonProperties,
            type: "title",
            widgetCardType: "listCard",
            widgetLayout: "vertical",
            elementClass: "v-title",
            lineClamp: 2,
            marginBottom: 8,
            elementType: "p",
          },
        ]}
        widgetCardType={"leadCard"}
        verticalList={data?.length > 1 ? data.slice(1, 30) : []}
        cardStyleV={"vertical-image"}
        inLineStyleV={"default"}
        marginBottom={24}
      />
     
     {showLoadingBtn && (
        <div className={`${style["load-more"]}`}>
          {loading ? (
            <Button
              buttonType={"text"}
              buttonText={"Loading..."}
              changeStyle={"video-load-more-disabled"}
            />
          ) : (
            <div onClick={loadMoreData}>
              <Button
              buttonType={"text"}
              buttonText={"Load More"}
              changeStyle={"video-load-more"}
            />
            </div>
          )}
        </div>
      )}
    </section>
  ) : (
    <h6>Records Not Found</h6>
  );
};

export default AuthorWidget;
