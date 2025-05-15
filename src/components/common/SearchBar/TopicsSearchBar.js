import React, { useState, useEffect } from "react";
import s from "./NewSearchBar.module.scss";
import { debounce } from "@/utils/common";
import InputTextBox from "../InputTextBox/InputTextBox";
import { loadSearchTopicData } from "@/utils/Search";
import TopicsSuggetionList from "./TopicsSuggetionList";

const TopicSearchBar = (props) => {
  const {
    searchedString,
    isSeachResult,
    history,
    toggleSearchBarFn,
    toggleHamBurgerFn,
    changeStyle,
    marginTop,
    marginBottom,
  } = props;

  const [searchStringFn, setSearchStringFn] = useState(() => {});
  const [searchedSuggestion, setSearchedSuggestion] = useState([]);
  const [isShowSearchBar, setIsShowSearchBar] = useState(
    isSeachResult ? true : false
  );
  const [loading, setLoading] = useState(false)

  let searchStringFromUrl = [];

  const getInputValue = () => {
    if (history?.location?.pathname?.includes("/search-result/")) {
      return searchStringFromUrl;
    } else {
      return searchedString;
    }
  };

  const [searchInputValue, setSearchInputValue] = useState(searchStringFromUrl);
  const [erroMsg, setErroMsg] = useState("");
  const [isTrendingVisible, setIsTrendingVisible] = useState(true);
  const [searchSuggestion, setsearchSuggestion] = useState(false);
  const [srchTrm, setsrchTrm] = useState("");
  const [inputValue, setInputValue] = useState(getInputValue());
  const wrapperRef = React.createRef();
  const MIN_CHAR_COUNT = 2;

  const handleClick = () => {
    toggleSearchBarFn(false);
    toggleHamBurgerFn(false);
  };

  useEffect(() => {
    setInputValue(searchedString);
    return () => {};
  }, [searchedString]);

  const handleSearchBtn = (val) => {
    if (val.length === 0) {
      setErroMsg(`Please enter something...`);
    }
    if (val.length >= 1) {
      //loadSearchDataFn(val, "", "desktop", "On Enter");
      // setSearchStringFn(inputValue);
      setIsShowSearchBar(true);
      if (!isSeachResult && document.querySelector("#search-close-btn")) {
        setsearchSuggestion(false);
        handleClearState();
        window.location.href = `/search-result/${val}`;
        document.querySelector("#search-close-btn").click();
      } else {
          window.location.href = `/search-result/${val}`;
      }
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setsearchSuggestion(true);
  };
  const handleClearState = (propDrillingFlag) => {
    // debugger
    if (propDrillingFlag !== "from-searchresult") {
      setInputValue("");
    }
    setInputValue("");

    setSearchInputValue("");
    setIsShowSearchBar(true);
    setsearchSuggestion(false);
    setsrchTrm("");
    setErroMsg("");
  };

  const onEnterSearchHandler = (e) => {
    if (e.keyCode === 13 && e.target.value.trim() != '') {
      window.location.href = `/search-result/${e.target.value.trim()}`;
    }
  };
  const webstorieslink = (item) => {
    return !item.seopath.includes("amp_stories/")
      ? item.cmstype != "IMAGES"
        ? item.msid
        : item.parentid
      : item.parentid;
  };

  const debouncedOnSearchInput = (e) => {
    return debounce(searchHandler(e), 300);
  };

  const searchHandler = (event) => {
    if (event.target.value) {
      setIsShowSearchBar(false);
    } else if (event.target.value.length >= 0) {
      setIsShowSearchBar(true);
    }
    props.isTrending(false);

    setSearchInputValue(event.target.value.trim());
    if (event.target.value.length >= 0) {
      setErroMsg("");
    }
    if (inputValue.length >= MIN_CHAR_COUNT) {
      loadSearchDataFn(event.target.value, "", "desktop", "On Type");
    }
  };

  const handleOnChangeEvent = (e) => {
    setLoading(true) 
    debouncedOnSearchInput(e);
    handleChange(e);
  };

  const loadSearchDataFn = async (searchTerm) => {
    const searchData = await loadSearchTopicData(searchTerm);
    setSearchedSuggestion(searchData);
    setLoading(false) 
  };
  return (
    <>
      <div
        className={`${s[changeStyle]}`}
        style={{
          marginTop: `${marginTop}px`,
          marginBottom: `${marginBottom}px`,
        }}
      >
        <div className={s["top-nav-search"]} style={{ position: "relative" }}>
          <div className={s["search-input"]}>
            <InputTextBox
              iconName={"blackSearchIcon"}
              inputType={"search"}
              autoComplete="off"
              value={inputValue}
              defaultValue={searchStringFromUrl}
              autoFocus={props?.isSeachResult}
              placeHolderText={`Search Conditions...`}
              onChangeEvent={handleOnChangeEvent}
              onKeyPressEvent={onEnterSearchHandler}
              changeStyle={changeStyle}
            />
          </div>

          <div className={`${s["tnn__outer_search"]}`}>
            <div
              className={`top-search ${
                !isShowSearchBar
                  ? s["search"]
                  : !props?.isSeachResult && inputValue.trim().length === 0
                  ? s["search"]
                  : ""
              }`}
              style={
                props?.isHamburgerVisible || props?.isSeachResult
                  ? { visibility: "visible" }
                  : { visibility: "hidden" }
              }
            >
              {inputValue.length === 0 && (
                <div
                  className={
                    !props.isSeachResult
                      ? s["error-message"]
                      : s["errormsg_searchresult"]
                  }
                >
                  {erroMsg && erroMsg}
                </div>
              )}

              {searchSuggestion && inputValue?.length >= MIN_CHAR_COUNT && (
                <div className={s["search-suggestion"]}>
                  <TopicsSuggetionList
                    searchSuggestion={searchSuggestion}
                    searchedSuggestion={searchedSuggestion}
                    handleClick={handleClick}
                    getMSID={props.getMSID}
                    inputValue={inputValue}
                    MIN_CHAR_COUNT={MIN_CHAR_COUNT}
                    loading={loading}
                  />

                  {inputValue?.length >= MIN_CHAR_COUNT && !loading ? (
                    <div className={s["show-all"]}>
                      <button
                        type="button"
                        className={`${s["search-show-all-desktop"]}`}
                        onClick={() => handleSearchBtn(inputValue)}
                        id={"show-all-btn"}
                      >
                       {`SHOW ALL RESULT `} 
                      </button>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TopicSearchBar;
