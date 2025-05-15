import makeRequest from "@/utils/makeRequest";
import isAMPRequest from "./serverUtils";
const domain = process.env.NEXT_PUBLIC_API_URL || "https://api.unilist.in";
export function loadSearchData(
  searchTerm,
  contenttype,
  isOrigin = "mobile",
  pageno = 0,
  searchType
) {
  const channelId = process?.env?.NEXT_PUBLIC_HOST_ID || 1005;
  return fetchSearchData(
    searchTerm,
    contenttype,
    isOrigin,
    pageno,
    channelId,
    domain
  )
    .then((data) => {
      return data;
    })
    .catch((error) => {
      if (typeof searchType !== "undefined" && searchType === "On Type") {
        // dispatch(handleSearchSuggetionError(error));
      } else {
        // dispatch(handleSearchError(error));
      }
    });
}

export async function fetchSearchData(
  searchTerm,
  contenttype,
  isOrigin,
  pageno,
  channelId,
  domain
) {
  contenttype ? contenttype : (contenttype = "all");
  let apendQueryParams = "";
  // api/topic?searchterms=Ford&perpage=20&pageno=0&origin=desktop&contenttype=all&channel=406
  let url =
    `${domain}/api/search?searchterms=${encodeURIComponent(
      searchTerm
    )}&row=20&start=${pageno}&channel=${channelId}&origin=${
      !isAMPRequest() ? isOrigin : "amp"
    }` + `${apendQueryParams ? apendQueryParams : ""}`;
  if (contenttype == "article") {
    url = url + "&contenttype=article";
  } else if (contenttype == "image") {
    url = url + "&contenttype=image";
  } else if (contenttype == "video") {
    url = url + "&contenttype=video";
  } else if (contenttype == "liveblog") {
    url = url + "&contenttype=liveblog";
  } else {
    url = url + "&contenttype=all";
  }
  if (searchTerm != "") {
    const res = await fetch(url);
    return res.json();
  }

  /* return makeRequest.get(url, channelId).catch(function (error) {
     // logAPIError(error);
    });
    */
}

export async function loadSearchTopicData(keyword = "") {
  if (keyword) {
    try {
      const channelId = process?.env?.NEXT_PUBLIC_HOST_ID || 1005;
      const url = `${domain}/api/health-search?key=${keyword}&channel=${channelId}`;
      const response = await fetch(url);
      const responseData = await response.json();
      return responseData?.response || [];
    } catch (error) {
      console.error("Error fetching footer data:", error);
      return null;
    }
  }
}
