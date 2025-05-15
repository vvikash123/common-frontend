import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { isAMPRequest } from "@/utils/serverUtils";
import {
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH,
  GOOGLE_WEBCACHE_DOMAIN,
  IMG_DEFAULT,
  IMG_DOMAIN,
  HEALTH_SITE_URL,
  SITE_URL,
} from "../constants";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";

import NextImage from "./NextImage";

export const isHealthFirstPhase = true;

export const THUMBNAIL_CONFIG = {
  imgWidth: 840,
  imgHeight: 420,
};

export const THUMBNAIL_CONFIG_FEATURED = {
  imgWidth: 359,
  imgHeight: 269,
};
export const THUMBNAIL_CONFIG_FEATURED_TAGCARD = {
  imgWidth: 300,
  imgHeight: 200,
};

export const THUMBNAIL_CONFIG_CATEGORY_DEKSTOP = {
  imgWidth: 340,
  imgHeight: 255,
};

export const THUMBNAIL_CONFIG_CATEGORY_MOBILE = {
  imgWidth: 285,
  imgHeight: 214,
};

export const THUMBNAIL_CONFIG_SIDE_ARTICLE = {
  imgWidth: 113,
  imgHeight: 85,
};

export const THUMBNAIL_CONFIG_TOP_PICK_MOB = {
  imgWidth: 350,
  imgHeight: 175,
};

export const THUMBNAIL_CONFIG_LEAD_ARTICLE_SHOW_MOB = {
  imgWidth: 360,
  imgHeight: 235,
};
export const THUMBNAIL_CONFIG_AUTHER_DETAILS_SHOW_DESKTOP = {
  imgWidth: 313,
  imgHeight: 192,
};
export const THUMBNAIL_CONFIG_AUTHER_DETAILS_SHOW_MOB = {
  imgWidth: 113,
  imgHeight: 69,
};
export const THUMBNAIL_CONFIG_LIVE_BLOG_DETAILS_DESKTOP = {
  imgWidth: 828,
  imgHeight: 461,
};
export const THUMBNAIL_CONFIG_LIVE_BLOG_DETAILS_MOB = {
  imgWidth: 374,
  imgHeight: 208,
};
export const THUMBNAIL_CONFIG_SEARCH_RESULT_DESKTOP = {
  imgWidth: 300,
  imgHeight: 200,
};
export const THUMBNAIL_CONFIG_SEARCH_RESULT_MOB = {
  imgWidth: 94,
  imgHeight: 63,
};
export function fireComScoreEvent() {
  if (
    typeof window !== "undefined" &&
    typeof window.fireComscore === "function"
  ) {
    debounce(window.fireComscore(), 50);
  }
}

export function convertTimestamp(timestamp) {
  const dateObject = new Date(timestamp);

  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const hours = ("0" + dateObject.getHours()).slice(-2);
  const minutes = ("0" + dateObject.getMinutes()).slice(-2);
  const monthAbbreviation = monthAbbreviations[dateObject.getMonth()];
  const day = ("0" + dateObject.getDate()).slice(-2);

  const formattedDateTime =
    hours + ":" + minutes + " (IST) " + monthAbbreviation + " " + day;

  return formattedDateTime;
}

export const generateUrlPath = (urlData) => {
  const { seopath = "", cmstype = "", msid = "", overridelink = "" } = urlData;

  //console.log('seopath...',seopath);
  if (overridelink) {
    return overridelink;
  }

  if (cmstype == "DEFINITION") {
    // return seopath;
    return `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/${seopath}`;
  }

  let cmsType =
    cmstype === "PHOTOGALLERYSLIDESHOWSECTION" || cmstype === "IMAGES"
      ? seopath?.startsWith("web-stories")
        ? "PHOTOSTORY"
        : "PHOTOGALLERYSLIDESHOWSECTION"
      : cmstype;
  if (cmsType === "PHOTOSTORY") {
    return `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/${seopath}/${getSlug(
      cmsType
    )}/${msid}${cmsType === "PHOTOSTORY" ? ".cms" : ""}`;
  }

  return `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/${seopath}-${getSlug(
    cmsType
  )}-${msid}`;
};

export const generateAuthorPath = (author) => {
  return `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/author/${author?.authorSeoName}-${author?.authorId}`;
};

export const generateArticlePath = (config) => {
  const { seopath = "", msid = "" } = config;
  return `/${seopath}-article-${msid}`;
};

export const updateOGImgMetaTag = (ogImage) => {
  const ogImageTag = document.querySelector('meta[property="og:image"]');
  if (ogImageTag) {
    ogImageTag.setAttribute("content", ogImage);
  }
};

dayjs.extend(duration);
export function removeUnsupportedCharacters(str) {
  return (str || "").replace(/[^\u0900-\u097F0-9a-z\s_-]/gi, "");
}

export function setPageNameVariable(pageName) {
  if (typeof window !== "undefined") {
    window._gn = window._gn || {};
    window._gn.pageName = pageName || "gnow";
  } else if (typeof global === "object") {
    global.pageName = pageName || "gnow";
  }
}

export const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({
      behavior: "smooth",
      top: section.offsetTop,
    });
  }
};

