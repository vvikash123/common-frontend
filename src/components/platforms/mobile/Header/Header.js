import { useState, useRef, useEffect } from "react";
import { isHealthFirstPhase } from "@/utils/common"; // Ensure this is used or remove it
import { HamburgerButton } from "./HamburgerButton/HamburgerButton";
import s from "./Header.module.scss";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import Image from "next/image";
import SiteNavigationElement from "@/helpers/seo/schemas/SiteNavigationElement";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import SearchWidget from "@/components/common/SearchWidget/SearchWidget";
import DownloadCollegeBrochure from "@/components/common/DownloadCollegeBrochure/DownloadCollegeBrochure";

const MobileHeader = ({ headerData, isMobile }) => {
  const [isBrochureActive, setIsBrochureActive] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navMenu = headerData?.response?.data || [];
  const LOGO_URL = "/assets/logo/logo.svg";
  const searchRef = useRef(null);

  // Toggle SearchWidget visibility
  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  // Handle click outside SearchWidget to close it
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearch(false);
    }
  };

  // Manage event listeners for detecting clicks outside SearchWidget
  useEffect(() => {
    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch]);

  // Toggle the brochure modal visibility
  const toggleBrochure = () => {
    setIsBrochureActive((prev) => !prev);
  };

  return (
    
    <>
      <header className={s.header} id="navbar">
        <SiteNavigationElement data={navMenu} category="home" />
        <div className={s["nav-con"]}>
          <div className={s["border-1"]}>
            <ContainerBox>
              <div className={`${s["d-flex"]} ${s["top-bar"]}`}>
                {/* Logo and Hamburger */}
                <div className={s["logo-bar"]}>
                  <HamburgerButton headerData={navMenu} isMobile={isMobile} />
                  <a href="/">
                    <Image
                      src={LOGO_URL}
                      priority
                      alt="Logo"
                      width={100}
                      height={50}
                    />
                  </a>
                </div>

                {/* Icons */}
                <div className={s["signup-Icons"]}>
                  {/* Conditionally render SearchWidget */}
                  {showSearch && (
                    <div ref={searchRef}>
                      <SearchWidget
                        margin="0"
                        whiteBg
                        button={false}
                        placeholder="Search"
                        headerSearch
                      />
                    </div>
                  )}

                  {/* Search Icon */}
                  <i onClick={toggleSearch}>
                    <SpriteIcon IconName="search" />
                  </i>

                  {/* User Icon */}
                  {/* <i onClick={toggleBrochure}>
                    <SpriteIcon IconName="userIcon" />
                  </i> */}
                </div>
              </div>
            </ContainerBox>
          </div>
        </div>
      </header>

      {/* Brochure Modal */}
      {/* <DownloadCollegeBrochure
        isactive={isBrochureActive}
        toggleBrochure={toggleBrochure}
      /> */}
    </>
  );
};

export default MobileHeader;
