import React from "react";
import s from "./CoursesOffered.module.scss";
import SpriteIcon from "../Svg/SpriteIcon";
import CommonGridBox from "../CommonGridBox/CommonGridBox";
import CoursesWidget from "../CoursesWidget/CoursesWidget";
import Button from "../Button/Button";

const CoursesOffered = ({isMobile}) => {
  return (
    <div className={s['CoursesOffered']}>
      <div className={s['Top']}>
        <p>Courses Offered By SRMIST Directorate of Online Education 2024</p>
        <span>Select Degree and Streams to See Course Fees and Admission Details.</span>
        </div>  
        <div className={s['FilterRow']}>
            <span>Filter <SpriteIcon IconName="FilterIcon" /></span>
            <select>
              <option>Popular</option>
            </select>
            <select>
              <option>Course Type</option>
            </select>
            <select>
              <option>Affliation</option>
            </select>
            <select>
              <option>Course Level</option>
            </select>
        </div>
        <div className={s['FilterSearch']}>
          <input type="text" placeholder="Serch Courses" />
          <SpriteIcon IconName="search" />
        </div>
        <span className={s['TotalNO']}>Total <strong>54 Programs</strong></span>
        <div className={s['FilterInforow']}>
            <div className={s['FilterInfo']}>
                <span>Streams :</span>
                <div className={s['Btn']}>   
                  <button className={s['active']}>Genral</button>
                  <button>Digital Marketing</button>
                 </div>
            </div>
            <div className={s['FilterInfo']}>
                <span>Program Type :</span>
                <div className={s['Btn']}> 
                <button className={s['active']}>Part Time</button>
                <button>Full Time</button>
                </div>
            </div>
            <div className={s['FilterInfo']}>
                <span>Degree :</span>
                <div className={s['Btn']}> 
                <button>MCA</button>
                <button>BCA</button>
                <button>BBA</button>
                <button>MBA</button>
                <button>M.Com</button>
                </div>
            </div>
        </div>
       
        <CommonGridBox gridType={'gridBox'} changeStyle={ isMobile ? 'grid-1' : 'grid-3'} yGap={16} xGap={16} marginBottom={30}>
        <CoursesWidget />
        <CoursesWidget />
        <CoursesWidget />
        <CoursesWidget />
        <CoursesWidget />
        <CoursesWidget />
        <CoursesWidget />
        <CoursesWidget />
        <CoursesWidget />
        </CommonGridBox>
        <div className={s['LoadMore']}>
        <Button
            // iconName="DownloadBrochure"
            buttonText="Load More"
          />
        </div>

    </div>
  );
};

export default CoursesOffered;
