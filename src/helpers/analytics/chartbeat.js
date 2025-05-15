export const chartbeat = (sections = '', authors = '', domain = '') => {
  return `(function() {
    /** CONFIGURATION START **/
    var _sf_async_config = window._sf_async_config = (window._sf_async_config || { });
    _sf_async_config.uid = 10538;
    _sf_async_config.domain = '${domain}'; //CHANGE THIS TO THE ROOT DOMAIN
    _sf_async_config.flickerControl = false;
    _sf_async_config.useCanonical = true;
    _sf_async_config.useCanonicalDomain = true;
    _sf_async_config.sections = '${sections}' ;
    _sf_async_config.authors = '${authors}';
    /** CONFIGURATION END **/
    function loadChartbeat() {
        var e = document.createElement('script');
    var n = document.getElementsByTagName('script')[0];
    e.type = 'text/javascript';
    e.async = true;
    e.src = '//static.chartbeat.com/js/chartbeat.js';;
    n.parentNode.insertBefore(e, n);
    }
    loadChartbeat();
  })()`;
};
