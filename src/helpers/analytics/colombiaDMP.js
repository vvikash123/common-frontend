// CCAUD to be added in head and aa.js to be in footer/ body end
const callCCAUDFn = () => {
  function loadCCAUD() {
    const s = document.createElement('script');
    const el = document.getElementsByTagName('head')[0];
    s.async = true;
    s.src = 'https://ade.clmbtech.com/cde/ae/78747/var=_ccaud';
    el.appendChild(s);
  }
  function init() {
    if (typeof window !== 'undefined' && typeof loadCCAUD === 'function') {
      if (
        window.TimesGDPR &&
        window.TimesGDPR.common.consentModule.gdprCallback
      ) {
        window.TimesGDPR.common.consentModule.gdprCallback((dataObj) => {
          if (
            !dataObj.isEUuser ||
            (dataObj.isEUuser && dataObj.didUserOptOut === false)
          ) {
            loadCCAUD();
          }
        });
      } else {
        loadCCAUD();
      }
    }
  }
  init();
};


export const CCAUDScript = {
  __html: `if (typeof window !== 'undefined') {
      window.callCCAUD = ${callCCAUDFn};
      window.callCCAUD();
    }`,
};

