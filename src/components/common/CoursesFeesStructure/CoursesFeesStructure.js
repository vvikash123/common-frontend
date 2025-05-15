import React, { useEffect, useState } from "react";
import s from "./CoursesFeesStructure.module.scss";
import TitleComponent from "../TitleComponent/TitleComponent";

const CoursesFeesStructure = ({isMobile, courseDetails, loadMore=false , title}) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Ensures the component has fully hydrated on the client side
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    // Render nothing on the client during hydration mismatch
    return null;
  }
  const renderTuitionFeesData = (item) => {
    if (item?.courseTuitionFeesMin && item?.courseTuitionFeesMax) {
      return `${item.courseTuitionFeesMin} - ${item.courseTuitionFeesMax}`;
    } else if (item?.courseTuitionFeesMin) {
      return `${item.courseTuitionFeesMin}`;
    } else if (item?.courseTuitionFeesMax) {
      return `${item.courseTuitionFeesMax}`;
    }
    return null; // Return null if neither value exists
  };
  const renderOneTimePaymentData = (item) => {
    if (item?.courseOneTimePaymentMin && item?.courseOneTimePaymentMax) {
      return `${item.courseOneTimePaymentMin} - ${item.courseOneTimePaymentMax}`;
    } else if (item?.courseOneTimePaymentMin) {
      return `${item.courseOneTimePaymentMin}`;
    } else if (item?.courseOneTimePaymentMax) {
      return `${item.courseOneTimePaymentMax}`;
    }
    return null; // Return null if neither value exists
  };
  
  const renderHostelFeesData = (item) => {
    if (item?.courseHostelFeesMin && item?.courseHostelFeesMax) {
      return `${item.courseHostelFeesMin} - ${item.courseHostelFeesMax}`;
    } else if (item?.courseHostelFeesMin) {
      return `${item.courseHostelFeesMin}`;
    } else if (item?.courseHostelFeesMax) {
      return `${item.courseHostelFeesMax}`;
    }
    return null; // Return null if neither value exists
  };
  
  return (
    <div className={s['CoursesFeesOffered']}>
               <h2>{title}</h2>

      <div className={s['CoursesFeestable']}>
      <table>
        <thead>
          <tr>
            <th>Courses</th>
            <th>One-Time Fee</th>
            <th>Tution Fees</th>
            <th>Hostel Fee</th>
          </tr>
        </thead>
        <tbody>
          {courseDetails && courseDetails.map((item, key) => (
            <tr key={`fee-${key}`}>
              <td><strong>{item?.baseCourseName}</strong><span>( {item?.courseCount} Courses )</span></td>
              <td>{renderOneTimePaymentData(item)}</td>
              <td>{renderTuitionFeesData(item)}</td>
              <td>{renderHostelFeesData(item)}</td>
            </tr>
          ))}
        </tbody>

      </table>
      </div> 
    </div>
  );
};

export default CoursesFeesStructure;
