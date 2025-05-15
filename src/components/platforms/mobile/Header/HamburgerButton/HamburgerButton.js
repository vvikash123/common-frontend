import React, { useState } from "react";
import s from "../Header.module.scss";
import SideBarNav from "@/components/common/SideBarNav/SideBarNav";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import OutsideClickHandler from "@/components/common/OutsideClickHandler/OutsideClickHandler";

export const HamburgerButton = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDiv = async () => {
    setIsOpen(!isOpen);
  };

  const onOutsideClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={`${s["menu-button"]}`}
        id={"open_burger_icon"}
        on="tap:ampHamburger.toggle"
        onClick={() => {
          toggleDiv();
        }}
        type="button"
        aria-label="Hamburger Button"
      >
        <SpriteIcon IconName="menuIcon" />
      </button>
      <SideBarNav
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSearchStringFn={() => {}}
        getMSID={"12234"}
        headerData={props?.headerData}
        onIncrement={toggleDiv}
        isMobile={props?.isMobile}
      />
    </>
  );
};
