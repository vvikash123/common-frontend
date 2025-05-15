import React, { useState } from "react";
import s from "./NewsUpdatesRhs.module.scss"; // Assuming this is your SCSS file
import SpriteIcon from "../Svg/SpriteIcon";
import Image from "next/image";
import { getNewImageUrl, getSlug, getTargetURL } from "@/utils/common";
import { getAuthorDetailDate, getTimeDifference } from "@/utils/dateUtils";

const NewsUpdatesRhs = ({isListingPage, data}) => {
  return (
    <div className="rhsWidget">
      <div className="rhsWidgetTop">
        {/* <i><SpriteIcon IconName="newsIcon" /></i> */}
        {/* <p><span>SRM Institute of Science and Technology</span> News & Updates</p> */}
        <p>Latest Articles</p>
      </div>

      {/*
      <ul className={s['filter']}>
         <li className={s['active']}>Latest</li> 
         <li>Popular</li> 
         <li>Top 10</li> 
      </ul>
      */} 

      <ul className="NewsUpdates">
       {data && data.length > 0 ? 
       data.map((item, index) => <li key={`${index}_rhs_article`}>
          <a href={getTargetURL({
                          ...(item?.overridelink && {
                            overrideString: item?.overridelink,
                          }),
                          normalString: `${item?.seopath}-${getSlug(
                            item?.cmstype
                          )}-${item?.msid}`,
                        })}>
            <img 
              src={getNewImageUrl({
                          msid: item?.msid || null,
                          imageSize: item?.imageSize || item?.thumbsize || "",
                          imgWidth: 200,
                          imgHeight: 200,
                          is1x1Img: false,
                          isArticleBanner: false,
                          updatedAt: item?.updatedate ? item?.updatedate : "",
                        })}
                        
              alt="news"
            />
            <div className="Newsinfo">
              <h3>{item?.title}</h3>
              <span>{item?.authors?.[0]?.name} <br />{item?.updatedate}</span>
            </div>
          </a>
        </li> ) 
        : ''
        }
      </ul>

      {/* <a href="#" className={s['btn']}>View All Updates</a> */}
    </div>
  );
};

export default NewsUpdatesRhs;
