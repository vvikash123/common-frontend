import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import GridLayout from "@/components/common/GridLayout/GridLayout";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import GridRhs from "@/components/common/GridRhs/GridRhs";
import Tags from "@/components/common/Rhs/RhsTags/Tags";
import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import HealthAtoZ from "../Widgets/HealthAtoZ/HealthAtoZ";
import NewsletterWidget from "../../mobile/Widgets/NewsletterWidget/NewsletterWidget";
import style from "./SiloComponent.module.scss";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import RhsRelatedTopic from "@/components/common/Rhs/RhsRelatedTopic/RhsRelatedTopic";
import { constextractAnnotations } from "@/helpers/anotation";
import BlackPageHeader from "../Widgets/BlackPageHeader/BlackPageHeader";
import Advertisement from "@/components/ads/ads";
import Faq from "@/components/common/Faq/Faq";
import TrendingSearch from "../Widgets/TrendingSearch/TrendingSearch";
import { isFirstPhase } from "@/utils/common";
import React, { useEffect } from "react";
import RelatedTopic from "../Widgets/RelatedTopic/RelatedTopic";

const SiloComponent = (props) => {
  const { responseData = {}, slug = "" } = props;
  const sectionsData = responseData?.sections || {};
  const healthFeatured = sectionsData?.tnn_health_FEATURED || {};
  const data = healthFeatured?.data || {};
  const textBody = data?.text || "";
  const healthAZData = sectionsData?.tnn_health_HealthAtoZ || {};
  const trendingSearch = sectionsData?.tnn_health_trending_search || {};
  const rhsWidget = data?.rhsWidget || {};
  const faqs = data?.faq || [];
  const authors = data?.authors?.length > 0 ? data?.authors[0] : {};
  const relatedTopic = data?.relatedTopic || [];
  const relatedTopicFooter = data?.relatedTopicFooter || [];
  let tagsData = constextractAnnotations(textBody);
  let textContent = textBody?.replaceAll("annotationid", "id");

  const handleAnchorClick = (event, id) => {
    // Check if the anchor is navigating to a section on the same page
    if (id && document.getElementById(id)) {
      event.preventDefault();
      scrollToAnchor(id);

      // Update URL manually to include hash
      history.pushState({}, "", `#${id}`);
    }
  };

  useEffect(() => {
    // Attach click event listener to document for all anchor tags
    document.querySelectorAll("a[href^='#']").forEach((anchor) => {
      const id = anchor.getAttribute("href").substring(1);
      anchor.addEventListener("click", (event) => handleAnchorClick(event, id));
    });

    return () => {
      // Clean up event listener on unmount
      document.querySelectorAll("a[href^='#']").forEach((anchor) => {
        const id = anchor.getAttribute("href").substring(1);
        anchor.removeEventListener("click", (event) =>
          handleAnchorClick(event, id)
        );
      });
    };
  }, []);

  const scrollToAnchor = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Adjust offset as needed
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section>
      <BlackPageHeader
        textTitle={data?.title || ""}
        showAuthor={true}
        authorInfo={authors}
      />

      <ContainerBox marginTop={20}>
        {tagsData?.length > 0 && (
          <CustomSlideBox>
            {tagsData?.map((data, idx) => (
              <TrendingTags
                key={idx}
                isConditionalRendering={true}
                bulletNumbers={idx + 1}
                type={"strongText"}
                textValue={data?.annotationId.replace(/&amp;/g, "&") || ""}
                seopath={
                  `#${data?.annotationId
                    ?.replace(/ /g, " ")
                    .replace(/&amp;/g, "&")}` || "#"
                }
                // loadSubNavigationDataFn={scrollToVideo}
                changeStyle={"bg-gray-color"}
                wrapper={"anchor"}
              />
            ))}
          </CustomSlideBox>
        )}

        <GridLayout>
          <GridLhs>
            <div className={`${style["SiloCongtent"]}`}>
              <div
                className="SiloCongtent"
                dangerouslySetInnerHTML={{ __html: textContent }}
              ></div>

              <Faq faqs={faqs} />
            </div>
          </GridLhs>
          <GridRhs>
            <Tags
              data={rhsWidget?.children || []}
              title={rhsWidget?.title || ""}
            />
            {relatedTopic && relatedTopic?.length > 0 && (
              <RhsRelatedTopic data={relatedTopic} />
            )}

            <NewsletterWidget />
            {isFirstPhase !== false && responseData?.ads?.atf_1 && (
              <Advertisement src={responseData?.ads?.atf_1} />
            )}
          </GridRhs>
        </GridLayout>
      </ContainerBox>

      {relatedTopicFooter && relatedTopicFooter?.length > 0 && (
        <RelatedTopic componentData={{
          data: relatedTopicFooter,
        }}
        heading={`Latest Article`} />
            )}

      
      {healthAZData && healthAZData?.data?.children.length > 0 && (
        <HealthAtoZ componentData={healthAZData} marginBottom={10} />
      )}
      <TrendingSearch componentData={trendingSearch} />
    </section>
  );
};

export default SiloComponent;