export const getMaxHightFromAdSize = (size = []) => {
  let maxhight = 0;
  size.forEach((s) => {
    maxhight = s[1] > maxhight ? s[1] : maxhight;
  });

  return maxhight;
};

export function triggerWindowScroll() {
  if (window.dispatchEvent) {
    window.dispatchEvent(new CustomEvent("scroll"));
  } else {
    window.scrollTo(window.scrollX, window.scrollY + 1);
    window.scrollTo(window.scrollX, window.scrollY - 1);
  }
}

export function debounce(func, wait, immediate) {
  let timeout;
  return function debouncer() {
    const context = this;
    const args = arguments;
    const later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function sanitizeQueryParams(paramsObj) {
  const sanitizedParamsObj = {};

  Object.keys(paramsObj).forEach((paramKey) => {
    const paramValue = paramsObj[paramKey];
    if (Array.isArray(paramValue)) {
      sanitizedParamsObj[paramKey] = paramValue[paramValue.length - 1];
    } else {
      sanitizedParamsObj[paramKey] = paramValue;
    }
  });

  return sanitizedParamsObj;
}

export function disableAppInit() {
  return (
    window.an_disableAppInit === true ||
    window.location.hostname === GOOGLE_WEBCACHE_DOMAIN ||
    window.document.domain === GOOGLE_WEBCACHE_DOMAIN
  );
}

export function formatDateEmbed(d) {
  try {
    d = new Date(d);
    if (Object.prototype.toString.call(d) === "[object Date]") {
      if (isNaN(d.getTime())) {
        throw "IBEAT:Date format is not valid";
      }

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const day = d.getDate();
      const monthIndex = d.getMonth();
      const year = d.getFullYear();
      // const hours = d.getHours();
      // let mins = d.getMinutes();
      // mins = mins < 10 ? '0' + mins : mins;
      // const type = hours < 12 ? ' AM IST' : ' PM IST';
      // const time = hours + ':' + mins + type;
      return monthNames[monthIndex] + " " + day + "," + " " + year;
    } else {
      throw "IBEAT:Date format is not valid";
    }
  } catch (e) {
    console.error(e);
  }
}

export function isTablet() {
  return (function returnAgent(agent) {
    return /(?:ipad|tab)/i.test(agent);
  })(navigator.userAgent || navigator.vendor || window.opera);
}

export function isIE() {
  const ua = window.navigator.userAgent;

  const msie = ua?.indexOf("MSIE ");
  if (msie > 0) {
    return parseInt(ua.substring(msie + 5, ua?.indexOf(".", msie)), 10);
  }

  const trident = ua?.indexOf("Trident/");
  if (trident > 0) {
    const rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua?.indexOf(".", rv)), 10);
  }

  const edge = ua?.indexOf("Edge/");
  if (edge > 0) {
    return parseInt(ua.substring(edge + 5, ua?.indexOf(".", edge)), 10);
  }

  return false;
}

export function getNewImageUrl({
  msid,
  imgSize,
  imgWidth = DEFAULT_IMAGE_WIDTH,
  imgHeight = DEFAULT_IMAGE_HEIGHT,
  resizeMode = false,
  isArticleBanner = false,
  updatedAt,
  imgType = "",
}) {
  if (!msid && isNaN(Number(msid))) {
    return IMG_DEFAULT;
  }
  if (typeof imgWidth !== "number") {
    imgWidth = DEFAULT_IMAGE_WIDTH;
  }
  if (typeof imgHeight !== "number") {
    imgHeight = DEFAULT_IMAGE_HEIGHT;
  }
  const imgResizeMode = resizeMode ? "resizemode-4" : "resizemode-3";
  const imgurl = `${IMG_DOMAIN}/${
    !isArticleBanner ? "thumb" : "photo"
  }/msid-${msid}${updatedAt ? `,updatedat-${updatedAt}` : ""}${
    imgSize ? `,thumbsize-${imgSize}` : ""
  }${imgWidth ? `,width-${imgWidth}` : ""}${
    imgHeight ? `,height-${imgHeight}` : ""
  },${imgResizeMode}/${msid}.jpg`;
  // console.log(imgurl,'..........imgurl..........');
  return imgurl;
}

export function getAuthorImageUrl({
  msid,
  imgSize,
  imgWidth = DEFAULT_IMAGE_WIDTH,
  imgHeight = DEFAULT_IMAGE_HEIGHT,
  resizeMode = false,
  isArticleBanner = false,
  updatedAt,
  imgType = "",
}) {
  if (!msid && isNaN(Number(msid))) {
    return IMG_DEFAULT;
  }
  if (typeof imgWidth !== "number") {
    imgWidth = DEFAULT_IMAGE_WIDTH;
  }
  if (typeof imgHeight !== "number") {
    imgHeight = DEFAULT_IMAGE_HEIGHT;
  }
  const imgResizeMode = resizeMode ? "resizemode-4" : "resizemode-3";
  const imgurl = `${IMG_DOMAIN}/authorthumb/msid-${msid}/${msid}.jpg?${
    imgSize ? `&thumbsize=${imgSize}` : ""
  }${imgWidth ? `&width=${imgWidth}` : ""}${
    imgHeight ? `&height=${imgHeight}` : ""
  }`;
  // console.log(imgurl,'..........imgurl..........');
  return imgurl;
}

