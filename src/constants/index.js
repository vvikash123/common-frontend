export const LIVE_DOMAIN = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;
export const API_DOMAIN = `${process.env.NEXT_PUBLIC_API_URL}`;

export const channelId = process.env.NEXT_PUBLIC_HOST_ID;

export const GOOGLE_WEBCACHE_DOMAIN = "webcache.googleusercontent.com";

export const IMG_DOMAIN = process.env.NEXT_PUBLIC_PHOTO_API;

export const IMG_DEFAULT_MOB = `https://images.unilist.in/photo/msid-151073715/151073715.jpg`;
export const IMG_DEFAULT_MOB_AUTH = `https://images.unilist.in/authorthumb/msid-479251665/479251665.jpg?&width=200&height=200`;

export const IMG_DEFAULT = `https://images.unilist.in/photo/msid-151073715/151073715.jpg`;

export const IMG_OG_DEFAULT = `https://images.unilist.in/photo/msid-151073715/151073715.jpg`; // TODO OG IMAGE STATIC URL FOR CONTENT-COMMERCE
export const TNN_HINDI_MSID = "151074929"; // 600 * 60

export const TNN_SHOPPING_MSID = "151074929";
export const TNN_HEALTH_MSID = "151074929";

export const salesWidgetTitle = "a few on-sale items we’re excited about";

//CRYPTO CONFIG
export const CATEGORY_TYPE_VIDEO_ARTICLE = "Article Story";
export const CATEGORY_TYPE_LIVE_TV = "Live TV";
export const CATEGORY_TYPE_LIVE_BLOG_EMBED = "Live Blog Embed";
export const CATEGORY_TYPE_VIDEO = "Video Story";
export const GA_TRACKING_ID = "G-V7FBZEKKCW";

export const PRESITE_TIMER = {
  production: 12,
  development: 15 * 60,
};

//college list page filters
export const sortBy = [
  { name: "Popularity", value: "popularity", key: "sortBy" },
  { name: "Fees Low to High", value: "fees", key: "sortBy" },
  { name: "Rating", value: "rating", key: "sortBy" },
];

export const totalFees = [
  { name: "Free", value: "free", key: "free" },
  { name: "0 - 1 Lakh", value: "0", key: "0-1lakh" },
  { name: "1 - 2 Lakh", value: "100000 - 200000", key: "1-2lakh" },
  { name: "2 - 3 Lakh", value: "200000 - 300000", key: "2-3lakh" },
  { name: "4 lakh & above", value: "400000", key: "4lakh" },
];

export const collegeType = [
  { name: "Government", value: "government", key: "government" },
  { name: "online", value: "online", key: "online" },
  { name: "Part Time", value: "part-time", key: "part-time" },
];

export const programType = [
  { name: "Full Time", value: "full-time", key: "full-time" },
  { name: "Online", value: "online", key: "online" },
  { name: "Private", value: "private", key: "private" },
  { name: "Diploma", value: "diploma", key: "diploma" },
  { name: "Distance", value: "distance", key: "distance" },
];

export const courseLevel = [
  { name: "UG", value: "UG", key: "UG" },
  { name: "PG", value: "PG", key: "PG" },
  { name: "doctorate", value: "doctorate", key: "doctorate" },
  { name: "Certification", value: "certification", key: "certification" },
  { name: "Distance", value: "distance", key: "distance" },
];

export const courseDuration = [
  { name: "1 year", value: "1-year", key: "1-year" },
  { name: "2 years", value: "2-years", key: "2-years" },
  { name: "3 years", value: "3-years", key: "3-years" },
  { name: "4 years", value: "4-years", key: "4-years" },
  {
    name: "5 years & above",
    value: "5-years-and-above",
    key: "5-years-and-above",
  },
];

export const STATIC_PAGES_MSID_PROD = {
  "about-us": "151042673",
  "terms-conditions": "151042704",
  disclaimer: "151042720",
  "advertise-with-us": "151042674",
  reference: "84474806",
  "privacy-policy": "151042719",
  "editorial-guidelines": "88279417",
  "contact-us":'151042672',
  regulatory: "151042703",
  "complaint-redressal": "151042727",
  "complaint-redressal-mechanism-for-news-channels": "90709297",
  "complaint-redressal-mechanism-for-non-news-channels": "90800069",
  "syndicate-our-content": "88279337",
  "timesnetwork-trai-value-package": "89321444",
  "privacy-policy-huawei": "89010736",
  "privacy-policy-app": "94958964",
  "times-network-app": "95221462",
  internalLinks: [],
};
//LIVE TV CHANNELS
export const CHANNEL_MSID = {
  "1x88crm9oz": "89109097",
  "1x8fb7i9o6": "89109076",
  "1xrcvfb9ol": "89108819",
  "1x88csv9oz": "89109116",
  "1x8fbim9o6": "89109069",
};

