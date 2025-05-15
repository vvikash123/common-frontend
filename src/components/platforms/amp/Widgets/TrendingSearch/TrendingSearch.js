import React from "react";
import style from "./TrendingSearch.module.scss";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import CommonGridBox from "@/components/common/CommonGridBox/CommonGridBox";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import Typography from "@/components/common/Typography/Typography";
import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";
import { generateUrlPath } from "@/utils/common";

function TrendingSearch(props) {
  const { marginBottom = 0, componentData, data } = props;
  return (
    data?.length > 0 && (
      <section
        className={`${style["TrendingSearch"]}`}
        style={{ marginBottom: `${marginBottom}px` }}
        key={props.key}
      >
        <ContainerBox>
          <Typography
            elementType={componentData?.headingType || "p"}
            textValue={componentData?.data?.title || ""}
            smallTextIcon={"greenStockArrow"}
            changeStyle={"trending-search"}
            marginBottom={24}
          />
          <CustomSlideBox marginBottom={0}>
            <CommonGridBox
              xGap={8}
              yGap={8}
              changeStyle={"trending-search"}
              flexWrap={"wrap"}
            >
              {componentData?.data?.children?.length > 0 &&
                componentData?.data?.children?.map((data, idx) => (
                  <li key={`trending_tag${props.key}_${idx}`}>
                    <TrendingTags
                      isConditionalRendering={true}
                      type={"strongText"}
                      textValue={data?.title || ""}
                      changeStyle={"bg-white-color"}
                      wrapper={"anchor"}
                      seopath={ generateUrlPath(data) }
                    />
                  </li>
                ))}
            </CommonGridBox>
          </CustomSlideBox>
        </ContainerBox>
      </section>
    )
  );
}

export default TrendingSearch;