export function getShareUrl(url, type, isMobile, subBlog) {
  if (!(url && typeof url === "string")) {
    return "";
  }

  let shareURL = url;

  // append domain to relative URLs
  if (shareURL?.indexOf("/") === 0) {
    if (subBlog) {
      shareURL = `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}${shareURL}#${subBlog}`;
    } else {
      shareURL = `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}${shareURL}`;
    }
  }
  const shortUrlMap = {
    fb: {
      utmSource: "facebook",
      medium: "social",
    },
    twitter: {
      utmSource: "twitter",
      medium: "social",
    },
    linkedin: {
      utmSource: "linkedin",
      medium: "social",
    },
    whatsapp: {
      utmSource: "whatasapp",
      medium: "social",
    },
    email: {
      utmSource: "a28",
      medium: "g",
    },
    pinit: {
      utmSource: "a27",
      medium: "g",
    },
    nativeShare: {
      utmSource: "a33",
      medium: "g",
    },
  };

  const utmCampaign = "ShareButton";

  const mapValue = shortUrlMap[type];
  if (!mapValue) {
    return shareURL;
  }
  return `${shareURL}${shareURL?.indexOf("?") > -1 ? "&" : "?"}utm_source=${
    mapValue.utmSource
  }&utm_medium=${mapValue.medium}&utm_campaign=${utmCampaign}`;
}

export const getShareURL = (shareType, encode, url = "") => {
  const currentURL = `${window.location.pathname}`;
  const shareUrl = getShareUrl(url || currentURL, shareType, true);
  if (encode) {
    return encodeURIComponent(shareUrl);
  }
  return shareUrl;
};

