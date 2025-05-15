import React from "react";
import s from "./CityWidget.module.scss";
import NextImage from "@/utils/NextImage"; // Assuming this is your NextImage component
import Link from "next/link";

const CityWidget = ({ iconUrl, title, cityName }) => {
    // A helper function to generate city paths, you can replace with real data
    const getCityLink = (cityName) => {
      return `/colleges/top-colleges-in-${cityName.toLowerCase().replace(' ', '-')}`;  // Example dynamic link
    };
  return (
    <div className={s['CityWidget']}>
            <a key={title} href={getCityLink(cityName)}>
      
      <i>
        <img src={iconUrl} alt={title} />
      </i>
      <span>{cityName}</span>
      </a>
    
    </div>
  );
};

export default CityWidget;
