import React from "react";
import s from "./TopManagementColleges.module.scss";
import CollagesWidget from "../CollagesWidget/CollagesWidget";
import ContainerBox from "../ContainerBox/ContainerBox";
import TitleComponent from "../TitleComponent/TitleComponent";
import CommonGridBox from "../CommonGridBox/CommonGridBox";

const TopManagementColleges = ({isListingPage, data , isMobile}) => {

  return (
    <>
    <div className="TopManagementColleges">
     <ContainerBox>
     <CommonGridBox gridType={'gridBox'} marginBottom={20}  changeStyle={'grid-2'} yGap={20} xGap={16}>
     <TitleComponent
        title="Top Management Colleges"
        // link="/colleges"
        margin="0px 0 0px 0"
        headingLevel="h2" 
      />
      {/* <span className={s['TotalColleges']}>(Total 2200 Colleges)</span> */}
      </CommonGridBox>
    <CommonGridBox gridType={'gridBox'} changeStyle={ isMobile ? 'grid-1' :   'grid-3'} yGap={20} xGap={16}>

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
    <style jsx>
        {`
          .TopManagementColleges{
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

export default TopManagementColleges;
