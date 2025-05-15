export default {
  __html: `window.TimesGA = window.TimesGA || {};
    window.TimesGA.setGAParams = (gaData, isServerView) => {
      const gaParams = isServerView && window.App ? window.App.gaData : gaData;
      if (typeof gaParams !== 'object') {return;}
      window.gtag('set', 'contentGroup1', gaParams.contentGroup1);
      window.gtag('set', 'dimension4', gaParams.dimension4);
      window.gtag('set', 'dimension5', gaParams.dimension5);
      window.gtag('set', 'dimension8', gaParams.dimension8);
      window.gtag('set', 'dimension9', gaParams.dimension9);
      window.gtag('set', 'dimension11', gaParams.dimension11);
    };`,
};
