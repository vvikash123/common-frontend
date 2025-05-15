
import React from "react";
import s from "./HeroSection.module.scss";
import SearchWidget from "@/components/common/SearchWidget/SearchWidget";

const HeroSection = ({ iconUrl, title }) => {
  return (
    <div className={s['HeroSection']}>
      <img
        src="https://static.tnn.in/photo/114021810.cms"
        alt="Hero Image"
        className={s['HeroImage']}
      />
      <div className={s['HeroCaption']}>
        <div className={s['HeroCaptionRow']}>
          <h1>Campus Today, Career Tomorrow: Start Your Career Journey Here, Starts NOW!</h1>
          <SearchWidget margin="20px 0 40px" whiteBg={true} placeholder={"Search Colleges , News & More "} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
