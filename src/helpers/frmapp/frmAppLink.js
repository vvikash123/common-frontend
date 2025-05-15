import cookies from '@/utils/cookies';
import { getBaseUrl } from '../../utils/common';

function shouldAppendIOSParam() {
  const iosVer = cookies.get('iosappipver');
  let isNewIOSVer = false;

  if (
    typeof iosVer === 'string' &&
    iosVer.length > 0 &&
    !Number.isNaN(iosVer)
  ) {
    const intIOSVer = parseInt(iosVer, 10);
    if (intIOSVer && intIOSVer >= 611) {
      isNewIOSVer = true;
    }
  }

  return isNewIOSVer;
}

function shouldAppendPCParameter(newUrl) {
  let addPrimeUserParameter = false;
  try {
    const domainVisited = Cookie.get('pcdomainvisit');
    const clientState = window?.App?.state || {}
    const isPrimeUser = clientState?.login?.userData?.isPrimeUser || {}
    if (
      clientState &&
      isPrimeUser &&
      clientState.isAppView &&
      !clientState.isChromeTab &&
      clientState.isMobile &&
      domainVisited !== '1' &&
      newUrl &&
      newUrl.indexOf('.timesofindia.com') === -1 &&
      newUrl.split('/')[2] !== window.location.hostname
    ) {
      addPrimeUserParameter = true;
    }
  } catch (e) {
    // console.log(e);
  }

  return addPrimeUserParameter;
}

export function shouldAppendFrmApp() {
  let shouldAppendFrmAppToUrl = false;
  if (typeof window !== 'undefined') {
    const queryParams = window.location.href.split('?')[1] || '';
    if (
      queryParams.indexOf('frmapp=yes') > -1 &&
      window.location.href.indexOf(`${getBaseUrl()}`) > -1
    ) {
      shouldAppendFrmAppToUrl = true;
    }
  } else if (typeof global === 'object' && global.isAppView) {
    shouldAppendFrmAppToUrl = true;
  }
  return shouldAppendFrmAppToUrl;
}

export function shouldAppendGlance() {
  let showApendGlance = false;
  if (typeof window !== 'undefined') {
    const queryParams = window.location.href.split('?')[1] || '';
    if (
      (queryParams.indexOf('utm_source=g') > -1 ||
        queryParams.indexOf('utm_source=dtpl') > -1) &&
      window.location.href.indexOf(`${getBaseUrl()}`) > -1
    ) {
      showApendGlance = true;
    }
  } else if (
    typeof global === 'object' &&
    (global?.isGlance || global?.isIzooto)
  ) {
    showApendGlance = true;
  }
  return showApendGlance;
}

export function appendFrmAppToUrl(urlToAppend) {
  let newUrl = urlToAppend || '';
  const url = urlToAppend || '';
  if (url.indexOf('#') > -1 && url.split('#').length > 1) {
    newUrl = url.split('#')[0];
  }
  if (url.indexOf('?') > -1) {
    newUrl += '&frmapp=yes';
  } else {
    newUrl += '?frmapp=yes';
  }

  if (
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    shouldAppendPCParameter(newUrl)
  ) {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (!isIOS) {
      newUrl += '&pc=yes';
    } else if (isIOS && shouldAppendIOSParam()) {
      newUrl += '&pc=yes&newver=1';
    }
  }

  if (url.indexOf('#') > -1 && url.split('#').length > 1) {
    newUrl += `#${url.split('#')[1]}`;
  }

  return newUrl;
}

export function handleLinksForFrmapp() {
  document.addEventListener('click', (e) => {
    if (!shouldAppendFrmApp()) {
      return;
    }

    const anchor = e.target.closest('a');
    if (!anchor || (anchor && anchor.getAttribute('clink') === 'y')) {
      return;
    }

    if (
      !e.defaultPrevented &&
      (!!anchor.getAttribute('href') || !!anchor.href)
    ) {
      e.preventDefault();
      window.location.href = appendFrmAppToUrl(anchor.getAttribute('href'));
    }
  });
}
