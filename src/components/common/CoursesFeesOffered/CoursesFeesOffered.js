import React, { useEffect, useState } from "react";
import s from "./CoursesFeesOffered.module.scss";
import TitleComponent from "../TitleComponent/TitleComponent";

const CoursesFeesOffered = ({isMobile, courseDetails, loadMore=false , title}) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Ensures the component has fully hydrated on the client side
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    // Render nothing on the client during hydration mismatch
    return null;
  }
  const courseEgibility = (data) => {
       const eligibilityArray=[]
         if(data?.eligibility10 > 0){
          eligibilityArray.push(`10th: ${data?.eligibility10}%`)
         } if(data?.eligibility12 > 0){
          eligibilityArray.push(`10+2: ${data?.eligibility12}%`)
         } if(data?.eligibilityGrad > 0){
          eligibilityArray.push(`Graduation: ${data?.eligibilityGrad}%`)
         } else if(data?.eligibilityPostGrad > 0){
          eligibilityArray.push(`Post Graduation: ${data?.eligibilityPostGrad}%`)
         }
         return eligibilityArray.join(", ");
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

  return (
    <div className={s['CoursesFeesOffered']}>
           <h2>{title}</h2>

      <div className={s['CoursesFeestable']}>
      <table>
        <thead>
          <tr>
            <th>Courses</th>
            <th>Eligibility</th>
            <th>Fees</th>
            {/*<th>Action</th>*/}
          </tr>
        </thead>
        <tbody>
        {courseDetails && courseDetails.slice(0, 5).map((item, key) => {
          return (<tr key={`fee-${key}`}>
            <td><strong>{item?.baseCourseName}</strong><span>( {item?.courseCount} Courses )</span></td>
            <td>
          {courseEgibility(item?.courseEligibility)}
          <br />
          {Array.isArray(item?.courseExamsAccepted) && item.courseExamsAccepted.length > 0 && (
          <>
            Exam: {item.courseExamsAccepted?.join(", ")}
          </>
        )}

        </td>


            <td>{renderTuitionFeesData(item)}</td>
            {/*<td><a className={s['ApplyNow']} href="#">Apply Now</a></td>*/}
          </tr>)
        }
        )} 
        </tbody>
      </table>
      </div> 
    </div>
  );
};

export default CoursesFeesOffered;