export function removeHtmlTags(strParam) {
  let str = typeof strParam !== "undefined" ? strParam : "";
  str = str?.replace(/&lt;/g, "<");
  str = str?.replace(/&gt;/g, ">");
  str = str?.replace(/&lt;\//g, ">");
  str = str?.replace(/<[^>]*>?/gm, "");
  str = str?.replace(/&amp;/g, "&");
  return str;
}

export const _isCSR = () => {
  if (typeof window != "undefined") {
    return true;
  } else {
    return false;
  }
};

export const getPageName = (data, finalParams) => {
  let pageName = "";
  data &&
    data.length > 0 &&
    data.map((items) => {
      if (
        finalParams["category"] &&
        items["seopath"]?.indexOf(finalParams["category"]) > -1
      ) {
        pageName = items["title"];
        items.child &&
          items.child.length > 0 &&
          items.child.map((itemsL2) => {
            if (
              finalParams["sub_category"] &&
              itemsL2["seopath"]?.indexOf(finalParams["sub_category"]) > -1 &&
              itemsL2.child &&
              itemsL2.child.length > 0
            ) {
              pageName = itemsL2["title"];
            }
          });
      }
    });
  return pageName;
};

// Get Active Navigation
export const getActiveNavigation = (finalParams) => {
  const activeNavigation =
    finalParams && finalParams?.["sub_category"]
      ? finalParams?.["sub_category"]
      : finalParams?.["category"];
  return activeNavigation;
};

export const getTargetURL = ({
  overrideString = "",
  normalString = "",
  msid,
  seoPath,
  storyType,
}) => {
  normalString = !normalString?.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/${normalString}`
    : normalString;
  // if (
  //   getSlug(storyType) === 'photostory' &&
  //   (overrideString == '' || overrideString == undefined)
  // ) {
  //   return getWebStoryURL({ seoPath, msid });
  // }

  if (isAMPRequest() && overrideString && overrideString.length) {
    const filterValue = [
      "/article/",
      "/photos/",
      "/amp/",
      "/blog/",
      "/tagresults/",
      "/story/",
      "/ucb/",
      "/api/",
      "/wapi/",
      "/sub_blog/",
      "/photostory/",
      "/video/",
      "/expert/",
    ];
    const isExist = filterValue.filter((i) => overrideString.includes(i));
    if (isExist.length > 0 && isExist[0] != "/amp/") {
      return "";
    }
  }

  if (
    isAMPRequest() &&
    overrideString &&
    overrideString.length &&
    overrideString.includes(HEALTH_SITE_URL)
  ) {
    if (overrideString.includes("?")) {
      const url = overrideString.split("?");
      url[0] += "/amp?";
      overrideString = url.join("");
      return overrideString;
    }
    return overrideString + "/amp";
  } else if (
    isAMPRequest() &&
    overrideString &&
    overrideString.length &&
    overrideString.includes(HEALTH_SITE_URL)
  ) {
    return overrideString + "?amp=1";
  } else if (
    isAMPRequest() &&
    overrideString &&
    overrideString.length &&
    overrideString.includes(SITE_URL)
  ) {
    if (
      overrideString.includes("articleshow") ||
      overrideString.includes("photoshow") ||
      overrideString.includes("videoshow")
    ) {
      const urlArr = overrideString.split("/");
      const storyType = urlArr[urlArr.length - 2];
      return overrideString.replace(storyType, "amp_" + storyType);
    } else {
      return overrideString;
    }
  } else if (seoPath?.includes("web-stories")) {
    return getWebStoryURL({ seoPath, msid });
  } else if (seoPath?.includes("photo-stories")) {
    return getPhotoStoryURL({ seoPath, msid });
  } else {
    return overrideString && overrideString.length
      ? isAMPRequest()
        ? `${overrideString}/amp`
        : overrideString
      : `${normalString.replace(/--/g, "-")}`;
  }
};

export const articleSlugMap = {
  VIDEOS: "video",
  ARTICLE: "article",
  PHOTOGALLERYSLIDESHOWSECTION: "photostory",
  IMAGES: "photostory",
  MEDIAVIDEO: "video",
  LIVEBLOG: "liveblog",
  PHOTOSTORY: "photostory",
  SECTION: "article",
};

export const getWebStoryURL = ({ seoPath, msid }) => {
  return (
    `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/` +
    seoPath +
    "/photostory/" +
    `${msid}.cms`
  );
};

export const getPhotoStoryURL = ({ seoPath, msid }) => {
  return (
    `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/` +
    seoPath +
    "/photo-gallery/" +
    `${msid}`
  );
};

export const getSlug = (storyType) => articleSlugMap[storyType];

export const displayTime = (timestamp) => {
  let time = "";

  const convert_time = dayjs.duration(timestamp, "milliseconds");
  const hours = convert_time.hours() ? Math.floor(convert_time.hours()) : "";
  const minutes = convert_time.minutes()
    ? Math.floor(convert_time.minutes())
    : "";
  const seconds = convert_time.seconds()
    ? Math.floor(convert_time.seconds())
    : "";

  time = `${
    hours && hours < 10 ? "0" + hours + ":" : hours >= 10 ? hours + ":" : ""
  }${
    minutes && minutes < 10
      ? "0" + minutes + ":"
      : minutes >= 10
      ? minutes + ":"
      : "00:"
  }${seconds ? (seconds && seconds < 10 ? "0" + seconds : seconds) : "00"}`;
  return time;
};

export const getGoogleTagCustomDimensions = (props, nextmsid) => {
  const { data, navigation, msid } = props;
  let published_date = "";
  let contentType = "",
    byLine = "",
    expert = "",
    contentSource = "";

  const showSeriesName = "";

  if (data && data?.data?.insertdate) {
    published_date = dayjs(data?.data?.insertdate).format("YYYY-MM-DD");
  } else {
    published_date = dayjs(
      data && data?.data?.find((val) => val?.msid == nextmsid)?.insertdate
        ? data?.data.find((val) => val?.msid == nextmsid)?.insertdate
        : ""
    ).format("YYYY-MM-DD");
  }
  let activeArticle = "";
  if (data && data?.data?.cmstype) {
    activeArticle = data?.data;
  } else {
    activeArticle = data && data?.data?.find((val) => val?.msid == nextmsid);
  }
  const createdBy =
    activeArticle && activeArticle?.createdby ? activeArticle?.createdby : "";
  const contentFormat =
    activeArticle && activeArticle?.cmstype
      ? activeArticle?.cmstype?.charAt(0).toUpperCase() +
        activeArticle?.cmstype?.slice(1).toLowerCase()
      : "";
  byLine =
    activeArticle?.authors &&
    activeArticle?.authors?.length > 0 &&
    activeArticle?.authors[0]?.name
      ? activeArticle?.authors[0]?.name
      : "";
  expert = contentSource = activeArticle?.agency?.name
    ? activeArticle?.agency?.name
    : "";
  if (activeArticle && activeArticle.agency) {
    const agencyNames = ["ANI", "PTI", "IANS", "AP", "AFP", "REUTERS"];
    if (agencyNames.includes(activeArticle?.agency?.name)) {
      contentType = "Wire";
    } else {
      contentType = "Original";
    }
  }
  let pageType = "";
  switch (data?.categoryName) {
    case "live_blog":
      pageType = "blog";
      break;
    case "article_show":
    case "audio_show":
    case "photo_show":
      pageType = "consumption";
      break;
    case "video_show":
      pageType = "video_consumption";
      break;
    default:
  }
  const category =
    navigation && navigation?.category ? navigation.category : "";
  const sub_category =
    navigation && navigation?.sub_category ? navigation.sub_category : "";
  if (data?.categoryName == "photo_show") {
    nextmsid = msid;
  }
  const custom_dimension = {
    dimension1: nextmsid,
    dimension2: published_date,
    dimension3: pageType,
    dimension4: category,
    dimension5: sub_category,
    dimension6: contentFormat,
    dimension7: contentSource,
    dimension8: showSeriesName,
    dimension9: contentType,
    dimension10: createdBy,
    dimension11: byLine,
    dimension12: expert,
  };
  return custom_dimension;
};

export function seopathCheck(seopath) {
  const seopatharray = ["latest-news", "videos/latest-videos"];
  const isAvailable = seopatharray.some((item) => item === seopath);
  return isAvailable;
}
export function seopathValidate(seopath) {
  let isValidate = true;
  if (
    seopath?.indexOf(".") !== -1 ||
    seopath == null ||
    seopath == undefined ||
    seopath?.indexOf("undefined") !== -1
  ) {
    isValidate = false;
  }
  return isValidate;
}
export function trimSeoPath(path) {
  const url = path.includes("/amp") ? path.replace("/amp", "") : path;
  const seopath = url.endsWith("/") ? url.substr(0, url.length - 1) : url;
  return seopath;
}
export function getAssetPath(path) {
  const imgName = path.toLowerCase().replace(/\s/g, "-");
  return `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/assets/icons/svg/${imgName}.svg`;
}
export const isFirstPhase = process.env.IS_FIRST_PHASE === "true";
export const CATEGORY_TYPES = {
  auto: "auto",
  business: "business",
  education: "education",
  entertainment: "entertainment",
  entertainmentnew2: "entertainmentnew2",
  health: "health",
  india: "india",
  lifestyle: "lifestyle",
  olympics: "olympics",
  recipesinhindi: "recipesinhindi",
  sports: "sports",
  videos: "videos",
  world: "world",
  auto: "auto",
  budget: "budget",
  buzz: "buzz",
  mirrornow: "mirrornow",
  techngadget: "techngadget",
  cryptonow: "cryptonow",
  reels: "Short Video",
};

export const getAdType = () => {
  let stringValue =
    typeof window != "undefined" && window?.location?.pathname != "/"
      ? window?.location?.pathname
      : "/home";
  const stringToLookup = stringValue
    ?.split("/")
    .splice(1)[0] // remove the first empty space
    .toLowerCase();
  const matchedArray = Object.fromEntries(
    Object?.entries(CATEGORY_TYPES)?.filter(
      ([key, value]) => key === stringToLookup
    )
  );
  return Object.values(matchedArray).length > 0
    ? Object.values(matchedArray)[0]
    : "ROS";
};
export function consentCookieValue() {
  try {
    var cookieStrKey = "privacy-policy";
    var getCookie = function () {
      var cookies = document.cookie.split(";");
      var cookieObj;
      for (var i = 0; i < cookies.length; i++) {
        if (cookies[i]?.indexOf(cookieStrKey) >= 0) {
          cookieObj = cookies[i];
          break;
        }
      }
      //cookie values are copied into cookieObj and return in JSON format.
      if (cookieObj) {
        cookieObj = cookieObj.substring(
          cookieObj?.indexOf("=") + 1,
          cookieObj.length
        );
        return JSON.parse(cookieObj);
      }
      return null;
    };
    let consentValue = getCookie() == 1 ? true : false;

    return consentValue;
  } catch (error) {
    console.error(error);
  }
}
export function getBaseUrlNew(channelId) {
  // let lang = getLangNew(channelId);
  return process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;
}
// check link is internal or external
export const isExternalLink = (to) => {
  const InternalLinkRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]healthandme+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
  const isRelative = (URL) => {
    return URL?.indexOf("/") === 0 && URL?.indexOf("//") !== 0;
  };
  return !(isRelative(to) || InternalLinkRegex.test(to));
};

// Is Mobile validation check
export const isMobile = (value) => {
  var mob_regex = /^[0-9]+$/;
  return mob_regex.test(value);
};

// Is Required validation check
export const isRequired = (value) => {
  return value != null && value.trim().length > 0;
};

//Redirect to presite if selected country or All exists.
export function redirectToPresite(
  path,
  akamaiCountryCode,
  enablePresiteCountries = []
) {
  return (path === "/" || path === "/presite") &&
    enablePresiteCountries &&
    (enablePresiteCountries.indexOf(akamaiCountryCode) > -1 ||
      enablePresiteCountries.indexOf("ALL") > -1)
    ? true
    : false;
}

export const getCustomDimensionsSSR = (app, navigation, seoData) => {
  let custom_dimension = null;
  let data = null;
  let pageType = "";
  const articleList =
    app?.state?.articleshow?.data?.response?.sections?.article_show?.data?.filter(
      (item) => item?.cmstype === "ARTICLE"
    );
  const videoshowList =
    app?.state?.videoshow?.data?.response?.sections?.featured?.data?.filter(
      (item) => item?.cmstype === "MEDIAVIDEO"
    );
  const liveBlogList =
    app?.state?.liveblog?.data?.response?.sections?.live_blog?.data;
  const podcastshowList =
    app?.state?.podcastshow?.data?.response?.sections?.audio_show?.data?.filter(
      (item) => item?.cmstype === "MEDIAAUDIO"
    );
  const moviereviewshowList =
    app?.state?.moviereviewsshow?.data?.response?.sections?.article_show?.data?.filter(
      (item) => item?.cmstype === "MOVIEREVIEW"
    );
  const photoshow =
    app?.state?.photoshow?.data?.response?.sections?.photo_show?.data?.filter(
      (item) => item?.cmstype === "PHOTOGALLERYSLIDESHOWSECTION"
    );
  if (articleList != undefined) {
    data = articleList[0];
    pageType = "consumption";
  } else if (videoshowList != undefined) {
    data = videoshowList[0];
    pageType = "video_consumption";
  } else if (liveBlogList != undefined) {
    data = liveBlogList;
    pageType = "blog";
  } else if (podcastshowList != undefined) {
    data = podcastshowList;
    pageType = "consumption";
  } else if (moviereviewshowList != undefined) {
    data = moviereviewshowList;
    pageType = "consumption";
  } else if (photoshow != undefined) {
    data = photoshow;
    pageType = "consumption";
  }
  if (data != null) {
    let published_date = "";
    let contentType = "",
      byLine = "",
      expert = "",
      contentSource = "";

    const showSeriesName = "";
    if (data && data.insertdate) {
      published_date = dayjs(data.insertdate).format("YYYY-MM-DD");
    } else {
      published_date = dayjs(
        data && data?.find((val) => val?.msid == seoData?.msid)?.insertdate
          ? data?.find((val) => val?.msid == seoData?.msid)?.insertdate
          : ""
      ).format("YYYY-MM-DD");
    }
    let activeArticle = "";
    if (data && data.cmstype) {
      activeArticle = data;
    } else {
      activeArticle = data && data?.find((val) => val?.msid == seoData?.msid);
    }
    const createdBy =
      activeArticle && activeArticle?.createdby ? activeArticle?.createdby : "";

    const contentFormat =
      activeArticle && activeArticle?.cmstype
        ? activeArticle?.cmstype?.charAt(0).toUpperCase() +
          activeArticle?.cmstype?.slice(1).toLowerCase()
        : "";
    byLine =
      activeArticle?.authors &&
      activeArticle?.authors?.length > 0 &&
      activeArticle?.authors[0]?.name
        ? activeArticle?.authors[0]?.name
        : "";
    expert = contentSource = activeArticle?.agency?.name
      ? activeArticle?.agency?.name
      : "";
    if (activeArticle && activeArticle.agency) {
      const agencyNames = ["ANI", "PTI", "IANS", "AP", "AFP", "REUTERS"];
      if (agencyNames.includes(activeArticle?.agency?.name)) {
        contentType = "Wire";
      } else {
        contentType = "Original";
      }
    }
    const category =
      navigation && navigation?.category ? navigation.category : "";
    const sub_category =
      navigation && navigation?.sub_category ? navigation.sub_category : "";
    custom_dimension = {
      dimension1: seoData.msid,
      dimension2: published_date,
      dimension3: pageType,
      dimension4: category,
      dimension5: sub_category,
      dimension6: contentFormat,
      dimension7: contentSource,
      dimension8: showSeriesName,
      dimension9: contentType,
      dimension10: createdBy,
      dimension11: byLine,
      dimension12: expert,
    };
  }
  return custom_dimension;
};

/**
 * CreateConfiguration
 * * slike video player configuration creation
 * @param slikeId id for play video
 * @param dataSrc placeholder image befor video getting play
 * @param autoPlay play and pause video based on autoplay value
 * @param isMobile set apikey based on isMobile
 * TODO: (Code Refactor) use this function in multi video player
 */

const getSectionByCategorynSub = (pageType, finalParams) => {
  let finalVal = {
    category: pageType == "topic_listing" ? "topic" : pageType || "",
  };
  if (
    finalParams?.["category"] != null ||
    typeof finalParams?.["category"] != "undefined"
  ) {
    finalVal = { category: finalParams?.["category"].replace(/-/g, "_") };
    if (
      finalParams?.["sub_category"] != undefined &&
      finalParams?.["sub_category"] != ""
    ) {
      finalVal = {
        category: finalParams?.["category"].replace(/-/g, "_"),
        sub_category: finalParams?.["sub_category"].replace(/-/g, "_"),
      };
      if (
        finalParams?.["sub_sub_category"] != undefined &&
        finalParams?.["sub_sub_category"] != ""
      ) {
        finalVal = {
          category: finalParams?.["category"].replace(/-/g, "_"),
          sub_category:
            finalParams?.["sub_category"].replace(/-/g, "_") +
            "_" +
            finalParams?.["sub_sub_category"].replace(/-/g, "_"),
        };
      }
    }
  }
  return finalVal || "";
};

export const setPageTargetData = (
  pageType,
  query,
  finalParams,
  data,
  seoData,
  msid,
  searchedKey
) => {
  let article_sequence = -1;
  let metaInfoAttr = searchedKey ? searchedKey : "";
  let createdBy = "";
  let agency = "";
  if (data && data.length > 0) {
    article_sequence = data.findIndex((item) => item.msid == msid);

    const newData =
      article_sequence > -1 ? data[article_sequence] : data ? data : "";

    createdBy = newData && newData?.createdby ? newData?.createdby : "";
    agency = newData && newData?.agency ? newData?.agency : null;
    metaInfoAttr = `${
      seoData && seoData?.keywords
        ? seoData?.keywords
            .replace(/, /g, ",")
            .replace(/ +/g, "_")
            .replace(/[<<>>]/g, "")
        : ""
    }`;
  }
  const pageTar =
    pageType == "home" ||
    pageType == "sub_category" ||
    pageType == "search" ||
    pageType == "category" ||
    pageType == "listing" ||
    pageType == "topic_listing" ||
    pageType == "video_listing" ||
    pageType == "blog" ||
    pageType == "article" ||
    pageType == "video" ||
    pageType == "Author" ||
    pageType == "review" ||
    pageType == "livetv" ||
    pageType == "staticpage" ||
    pageType == "detail"
      ? pageType
      : "";

  const queryDemo = Object.keys(query)[0] == "demo" ? query : "";
  let categoryString = "";
  if (
    finalParams &&
    finalParams?.category != "" &&
    finalParams?.category != undefined
  ) {
    categoryString = `${finalParams?.category}`;
    categoryString =
      finalParams?.sub_category != "" && finalParams?.sub_category != undefined
        ? `${categoryString}, ${finalParams?.sub_category}`
        : categoryString;
    categoryString =
      finalParams?.sub_sub_category != "" &&
      finalParams?.sub_sub_category != undefined
        ? `${categoryString}, ${finalParams?.sub_sub_category}`
        : categoryString;
  }

  categoryString = categoryString == "" ? pageTar : categoryString;

  const targetData = {
    page: pageTar,
    query: queryDemo,
    section: getSectionByCategorynSub(pageType, finalParams),
    metaInfoAttr,
    msid: msid != undefined ? `${msid}` : "",
    article_index:
      pageType == "article"
        ? `${article_sequence > -1 ? article_sequence : ""}`
        : "",
    createdBy,
    categoryString,
    agency,
  };
  return targetData;
};

export function logAPIError(error) {
  console.error(
    `ERROR logAPIError : URL - ${error?.config?.url}, Message - ${error?.message}, Code - ${error?.code}`
  );
}

export const isAMPURL = (pathname) => {
  const check = false;
  const urlSegment = pathname?.split("?")[0]?.split("/");
  if (
    urlSegment &&
    urlSegment?.length > 0 &&
    urlSegment[urlSegment?.length - 1] === "amp"
  ) {
    return true;
  }
  return check;
};

export function SlikeLoaderScript() {
  const isExist = document?.getElementById("slikeloader");
  if (isExist == null) {
    const slikeScript = document.createElement("script");
    (slikeScript.id = "slikeloader"),
      (slikeScript.src = "https://tvid.in/sdk/slikeloader.js");
    document.head.appendChild(slikeScript);
  }
}

export const removeAmp = (to = "") => {
  const linkArr = to?.split("/");
  if (linkArr && linkArr[linkArr?.length - 1] === "amp") {
    linkArr?.pop();
    to = linkArr?.join("/");
  }
  return to;
};

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Asia/Kolkata", // Setting the timezone to IST
    timeZoneName: "short",
  };

  let formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  formattedDate = formattedDate.replace("GMT+5:30", "IST");

  return formattedDate;
};

export function weeksAgo(dateStr) {
  const providedDate = new Date(dateStr);

  const currentDate = new Date();

  const differenceInMilliseconds = currentDate - providedDate;

  const differenceInWeeks = Math.round(
    differenceInMilliseconds / (1000 * 60 * 60 * 24 * 7)
  );

  let result;
  if (differenceInWeeks === 0) {
    result = "This week";
  } else if (differenceInWeeks === 1) {
    result = "1 week ago";
  } else {
    result = `${differenceInWeeks} weeks ago`;
  }

  return result;
}

export const preloadImage = (imageUrl) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = imageUrl;
  document.head.appendChild(link);
};
export const mutateArrayOfObject = (data, defaultTextValues, key) => {
  return data.map((obj) => ({
    ...obj,
    [key]: defaultTextValues[obj.type] || "",
  }));
};
export const getTextReplace = (text, replaceVal = " ", replaceWith = "-") => {
  if (text) {
    text = text.replace(replaceVal, replaceWith).toLowerCase();
    text = text.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
  }
  return text;
};
export const tagReturnFromType = (
  type,
  textValue,
  secondTextValue,
  icons,
  style = "",
  bulletNumbers,
  isActive,
  imgUrl
) => {
  switch (type) {
    case "strongText":
      return <strong>{textValue}</strong>;

    case "normalText":
      return (
        <>
          {textValue.length > 57
            ? textValue.substring(0, 57) + "..."
            : textValue}
        </>
      );

    case "iconWithText":
      return (
        <>
          <span className={`${style["icons"]}`}>
            <NextImage src={icons} />
          </span>
          <strong>{textValue}</strong>
        </>
      );

    case "spriteIconWithText":
      return (
        <>
          <span className={`${style["icons"]}`}>
            <SpriteIcon IconName={icons} />
          </span>
          <strong>{textValue}</strong>
        </>
      );

    case "bulletTextWithText":
      return (
        <>
          <span className={`${style["bullets"]}`}>#{bulletNumbers}</span>
          <strong>{textValue}</strong>
        </>
      );

    case "firstTextBold":
      return (
        <>
          <strong>{textValue}</strong>
          <span className={`${style["bullets"]}`}>{secondTextValue}</span>
        </>
      );

    case "bigIconWithTextInCircle":
      return (
        <>
          <i>
            <NextImage
              height={50}
              width={50}
              layout={"fixed"}
              // changeStyle={changeStyle}
              src={imgUrl}
              // priority={true}
              alt={textValue}
            />
          </i>
          <p>{textValue.replace("&amp;", "&")}</p>
        </>
      );

    case "tabTagText":
      break;

    default:
      break;
  }
};

export const getAlphaBeticalKey = () => {
  const healtatoz = [
    { text: "A", seopath: "/health/a" },
    { text: "B", seopath: "/health/b" },
    { text: "C", seopath: "/health/c" },
    { text: "D", seopath: "/health/d" },
    { text: "E", seopath: "/health/e" },
    { text: "F", seopath: "/health/f" },
    { text: "G", seopath: "/health/g" },
    { text: "H", seopath: "/health/h" },
    { text: "I", seopath: "/health/i" },
    { text: "J", seopath: "/health/j" },
    { text: "K", seopath: "/health/k" },
    { text: "L", seopath: "/health/l" },
    { text: "M", seopath: "/health/m" },
    { text: "N", seopath: "/health/n" },
    { text: "O", seopath: "/health/o" },
    { text: "P", seopath: "/health/p" },
    { text: "Q", seopath: "/health/q" },
    { text: "R", seopath: "/health/r" },
    { text: "S", seopath: "/health/s" },
    { text: "T", seopath: "/health/t" },
    { text: "U", seopath: "/health/u" },
    { text: "V", seopath: "/health/v" },
    { text: "W", seopath: "/health/w" },
    { text: "X", seopath: "/health/x" },
    { text: "Y", seopath: "/health/y" },
    { text: "Z", seopath: "/health/z" },
  ];
  return healtatoz;
};

export const getCategoryNameWithSeoPath = (seopath) => {
  let category = "";
  if (seopath) {
    const seopathUrl = seopath.split("/");
    category = seopathUrl[0];
  }

  return category;
};
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toCamelCase(str) {
  return str
    .toLowerCase() // Convert to lowercase
    .replace(/-/g, " ") // Replace hyphens with spaces
    .split(" ") // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" ");
}

export function getArticleIcon(cmstype) {
  switch (cmstype) {
    case "ARTICLE":
      return ``;
      break;
    case "PHOTOGALLERYSLIDESHOWSECTION":
      return `photo`;
      break;
    case "VIDEOS":
      return `videoss`;
      break;
    case "IMAGES":
      return `web-stories`;
      break;
    default:
      break;
  }
}

export function getAuthorImageComp(authorId, authorSeoName) {
  return (
    <>
      <amp-img
        src={`${process.env.NEXT_PUBLIC_PHOTO_API}/authorthumb/${authorId}.cms?width=60&height=60`}
        width="auto"
        height="60"
        layout="fixed-height"
        alt={`${authorSeoName || ""}`}
      >
        <amp-img
          placeholder
          src={IMG_DEFAULT}
          width="auto"
          height="60"
          layout="fixed-height"
          alt={`${authorSeoName || ""}`}
        ></amp-img>
        <amp-img
          src={IMG_DEFAULT}
          width="auto"
          height="60"
          layout="fixed-height"
          alt={`${authorSeoName || ""}`}
        ></amp-img>
      </amp-img>
    </>
  );
}

export const getPriceRange = (data) => {

  if (!data.minPrice && !data.maxPrice) {
    return "Data not available";
  }

  if (data.minPrice === data.maxPrice) {
    if (data.maxPrice > 10000000) {
      return `₹ ${(data.maxPrice / 10000000).toFixed(2)} Cr`;
    }
    if (data.maxPrice > 100000) {
      return `₹ ${(data.maxPrice / 100000).toFixed(2)} Lakh`;
    }
    return `₹ ${Number(data.maxPrice).toLocaleString()}`;
  }

  if (data?.minPrice > 10000000 || data?.maxPrice > 10000000) {
    return `₹ ${(data?.minPrice / 10000000).toFixed(2)} - ${(
      data?.maxPrice / 10000000
    ).toFixed(2)} Cr`;
  }
  if (data?.minPrice > 100000 || data?.maxPrice > 100000) {
    return `₹ ${(data?.minPrice / 100000).toFixed(2)} - ${(
      data?.maxPrice / 100000
    ).toFixed(2)} Lakh`;
  }
  return `₹ ${Number(data?.minPrice).toLocaleString()} - ${Number(
    data?.maxPrice
  ).toLocaleString()}`;
};

export const getPriceRangewithoutConverge = (data) => {

  if (!data.minPrice && !data.maxPrice) {
    return "Data not available";
  }

  if (data.minPrice === data.maxPrice) {
    // If both min and max are the same, return a single price
    return `${(data.maxPrice)}`;
  }

  // If only minPrice is available
  if (data?.minPrice && !data?.maxPrice) {
    return `${(data.minPrice)}`;
  }

  // If only maxPrice is available
  if (data?.maxPrice && !data?.minPrice) {
    return `${(data.maxPrice)}`;
  }

  // Default case for a range when both are available
  return `${(data?.minPrice)} - ${(data?.maxPrice)}`;
};

