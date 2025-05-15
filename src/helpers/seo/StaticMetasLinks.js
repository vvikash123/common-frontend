import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
import { izootoScript } from '@/constants';

export const StaticMetasLinks = () => {
  const router = useRouter();
  const { asPath } = useRouter();
  const category = asPath.split('/')[1]; // Extract the first segment

  const preconnectUrl = [
    'https://sociowatch.com',
    'http://static.chartbeat.com',
    'http://b.scorecardresearch.com',
    'http://c.amazon-adsystem.com'
  ];

  // Ensure categoryString is only assigned if category is available
  const categoryString = category ? category : '';

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="icon" href="https://images.unilist.in/photo/msid-151074926/151074926.jpg" />
        {/* Fonts preload */}
        <link rel="preload" href="/assets/fonts/manrope-regular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/manrope-thin.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/manrope-light.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/manrope-medium.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/manrope-semibold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/manrope-bold.woff" as="font" type="font/woff" crossOrigin="anonymous" />

        <link rel="preload" href="https://images.unilist.in/photo/msid-151074926/151074926.jpg" as="image" />
        <link rel="preload" href={process.env.NEXT_PUBLIC_LOGO_URL} as="image" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5.0" />
        <meta content="en" httpEquiv="content-language" />
        <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
        <meta content="true" name="HandheldFriendly" />
        <meta content="width" name="MobileOptimized" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="Unilist" property="og:site_name" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta content="#135394" name="theme-color" />
        <meta content="81147439122" property="fb:pages" />
        <meta content="438619246820867" property="fb:app_id" />
      </Head>

      {/* Preconnect to external resources */}
      {preconnectUrl.map((domain, key) => (
        <link key={`prefetchurls${key}`} href={domain} rel="preconnect" crossOrigin />
      ))}

      <Script defer src="../../../newrelic.js"></Script>

      {/* <Script defer src="../../../newrelic.js" /> */}
      {/* <Script
        async
        id="fetchBids"
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `!function(a9,a,p,s,t,A,g){if(a[a9])return;function q(c,r){a[a9]._Q.push([c,r])}a[a9]={init:function(){q("i",arguments)},fetchBids:function(){q("f",arguments)},setDisplayBids:function(){},targetingKeys:function(){return[]},_Q:[]};A=p.createElement(s);A.async=!0;A.src=t;g=p.getElementsByTagName(s)[0];g.parentNode.insertBefore(A,g)}("apstag",window,document,"script","//c.amazon-adsystem.com/aax2/apstag.js");`,
        }}
      /> */}

      {/* <Script async src="https://watch.sociofyme.com/player/prod/sociofymeloader.js" /> */}

      <Script
        defer
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        strategy="afterInteractive"
      />

      <Script
        id="comscore-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var _comscore = _comscore || [];
            _comscore.push({ c1: "2", c2: "26200502" });
            (function() {
              var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
              s.src = (document.location.protocol == "https:" ? "https:" : "http:") + "//sb.scorecardresearch.com/beacon.js";
              el.parentNode.insertBefore(s, el);
            })();
          `,
        }}
      />


      <noscript>
        <div>
          <Image
            src="https://sb.scorecardresearch.com/p?c1=2&c2=26200502&cv=2.0&cj=1"
            alt="comscore"
            layout="intrinsic"
            width={1}
            height={1}
          />
        </div>
      </noscript>
    </>
  );
};

export default StaticMetasLinks;
