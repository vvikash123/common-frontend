import React from "react";
import s from "./TopStreams.module.scss";
import Link from "next/link";  // Import the Next.js Link component
import CollagesWidget from "../CollagesWidget/CollagesWidget";
import CustomSlideBox from "../CustomSlideBox/CustomSlideBox";
import ContainerBox from "../ContainerBox/ContainerBox";
import TitleComponent from "../TitleComponent/TitleComponent";
import TopStreamsBox from "../TopStreamsBox/TopStreamsBox";
import SlickSlideWrapper from "../SlickSlideWrapper/SlickSlideWrapper";
import { getDeviceType } from "@/utils/isMobile";
const TopStreams = (props) => {
  const { isMobile } = props;
  const streamLinks = [
    { title: "Management", link: "/colleges/top-management-colleges-in-india", iconUrl: "/assets/icons/education/Management.svg" },
    { title: "Hospitality", link: "/colleges/top-hospitality-colleges-in-india", iconUrl: "/assets/icons/education/SocialSciences.svg" },
    { title: "Engineering", link: "/colleges/top-engineering-colleges-in-india", iconUrl: "/assets/icons/education/Engineering.svg" },
    { title: "Science", link: "/colleges/top-science-colleges-in-india", iconUrl: "/assets/icons/education/Science.svg" },
    { title: "Medical", link: "/colleges/top-medical-colleges-in-india", iconUrl: "/assets/icons/education/HealthCare.svg" },
    { title: "Design", link: "/colleges/top-design-colleges-in-india", iconUrl: "/assets/icons/education/Technology.svg" },
    { title: "Arts & Humanities", link: "/colleges/top-arts-colleges-in-india", iconUrl: "/assets/icons/education/Business.svg" },
    { title: "Architecture", link: "/colleges/top-architecture-colleges-in-india", iconUrl: "/assets/icons/education/Economic.svg" },
    { title: "Pharmacy", link: "/colleges/top-pharmacy-in-india", iconUrl: "/assets/icons/education/Pharma.svg" },
    { title: "Law", link: "/colleges/top-law-colleges-in-india", iconUrl: "/assets/icons/education/Education.svg" },        
    { title: "Commerce", link: "/colleges/top-commerce-colleges-in-india", iconUrl: "/assets/icons/education/Comm.svg" },
    { title: "All", link: "/colleges/top-colleges-in-india", iconUrl: "/assets/icons/education/allIcon.svg" },    
  ];

  return (
    <div className={s['TopStreams']}>
      <ContainerBox>
        <TitleComponent
          title="Top Discipline"
          // link="/"
          margin="0px 0 20px 0"
          headingLevel="h2"
        />

        <SlickSlideWrapper
          arrows={false}
          dots= {isMobile ? true : true}
          slidesToShow={isMobile ? 2 : 5}
          infinite={false}
          changeBodyStyle={"TopStreamsBox"}
          marginBottom={0}
          rows={isMobile ? 3 : 2}
        >
          {streamLinks.map(({ title, link, iconUrl }) => (
            <a key={title} href={link}>
              <TopStreamsBox
                iconUrl={iconUrl}
                title={title}
              />
            </a>
          ))}
        </SlickSlideWrapper>

      </ContainerBox>
    </div>
  );
};

export default TopStreams;
