export function sendGrxEvent(objGrxConfig) {
  if (window && window.grx) {
    window.grx('track', objGrxConfig.event, objGrxConfig.params);
  }
}

export function sendGrxPageView(objGrxConfig) {
  if (window && window.grx) {
    if (objGrxConfig && objGrxConfig.params) {
      window.grx('track', 'page_view', objGrxConfig.params);
    } else {
      const objGrx = {};
      objGrx.params = {};
      objGrx.params.url = window.location.href;
      objGrx.merge(objGrxConfig);
      window.grx('track', 'page_view', objGrx);
    }
  }
}

export function setGrxValue(key, value) {
  if (window && window.grx && key) {
    window.grx('set', key, value);
  }
}
