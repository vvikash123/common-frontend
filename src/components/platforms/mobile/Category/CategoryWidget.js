import React from "react";
import style from "./Category.module.scss";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import Typography from "@/components/common/Typography/Typography";
import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";
import WidgetCard from "@/components/common/WidgetCard/WidgetCard";
import { commonProperties } from "@/constants";
import Pagination from "@/components/common/Pagination/Pagination";
import { generateUrlPath } from "@/utils/common";

const CategoryWidget = (props) => {
  const {
    marginTop = 0,
    marginBottom = 60,
    componentData,
    data,
    pagination,
  } = props;
  let boldText = componentData?.data?.title?.split(" ") || []
  return (
    data?.length > 0 && (
      <section
        className={style["TrendingTopicHub"]}
        style={{
          marginTop: `${marginTop}px`,
          marginBottom: `${marginBottom}px`,
        }}
        key={props.key}
      >
          <TitleComponent
            titleType={componentData?.headingType || "h2"}
            moreButtonLink={""}
            titleText={componentData?.data?.title || "Latest News"}
            boldText={[boldText[0]]}
            marginBottom={12}
          />

          <Typography
            elementType={"p"}
            textValue={"top searches in india"}
            changeStyle={"search-key"}
            marginBottom={12}
          />

          <CustomSlideBox>
            {componentData?.trending?.children?.length &&
              componentData?.trending?.children.map((data, idx) => (
                <TrendingTags
                  key={idx}
                  isConditionalRendering={true}
                  bulletNumbers={idx + 1}
                  type={"bulletTextWithText"}
                  textValue={data?.title}
                  seopath={generateUrlPath(data) || ''}
                  changeStyle={"green-color"}
                  wrapper={"anchor"}
                />
              ))}
          </CustomSlideBox>

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
          />

        <Pagination
          page={pagination?.page}
          totalPages={pagination?.totalPages}
          basePath={`/${componentData?.data?.seopath || ""}`}
        />
      </section>
    )
  );
};

export default CategoryWidget;
