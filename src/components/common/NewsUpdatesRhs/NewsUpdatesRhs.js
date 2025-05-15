import React from "react";
import s from "./NewsUpdatesRhs.module.scss";
import { getNewImageUrl, getSlug, getTargetURL } from "@/utils/common";

const NewsUpdatesRhs = ({ isListingPage, data }) => {
  return (
    <div className={s["rhsWidget"]}>
      <div className={s["rhsWidgetTop"]}>
        <p>Latest Articles</p>
      </div>
      <ul className={s["NewsUpdates"]}>
        {data && data.length > 0
          ? data.map((item, index) => {
            const cleanSeopath = item?.seopath?.replace(/-article-\d+$/, "") || "";
            const normalString = `${cleanSeopath}-${getSlug(item?.cmstype)}-${item?.msid}`;
            const href = getTargetURL({
              ...(item?.overridelink && {
                overrideString: item?.overridelink,
              }),
              normalString,
            });

            return (
              <li key={`${index}_rhs_article`}>
                <a href={href}>
                  <img
                    src={getNewImageUrl({
                      msid: item?.msid || null,
                      imageSize: item?.imageSize || item?.thumbsize || "",
                      imgWidth: 200,
                      imgHeight: 200,
                      is1x1Img: false,
                      isArticleBanner: false,
                      updatedAt: item?.updatedate || "",
                    })}
                    alt="news"
                  />
                  <div className={s["Newsinfo"]}>
                    <h3>{item?.title}</h3>
                    <span>
                      {item?.authors?.[0]?.name}
                      <br />
                      {item?.updatedate}
                    </span>
                  </div>
                </a>
              </li>
            );
          })
          : null}
      </ul>
    </div>
  );
};

export default NewsUpdatesRhs;
