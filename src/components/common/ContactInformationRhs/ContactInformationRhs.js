import React, { useState } from "react";
import s from "./ContactInformationRhs.module.scss"; // Assuming this is your SCSS file
import SpriteIcon from "../Svg/SpriteIcon";

const ContactInformationRhs = ({ data }) => {
  const [showPhone, setShowPhone] = useState(false);

  const formatUrl = (url) => {
    // Ensure the URL starts with http:// or https://
    if (url && !/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };



  return data?.college_info?.name ? (
    <div className={s['rhsWidget']}>
      <div className={s['rhsWidgetTop']}>
        <i><SpriteIcon IconName="ContactIcon" /></i>
        <p><span>{data?.college_info?.name || ""}</span> Contact Information</p>
      </div>
      <p className={s['Information']}>
        {`${data?.college_info?.collegeLocation?.address}, ${data?.college_info?.collegeLocation?.locality}, ${data?.college_info?.collegeLocation?.city}`}
      </p>
      <div className={s['BtnRow']}>
        {!showPhone && data?.college_info?.phone?.length >0 &&  (
          <a
            className={s['btn']}
            onClick={() => setShowPhone(true)}
          >
            Show phone & Email
          </a>
        )}
        {showPhone && (
          <div className={s['Informationrow']}>
            <p className={s['Information']}>
              Phone No. : {data?.college_info?.phone}
            </p>
            <p className={s['Information']}>
              Email ID : {data?.college_info?.email}
            </p>
          </div>
        )}
        <a
          href={formatUrl(data?.college_info?.url)}
          className={s['btn2']}
          target="_blank"
          rel="nofollow noreferrer noindex"
        >
          Go College Website
        </a>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ContactInformationRhs;
