import React, { useState } from "react";
import s from "./CollageDetailTop.module.scss";
import SpriteIcon from "../Svg/SpriteIcon";
import ContainerBox from "../ContainerBox/ContainerBox";
import SocialIcons from "../SocialIcons/SocialIcons";
import CommonGridBox from "../CommonGridBox/CommonGridBox";
import DownloadCollegeBrochure from "../DownloadCollegeBrochure/DownloadCollegeBrochure";
import NextImage from "@/utils/NextImage";
import { getNewImageUrl } from "@/utils/common";
import NaacData from "../RankingData/RankingData";

const CollageDetailTop = ({ isMobile, data = {} }) => {
  const brochureMsid = data?.brochureMsid || "";
  const [showNaacData, setShowNaacData] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [enquire, setEnquire] = useState(false); // Separate state for enquire
  const rankDetails = data?.result?.rankDetails?.[0] || undefined;
  const toggleNaacData = () => {
    setShowNaacData((prev) => !prev);
  };
  const handleEnquireClick = () => {
    setEnquire(true); // Set enquire to true
    setShowForm(true); // Show the form
  };
  // console.log("@data", data);
  const broucherData = {
    brochureMsid: data?.brochureMsid,
    brouchureThumSize: data?.brouchureThumSize,
    collegeName: data?.result?.collegeName,
    collegeDiscipline: data?.result?.collegeDiscipline,
    enquire: enquire, // Use enquire state here
  };
  return (
    <div className={s["CollageDetailTop"]}
      style={{
        backgroundImage: `url(${getNewImageUrl({
          msid: data?.collegeBannerMsid || null,
          imgSize:
            data?.collegeBannerMsidThumbsize || data.collegeBannerMsidThumbsize || '',
          updatedAt:
            data?.cmsassoc && data[0]?.updatedate,
          isArticleBanner: true,
        }) || langConstant['IMG_DEFAULT']
          })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* <img src={bannerUrl} alt="" /> */}
      <div className={s["TopContent"]}>
        <ContainerBox marginTop={isMobile ? 10 : 30}>
          <div className={s["CollageInfo"]}>
            <i>
              {/* <img src={logoUrl} alt={data?.result?.collegeName || ""} /> */}
              <NextImage
                src={
                  getNewImageUrl({
                    msid: data?.collegeLogoMsid || null,
                    imgSize:
                      data?.collegeLogoMsidThumbsize || data.collegeLogoMsidThumbsize || '',
                    updatedAt:
                      data?.cmsassoc && data[0]?.updatedate,
                    isArticleBanner: false,
                  }) || langConstant['IMG_DEFAULT']
                }
                alt={data?.result?.collegeName || null}
                useOriginalSource
              />

            </i>
            <div>
              <h1>{data?.result?.collegeName || ""}</h1>
              <span>
                <SpriteIcon IconName="LocationIcon" />{" "}
                {data?.result?.contactDetails?.collegeLocation?.address || ""}
                {data?.result?.contactDetails?.collegeLocation?.locality ?
                  `, ${data?.result?.contactDetails?.collegeLocation?.locality}` : ""}
                {data?.result?.contactDetails?.collegeLocation?.city ?
                  `, ${data?.result?.contactDetails?.collegeLocation?.city}` : ""}
                {data?.result?.contactDetails?.collegeLocation?.state ?
                  `, ${data?.result?.contactDetails?.collegeLocation?.state}` : ""}
              </span>

            </div>
          </div>
          <ul className={s["InfoList"]}>
          {
          data?.result?.collegeEstablishYear && <li> Established: {data?.result?.collegeEstablishYear}</li>}
           {/* {rankDetails && <li>
              {rankDetails?.publisher} : {rankDetails?.Rating} Score : {rankDetails?.['Final Score']}
             <i className={s["ToolTip"]} onClick={toggleNaacData}>
                <SpriteIcon IconName="toolTipIcon" />
              </i>
            
            </li>}         */}
           {(data?.result?.globalCourseFeesMin || data?.result?.globalCourseFeesMax) && (
                <li>
                Fees: <strong>
                  {data?.result?.globalCourseFeesMin}
                  {data?.result?.globalCourseFeesMax && data?.result?.globalCourseFeesMin ? ' - ' : ''}
                  {data?.result?.globalCourseFeesMax}
                </strong>
              </li>

            )}

            {/* {data?.result?.contactDetails?.phone?.[0]?.length >0 && <li>
            Phone: <strong>{data?.result?.contactDetails?.phone?.[0]}</strong>
            </li>} */}
          </ul>
          {/* { showNaacData && rankDetails && <NaacData data = {rankDetails || {}} handleToggle={toggleNaacData}/>} */}
        </ContainerBox>
      </div>
      <div className={s["CollageInfoBottom"]}>
        <ContainerBox>
          <CommonGridBox
            gridType={"gridBox"}
            changeStyle={`${isMobile ? "grid-1" : "grid-2"}`}
            yGap={24}
            xGap={16}
          >
            <div className={s["BtnRow"]}>
              <button
                className={`${s["btn"]} ${s["enquire"]}`}
                onClick={handleEnquireClick} // Handle "Enquire" button click
              >
                <SpriteIcon IconName="Enquire" />
                Enquire
              </button>

              {/* Download Button */}
              {broucherData?.brochureMsid && (
                <button
                  className={s["btn"]}
                  onClick={() => setShowForm(true)}
                >
                  <SpriteIcon IconName="Brochure" />
                  Brochure
                </button>
              )}
            </div>

            <div>
              <SocialIcons
                data={{
                  currentUrl: `college/${data?.result?.collegeId}`,
                  title: data?.result?.collegeName,
                }}
              />
            </div>
          </CommonGridBox>
        </ContainerBox>
      </div>

      {showForm && (
        <DownloadCollegeBrochure
          setShowForm={setShowForm}
          data={broucherData} // Pass updated broucherData
          origin={"desktop"}
        />
      )}

    </div>
  );
};

export default CollageDetailTop;
