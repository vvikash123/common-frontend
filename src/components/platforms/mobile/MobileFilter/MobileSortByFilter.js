import FilterBox from "@/components/common/FilterBox/FilterBox";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import s from "./MobileFilter.module.scss";

const MobileSortByFilter = ({
  className,
  state,
  filters,
  dispatch,
  fetchDataAndUpdateUrl,
  setSortByFilter,
}) => {
  return (
    <div className={s["MobileFilter"]}>
      <div className={s["MobileFilterRow"]}>
        <div className={s["MobileFilterTop"]}>
          <p>Sort By</p>
          <span>
            <SpriteIcon IconName="MCleaFilters" />
            Clear Filters
          </span>
          <button onClick={() => setSortByFilter(false)}>
            <SpriteIcon IconName="closeIcon" />
          </button>
        </div>
        <div className={s["FilterRow"]}>
          <div className={s["FilterRight"]}>
            <FilterBox
              title={"sortBy"}
              checkboxOptions={filters.sortBy}
              margin="0 0 20px"
              dispatch={dispatch}
              state={state}
              showTitle={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSortByFilter;
