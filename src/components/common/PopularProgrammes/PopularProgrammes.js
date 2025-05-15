import React, { useState } from "react";
import s from "./PopularProgrammes.module.scss";
import CoursesWidget from "../CoursesWidget/CoursesWidget";
import CommonGridBox from "../CommonGridBox/CommonGridBox";
import Button from "../Button/Button";

const PopularProgrammes = ({isMobile, courseDetails, collegeId, loadMore=false , data}) => {
const [courseData, setCourseData] = useState(courseDetails?.slice(0, 9) || [])
const [showMore, setShowMore] = useState(courseDetails.length > 9 ? true : false);
  const showMoreCourse = () =>{
    setCourseData(courseDetails)
    setShowMore(false)
  }
  return (
    <div className={s['PopularProgrammes']}>
        <CommonGridBox gridType={'gridBox'} changeStyle={ isMobile ? 'grid-1' : 'grid-3'} yGap={16} xGap={16} marginBottom={30}>
       {courseData && courseData.map((item, key) => <CoursesWidget key={`course-${key}`} item={item} data={data}/> )}
        
        </CommonGridBox>
        {showMore && (
          <div className={s['LoadMore']}>
            <Button
            onClick={()=>showMoreCourse()}
              buttonText="Show More"
            />
          </div>
        )}
        
    </div>
  );
};

export default PopularProgrammes;
