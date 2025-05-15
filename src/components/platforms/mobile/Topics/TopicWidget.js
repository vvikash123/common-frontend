import React from "react";
import style from "./TopicComponent.module.scss";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import WidgetCard from "@/components/common/WidgetCard/WidgetCard";
import { commonProperties } from "@/constants";
import Pagination from "@/components/common/Pagination/Pagination";

const TopicWidget = (props) => {
  const {
    marginTop = 0,
    marginBottom = 60,
    data,
    pagination,
    seopath='',
    isResultPage,
    getTabName
  } = props;

  return (
    data?.length > 0 ? (
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
                elementClass: "trending-topics-v-title",
                lineClamp: 2,
                marginBottom: 8,
                elementType: "p",
              },
              {
                ...commonProperties,
                type: "para",
                widgetCardType: "listCard",
                widgetLayout: "horizontal",
                elementClass: "trending-topics-para",
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
                elementClass: "trending-topics-list-v-title",
                lineClamp: 2,
                marginBottom: 8,
                elementType: "p",
              },
              // { ...commonProperties, type: 'para', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'para', lineClamp : 2, marginBottom: 16, elementType: 'p' },
            ]}
            widgetCardType={"leadCard"}
            verticalList={data?.length > 1 ? data.slice(1, 30) : []}
            cardStyleV={"vertical-image"}
            inLineStyleV={"default"}
            marginBottom={15}
          searchPage={true}
          getTabName={getTabName}

          />
        
        {pagination.totalRecord > 13 && (getTabName=='all' || getTabName=='article') && <Pagination
          page={pagination?.page}
          totalPages={pagination?.totalPages}
          basePath={`/${isResultPage?'search-result':'topic'}/${seopath}`}
        />}

        
      </section>
    ) :(
      <div>Data not found.</div>
    )
  );
};

export default TopicWidget;
