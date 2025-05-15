import { useState } from "react";
import styles from "./NaacData.module.scss";

const NaacData = ({ data, isListing = false, handleToggle }) => {  

  let showData = {};
  if(!isListing) {
    showData = {
      "Discipline" : data?.["discipline"],
    }
  }

 showData = {
    ...showData,
    "Academic Excellence": data?.["Academic Excellence"],
    "All round personality dev": data?.["All round personality dev"],
    "Brand Legacy": data?.["Brand Legacy"],
    Faculty: data?.["Faculty"],
    "Industry Interaction": data?.["Industry Interaction"],
    Infrastructure: data?.["Infrastructure"],
    Placement: data?.["Placement"],
  };

  return (
    <div className={`${ !isListing ?  styles.NaacData : `${styles.NaacData} ${styles.CollageNaacdata}` }`}>
      <i className={styles.Close}  onClick={handleToggle}>x</i>
     { showData && 
      Object.keys(showData).map((key, index) => (
        <div className={styles.NaacDataRow} key={`naac-data-${index}`}>
          <span>{key}</span>
          {}
          <p>{showData[key]}</p>
        </div>
      ))
    }
    </div>
  );
};

export default NaacData;
