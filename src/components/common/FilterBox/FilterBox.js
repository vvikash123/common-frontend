import React, { useState } from "react";
import style from "./FilterBox.module.scss";
import Checkbox from "../CheckBox/CheckBox";
import RadioButton from "../Radiobutton/RadioButton";

const FilterBox = ({
  title,
  checkboxOptions = [],
  radioOptions = [],
  margin,
  dispatch,
  state,
  showTitle = true,
  iscity = false,
  isRadio=true,
}) => {
  // State to control how many city options are visible
  const [visibleCities, setVisibleCities] = useState(6);

  const handleFilter = (key, item) => {
    const value = item?.value?.toLowerCase();
    
    // For "ownership", ensure only one selection
    if (key === "ownership") {
      dispatch({ 
        type: "SET_SINGLE_FILTER", 
        key, 
        value: item 
      });
      return;
    }
    
    if (
      key === "state" ||
      key === "city" ||
      key === "sortBy" ||
      key === "discipline" || 
      key === "sorting" || 
      key === "collegeType"
    ) {
      dispatch({ type: "LOCATION", key, value: item });
      return;
    }
    
    // Rest of your existing code
    if (state?.filters?.[key]?.includes(value)) {
      if (key !== "discipline") {
        dispatch({
          type: "REMOVE_FILTER",
          key,
          value: item,
        });
      }
    } else {
      dispatch({
        type: "ADD_FILTER",
        key,
        value: item,
      });
    }
  };

  // Handler for showing more cities
  const showMoreCities = () => {
    setVisibleCities((prev) => prev + 12); // Show 6 more cities on each click
  };

  return (
    <div className={style["FilterBox"]} style={{ margin }}>
      {showTitle ? <p>{title}</p> : null}
      <div>
        {/* Display only 6 cities initially if iscity is true */}
        {checkboxOptions
          .slice(0, iscity ? visibleCities : checkboxOptions.length)
          .map((option, index) => (
            <Checkbox
              key={option.value}
              label={option.name}
              checked={
                state?.filters?.[option.key]?.some(
                  (filterValue) => filterValue?.toLowerCase() === option?.value?.toLowerCase()
                )
              }
              onChange={() => handleFilter(option.key, option)}
              isRadio={isRadio}
            />
          ))}

        {/* Show "Show More" button only if there are more cities to show */}
        {iscity && visibleCities < checkboxOptions.length && (
          <button onClick={showMoreCities} className={style["show-more"]}>
            Show More
          </button>
        )}
      </div>

      {radioOptions.length > 0 && (
        <div>
          {radioOptions.map((option, index) => (
            <RadioButton
              key={index}
              label={option.name}
              checked={state[option.key]?.includes(option?.value)}
              onChange={() => handleFilter(option.key, option)}
              name="filter-radio"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBox;
