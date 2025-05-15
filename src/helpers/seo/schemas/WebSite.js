import Head from "next/head";
const WebSiteSchema = () => {
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Unilist",
    alternateName: "Education",
    url: process.env.NEXT_PUBLIC_WEBAPP_BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/search-result/{search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </Head>
  );
};

export default WebSiteSchema;
