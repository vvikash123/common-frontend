import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import CategoryWidget from "./CategoryWidget";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";
import Typography from "@/components/common/Typography/Typography";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import GridLayout from "@/components/common/GridLayout/GridLayout";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import GridRhs from "@/components/common/GridRhs/GridRhs";
import TrendingSearch from "../Widgets/TrendingSearch/TrendingSearch";
import Advertisement from "@/components/ads/ads";
import { GOOGLE_AD_DESK } from "@/constants";
import { generateUrlPath, isFirstPhase } from "@/utils/common";
import NewsLetter from "@/components/common/NewsLetter/NewsLetter";

const CategoryComponent = (props) => {
  const { responseData, pagination } = props;
  const sections = responseData?.sections || [];
  const componentData = sections?.tnn_health_detail ? sections?.tnn_health_detail : sections?.featured;
  const trendingSearchData = sections?.tnn_health_trending_search;
  const boldText = componentData?.data?.title?.split(" ") || [];

  return (
    <section>
      <ContainerBox marginTop={20}>
        <TitleComponent
          titleType={componentData?.headingType || "h2"}
          moreButtonLink={""}
          titleText={`${componentData?.data?.title}` || "Latest News"}
          boldText={[boldText[0]]}
          marginBottom={10}
        />
        <Typography
          elementType={"p"}
          textValue={"top searches in india"}
          changeStyle={"search-key"}
          marginBottom={12}
        />
        <CustomSlideBox>
          {componentData?.trending?.children?.length &&
            componentData?.trending?.children?.map((data, idx) => (
              <TrendingTags
                key={idx}
                isConditionalRendering={true}
                bulletNumbers={idx + 1}
                type={"bulletTextWithText"}
                textValue={data?.title || ""}
                seopath={generateUrlPath(data) || ""}
                changeStyle={"green-color"}
                wrapper={"anchor"}
              />
            ))}
        </CustomSlideBox>
        <GridLayout>
          <GridLhs>
            <CategoryWidget
              componentData={componentData}
              data={componentData?.data?.children || []}
              seopath={componentData?.data?.seopath || ""}
              getMSID={componentData?.msid}
              pagination={pagination}
            />
          </GridLhs>

          <GridRhs>
          {isFirstPhase !== false && (
              <Advertisement
              src={
                responseData?.ads?.btf || GOOGLE_AD_DESK["about_us"]["mid_1"]
              }
            />
            )}
            <NewsLetter />
          </GridRhs>
        </GridLayout>
      </ContainerBox>
      <TrendingSearch componentData={trendingSearchData} />
    </section>
  );
};

export default CategoryComponent;
