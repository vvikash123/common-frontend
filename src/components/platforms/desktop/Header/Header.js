import { isHealthFirstPhase } from "@/utils/common";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import Button from "@/components/common/Button/Button";
import SiteNavigationElement from "@/helpers/seo/schemas/SiteNavigationElement";
import s from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import SearchWidget from "@/components/common/SearchWidget/SearchWidget";
import { useState } from "react";

const DesktopHeader = ({ headerData }) => {
  const [isBrochureActive, setIsBrochureActive] = useState(false);

  const navMenu = headerData?.response?.data || [];
  const LOGO_URL = "/assets/logo/logo.svg";

  const handleLoginClick = () => {
    // Replace with actual login logic
    console.log("Login button clicked!");
  };

  const toggleBrochure = () => {
    setIsBrochureActive(!isBrochureActive);
  };

  return (
    <>
      <header className={s["header"]} id="navbar">
        <SiteNavigationElement data={navMenu} category="home" />

        <ContainerBox>
          <div className={s["headerRow"]}>
            <div className={s["logo"]}>
              <a href="/">
                <Image
                  src={LOGO_URL}
                  priority
                  alt="Logo"
                  width={150}
                  height={100}
                />
              </a>
            </div>
            <div className={s["headerRight"]}>
              <nav>
                <ul>
                  {navMenu.map((item, index) => (
                    <li key={item.id || index}>
                      <a href={`/${item.seopath}`}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className={s["HeaderSearch"]}>
                <SearchWidget
                  margin="0"
                  whiteBg={true}
                  button={false}
                  headerSearch={true}
                  placeholder={"Search"}
                />
              </div>
              {/* <button className={s["loginBtn"]} onClick={toggleBrochure}>
                Enquire?
                <SpriteIcon IconName="EnquireWhite" />
              </button> */}
            </div>
          </div>
        </ContainerBox>
      </header>
    </>
  );
};

export default DesktopHeader;
