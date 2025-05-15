import React from "react";
import style from "./SearchBar.module.scss";
import Typography from "../Typography/Typography";
import TitleComponent from "../TitleComponent/TitleComponent";
import CustomSlideBox from "../CustomSlideBox/CustomSlideBox";
import TrendingTags from "../TrendingTags/TrendingTags";
import history from "@/utils/history";
import NewSearchBar from "./NewSearchBar";
import { generateUrlPath } from "@/utils/common";

const SearchBar = (props) => {
  const {
    trendingTags,
    marginTop,
    marginBottom,
    getMSID,
    isMobile,
  } = props;

  return (
    <div
      className={`${style["search-box"]}`}
      style={{ marginTop: `${marginTop}px`, marginBottom: `${marginBottom}px` }}
    >
      <Typography
        elementType={"p"}
        textValue={"EXPLORE Unilist"}
        changeStyle={"search-widget"}
        marginBottom={isMobile ? 15 : 20}
      />
      <TitleComponent
        titleType={"p"}
        boldText={["answers", "in", "one", "place!"]}
        titleText={"Get all your health related answers in one place!"}
        marginBottom={isMobile ? 30 : 40}
        changeStyle={"search-widget"}
      />
      <NewSearchBar
        name="lead-widget-search"
        id="lead-widget-search"
        history={history}
        toggleSearchBarFn={() => {}}
        toggleHamBurgerFn={() => {}}
        isSeachResult={true}
        searchBarPropDrillingFlag="from-header"
        isHamburgerRender={true}
        isHamburgerOpen={true}
        isHamburgerVisible={true}
        getMSID={getMSID}
        searchedString=""
        isTrending={() => {}}
        changeStyle={""}
        marginTop={0}
        marginBottom={isMobile ? 30 : 34}
        isMobile={isMobile}
      />

      <Typography
        elementType={"p"}
        textValue={"TRENDING SEARCHES"}
        smallTextIcon={"greenStockArrow"}
        changeStyle={"search-trending"}
        marginBottom={15}
      />
      <CustomSlideBox marginBottom={0}>
        {trendingTags.map((data, idx) => (
          <TrendingTags
            key={idx}
            isConditionalRendering={true}
            type={"strongText"}
            textValue={data?.title}
            seopath={generateUrlPath(data) || ""}
            changeStyle={"search-widget"}
            wrapper={"anchor"}
          />
        ))}
      </CustomSlideBox>
    </div>
  );
};

export default SearchBar;
