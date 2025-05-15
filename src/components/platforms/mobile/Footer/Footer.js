import React, { useState } from "react";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import s from "./Footer.module.scss";
import StayTuned from "@/components/common/StayTuned/StayTuned";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import CommonGridBox from "@/components/common/CommonGridBox/CommonGridBox";
import Link from "next/link";
import Image from "next/image";
import { COPYRIGHT } from "@/constants";
import { getSlug, getTargetURL } from "@/utils/common";

const MobileFooter = (props) => {
  const LOGO_URL =
    process.env.NEXT_PUBLIC_WEBAPP_BASE_URL + "/assets/logo/logo.svg";
  const { footerData } = props;
  const data = footerData?.response?.[0];

  // State to track which section is open
  const [activeSection, setActiveSection] = useState(null);

  // Function to toggle the visibility of the FooterLinks
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <>
      <StayTuned />
      <footer style={{ minHeight: "384px" }}>
        <div className={s["footer"]}>
          <ContainerBox>
            {/* Footer Logo and Social Icons */}
            <div className={s["FooterLogo"]}>
              <i>
                <Image
                  src={LOGO_URL}
                  priority
                  alt="Logo"
                  width={150}
                  height={50}
                />
              </i>
              <ul className={s["socialIcon"]}>
              <li>
                  <a href="https://www.facebook.com/unilist.in/" target="_blank" rel="noopener noreferrer">
                    <SpriteIcon IconName="fb" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/unilist.in" target="_blank" rel="noopener noreferrer">
                    <SpriteIcon IconName="insta" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/UnilistIn" target="_blank" rel="noopener noreferrer">
                    <SpriteIcon IconName="twitter" />
                  </a>
                </li>
        
              </ul>
            </div>

            {/* Footer Sections */}
            {data?.data?.footerlinks?.map((footerlink, index) => (
              <div className={s["row"]} key={index}>
                <p
                  className={`${s["Heading"]} ${
                    activeSection === footerlink?.title ? s["active"] : ""
                  }`}
                  onClick={() => toggleSection(footerlink?.title)}
                >
                  {footerlink?.title}
                </p>
                <ul
                  className={`${s["FooterLinks"]} ${
                    activeSection === footerlink?.title ? s["open"] : ""
                  }`}
                >
                  {footerlink?.children?.map((child, childIndex) => {
                    if (!child?.seopath) return null; // Skip invalid items

                    const linkUrl =
                      child?.cmstype !== "SECTION"
                        ? getTargetURL({
                            ...(child?.overridelink && {
                              overrideString: child?.overridelink || "",
                            }),
                            normalString: `${child?.seopath}-${getSlug(
                              child?.cmstype
                            )}-${child?.msid}`,
                            storyType: child?.cmstype,
                            msid: child?.msid,
                            seoPath: child?.seopath,
                          })
                        : `/${child?.seopath}`;

                    return (
                      <li key={childIndex}>
                        <Link
                          href={linkUrl}
                          target={
                            child?.cmstype === "SECTION" ? "_self" : "_blank"
                          }
                          rel="noopener noreferrer"
                          className={s.icon_button}
                        >
                          {child?.title || "Untitled"}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </ContainerBox>

          {/* Sub Footer */}
          <div className={s["SubFooter"]}>
            <ContainerBox>
              <CommonGridBox
                gridType={"gridBox"}
                changeStyle={"grid-1"}
                yGap={4}
                xGap={1}
              >
                <ul>
                  {data?.data?.children?.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={`/info${link?.seopath || ""}`}
                        rel="noopener noreferrer"
                      >
                        {link?.title || "Untitled"}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p>{COPYRIGHT}</p>

              </CommonGridBox>
            </ContainerBox>
          </div>
        </div>
      </footer>
    </>
  );
};

export default MobileFooter;
