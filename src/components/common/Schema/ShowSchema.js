import WebPage from "@/helpers/seo/schemas/WebPage";
import WebSiteSchema from "@/helpers/seo/schemas/WebSite";
import OrgSchema from "@/helpers/seo/schemas/Organization";
import SiteNavigationElement from "@/helpers/seo/schemas/SiteNavigationElement";

const ShowSchema = ({ mainData , isWebsiteShow=true}) => {
  return (
    <>
      { isWebsiteShow && <WebSiteSchema />}
      <OrgSchema />
      <SiteNavigationElement />
    </>
  );
};

export default ShowSchema;
