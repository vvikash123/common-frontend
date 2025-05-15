import { useState } from "react";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import style from "./BlackPageHeader.module.scss";
import dynamic from "next/dynamic";
const EnquiryForm = dynamic(() => import("@/components/common/EnquiryForm"), {
  ssr: false,
});
const DoctorInfo = ({ doctorData }) => {
  const [showEnqForm, setShowEnqForm] = useState(false);
  return (
    <div className={style.FromDoctorWidget}>
      <div className={style.DoctorWidgetLeft}>
        <div className={style.DoctorPic}>
          {/*<SpriteIcon IconName="blueRightCheck" />*/}
        </div>
        <div className={style.Info}>
          <div>
           <h1> {doctorData?.name}</h1> <strong>BHMS, MS - Dermatology</strong>
          </div>
          <span>
            ASSOCIATED WITH <strong>Suryodaya Skin & Hair Clinic</strong>
          </span>
          <ul>
            <li>20+ Years Experience</li>
            <li>₹1000</li>
          </ul>
        </div>
      </div>
      <ul className={`${style["list"]}`}>
        <li>
          <SpriteIcon IconName="like" /> 95% Positive Reviews
        </li>
        <li>
          <SpriteIcon IconName="lang" /> English, Hindi & Gujarati
        </li>
        <li>
          <SpriteIcon IconName="location" /> B/12 - Raheja Icon, Kalyani Marg,
          New Delhi
        </li>
      </ul>
      <button
        className={style.backlink}
        onClick={() => {
          setShowEnqForm(true);
        }}
      >
        SEND ENQUIRY
      </button>

      {showEnqForm && <EnquiryForm setShowEnqForm={setShowEnqForm} />}
    </div>
  );
};

export default DoctorInfo;
