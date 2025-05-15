import React from "react";
import style from "./HealthAtoZWidget.module.scss";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import { generateUrlPath, removeHtmlTags } from "@/utils/common";

const HealthAtoZWidget = (props) => {
  const { marginBottom = 60, componentData, topic = "" } = props;
  const data = componentData?.data || {};
  const linkData = data?.terms?.children || [];
  const healtatozKeyword = data?.children || [];
  const baseUrl = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;
  return (
    <>
      <section
        className={`${style["HealthConditions"]}`}
        style={{ marginBottom: `${marginBottom}px` }}
        key={props.key}
      >
        <ContainerBox>
          <div className={`${style["row"]}`}>
            <div className={`${style["left"]}`}>
              <ul className={`${style["AtoZ"]}`}>
                {healtatozKeyword.map((item, index) => (
                  <li key={`trendingtag1_${props.key}_${index}`}>
                    <TrendingTags
                      isConditionalRendering={true}
                      isActive={
                        topic.toLowerCase() === item?.title?.toLowerCase()
                          ? "activeAZ"
                          : ""
                      }
                      type={"normalText"}
                      textValue={item.title}
                      changeStyle={""}
                      seopath={`${baseUrl}/${item?.seopath}`}
                      wrapper={`anchor`}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <ul className={`${style["right"]}`}>
              {linkData &&
                linkData.map((item, index) => (
                  <li
                    className={`${style[item?.active]}`}
                    key={`trendingtag2_${props.key}_${index}`}
                  >
                    <TrendingTags
                      isConditionalRendering={true}
                      type={"normalText"}
                      textValue={removeHtmlTags(item?.title)}
                      changeStyle={""}
                      seopath={generateUrlPath(item)}
                      wrapper={`anchor`}
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

export default HealthAtoZWidget;
