// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { isAMPURL } from "@/utils/common";
import makeRequest from "@/utils/makeRequest";
import { isAMPRequest } from "@/utils/serverUtils";

export const fetchHeaderData = async (origin) => {
  const url = `/api/getNavigation?msid=ALL&origin=${origin}`;
  const channelId = 1006;
  try {
    const response = await makeRequest.fetch(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching header data:", error);
    return null;
  }
};

export const fetchFooterData = async () => {
  const url = `/request/footer`;
  const channelId = 1006;
  try {
    const response = await makeRequest.get(url, channelId);
    return response.data;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
};

export const fetchHomeData = async () => {
  const url = "http://localhost:3000/api/mock"; // Corrected local mock API path
  const channelId = 1006;

  try {
    const response = await makeRequest.fetch(url, channelId);
    return response; // returns { data, seo }
  } catch (error) {
    console.error("Error fetching home data:", error);
    return { data: [], seo: {} }; // fail-safe fallback
  }
};

export const fetchAuthorData = async (authorid, perpage, page, contenttype) => {
  const url = `/request/authorprofile?authorid=${authorid}&perpage=${perpage}&pageno=${page}&origin=desktop&contenttype=${contenttype}`;
  const channelId = 1006;
  try {
    const response = await makeRequest.get(url, channelId);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching home data:", error);
    return null;
  }
};

export const fetchPhotoShowData = async ({
  seo,
  msid,
  pageno,
  perpage,
  origin,
}) => {
  //request/photo-slides?origin=desktop&msid=151001202&country_code=ALL&pageno=1&perpage=5&type=photogallery&channel=1006
  const url =
    `/request/photo-slides?origin=${!isAMPRequest() ? origin : "amp"}&msid=` +
    msid +
    `&country_code=ALL` +
    `&pageno=${pageno}&perpage=${perpage}` +
    `&type=photogallery`; // + encrypt(params);
  const channelId = 1006;
  try {
    const response = await makeRequest.get(url, channelId);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching home data:", error);
    return null;
  }
};
export const fetchStaticData = async ({
  seo,
  msid,
  pageno,
  perpage,
  origin,
}) => {
  //request/articleshow?origin=desktop&msid=151001309&channel=1006
  const url =
    `/request/articleshow?origin=${!isAMPRequest() ? origin : "amp"}&msid=` +
    msid; // + encrypt(params);
  const channelId = 1006;

  try {
    const response = await makeRequest.get(url, channelId);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching home data:", error);
    return null;
  }
};

export const fetchVideoData = async ({ seo, pageno, itemcount, origin }) => {
  const url = `api/getlisting?seopath=${seo}&pageno=${pageno}&itemcount=${itemcount}&origin=${origin}`;
  const channelId = 1006;
  try {
    const response = await makeRequest.get(url, channelId);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching video data:", error);
    return null;
  }
};
export const fetchShortVideosData = async ({
  seo,
  msid,
  pageno,
  itemcount,
  origin,
}) => {
  //request/shortvideo?origin=desktop&msid=151001119&pageno=1&channel=1006
  const url =
    `/request/shortvideo?origin=${!isAMPRequest() ? origin : "amp"}&msid=` +
    msid +
    `&pageno=${pageno}` +
    `&country_code=ALL`; // + encrypt(params);
  const channelId = 1006;
  // console.log('URLss' , url)

  try {
    const response = await makeRequest.get(url, channelId);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching video data:", error);
    return null;
  }
};
export const fetchVideoShowData = async ({
  seo,
  msid,
  pageno,
  itemcount,
  origin,
}) => {
  // const url = `api/videoshow?seopath=${seo}&pageno=${pageno}&itemcount=${itemcount}&origin=${origin}`;
  const url =
    `/request/videoshow?origin=${!isAMPRequest() ? origin : "amp"}&msid=` +
    msid +
    `&country_code=ALL`; // + encrypt(params);
  const channelId = 1006;
  // console.log('URLss' , url)

  try {
    const response = await makeRequest.get(url, channelId);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching video data:", error);
    return null;
  }
};

export const fetchCategoryListingData = async (
  deviceType,
  category,
  pageNo = 1,
  limit
) => {
  const url = `api/getlisting?seopath=${category}&pageno=${pageNo}&itemcount=${limit}&origin=${deviceType}&channel=1006`;
  const channelId = 1006;
  try {
    const response = await makeRequest.get(url, channelId);
    if (response.data.status === true) {
      return response.data.response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching category data:", error);
    return null;
  }
};

export const fetchSearchTopicsData = async (
  deviceType,
  topic,
  pageNo = 1,
  limit
) => {
  const url = `api/topic?searchterms=${topic}&pageno=${pageNo}&perpage=${limit}&origin=${deviceType}&contenttype=all`;
  console.log("url", url);
  const channelId = 1006;
  try {
    const response = await makeRequest.get(url, channelId);
    if (response.data.status === true) {
      return response.data.response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching topic data:", error);
    return null;
  }
};
export const fetchSearchResultData = async (
  deviceType,
  course,
  pageNo = 1,
  limit
) => {
  // times-education/colleges/top10?discipline=
  const channelId = 1006;
  const url = `api/times-education/get-top-ten?discipline=${course}&start=${pageNo}&limit=${limit}&origin=${deviceType}&contenttype=all&channel=${channelId}`;
  try {
    const response = await makeRequest.get(url, channelId);
    if (response.data.status === true) {
      return response.data.response;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching topic data:", error);
    return null;
  }
};
export const fetchSearchCollageData = async (
  deviceType,
  query,
  pageNo = 1,
  limit,
  type
) => {
  const channelId = 1006;
  const url = `api/times-education/home-search?query=${query}&start=${pageNo}&limit=${limit}&origin=${deviceType}&contenttype=${
    type ?? "all"
  }&channel=${channelId}`;

  try {
    const response = await makeRequest.get(url, channelId);

    if (response.data.status === true) {
      return response.data.response;

    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching topic data:", error);
    return null;
  }
};

export const testMockAPI = async () => {
  const url = `${process.env.NEXT_PUBLIC_WEBAPP_BASE_URL}/api/mock`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error fetching testMockAPI data:", error);
    return null;
  }
};

export const fetchHealthData = async (origin = "desktop", topic = "") => {
  let url = "";
  if (topic) {
    url = `/api/health-topics?seopath=${topic}&origin=${origin}`;
  } else {
    url = `/api/health-topics?origin=${origin}`;
  }
  const channelId = 1006;
  try {
    const response = await makeRequest.get(url, channelId);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching health data:", error);
    return null;
  }
};

export const fetchPhotoStoriesData = async (
  slug,
  pageno = 1,
  limit = 10,
  origin
) => {
  const url = `/request/photostory?seopath=${slug}&pageno=${pageno}&itemcount=${limit}&origin=${origin}`;
  const channelId = 1006;
  try {
    const response = await makeRequest.get(url, channelId);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching photo stories data:", error);
    return null;
  }
};

export const fetchLoadMoreWebStoriesData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error fetching api data:", error);
  }
};
export const fetchArticleShowData = async ({ origin, msid, pathname }) => {
  let url =
    `/request/articleshow?origin=${
      !isAMPURL(pathname) ? origin : "amp"
    }&msid=` +
    msid +
    `&country_code=ALL`; // + encrypt(params);
  const channelId = 1006;
  try {
    const response = await makeRequest.get(url, channelId);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching Article Show Data:", error);
    return null;
  }
};
export const fetchSiloTopicData = async (slug, origin) => {
  const url = `/request/silo?&contenttype=article&searchterms=${slug}&origin=${origin}`;
  const channelId = 1006;
  try {
    const response = await makeRequest.get(url, channelId);
    return response.data.response;
  } catch (error) {
    console.error("Error fetching silo data:", error);
    return null;
  }
};

export const fetchCollegeData = async (params) => {
  const url = `/api/times-education/search`;
  try {
    const response = await makeRequest.fetch(url, params);
    return response.data;
  } catch (error) {
    console.error("Error fetching college list: ", error);
  }
};

export const fetchStateCityData = async (params) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/times-education/get-city-list`;
  try {
    const response = await makeRequest.fetch(url, params);
    return response.data;
  } catch (error) {
    console.error("Error fetching college list: ", error);
  }
};

export const fetchFiltersData = async (params) => {
  const url = `/api/times-education/filters`;
  try {
    const response = await makeRequest.fetch(url, params);
    return response.data;
  } catch (error) {
    console.error("Error fetching college list: ", error);
  }
};
export const fetchCollegaeDetails = async ({
  pagetype,
  collegeNameSlug,
  origin,
}) => {
  const url = `/request/college?collegeid=${collegeNameSlug}&origin=${origin}&pagetype=${pagetype}`;
  const channelId = 1006;
  try {
    const response = await makeRequest.get(url, channelId);
    return response?.data?.response || {};
  } catch (error) {
    console.error("Error fetching college details data:", error);
    return null;
  }
};
