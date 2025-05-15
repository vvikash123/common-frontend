import style from "./PhotoTopStrip.module.scss";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";

import { setGAValue } from "@/helpers/analytics/gaUtils";

import SocialShareIcons from "@/components/platforms/desktop/SocialShareIcon/SocialShareIcon";
import NextImage from "@/utils/NextImage";
import { getAuthorImageUrl, isMobile } from "@/utils/common";
import dayjs from "dayjs";
import isAMPRequest from "@/utils/serverUtils";
import { DefaultImage } from "../Svg/Svg";
import SocialIcons from "../SocialIcons/SocialIcons";
export const PhotoTopStrip = (props) => {
  const {
    authors = [],
    byline = {},
    updatedate,
    disableTimestamp = false,
    seoAuthor,
    isAuthor,
    item,
  } = props;
  const getAuthors = (item, index, isAuthor) => {
    return (
      <>
        {item.length == 1 && item ? (
          <>
            {item.map((elem, ind) => {
              return elem?.id ? (
                <>
                  {ind == 0 && isAuthor ? <strong>{index}: </strong> : null}
                  <a
                    key={elem?.id}
                    // href={`/author/${elem?.seoname || ""}-${elem?.id || ""}`}
                  >
                    {ind && isMobile() > 0 ? ", " : null}
                    <span>{elem?.name}</span>
                  </a>
                </>
              ) : null;
            })}
          </>
        ) : (
          <>
            {item.map((elem, ind) => {
              return elem?.id ? (
                <>
                  {ind == 0 && isAuthor ? <strong>{index}: </strong> : null}
                  <a
                    key={elem?.id}
                    href={`/author/${elem?.seoname || ""}-${elem?.id || ""}`}
                  >
                    {ind && isMobile() > 0 ? ", " : null}
                    <span>{elem?.name}</span>
                  </a>
                </>
              ) : null;
            })}
          </>
        )}
      </>
    );
  };

  let seoAuthorId =
    seoAuthor?.url &&
    seoAuthor?.url?.split("-") &&
    seoAuthor?.url?.split("-").length > 0
      ? seoAuthor?.url.split("-")[seoAuthor?.url.split("-").length - 1]
      : null;

  let showDesignation = ["columns"].includes(props.navigation?.category);
  let authorDesc =
    authors && authors.length > 0 && authors[0] && authors[0].desc
      ? `${authors[0].desc}`
      : "";

  let authorsImg = "";
  if (
    (byline &&
      Object.keys(byline).length == 1 &&
      byline[Object.keys(byline)[0]].length == 1) ||
    (byline && Object.keys(byline).length == 0)
  ) {
    authorsImg = "image";
  }
  let authorName =
    authors && authors.length > 0 && authors[0] && authors[0].name
      ? `${authors[0].name}`
      : authors && authors.name
      ? `${authors.name}`
      : "";

  if (seoAuthor && seoAuthor.name) {
    authorName = seoAuthor.name;
  }
  authorName =
    byline &&
    Object.keys(byline) &&
    Object.keys(byline)[0] &&
    byline[Object.keys(byline)[0]] &&
    byline[Object.keys(byline)[0]][0] &&
    byline[Object.keys(byline)[0]][0].name
      ? byline[Object.keys(byline)[0]][0].name
      : authorName;
  let authorId =
    authors && authors.length > 0 && authors[0] && authors[0].id
      ? `${authors[0].id}`
      : "";

  authorId =
    byline &&
    Object.keys(byline) &&
    Object.keys(byline)[0] &&
    byline[Object.keys(byline)[0]] &&
    byline[Object.keys(byline)[0]][0] &&
    byline[Object.keys(byline)[0]][0].name
      ? byline[Object.keys(byline)[0]][0].id
      : authorId;
  let agencyId = authors && authors.id ? `${authors.id}` : "";

  authorId = seoAuthorId ? seoAuthorId : authorId;

  let authorSeoName =
    authors && authors.length > 0 && authors[0] && authors[0].seoname
      ? `${authors[0].seoname}`
      : "";
  let authorDesignation =
    authors && authors.length > 0 && authors[0] && authors[0].designation
      ? `${authors[0].designation}`
      : "";

  const shareOnFacebook = () => {
    setGAValue("event", "click", {
      event_category: "Share",
      event_label: `facebook | ${window.location}`,
    });
  };
  const shareOnTwitter = () => {
    setGAValue("event", "click", {
      event_category: "Share",
      event_label: `twitter | ${window.location}`,
    });
  };
  const shareOnLinkedIn = () => {
    setGAValue("event", "click", {
      event_category: "Share",
      event_label: `linkedin | ${window.location}`,
    });
  };
  const shareOnWhatsapp = () => {
    setGAValue("event", "click", {
      event_category: "Share",
      event_label: `whatsapp | ${window.location}`,
    });
  };

  return (
    <div className={`${style["PhotoTopStrip"]}`}>
      <ContainerBox>
        <div className={`${style["PhotoTopStripRow"]}`}>
          <div className={`${style["authorinfoRow"]}`}>
            <div className={`${style["authorinfo"]}`}>
              <i>
                {!isAMPRequest() ? (
                  authorId ? (
                    <a
                    key={authorId}
                    // href={`/author/${authorSeoName || ""}-${authorId || ""}`}
                    
                  >
                    <NextImage
                      src={getAuthorImageUrl({
                        msid: authorId || null,
                      })}
                    />
                  </a>
                  ) : (
                    <NextImage
                    src={`${process.env.NEXT_PUBLIC_PHOTO_API}/authorthumb/${authorId}.cms?width=70&height=70&hid=1005`}
                    alt={`author-${authorId}`}
                  />
                  )
               
                ) : (
                  authorId && (

                  <a
                    key={authorId}
                    // href={`/author/${authorSeoName || ""}-${authorId || ""}`}
                  >
                    <amp-img
                      src={`${process.env.NEXT_PUBLIC_PHOTO_API}/authorthumb/${authorId}.cms?width=60&height=60`}
                      width="auto"
                      height="60"
                      layout="fixed-height"
                      alt={`${authorSeoName || ""}`}
                    >
                      <amp-img
                        fallback=""
                        src={`${process.env.WEBAPP_BASE_URL}${DefaultUser}`}
                        width="auto"
                        height="60"
                        layout="fixed-height"
                        alt={`${authorSeoName || ""}`}
                      ></amp-img>
                    </amp-img>
                  </a>
                  )
                )}
              </i>
              <strong>
                <div
                  className={`${style["author_row"]} ${style["align_center"]}`}
                >
                  {byline &&
                  Object.keys(byline) &&
                  Object.keys(byline)[0] &&
                  byline[Object.keys(byline)[0]] &&
                  byline[Object.keys(byline)[0]][0] ? (
                    <div className={style["multiple_byline"]}>
                      {!isMobile()
                        ? Object.keys(byline).map((elem, indx) =>
                            getAuthors(
                              byline[Object.keys(byline)[indx]],
                              Object.keys(byline)[indx],
                              isAuthor
                            )
                          )
                        : getAuthors(
                            byline[Object.keys(byline)[0]],
                            Object.keys(byline)[0],
                            isAuthor
                          )}
                      {byline &&
                        Object.keys(byline) &&
                        Object.keys(byline)[1] && (
                          <>
                            {isMobile()
                              ? byline &&
                                Object.keys(byline) &&
                                Object.keys(byline)[1] &&
                                byline[Object.keys(byline)[1]] &&
                                byline[Object.keys(byline)[1]][0]
                                ? getAuthors(
                                    byline[Object.keys(byline)[1]],
                                    Object.keys(byline)[1],
                                    isAuthor
                                  )
                                : null
                              : null}
                            {isMobile()
                              ? byline &&
                                Object.keys(byline) &&
                                Object.keys(byline)[2] &&
                                byline[Object.keys(byline)[2]] &&
                                byline[Object.keys(byline)[2]][0]
                                ? getAuthors(
                                    byline[Object.keys(byline)[2]],
                                    Object.keys(byline)[2],
                                    isAuthor
                                  )
                                : null
                              : null}
                          </>
                        )}
                    </div>
                  ) : seoAuthor ? (
                    authorId && (
                    <a
                      key={authorId}
                      // href={
                      //   Object.keys(seoAuthor).length
                      //     ? seoAuthor?.url
                      //     : `/author/${authorSeoName}-${authorId}`
                      // }
                    >
                      {authorName ? (
                        <strong className={style["author_detail"]}>
                          <span className={style["author-name"]}>
                            {authorName}
                          </span>
                        </strong>
                      ) : null}
                    </a>
                    )
                  ) : authorId ? (
                    <a
                      key={authorId}
                      // href={`/author/${authorSeoName || ""}-${authorId || ""}`}
                    >
                      {authorName ? (
                        <strong className={style["author_detail"]}>
                          <span className={style["author-name"]}>
                            {authorName}
                          </span>
                          {showDesignation && authorDesignation ? (
                            <span className={style["author_desgination"]}>
                              {authorDesignation}
                            </span>
                          ) : null}
                        </strong>
                      ) : null}
                    </a>
                  ) : authorName ? (
                    <strong className={style["author_detail"]}>
                      <span className={style["author-name"]}>{authorName}</span>
                      {showDesignation && authorDesignation ? (
                        <span className={style["author_desgination"]}>
                          {authorDesignation}
                        </span>
                      ) : null}
                    </strong>
                  ) : null}
                </div>
              </strong>{" "}
              <span>
                {updatedate ? (
                  <p className={style["update-time"]}>
                    {"Updated " +
                      dayjs
                        .tz(Number(updatedate), "Asia/Calcutta")
                        .format(
                          `MMM D, YYYY ${
                            disableTimestamp ? " " : "[|] hh:mm A [IST]"
                          }`
                        )}
                  </p>
                ) : (
                  ""
                )}
              </span>{" "}
            </div>
            <span className={`${style["Verified"]}`}>
              {/* Verified By
              <img
                src="/assets/health-images/images/himalaya-logo.png"
                alt="himalaya-logo"
              /> */}
            </span>
          </div>

          <div className={`${style["SocialShare"]}`}>
          {/* <SocialIcons /> */}

            <SocialIcons
              data={item}
              lang={""}
              shareOnFacebook={shareOnFacebook}
              shareOnTwitter={shareOnTwitter}
              shareOnLinkedIn={shareOnLinkedIn}
              shareOnWhatsapp={shareOnWhatsapp}
            />
          </div>
        </div>
      </ContainerBox>
    </div>
  );
};
