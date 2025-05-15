import { PRIME_USER_COOKIE_NAME, SSOINFO } from '../../constants';

export default {
  __html: `(function(g, r, o, w, t, h, rx) {
        g[t] = g[t] || function() {
            (g[t].q = g[t].q || []).push(arguments)
        }, g[t].l = 1 * new Date();
        g[t] = g[t] || {}, h = r.createElement(o), rx = r.getElementsByTagName(o)[0];
        h.async = 1;
        h.src = w;
        rx.parentNode.insertBefore(h, rx)
    })(window, document, 'script', 'https://static.growthrx.in/js/v2/web-sdk.js', 'grx');
    grx('init', '${process.env.GROWTHRX_PROJECTID}');
    var __ssoid = document.cookie.match(/(?:\\s)?${SSOINFO.ssoLoginCookieName}=(\\w+);?/);
    var __prc = document.cookie.match(/(?:\\s)?${PRIME_USER_COOKIE_NAME}=(\\w+);?/);
    var cd10 = -1;
    var cd21 = __ssoid ? 1: 0;
    if(!!__ssoid){
        grx('userId', __ssoid[1]);
        grx('set', 'loginstatus', cd21);
        grx('set', 'primeStatus', cd10);
    }`,
};