//Common
export const ONE = 1;
export const DefaultLang = "en";
export const ITEM_PER_PAGE = 24;
export const ITEM_PER_PAGE_WEB_STORIES_DESKTOP = 24;
export const ITEM_PER_PAGE_WEB_STORIES_MOBILE = 24;
export const ITEM_PER_PAGE_PHOTO_STORIES_DESKTOP = 24;
export const ITEM_PER_PAGE_PHOTO_STORIES_MOBILE = 24;
export const ITEM_PER_PAGE_VIDEO_STORIES_DESKTOP = 24;
export const ITEM_PER_PAGE_VIDEO_STORIES_MOBILE = 24;
export const ITEM_PER_PAGE_MOB = 24;
export const ITEM_PER_PAGE_SUB_CATEGORY = 25;
export const ITEM_PER_PAGE_SUB_CATEGORY_MOB = 25;
export const PHOTOSHOW_ITEM_PER_PAGE = 5;
export const SEARCH_RESULT_ITEM_PER_PAGE = 24;

export const LIVE_BLOG_DEFAULT_COUNT = 20;

export const LIVE_CHANNEL_ID = "1x8fb7i9o6";

// live tv placement
export const RHS_SLIDER_COUNT = 5;

//Webstories
//Footer  Social Sharing
export const SOCIAL_SHARE_LINK = {
  FB: "https://www.facebook.com/sharer/sharer.php?u=",
  IG: "https://www.instagram.com/direct/new/?text=",
  LINKEDIN: "https://www.linkedin.com/sharing/share-offsite/?url=",
  PINTEREST: "http://pinterest.com/pin/create/button/?url=",
  SNAPCHAT: "",
  TWITTER: "https://twitter.com/share/?url=",
  WHATSAPP: "https://api.whatsapp.com/send?text=",
  TELEGRAM: "https://t.me/share/url?url=",
  YOUTUBE: "",
};
export const SOCIAL_FOLLOW_US_LINK = {
  FB: "https://www.facebook.com/unilist.in",
  IG: "https://www.instagram.com/unilist.in",
  LINKEDIN: "https://www.linkedin.com/in/unilist.in/",
  PINTEREST: "https://in.pinterest.com/unilist.in/",
  SNAPCHAT: "https://www.snapchat.com/add/UnilistIn",
  TWITTER: "https://x.com/UnilistIn",
  WHATSAPP: "",
  TELEGRAM: "",
  YOUTUBE: "",
};

//Default Image Dimensions
export const DEFAULT_IMAGE_WIDTH = 200;
export const DEFAULT_IMAGE_HEIGHT = 200;
export const AUTHORLISTINGS_ITEM_PER_PAGE = 9;

//override link function

export const overRideLink = (overridelink) => {
  const regex = /https:\/\/(www\.)?unilist\.in/;
  if (process.env.NODE_ENV === "production") {
    return overridelink;
  } else {
    const link = overridelink.replace(
      regex,
      process.env.NEXT_PUBLIC_WEBAPP_BASE_URL
    );
    return link;
  }
};
export const overRideLinkSite = (overridelink) => {
 
    const link = overridelink.replace(
      "https://unilist.in",
      process.env.NEXT_PUBLIC_WEBAPP_BASE_URL
    )
    return link;
  
};

export const dev = (overridelink) => {
  if (process.env.NODE_ENV === "production") {
    return overridelink;
  } else {
    const link = overridelink.replace(
      "https://unilist.in",
      process.env.NEXT_PUBLIC_WEBAPP_BASE_URL
    );
    return link;
  }
};

// URL Redirection
export const URL_MAPPING = [
  {
    path: ["/webstories", "/web-story"],
    location: "/web-stories",
    status: 301,
  },
  {
    path: ["/web-stories/celebrity"],
    location: "/web-stories/entertainment",
    status: 301,
  },

  {
    path: ["https://images.unilist.in/photo/151074929.cms"],
    location: "",
    status: 301,
  },
];
export const izootoScript =
  "https://cdn.izooto.com/scripts/64369f6e5376d697172507959c6593c56948ff94.js";

