import axios from "axios";
import { API_DOMAIN, API_TIMEOUT } from "../constants";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

axiosInstance.defaults.channel = 1006;

const exceptions = [
  " ",
  "null",
  "seopath=nginx_status",
  "seopath=uploads",
  "seopath=null",
  "seopath=rss",
  "seopath=feed",
  "msid=[0-9]+/amp",
  "seopath=searchresults",
  "robots.txt",
];

const expRegix = new RegExp(exceptions.join("|"));
const channelRegix = /(&|\?)channel=[0-9]{3}/gi;
const addChannelQuery = (url) =>
  `${url.indexOf("?") !== -1 ? "&" : "?"}channel=${process.env.HOST_ID}`;

axios.interceptors.request.use(
  function (config) {
    if (expRegix.test(config.url)) {
      throw "Invalid url " + config.url;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default class makeRequest {
  constructor(obj) {
    return axios(obj);
  }

  static appendDomainToUrl(url, channelId) {
    let isRelativeUrl;
    const endpointData = [];
    let api_domain = API_DOMAIN;
    if (url && typeof url === "string") {
      isRelativeUrl = url.indexOf("http") === -1 && url.indexOf(".com") === -1;
    }
    if (isRelativeUrl) {
      if (url[0] === "/") {
        // endpointData.push(API_DOMAIN);
        endpointData.push(api_domain);
      } else {
        // endpointData.push(API_DOMAIN);
        endpointData.push(api_domain);
        endpointData.push("/");
      }
    }

    endpointData.push(url);
    url = endpointData.join("");
    if (url.includes(process.env.API_URL) && !channelRegix.test(url)) {
      try {
        (url || "")?.replace(channelRegix, "");
      } catch (error) {
        throw "url channel not added" + url;
      }
      url = url + addChannelQuery(url);
    }
    return url;
  }

  static get(...args) {
    let params = Object.assign([], args);
    const channelId = params[1];
    params.pop();
    try {
      // Append Timeout for all APIs
      params &&
        params.length > 0 &&
        params[0] &&
        API_TIMEOUT.map((data) => {
          data?.path?.some((item) => params[0]?.indexOf(item) > 0)
            ? params.push({ timeout: data?.timeout || process.env.TIMEOUT_MS })
            : "";
        });
      params[0] = makeRequest.appendDomainToUrl(params[0], channelId);
    } catch (error) {
      console.error("ERROR makeRequest : Message -", error, params);
    }

    return axios.get.apply(null, params);
  }
  static fetch(url, params, signal) {
    let axiosParams = { channel: 1006, timeout: 2000 };
    if (params) {
      axiosParams = { ...axiosParams, ...params };
    }
    try {
      if (signal) {
        return axiosInstance.get(url, { params: axiosParams, signal });
      } else {
        return axiosInstance.get(url, { params: axiosParams });
      }
    } catch (error) {
      console.error("ERROR makeRequest : Message -", error, params);
    }
  }
  static post(...args) {
    const params = Object.assign([], args);
    params[0] = makeRequest.appendDomainToUrl(params[0]);
    return axios.post.apply(null, params);
  }
}
