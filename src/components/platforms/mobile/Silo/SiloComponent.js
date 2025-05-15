import style from "./SiloComponent.module.scss";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import BlackPageHeader from "../Widgets/BlackPageHeader/BlackPageHeader";
import CustomSlideBox from "@/components/common/CustomSlideBox/CustomSlideBox";
import TrendingTags from "@/components/common/TrendingTags/TrendingTags";
import { constextractAnnotations } from "@/helpers/anotation";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";
import Tags from "@/components/common/Rhs/RhsTags/Tags";
import RhsRelatedTopic from "@/components/common/Rhs/RhsRelatedTopic/RhsRelatedTopic";
import NewsletterWidget from "../Widgets/NewsletterWidget/NewsletterWidget";
import Advertisement from "@/components/ads/ads";
import HealthAtoZ from "../Widgets/HealthAtoZ/HealthAtoZ";
import Faq from "@/components/common/Faq/Faq";
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

  const scrollToVideo = (item) => {
    const elementId = item.seopath;
    const element = document.getElementById(elementId);

    if (element) {
      // Calculate the target scroll position
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const scrollToPosition = absoluteElementTop - 120;
      // Scroll to the adjusted position with smooth behavior
      window.scrollTo({
        top: scrollToPosition,
        behavior: "smooth",
      });
    } else {
      console.warn(`Element with id '${elementId}' not found.`);
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
        <CustomSlideBox>
          {tagsData?.length > 0 &&
            tagsData?.map((data, idx) => (
              <TrendingTags
                key={idx}
                isConditionalRendering={true}
                bulletNumbers={idx + 1}
                type={"strongText"}
                textValue={data?.annotationId || ""}
                seopath={data?.annotationId?.replace(/ /g, " ") || ""}
                loadSubNavigationDataFn={scrollToVideo}
                changeStyle={"bg-gray-color w-100"}
              />
            ))}
        </CustomSlideBox>

        <div className={`${style["SiloCongtent"]}`}>
          <div
            className={style["SiloCongtent"]}
            dangerouslySetInnerHTML={{ __html: textContent }}
          ></div>
          <Faq faqs={faqs} />
        </div>

        

        {relatedTopicFooter && relatedTopicFooter?.length > 0 && (
          <RelatedTopic componentData={{
            data: relatedTopicFooter,
          }}
          heading={`Latest Article`}
           />
        )}

        <Tags data={rhsWidget?.children || []} title={rhsWidget?.title || ""} />

        {relatedTopic && relatedTopic?.length > 0 && (
          <RhsRelatedTopic data={relatedTopic} />
        )}
        <NewsletterWidget />
        {responseData?.ads?.atf_1 && (
          <Advertisement src={responseData?.ads?.atf_1} />
        )}
      </ContainerBox>

      {healthAZData && healthAZData.length > 0 && (
        <HealthAtoZ componentData={healthAZData} marginBottom={0} />
      )}
    </section>
  );
};

export default SiloComponent;
