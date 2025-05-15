import Head from "next/head";
import { removeHtmlTags } from "@/utils/common";
import { useRouter } from "next/router";

const WebPage = ({ data }) => {
  const router = useRouter();
  const { pathname, asPath } = router;
  const headline = data?.title?.replace(/["]/gi, "").substr(0, 110) || "";
  const des = data?.synopsis
    ? removeHtmlTags(data.synopsis)
    : data?.description
    ? removeHtmlTags(data.description)
    : data?.text
    ? removeHtmlTags(data.text)
    : "";
  const url = `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}${asPath}`;
  const keywords = data?.keywords?.length > 0 ? data.keywords : [];
  const jsonListKeywords = Array.isArray(keywords)
    ? keywords.reduce((result, item) => `${result}${item.name},`, "")
    : keywords;
  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: headline,
    description: des,
    keywords: jsonListKeywords,
    url,
  };
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
      />
    </Head>
  );
};

export default WebPage;