export const newsLetterCategoryMapping = {
  ["entertainment-news"]: { label: "Entertainment", code: 232 },
  entertainment: { label: "Entertainment", code: 232 },
  photos: { label: "Entertainment", code: 232 },
  lifestyle: { label: "Lifestyle", code: 231 },
  health: { label: "Lifestyle", code: 231 },
  travel: { label: "Lifestyle", code: 231 },
  sports: { label: "", code: 230 },
  india: { label: "", code: 230 },
  ["business-economy"]: { label: "", code: 230 },
  education: { label: "", code: 230 },
  ["good-news"]: { label: "", code: 230 },
  cities: { label: "", code: 230 },
  gadgets: { label: "", code: 230 },
  explainer: { label: "", code: 230 },
  world: { label: "", code: 230 },
  ["technology-science"]: { label: "", code: 230 },
  ["mirror-now"]: { label: "", code: 230 },
  auto: { label: "", code: 230 },
  jobs: { label: "", code: 230 },
  opinion: { label: "", code: 230 },
  default: { label: "", code: 230 },
};
export const HEALTHANDME_SITE_URL = "https://stg.unilist.in";
export const HEALTH_SITE_URL = "https://dev.unilist.in";
export const SITE_URL = "https://www.unilist.in";

export const InternalLinkRegex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]healthandme+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
export const TOPICREGXLINK = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

export const channelTitle = {
  "live-tv": "",
  "et-now": "",
  "times-now": "",
  "et-now-swadesh": "",
  "mirror-now": "",
};

export const HTML_ATTRIBUTES_REMOVED =
  "hostid msid thumburl datasource agency sizebytes caption mstype mssubtype handle handlename image favoritecount retweetcount status createdat user cmsid type";

export const seoDefaultMeta = {
  title: "Unilist",
  description: "Unilist ",
  keywords: "Unilist",
};

export const API_TIMEOUT = [
  {
    path: ["/api/getlisting"],
    timeout: process.env.TIMEOUT_LISTING_MS || 2000,
  },
  {
    path: ["api/getnavigation"],
    timeout: process.env.TIMEOUT_NAVIGATION_MS || 2000,
  },

  {
    path: ["/request/home"],
    timeout: process.env.TIMEOUT_HOME_MS || 2000,
  },
  {
    path: ["/request/articlelist"],
    timeout: process.env.TIMEOUT_ARTICLELIST_MS || 2000,
  },
  {
    path: ["/request/articleshow"],
    timeout: process.env.TIMEOUT_ARTICLESHOW_MS || 2000,
  },
  {
    path: ["/request/categorypage"],
    timeout: process.env.TIMEOUT_CATEGORY_MS || 2000,
  },

  {
    path: ["/request/videoshow"],
    timeout: process.env.TIMEOUT_VIDEOSHOW_MS || 2000,
  },
  {
    path: ["/request/photostorylist"],
    timeout: process.env.TIMEOUT_PHOTOSTORYLIST_MS || 2000,
  },
  {
    path: ["/request/photostory"],
    timeout: process.env.TIMEOUT_PHOTOSTORY_MS || 2000,
  },
];
export const commonProperties = {
  type: "",
  widgetCardType: "",
  widgetLayout: "",
  elementClass: "",
  lineClamp: "",
  marginBottom: "",
  textIcon: "",
  elementType: "p",
};
export const START = 0;
export const VIDEO_SHOW_LIMIT = 6;
export const MIN_VIDEO_LENGTH = 0;

