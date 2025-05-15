import config from '../config/serverConfig';

export const  gtagScript = (trackingobj) => {
  return `(function(i,s,o,g,r,a,m)
         {i['GoogletagmanagerObject']=r;
         i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.googletagmanager.com/gtag/js?id=${
          config.analytics.googleTrackingId
        }','gtag');
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${config.analytics.googleTrackingId}', ${JSON.stringify(
    trackingobj ? trackingobj : {},
  )});
        if (window.TimesGDPR && TimesGDPR.common.consentModule.gdprCallback){
            TimesGDPR.common.consentModule.gdprCallback(function(dataObj){
                if (!!dataObj.isEUuser){
                    gtag('set', 'anonymizeIp', true);
                }
                gtag('send', 'pageview');
            });
        }`;
};

export const ga4TagScript = (langConst={}) =>  {
  return `(function(i,s,o,g,r,a,m)
           {i['GoogletagmanagerObject']=r;
           i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.googletagmanager.com/gtag/js?id=${langConst?.GA4_TRACKING_ID}','gtag');
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${langConst?.GA4_TRACKING_ID}');`
};
