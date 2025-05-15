import React from "react";
import s from "./NavInfo.module.scss";
import ContainerBox from "../ContainerBox/ContainerBox";
import SlickSlideWrapper from "../SlickSlideWrapper/SlickSlideWrapper";

const NavInfo = ({ collegeNameSlug, category, isMobile }) => {
  const navLinkArray = [
    { label: `College Info`, slug: `` },
    { label: `Courses & Fee`, slug: `courses` },
    { label: `Admissions`, slug: `admissions` },
   // { label: `Fees`, slug: `fees` },
   /* { label: `Reviews`, slug: `reviews` },
    { label: `Cut-Offs`, slug: `cut-offs` },
    { label: `Rankings`, slug: `rankings` },
    { label: `Hostel & Campus`, slug: `infrastructure` },
    { label: `Faculty`, slug: `faculty` },
    { label: `Compare`, slug: `compare` },
    { label: `News`, slug: `news` },
    */
  ];
  return (
    <div className={s["NavInfo"]}>
      <ContainerBox marginBottom={0}>
        {isMobile ? (
          <div className={s["NavInfoMSite"]}>
            {navLinkArray.map((nav, index) => (
              <a
                key={`nav-${index}`}
                className={`${s["NavClick"]} ${
                  category === nav.slug ? s["active"] : ""
                }`}
                href={`/college/${collegeNameSlug}/${nav.slug}`}
              >
                {nav.label}
              </a>
            ))}
          </div>
        ) : (
          <SlickSlideWrapper
            arrows={false}
            dots={false}
            slidesToShow={9}
            isVarWidth={false}
            // autoplay={true}
            // centerMode={true}
            // centerPadding={deviceType === 'mobile' ? 30 : 20}
            infinite={false}
            // changeBodyStyle={"TopStreamsBox"}
            marginBottom={0}
          >
            {navLinkArray.map((nav, index) => (
              <a
                key={`nav-${index}`}
                className={`${s["NavClick"]} ${
                  category === nav.slug ? s["active"] : ""
                }`}
                href={`/college/${collegeNameSlug}/${nav.slug}`}
              >
                {nav.label}
              </a>
            ))}
          </SlickSlideWrapper>
        )}
      </ContainerBox>
    </div>
  );
};

export default NavInfo;
