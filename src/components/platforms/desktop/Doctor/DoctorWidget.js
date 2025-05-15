import { useEffect, useState } from "react";
import style from "./Doctor.module.scss";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import CommonGridBox from "@/components/common/CommonGridBox/CommonGridBox";
import WidgetCard from "@/components/common/WidgetCard/WidgetCard";
import { commonProperties } from "@/constants";
// import AdCaller from "@/helpers/ads/adCaller";
import Pagination from "@/components/common/Pagination/Pagination";

const DoctorWidget = (props) => {
  const {
    marginBottom = 60,
    data,
    showAds = false,
    pagination,
    seopath,
  } = props;

  const [activeTabData, setActiveTabData] = useState("All");

  useEffect(() => {}, []);

  return data?.length > 0 ? (
    <section
      className={style["TrendingTopicHub"]}
      style={{ marginBottom: `${marginBottom}px` }}
      key={props.key}
    >
      <ContainerBox>
        <CommonGridBox gridType={"gridBox"} xGap={24}>
          <div className={`${style["grid-1"]}`}>
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
              cardStyleH={"horizontal-image"}
              inLineStyleH={"default"}
              isMoreButtonsH={true}
              widgetListingStyleH={""}
            />
            {/* {showAds && (
                <div className={`${style["grid-col"]}`}>
                  <AdCaller />
                </div>
              )} */}
          </div>
          <CommonGridBox gridType={"gridBox"} changeStyle={"grid-3"} yGap={24}>
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
                // { ...commonProperties, type: 'para', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'para', lineClamp : 2, marginBottom: 16, elementType: 'p' },
              ]}
              widgetCardType={"leadCard"}
              verticalList={data?.length > 1 ? data.slice(1, 30) : []}
              cardStyleV={"vertical-image"}
              inLineStyleV={"default"}
              marginBottom={24}
            />
          </CommonGridBox>
        </CommonGridBox>
      </ContainerBox>
      <Pagination
        page={pagination?.page}
        totalPages={pagination?.totalPages}
        basePath={`/${seopath}`}
        fromAuthor={true}
        authorid={pagination?.authorid}
        author={pagination?.author}
      />
    </section>
  ) : (
    <h6>Records Not Found</h6>
  );
};

export default DoctorWidget;
