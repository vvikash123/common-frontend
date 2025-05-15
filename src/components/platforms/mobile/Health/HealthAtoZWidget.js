import React from "react";
import style from "./HealthAtoZWidget.module.scss";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";
import { generateUrlPath, removeHtmlTags } from "@/utils/common";

const HealthAtoZWidget = (props) => {
  const { marginTop = 0, marginBottom = 60, componentData, topic } = props;
  const baseUrl = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;
  return (
    componentData?.data?.children?.length > 0 && (
      <>
        <section
          className={`${style["HealthConditions"]}`}
          style={{
            marginTop: `${marginTop}px`,
            marginBottom: `${marginBottom}px`,
          }}
          key={props.key}
        >
          <ContainerBox>
            <div className={`${style["row"]}`}>
              <div className={`${style["left"]}`}>
                <CustomSlideBox elementType={"ulBox"} marginBottom={10}>
                  {componentData?.data?.children?.map((item, index) => (
                    <li key={`trendingtag1_${props.key}_${index}`}>
                      <TrendingTags
                        key={index}
                        isConditionalRendering={true}
                        isActive={
                          topic.toLowerCase() === item?.title?.toLowerCase()
                            ? "activeAZ"
                            : ""
                        }
                        wrapper={"anchor"}
                        type={"normalText"}
                        seopath={`${baseUrl}/${item?.seopath}`}
                        textValue={item?.title}
                        changeStyle={""}
                        fromAtoZ={true}
                      />
                    </li>
                  ))}
                </CustomSlideBox>
              </div>
              <ul className={`${style["right"]}`}>
                {componentData?.data?.terms?.children?.map((item, index) => (
                  <li
                    className={`${style[item?.active]}`}
                    key={`trendingtag2_${props.key}_${index}`}
                  >
                    <TrendingTags
                      isConditionalRendering={true}
                      wrapper={"anchor"}
                      type={"normalText"}
                      textValue={removeHtmlTags(item?.title)}
                      changeStyle={""}
                      seopath={generateUrlPath(item)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </ContainerBox>
        </section>
      </>
    )
  );
};

export default HealthAtoZWidget;
