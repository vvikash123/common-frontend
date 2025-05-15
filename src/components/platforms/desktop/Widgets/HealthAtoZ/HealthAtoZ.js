import React from "react";
import style from "./HealthAtoZ.module.scss";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import { generateUrlPath, removeHtmlTags } from "@/utils/common";
//import LeftArrowedLabel from 'components/common/Health/LeftArrowedLabel/LeftArrowedLabel';

const HealthAtoZ = (props) => {
  const { marginBottom = 60, componentData, pageType = '' ,  paddingBottom = 0 } = props;
  const baseUrl = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;
  return (
    <>
      <section
        className={`${style["HealthConditions"]}`}
        style={{ marginBottom: `${pageType == 'photoStory' ? 0 : marginBottom}px`,  paddingBottom : `${paddingBottom}px`}}
        key={props.key}
      >
        <ContainerBox>
          <div className={`${style["row"]}`}>
            <div className={`${style["left"]}`}>
              <TitleComponent
                titleType={componentData?.headingType || "h2"}
                moreButtonLink={`/${componentData?.data?.seopath}` || ""}
                titleText={componentData?.data?.title || ""}
                boldText={["Conditions", "A-Z"]}
              />
              <ul className={`${style["AtoZ"]}`}>
                {componentData?.data?.children?.map((item, index) => (
                  <li key={`trendingtag1_${props.key}_${index}`}>
                    <TrendingTags
                      key={index}
                      isConditionalRendering={true}
                      type={"normalText"}
                      seopath={`${baseUrl}/${item.seopath}`}
                      textValue={item.title}
                      changeStyle={""}
                      wrapper={`anchor`}
                      fromAtoZ={true}
                      isActive={item?.title == "A" ? "activeAZ"  : ""}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <ul className={`${style["right"]}`}>
              {componentData?.data?.terms?.children?.slice(0,9)?.map((item, index) => (
                <li
                  className={`${style[item.active]}`}
                  key={`trendingtag2_${props.key}_${index}`}
                >
                  <TrendingTags
                    wrapper={"anchor"}
                    isConditionalRendering={true}
                    seopath={generateUrlPath(item)}
                    type={"normalText"}
                    textValue={removeHtmlTags(item.title)}
                    changeStyle={""}
                  />
                </li>
              ))}
            </ul>
          </div>
        </ContainerBox>
      </section>
    </>
  );
};

export default HealthAtoZ;
