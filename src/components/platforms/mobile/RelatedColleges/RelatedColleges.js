import React from "react";
import s from "./RelatedColleges.module.scss";

import CommonGridBox from "../../amp/Widgets/CommonGridBox/CommonGridBox";
import CollagesWidget from "@/components/common/CollagesWidget/CollagesWidget";
import TitleComponent from "@/components/common/TitleComponent/TitleComponent";

const RelatedColleges = ({ data, isMobile, isUtmParams = false }) => {
  const origin = isMobile ? "mobile" : "desktop"
  return (
    <>
      <div className="RelatedColleges2">
        <CommonGridBox gridType={'gridBox'} marginBottom={20} changeStyle={'grid-1'} yGap={20} xGap={16}>
        <TitleComponent
            title={`Explore popular colleges from ${data?.data[0]?.location?.state}`}
            // link="/colleges"
            margin="0px 0 0px 0"
            headingLevel="h2"
          />
          {/* <span className={s['TotalColleges']}>(Total 2200 Colleges)</span> */}
        </CommonGridBox>
        <div className={s['TotalCollegesSldier']}>

          {data?.data.map((item) => {
            return (
              <CollagesWidget
                className="grid-3"
                data={item}
                key={item?.collegeId}
                origin={origin}
                isMobile = {true}
                isUtmParams = {isUtmParams}
              />
            );
          })}
        </div>


      </div>
      <style jsx>
        {`
          .RelatedColleges{
  width: 100%;
     padding: 15px;
  border-top: 10px #224099 solid;
}

.TotalColleges{
  color: #224099;
  font-size: 12px;
  font-weight: bold;
  text-align: right;
  margin-top: 10px;
}
        `}
      </style>
    </>
  );
};

export default RelatedColleges;
