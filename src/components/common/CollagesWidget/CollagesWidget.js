import { useState, useEffect } from "react";
import { getNewImageUrl, getPriceRange, getPriceRangewithoutConverge } from "@/utils/common";
import Button from "../Button/Button";
import SpriteIcon from "../Svg/SpriteIcon";
import s from "./CollagesWidget.module.scss";
import NextImage from "@/utils/NextImage";
import DownloadCollegeBrochure from "../DownloadCollegeBrochure/DownloadCollegeBrochure";
import NaacData from "../RankingData/RankingData";

const CollagesWidget = ({ className, data, origin, isMobile = false, isUtmParams = false }) => {
  let deviceType= 'mobile'
  if(!isMobile) {
    deviceType = 'desktop'
  }
  let rankDetail  = data?.rankDetail?.[0];
  const [showForm, setShowForm] = useState(false);
  const [showNaacData, setShowNaacData] = useState(false);

  const handleToggle = () => {
    setShowNaacData((prev) =>!prev);
  };
  return (
    <div className={`${s["CollagesWidget"]} ${className ? s[className] : ""}`} key={data.collegeId}>
      <div className={s["Top"]}>
        <div className={s["left"]}>
          <i>
            <NextImage
              src={getNewImageUrl({
                msid: data.msid,
                imgWidth: 30,
                imgHeight: 25,
                imgSize: data?.thumbSize ? data?.thumbSize : "",
                isArticleBanner: true,
              })}
              alt={data?.title}
              width={30}
              height={25}
              layout={"fixed"}
            />
          </i>
          <div>
            <h2>
              <a href={`/college/${data?.collegeId}${isUtmParams ? `?utm_source=college_info&utm_medium=Popular_colleges_location&utm_campaign=${deviceType}` : ''}`}>
                {data?.collegeName}
              </a>
            </h2>
            <span>
              <SpriteIcon IconName="LocationIcon" />{" "}
              {data?.collegeLoc?.city ?? data?.location?.city}
            </span>
          </div>
        </div>
        <div className={s["right"]}>
          {/* {rankDetail &&
          <>
           <p>{`${rankDetail.publisher ? rankDetail.publisher : 'Times'} :`}<strong>{rankDetail?.Rating}</strong> 
          {<i className={s["ToolTip"]} onClick={() => setShowNaacData((prev) => !prev)}>
                <SpriteIcon IconName="toolTipIcon" />
           </i>}
         
          </p>
          <p>Score :<strong>{rankDetail?.['Final Score']}</strong></p>
          </>
          } */}

          {/* {data?.ratingValue && (
            <p>
              {data?.ratingText} : <strong>{data?.ratingValue}</strong>
            </p>
          )}
          {data?.scoreValue && (
            <p>
              {data?.scoreText}: <strong>{data?.scoreValue}</strong>
            </p>
          )} */}
        </div>
        {/* {showNaacData && <NaacData data={rankDetail} isListing = {true} handleToggle = {handleToggle}/>} */}
      </div>
      <div className={s["CollagesInfo"]}>
        <div>
          <ul className={s["Fees"]}>
            {data?.collegeFees ? (
              <li>
                Fees:{" "}
                <strong>
                  {getPriceRangewithoutConverge({
                    maxPrice: data?.courseFeesMax,
                    minPrice: data?.courseFeesMin,
                  })}
                </strong>
              </li>
            ) : null}
            {/* {data?.collegeAvgSalary ? (
              <li>
                Salary:{" "}
                <strong>
                  {getPriceRange({
                    maxPrice: data?.collegeAvgSalary,
                    minPrice: data?.collegeAvgSalary,
                  })}
                </strong>
              </li>
            ) : null} */}
            {data?.courseCount ? (
              <li>
                Courses Offered: <strong>{data?.courseCount}</strong>
              </li>
            ) : null}
            {data?.collegeExamsAccepted?.length > 0 && (
              <li
                className={
                  data.collegeExamsAccepted.length > 1 ? s["ExamsAccepted"] : ""
                }
              >
                Exams Accepted:{" "}
                <strong>
                  {data.collegeExamsAccepted.slice(0, 1).join(", ")}
                  {data.collegeExamsAccepted.length > 1 && (
                    <> + <span> {data.collegeExamsAccepted.length - 1}</span></>
                  )}
                </strong>

                <div className={s["Tooltip"]}>
                  {data.collegeExamsAccepted.join(", ")}
                </div>

              </li>
            )}
          </ul>
          <ul className={s["Info"]}>
            <li>
              <a href={`/college/${data.collegeId}/admissions`}>ADMISSIONS</a>
            </li>
            <li>
              <a href={`/college/${data.collegeId}/courses`}>COURSES</a>
            </li>
            {/* <li>
              <a href={`/college/${data.collegeId}-placements`}>PLACEMENTS</a>
            </li> */}
            {/* <li>GATE 2024 Cutoff : 400</li> */}
          </ul>
        </div>
        {data && data?.brochureMsid && (
          <div onClick={() => setShowForm(true)}>
            <Button iconName="DownloadBrochure" buttonText="Brochure" />
          </div>
        )

        }

        {showForm && (
          <DownloadCollegeBrochure
            setShowForm={setShowForm}
            data={data}
            origin={origin}
          />
        )}
      </div>
    </div>
  );
};

export default CollagesWidget;
