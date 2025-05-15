import { LOGIN_MAPPED_ON_LIVE } from '../../../constants';

export default {
  __html: `(function(g, r, o, w, t, h, rx) {
        g[t] =
          g[t] ||
          function() {
            (g[t].q = g[t].q || []).push(arguments);
          };
        g[t].l = 1 * new Date();
        g[t] = g[t] || {};
        h = r.createElement(o);
        rx = r.getElementsByTagName(o)[0];
        h.async = 1;
        h.src = w;
        var __currentCountry = document.cookie.match(/(?:\\s)?geo_country=(\\w+);?/);
        if (window.TimesGDPR && TimesGDPR.common.consentModule.gdprCallback) {
          TimesGDPR.common.consentModule.gdprCallback(function(dataObj) {
            //We are waiting to read cookies, as gdpr code sets country cookie
            var __currentCountry = document.cookie.match(/(?:\\s)?geo_country=(\\w+);?/);
            if (__currentCountry && __currentCountry[1] === 'IN') {
              rx.parentNode.insertBefore(h, rx);
            }
          });
        }
      })(
        window,
        document,
        'script',
        'https://${
          LOGIN_MAPPED_ON_LIVE || __PROD__
            ? 'image.timespoints.iimg.in'
            : 'test-img.timespoints.com'
        }/static/tpsdk/tp-sdk.js',
        'tpsdk',
      );`,
};
