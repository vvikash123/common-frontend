import Head from "next/head";
import { getTargetURL } from "@/utils/common";
import { overRideLink, overRideLinkSite } from "@/constants/index";

const SiteNavigationElement = ({ data = [], category = "" }) => {
  const listOfRoutes = data && data.length > 0 ? data : [];
  const jsonListItem = listOfRoutes.map((list) => {
    const url = getTargetURL({
      ...(list.overridelink && {
        overrideString: overRideLinkSite(list.overridelink),
      }),
      normalString: `${list.seopath}`,
    });

    return {
      "@context": "https://schema.org",
      "@type":
        category !== "photo story" ? "SiteNavigationElement" : "ItemList",
      "@id": process.env.NEXT_PUBLIC_WEBAPP_BASE_URL + "/#table-of-content",
      name: list.title,
      url,
    };
  });

  const schema = {
    "@context": "https://schema.org",
    "@graph": jsonListItem,
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

export default SiteNavigationElement;
