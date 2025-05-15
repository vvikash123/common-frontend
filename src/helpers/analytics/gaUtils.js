export function sendGAEvent(e, articleSortLink) {
  // const defaultCategory = 'category';
  // const defaultAction = '';
  // const defaultLabel = '';
  // const defaultValue = '';
  // const category = gaConfig.category || defaultCategory;
  // const action = gaConfig.action || defaultAction;
  // let label = gaConfig.label || defaultLabel;
  // const value = gaConfig.value || defaultValue;
  // if (typeof value !== 'undefined' && value !== '') {
  //   label += `_${value}`;
  // }
  if (window && window.gtag) {
    window.gtag('event', `app download`, {
      link_text: e.target.innerText,
      link_url: e.target.href,
      link_id: e.target.id,
      link_classes: e.target.className,
    });
  }
}

export function sendGAPageView(url, title, customDimensions, langConstant={}) {
  // gtag sends page change calls on it's own by default https://developers.google.com/analytics/devguides/collection/gtagjs
  if (window && window.gtag) {
    if (url) {
      window.gtag('config', 'UA-64032556-12', {
        page_title: title,
        page_path: url,
        ...customDimensions,
      });
      window.gtag('config', `${langConstant?.GA4_TRACKING_ID}`, {
        page_title: title,
        page_path: url,
      });
    }
  }
}

export function setGAValue(action, category, trackingObj) {
  if (window && window.gtag) {
    window.gtag(action, category, trackingObj);
  }
}

export function setGAValueDimensions(trackingObj) {
  if (window && window.gtag) {
    window.gtag('config', 'UA-64032556-12', {
      ...trackingObj,
    });
  }
}
