import React, { useState } from "react";
import s from "./WhereToStudy.module.scss";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import CityWidget from "@/components/common/CityWidget/CityWidget";
import CommonGridBox from "@/components/common/CommonGridBox/CommonGridBox";
import { isMobile } from "@/utils/common";
import { useRouter } from 'next/router'; // Import useRouter from Next.js
import Link from "next/link";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import SearchWidget from "@/components/common/SearchWidget/SearchWidget";

const WhereToStudy = (props) => {
  const { isMobile } = props;
  const [searchText, setSearchText] = useState(''); // State to manage input value
  const router = useRouter(); // Initialize useRouter hook

  // Map to hold city names and their respective icon URLs
  const cityData = {
    Mumbai: "/assets/icons/education/Mumbai.svg",
    Delhi: "/assets/icons/education/Delhi.svg",
    Bangalore: "/assets/icons/education/Bangalore.svg",
    Chennai: "/assets/icons/education/Chennai.svg",
    Hyderabad: "/assets/icons/education/Hyderabad.svg",
    Kolkata: "/assets/icons/education/Kolkata.svg",
    Pune: "/assets/icons/education/Pune2.svg",
    Jaipur: "/assets/icons/education/Jaipur.svg",
    Surat: "/assets/icons/education/Surat.svg",
    Ahmedabad: "/assets/icons/education/Ahmedabad.svg",
    Indore: "/assets/icons/education/Indore.svg",
    Lucknow: "/assets/icons/education/Lucknow.svg",
  };



  // Handle the search functionality
  const handleSearch = () => {
    if (searchText.trim()) {
      router.push(`/search?query=${searchText.trim()}`); // Navigate to search page with the search query
    }
  };

  return (
    <div className={s['WhereToStudy']}>
      <ContainerBox>
        <div className={s['WhereToStudyTop']}>
          <h3>Where To Study?</h3>
          <p>You will find something to spark your curiosity and enhance your knowledge.</p>
        </div>

        <div className={s['SearchWidget']}>
        <SearchWidget margin="0" whiteBg={false} button={true}  placeholder={"Search by Location "} type={'location'}/>

        </div>

        <CommonGridBox gridType={'gridBox'} changeStyle={isMobile ? 'grid-2' : 'grid-4'} yGap={24} xGap={16}>
          {/* Map through the cities and wrap each CityWidget in a Link */}
          {Object.keys(cityData).map((cityName, index) => (
              <CityWidget
              key={index}
                iconUrl={cityData[cityName]}  // Dynamically pass the icon URL
                title={`${cityName} Icon`}
                cityName={cityName}
              />
          ))}
        </CommonGridBox>

        {/* Uncomment and use for advertisement if needed */}
        {/* <div className={s['adsection']}>
          <img src="https://tpc.googlesyndication.com/simgad/3444045413358546399" alt="Advertisement"/>
        </div> */}
      </ContainerBox>
    </div>
  );
};

export default WhereToStudy;