export const AUTHOR_VIDEOSHOW = 5;
export const ERROR_NAVIGATION_ITEM = {
  show_header: true,
  response: {
    status: true,
    message: "Done",
    data: [
      {
        msid: 151087984,
        title: "Colleges",
        parent_id: 151002908,
        seopath: "colleges",
        status: "ACTIVE",
        overridelink: "https://www.unilist.in/colleges",
        haschildren: false,
      },
      {
        msid: 151002924,
        title: "News",
        parent_id: 1507481801,
        seopath: "news",
        status: "ACTIVE",
        overridelink: "",
        haschildren: false,
      },
    ],
  },
};
export const slikeApiKeys = {
  tnn: {
    web: "TimesDrive9web5m496ku9g6",
    mweb: "TimesDrive9mweb5m39zoo9og",
    amp: "TimesDrive9googleamp5mjgl9g9o6",
  },
  nbt: {
    web: "tgbsl486web5abvuu6ozo",
    mweb: "tgbsl486mweb5ab4ukkl6o",
    amp: "tgbsl486mweb5ab4ukkl6o",
  },
  pod: {
    web: "TimesDrive9web5m496ku9g6",
    mweb: "TimesDrive9mweb5m39zoo9og",
    amp: "TimesDrive9googleamp5mjgl9g9o6",
  },
};
export const OFFLINE_MESSAGE =
  "Seems you are offline. Please connect to the internet!";

export const ONLINE_MESSAGE = "Online";

export const ERROR_FOOTER = {
  show_footer: true,
  response: [
    {
      title: "About Times Now News",
      description:
        "The Times Network, with its credo ‘Now or Nothing’, is a pioneer in shaping opinions of opinion-makers by delivering the most compelling and irreplaceable content and latest news to the new-age audience. The network has stamped its leadership with differentiated content across multiple genres - India news, business, sports, technology, entertainment, city news…",
      data: {
        title: "Company",
        children: [
          {
            title: "About Us",
            seopath: "/info/about-us",
            msid: "151042672",
          },
          {
            title: "Contact Us",
            seopath: "/info/contact-us",
            msid: "151042673",
          },
          // {
          //   title: "Advertise with us",
          //   seopath: "/info/advertise-with-us",
          //   msid: "151042674",
          // },
          // {
          //   title: "Regulatory",
          //   seopath: "/info/regulatory",
          //   msid: "151042703",
          // },
          {
            title: "Terms & Conditions",
            seopath: "/info/terms-conditions",
            msid: "151042704",
          },
          // {
          //   title: "Privacy Policy",
          //   seopath: "/info/privacy-policy",
          //   msid: "151042719",
          // },
          {
            title: "Disclaimer",
            seopath: "/info/disclaimer",
            msid: "151042720",
          },
          // {
          //   title: "Complaint Redressal",
          //   seopath: "/info/complaint-redressal",
          //   msid: "151042727",
          // },
        ],
      },
    },
  ],
};

