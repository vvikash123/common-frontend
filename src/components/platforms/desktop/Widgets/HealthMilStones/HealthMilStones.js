import React, { useEffect, useState } from "react";
import style from "./HealthMilStones.module.scss";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import Typography from "@/components/common/Typography/Typography";
import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import WidgetCard from "@/components/common/WidgetCard/WidgetCard";
import CommonGridBox from "@/components/common/CommonGridBox/CommonGridBox";
import { commonProperties } from "@/constants";

const verticalList = [
  {
    iconName: "blackStarIcon",
    smallText: "FEATURED TOPICS",
    titleText: "COVID, Flu, and RSV: What you need to know right now",
    paraText: "",
    imgUrl: "/assets/health-images/images/img5.png",
  },
  {
    iconName: "blackStarIcon",
    smallText: "FEATURED TOPICS",
    titleText: "COVID, Flu, and RSV: What you need to know right now",
    paraText: "",
    imgUrl: "/assets/health-images/images/img5.png",
  },
  {
    iconName: "blackStarIcon",
    smallText: "FEATURED TOPICS",
    titleText: "COVID, Flu, and RSV: What you need to know right now",
    paraText: "",
    imgUrl: "/assets/health-images/images/img5.png",
  },
];

const navMenu = [
  {
    active: "active",
    years: "2 - 4 Yrs.",
    name: "Breast Cancer",
  },
  {
    active: "",
    years: "2 - 4 Yrs.",
    name: "Depression",
  },
  {
    active: "",
    years: "2 - 4 Yrs.",
    name: "Psoriasis",
  },
  {
    active: "",
    years: "2 - 4 Yrs.",
    name: "Alzheimers",
  },
  {
    active: "",
    years: "2 - 4 Yrs.",
    name: "Bone Spurs",
  },
  {
    active: "",
    years: "2 - 4 Yrs.",
    name: "Digestive Health",
  },
  {
    active: "",
    years: "2 - 4 Yrs.",
    name: "Cancer Sores",
  },
  {
    active: "",
    years: "2 - 4 Yrs.",
    name: "Cold",
  },
  {
    active: "",
    years: "2 - 4 Yrs.",
    name: "Psoriasis",
  },
  {
    active: "",
    years: "2 - 4 Yrs.",
    name: "Psoriasis",
  },
  {
    active: "",
    years: "2 - 4 Yrs.",
    name: "Psoriasis",
  },
  {
    active: "",
    years: "2 - 4 Yrs.",
    name: "Psoriasis",
  },
];

const featuredList = [
  {
    name: "Vaccinations in 1st Month",
  },
  {
    name: "5 Precautions for 1 Month Old",
  },
  {
    name: "Tracking Baby’s Sleep Cycle",
  },
];

const HealthMilStones = (props) => {
  const { marginBottom = 60, componentData, data } = props;

  const matchedElement = componentData?.data?.find(
    (elem) => elem?.title === componentData?.data[0]?.title
  );

  const [widgetData, setWidgetData] = useState(matchedElement);
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState();

  useEffect(() => {
    const matchedElement = componentData?.data?.find(
      (elem) => elem?.title === tab
    );
    if (matchedElement) {
      setWidgetData(matchedElement);
    }
  }, [tab]);

  return (
    componentData?.data?.length > 0 && (
      <section
        className={style["HealthMilStones"]}
        style={{ marginBottom: `${marginBottom}px` }}
        key={props.key}
      >
        <ContainerBox>
          <div className={`${style["grid-layout"]}`}>
            <div className={`${style["grid-lhs"]}`}>
              <TitleComponent
                titleType={componentData?.headingType || "h2"}
                moreButtonLink={componentData?.seeMore?.link || ""}
                boldText={["Milestone"]}
                titleText={componentData?.seeMore?.text || ""}
                // marginBottom={32}
              />
              <Typography
                elementType={"p"}
                textValue={"EXPLORE BY AGE GROUP"}
                changeStyle={"health-search-key"}
                marginBottom={16}
              />
              <CustomSlideBox marginBottom={40}>
                {componentData?.data?.length > 0 &&
                  componentData?.data?.map((data, idx) => (
                    <TrendingTags
                      key={idx}
                      isConditionalRendering={true}
                      type={"firstTextBold"}
                      textValue={data?.title || ""}
                      secondTextValue={data?.years || ""}
                      changeStyle={"bg-grey-color"}
                      isActive={active === idx ? "active" : ""}
                      seopath={`/search-result/${data?.seopath}`}
                      // wrapper={"anchor"}
                      loadSubNavigationDataFn={() => {
                        setTab(data?.title);
                        setActive(idx);
                      }}
                    />
                  ))}
              </CustomSlideBox>
              <CommonGridBox
                gridType={"gridBox"}
                changeStyle={"grid-3"}
                yGap={24}
              >
                <WidgetCard
                  isConditionalRendering={true}
                  cardSettingData={[
                    {
                      ...commonProperties,
                      type: "small",
                      widgetCardType: "leadCard",
                      widgetLayout: "vertical",
                      elementClass: "health-milestones-key",
                      lineClamp: "inherit",
                      marginBottom: 6,
                      elementType: "p",
                      textIcon: "blackStarIcon",
                    },
                    // { ...commonProperties, type: 'title', widgetCardType: 'leadCard' ,widgetLayout: 'vertical', elementClass: 'v-title', lineClamp : 2, marginBottom: 8, elementType: 'p' },
                    // { ...commonProperties, type: 'para', widgetCardType: 'listCard' ,widgetLayout: 'horizontal', elementClass: 'para', lineClamp : 2, marginBottom: 16, elementType: 'p' },
                  ]}
                  widgetCardType={"leadCard"}
                  widgetListingStyleV={"milestones"}
                  cardStyleV={"health-milestone"}
                  VerticalCardOrder={"reverse"}
                  verticalList={
                    widgetData?.children?.length > 3
                      ? widgetData?.children?.slice(0, 3)
                      : widgetData?.children
                  }
                  featuredListV={featuredList}
                  smallElementStyleV={"health-milestones-key"}
                  smallTextIconV={"blackStarIcon"}
                  fromHealthMilestones={true}
                  isHealthMile={true}
                />
              </CommonGridBox>
            </div>
            {/* <div className={`${style["grid-rhs"]}`}><AdCaller /></div> */}
          </div>
        </ContainerBox>
      </section>
    )
  );
};

export default HealthMilStones;
