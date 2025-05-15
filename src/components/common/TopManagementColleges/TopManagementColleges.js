import React from "react";
import s from "./TopManagementColleges.module.scss";
import CollagesWidget from "../CollagesWidget/CollagesWidget";
import CustomSlideBox from "../CustomSlideBox/CustomSlideBox";
import ContainerBox from "../ContainerBox/ContainerBox";
import TitleComponent from "../TitleComponent/TitleComponent";
import CommonGridBox from "../CommonGridBox/CommonGridBox";

const TopManagementColleges = ({ isListingPage, data, isMobile }) => {
  return (
    <div className={s['TopManagementColleges']}>
      <ContainerBox>
        <CommonGridBox gridType={'gridBox'} marginBottom={20} changeStyle={'grid-1'} yGap={20} xGap={16}>
          <TitleComponent
            title={data?.seeMore?.text ?? "Top Colleges"}
            // link="/colleges"
            margin="0px 0 0px 0"
            headingLevel="h2"
          />
          {/* <span className={s['TotalColleges']}>(Total 2200 Colleges)</span> */}
        </CommonGridBox>
        <CommonGridBox gridType={'gridBox'} changeStyle={isMobile ? 'grid-1' : 'grid-3'} yGap={20} xGap={16}>

          {data?.data?.map((item) => (
            <CollagesWidget
              className="grid-3"
              data={item}
              key={item?.collegeId}
            />
          ))}


        </CommonGridBox>
      </ContainerBox>

    </div>
  );
};

export default TopManagementColleges;
