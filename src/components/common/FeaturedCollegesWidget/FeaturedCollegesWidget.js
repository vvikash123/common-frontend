import React, { useState } from "react"; // Added useState import
import s from "./FeaturedCollegesWidget.module.scss";
import Button from "../Button/Button";
import SpriteIcon from "../Svg/SpriteIcon";
import DownloadCollegeBrochure from "../DownloadCollegeBrochure/DownloadCollegeBrochure";

const FeaturedCollegesWidget = (props) => {
  const { title, location, link, iconUrl, college_info , brochureMsid ,brouchureThumSize ,  collegeName , collegeDiscipline} = props; // Destructure the props
  const [showForm, setShowForm] = useState(false); // Corrected useState usage
  const data = {
    brochureMsid: brochureMsid,
    brouchureThumSize: brouchureThumSize,
    collegeName: collegeName,
    collegeDiscipline:collegeDiscipline
  };

  return (
    <div className={s["FeaturedCollegesWidget"]}>
      {/* Top Section */}
      <div className={s["Top"]}>
        <i>
          <img width={66} height={66} src={iconUrl} alt={title || "College"} />
        </i>
        <div>
          <h3>
            <a href={link}>{title || "College Name"}</a>
          </h3>
          <span>
            <SpriteIcon IconName="LocationIcon" /> {location || "Location"}
          </span>
        </div>
      </div>

      {/* College Info */}
      <ul className={s["Package"]}>
        {college_info?.map((info, index) => (
          <li key={index}>
            <strong>{info?.value || "N/A"}</strong>
          </li>
        ))}
      </ul>

      {/* Download Button */}
      {data?.brochureMsid && (
        <Button
          onClick={() => setShowForm(true)}
          iconName="DownloadBrochure"
          buttonText="Brochure"
        />
      )}

      {/* Brochure Form */}
      {showForm && (
        <DownloadCollegeBrochure
          setShowForm={setShowForm}
          data={data}
          origin={'desktop'} // Added origin fallback to `window.location.origin`
        />
      )}
    </div>
  );
};

export default FeaturedCollegesWidget;
