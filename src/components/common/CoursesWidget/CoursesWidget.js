import React, { useState } from "react";
import s from "./CoursesWidget.module.scss";
import Button from "../Button/Button";
import DownloadCollegeBrochure from "../DownloadCollegeBrochure/DownloadCollegeBrochure";
import { isMobile } from "@/utils/isMobile";

const CoursesWidget = ({ item, data }) => {
  const [showForm, setShowForm] = useState(false);

  const broucherData = {
    brochureMsid: data?.["brochureMsid"],
    brouchureThumSize: data?.['brouchureThumSize'],
    collegeName: data?.result?.collegeName,
    collegeDiscipline: data?.result?.collegeDiscipline,
    enquire: false, // Use enquire state here
  };

  const renderPlacementData = () => {
    if (item?.coursePlacementMin && item?.coursePlacementMax) {
      return `${item.coursePlacementMin} - ${item.coursePlacementMax}`;
    } else if (item?.coursePlacementMin) {
      return `${item.coursePlacementMin}`;
    } else if (item?.coursePlacementMax) {
      return `${item.coursePlacementMax}`;
    }
    return null; // Return null if neither value exists
  };

  const renderTuitionFeesData = () => {
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
    <div className={s['CoursesWidget']}>
      <div className={s['CoursesWidgetRow']}>
        <h4>{item?.baseCourseName}</h4>
        <p>
        {item?.courseCount} Courses
        {(item?.courseDurationDetails?.minDuration || item?.courseDurationDetails?.maxDuration) && (
          <>
            {" / "}
            {item?.courseDurationDetails?.minDuration && (
              <>
                {item.courseDurationDetails.minDuration} {item.courseDurationDetails.minDurationUnit}
              </>
            )}
            {item?.courseDurationDetails?.maxDuration && item?.courseDurationDetails?.minDuration && " - "}
            {item?.courseDurationDetails?.maxDuration && (
              <>
                {item.courseDurationDetails.maxDuration} {item.courseDurationDetails.maxDurationUnit}
              </>
            )}
          </>
        )}
      </p>

       
      <span  className={s['Accepted']}>
        Exams Accepted <strong>{Array.isArray(item?.courseExamsAccepted) ? item?.courseExamsAccepted?.join(', ') : "-"}</strong>
      </span>

       
        <ul>
          <li>
            <span>Tuition Fees</span>
            <strong>{renderTuitionFeesData()}</strong>
          </li>
          <li>
            <span> Salary</span>
            <strong>{renderPlacementData()}</strong>
          </li>
        </ul>
      </div>
      {data && data?.["brochureMsid"] && (
        <div onClick={() => setShowForm(true)}>
          <Button iconName="DownloadBrochure" buttonText="Brochure" />
        </div>
      )}
      {showForm && (
        <DownloadCollegeBrochure
          setShowForm={setShowForm}
          data={broucherData}
          origin={isMobile() ? 'mobile' : 'desktop'}
        />
      )}
    </div>
  );
};

export default CoursesWidget;