export const GOOGLE_AD_DESK = {
  home: {
    atf: {
      adCode:
        "/21806551354/TN_Foodie/desktop/homepage/tn_food_dskt_homepage_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608665892439-0",
    },
    btf: {
      adCode:
        "/21806551354/TN_Foodie/desktop/homepage/tn_food_dskt_homepage_btf_300",
      size: [
        [300, 600],
        [300, 250],
      ],
      divId: "div-gpt-ad-1608665938975-0",
    },
  },
  recipes: {
    atf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666731740-0",
    },
  },
  recipe_category: {
    atf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666731740-0",
    },
  },
  recipes_show: {
    atf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666731740-0",
    },
    btf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_btf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666744669-0",
    },
    btf2: {
      adCode:
        "/21806551354/TN_Foodie/desktop/homepage/tn_food_dskt_homepage_atf_300",
      size: [300, 600],
      divId: "div-gpt-ad-1608665859493-0",
    },
  },
  trending_recipes: {
    atf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666731740-0",
    },
  },
  popular_recipes: {
    atf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666731740-0",
    },
  },
  how_to: {
    atf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666731740-0",
    },
  },
  how_to_show: {
    atf: {
      adCode:
        "/21806551354/TN_Foodie/desktop/homepage/tn_food_dskt_homepage_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608665892439-0",
    },
    btf: {
      adCode:
        "/21806551354/TN_Foodie/desktop/homepage/tn_food_dskt_homepage_btf_300",
      size: [
        [300, 600],
        [300, 250],
      ],
      divId: "div-gpt-ad-1608665938975-0",
    },
    btf2: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_btf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666744669-0",
    },
  },
  nutritional_facts: {
    atf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666731740-0",
    },
  },
  nutritional_facts_show: {
    atf: {
      adCode:
        "/21806551354/TN_Foodie/desktop/homepage/tn_food_dskt_homepage_atf_300",
      size: [300, 600],
      divId: "div-gpt-ad-1608665859493-0",
    },
  },
  about_us: {
    atf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666731740-0",
    },
    btf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_btf_728",
      size: [
        [300, 250],
        [336, 280],
      ],
      divId: "div-gpt-ad-1608666744669-0",
    },
  },
  author: {
    atf: {
      adCode:
        "/21806551354/TN_Foodie/desktop/homepage/tn_food_dskt_homepage_atf_300",
      size: [300, 600],
      divId: "div-gpt-ad-1608665859493-0",
    },
  },
  contact: {
    atf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666731740-0",
    },
    btf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_btf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666744669-0",
    },
  },
  disclaimer: {
    atf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666731740-0",
    },
    btf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_btf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666744669-0",
    },
  },
  find_recipe: {
    atf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666731740-0",
    },
    btf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_btf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666744669-0",
    },
    btf2: {
      adCode:
        "/21806551354/TN_Foodie/desktop/homepage/tn_food_dskt_homepage_atf_300",
      size: [300, 600],
      divId: "div-gpt-ad-1608665859493-0",
    },
  },
  privacy: {
    atf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666731740-0",
    },
    btf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_btf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666744669-0",
    },
  },
  search_result: {
    atf: {
      adCode: "/21806551354/TN_Foodie/mweb/ros/tn_food_mweb_ros_ros_atf_300",
      size: [300, 250],
      divId: "div-gpt-ad-1608667209571-0",
    },
  },
  "t&c": {
    atf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666731740-0",
    },
    btf: {
      adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_btf_728",
      size: [
        [728, 90],
        [970, 90],
      ],
      divId: "div-gpt-ad-1608666744669-0",
    },
  },
  error: {
    atf: {
      adCode: "/21806551354/TN_Foodie/mweb/ros/tn_food_mweb_ros_ros_atf_300",
      size: [300, 250],
      divId: "div-gpt-ad-1608667209571-0",
    },
  },
  "300*600_h_a300": {
    adCode:
      "/21806551354/TN_Foodie/desktop/homepage/tn_food_dskt_homepage_atf_300",
    size: [300, 600],
    divId: "div-gpt-ad-1608665859493-0",
  },
  "728*90_h_a728": {
    adCode:
      "/21806551354/TN_Foodie/desktop/homepage/tn_food_dskt_homepage_atf_728",
    size: [
      [728, 90],
      [970, 90],
    ],
    divId: "div-gpt-ad-1608665892439-0",
  },
  "728*90_h_b2_300": {
    adCode:
      "/21806551354/TN_Foodie/desktop/homepage/tn_food_dskt_homepage_btf_2_300",
    size: [
      [728, 90],
      [970, 90],
    ],
    divId: "div-gpt-ad-1608665911375-0",
  },
  "300*600_h_b300": {
    adCode:
      "/21806551354/TN_Foodie/desktop/homepage/tn_food_dskt_homepage_btf_300",
    size: [
      [300, 600],
      [300, 250],
    ],
    divId: "div-gpt-ad-1608665938975-0",
  },
  "728*90_h_b728": {
    adCode:
      "/21806551354/TN_Foodie/desktop/homepage/tn_food_dskt_homepage_btf_728",
    size: [
      [728, 90],
      [970, 90],
    ],
    divId: "div-gpt-ad-1608665956348-0",
  },
  "300*600_r_a300": {
    adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_300",
    size: [300, 600],
    divId: "div-gpt-ad-1608666723167-0",
  },
  "728*90_r_a728": {
    adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_atf_728",
    size: [
      [728, 90],
      [970, 90],
    ],
    divId: "div-gpt-ad-1608666731740-0",
  },
  "300*250_r_b300": {
    adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_btf_300",
    size: [
      [300, 250],
      [300, 600],
    ],
    divId: "div-gpt-ad-1608666738591-0",
  },
  "728*90_r_b728": {
    adCode: "/21806551354/TN_Foodie/desktop/ros/tn_food_dskt_ros_ros_btf_728",
    size: [
      [728, 90],
      [970, 90],
    ],
    divId: "div-gpt-ad-1608666744669-0",
  },
};

export const COPYRIGHT = `© ${new Date().getFullYear()} Bennett, Coleman & Company Limited`;

export const filterKeyMap = {
  city: "city",
  ownership: "collegeType",
  durationValue: "courseDuration",
  level: "courseLevel",
  type: "programType",
  sorting: "sortBy",
  state: "state",
  discipline: "streams",
  feesRange: "totalFees",
};
