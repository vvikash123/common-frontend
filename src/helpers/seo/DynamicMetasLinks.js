import React from 'react';
import OrgSchema from './schemas/Organization';
import WebSite from './schemas/WebSite';
import { getNewImageUrl, removeHtmlTags } from '@/utils/common';
import { IMG_OG_DEFAULT, seoDefaultMeta } from '@/constants/index';
import ViewActionSchema from './schemas/ViewActionSchema';
import PersonSchema from './schemas/PersonSchema';
import Head from 'next/head'
import { GA_TRACKING_ID } from "@/constants";
import { useAmp } from "next/amp";
import Script from "next/script";


const generateTags = (seoObject) => {

  if (seoObject.metaTags instanceof Array) {
    return seoObject.metaTags.map((tagItem) => {
      const { tagName } = tagItem;
      const attributeMapping = {};
      if (tagItem.attributes instanceof Array) {
        tagItem.attributes.forEach((item) => {
          attributeMapping[item.attributeName] = item.attributeValue;
        });
      }
      return React.createElement(tagName, attributeMapping, null);
    });
  }
  return null;
};

const DynamicMetasLinks = ({ seoData, customeEvent = {} }) => {
  const uid = "10538";
  const seoObject = seoData?.seo || {};
  let isNoIndexPage = false;
  if (seoObject?.canonical?.includes("search-result/")) {
    isNoIndexPage = true;
  }
  const isAmp = useAmp();
  customeEvent.keywords = seoObject?.keywords || "";
  const seoObjectStatic = seoDefaultMeta;
  const ga4Values = customeEvent;
  return (
    <>
      <Head>
        <title>
          {removeHtmlTags(seoObject?.title || seoObjectStatic?.title)}
        </title>
        <meta
          name="description"
          content={removeHtmlTags(seoObject?.description || seoObjectStatic?.description)}
        />
        {seoObject?.keywords ? (
          <meta name="keywords" content={seoObject?.keywords} />
        ) : (
          <meta name="keywords" content={seoObjectStatic?.keywords} />
        )}

        {isNoIndexPage && (
          <meta name="robots" content="noindex, nofollow" />
        )}

        <meta name="news_keywords" content={seoObject?.keywords} />
        <meta
          property="og:title"
          content={
            seoObject?.headline
              ? seoObject?.headline
              : seoObject?.title
                ? seoObject?.title
                : ''
          }
        />
        <meta
          property="og:image"
          content={
            seoObject?.msid
              ? getNewImageUrl({
                msid: seoObject?.msid
                  ? seoObject?.msid
                  : seoObject?.leadImage?.msid,
                imgSize: seoObject?.leadImage?.thumbsize
                  ? seoObject?.leadImage?.thumbsize
                  : seoObject?.thumbsize
                    ? seoObject?.thumbsize
                    : '',
                imgWidth: 1280,
                imgHeight: 720,
              })
              : IMG_OG_DEFAULT
          }
        />
        <meta property="og:type" content="Article" />
        <meta property="og:url" content={seoObject?.canonical} />
        <meta property="og:description" content={seoObject?.description} />
        <meta property="twitter:url" content={seoObject?.canonical} />
        <meta
          property="twitter:title"
          content={
            seoObject?.headline
              ? seoObject?.headline
              : seoObject?.title
                ? seoObject?.title
                : ''
          }
        />
        <meta property="twitter:description" content={seoObject.description} />
        {/*seoObject.robots && seoObject.robots.length > 0 && (
        <meta content={seoObject.robots} name="robots" />
      )*/}
        <link rel="canonical" href={seoObject?.canonical || ''} />
        {seoObject?.amphtml && (
          <link rel="amphtml" href={seoObject?.amphtml || ''} />
        )}
        {generateTags(seoObject)}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              OrgSchema,
            ),
          }}
        />

        {seoObject?.seopath && seoObject.seopath !== 'videos' && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(WebSite),
            }}
          />
        )}


        {/* {seoObject.fromPage && seoObject.fromPage === 'home' && (
         
        )} */}
        {/* {seoObject.fromPage && seoObject.fromPage === 'home' && ( */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ViewActionSchema),
          }}
        />
        {/* )} */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(PersonSchema),
          }}
        />
        {seoObject.schema &&
          seoObject.schema.length > 0 &&
          seoObject.schema.map((item, index) => (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(item),
              }}
            />
          ))}
      </Head>
      {isAmp ? (
        <>
          <amp-analytics type="googleanalytics" config="https://amp.analytics-debugger.com/ga4.json" data-credentials="include">
            <script
              type="application/json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  vars: {
                    GA4_MEASUREMENT_ID: GA_TRACKING_ID,
                    GA4_ENDPOINT_HOSTNAME: "www.google-analytics.com",
                    DEFAULT_PAGEVIEW_ENABLED: false,
                  },
                  triggers: {
                    custom_pageview: {
                      enabled: true,
                      on: "visible", // Only trigger on visibility
                      request: "ga4Event",
                      vars: {
                        ga4_event_name: "page_view",
                      },
                      extraUrlParams: {
                        ...ga4Values,
                      },
                    },
                  },
                }),
              }}
            ></script>
          </amp-analytics>
          <amp-analytics type="chartbeat">
            <script
              type="application/json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  vars: {
                    uid: uid,
                    domain: "unilist.in",
                    sections: customeEvent?.section || "",
                    authors: customeEvent?.authors || "no author",
                    type: customeEvent?.page_template || "",
                  },
                }),
              }}
            ></script>
          </amp-analytics>
        </>
      ) : (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
               var customParams = ${JSON.stringify(customeEvent)};
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                  ...customParams
                });
              `,
            }}
          />
        </>
      )}

      <Script
        id="chartbeat-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      (function() {
        var _sf_async_config = window._sf_async_config = (window._sf_async_config || {});
        _sf_async_config.uid = ${uid};
        _sf_async_config.domain = 'unilist.in';
        _sf_async_config.flickerControl = false;
        _sf_async_config.useCanonical = true;
        _sf_async_config.useCanonicalDomain = true;
        _sf_async_config.sections = '${customeEvent?.section || ""}';
        _sf_async_config.authors = '${customeEvent?.authors || "no author"}';
        _sf_async_config.type = '${customeEvent?.page_template || ""}';
        function loadChartbeat() {
          var e = document.createElement('script');
          var n = document.getElementsByTagName('script')[0];
          e.type = 'text/javascript';
          e.async = true;
          e.src = '//static.chartbeat.com/js/chartbeat.js';
          n.parentNode.insertBefore(e, n);
        }
        loadChartbeat();
      })();
    `,
        }}
      />
      <Script
        src="//static.chartbeat.com/js/chartbeat_mab.js"
        strategy="afterInteractive"
        async
      />

      <Script
        id="chinh-config"
        strategy="afterInteractive"
        defer
        dangerouslySetInnerHTML={{
          __html: `
      (function () {
        window.Chihn = window.Chihn || {};
        window.Chihn.config = {
          ppid_id: "",
          domain: "unilist.in",
          ga_id: '${GA_TRACKING_ID}',
          ad_id: "",
          devices: "",
          channel_id: 1006,
          utm_source: "",
          utm_campaign: "",
          activity_data: ${JSON.stringify(seoObject || seoObjectStatic || "")}
        };

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;
        script.src = '${process.env.NEXT_PUBLIC_CHIHN_DOMAIN}';

        var firstScript = document.getElementsByTagName("script")?.[0];
        if (firstScript && firstScript.parentNode) {
          firstScript.parentNode.insertBefore(script, firstScript);
        }
      })();
    `,
        }}
      />
    </>
  );
}


export default DynamicMetasLinks;
