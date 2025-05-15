import React from "react";
import style from "./SideBarNav.module.scss";
import NewSearchBar from "../SearchBar/NewSearchBar";
import { DetectClickOutside } from "../DetectClickOutside/DetectClickOutside";
import OutsideClickHandler from "../OutsideClickHandler/OutsideClickHandler";
import SidebarAccordion from "../SidebarAccordion/SidebarAccordion";

class SideBarNav extends React.Component {
  removeOverFlow = () => {
    const bodyElement = document.querySelector("body");
    bodyElement.removeAttribute("style");

    this.props.setIsOpen(false);
  };
  render() {
    const {
      onIncrement,
      headerData,
      getMSID,
      setSearchStringFn,
      setIsOpen,
      isOpen,
      isMobile,
    } = this.props;

    return (
      <>
        <div className={`${isOpen ? style["overlay"] : ""}`}></div>
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className={`${isOpen ? style["left-nav-open"] : style["left-nav"]}`}
          >
            <div className={`${style["left-nav_Top"]}`}>
              <i onClick={onIncrement} className={`${style["navClose"]}`}></i>
              {/* <div className={`${style["navsearch"]}`}>
                <NewSearchBar
                  name="hamburger-search"
                  id="hamburger-search"
                  isSearchOpen={true}
                  toggleSearchBarFn={() => {}}
                  toggleHamBurgerFn={() => {}}
                  isSeachResult={true}
                  searchBarPropDrillingFlag="from-header"
                  isHamburgerRender={true}
                  isHamburgerOpen={true}
                  isHamburgerVisible={true}
                  getMSID={getMSID}
                  searchedString=""
                  setSearchStringFn={setSearchStringFn}
                  isTrending={() => {}}
                  changeStyle={"search-hamburger"}
                  isMobile={isMobile}
                />
              </div> */}
            </div>
            <SidebarAccordion
              data={headerData || []}
              isConditionalRendering={headerData}
            />
          </div>
        </OutsideClickHandler>
      </>
    );
  }
}

export default SideBarNav;
