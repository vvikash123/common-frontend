import Button from "@/components/common/Button/Button";
import FilterBox from "@/components/common/FilterBox/FilterBox";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import { useState } from "react";
import s from "./MobileFilter.module.scss";

const MobileFilter = ({
  className,
  state,
  filters,
  dispatch,
  fetchDataAndUpdateUrl,
  setShowFilter,
}) => {
  const [data, setData] = useState({
    data: state?.filterData?.streams,
    key: "Discipline",
  });

  const handleApply = () => {
    fetchDataAndUpdateUrl();
    setShowFilter(false);
  };

  return (
    <div className={s["MobileFilter"]}>
      <div className={s["MobileFilterRow"]}>
        {state?.filtersList?.length ? (
          <>
            <div className={s["MobileFilterTop"]}>
              <p>Filters By</p>
              <span
                onClick={() =>
                  dispatch({
                    type: "CLEAR_FILTER",
                    value: null,
                    name: null,
                  })
                }
              >
                <SpriteIcon IconName="MCleaFilters" />
                Clear Filters
              </span>
              <button onClick={() => setShowFilter(false)}>
                <SpriteIcon IconName="closeIcon" />
              </button>
            </div>
            <div className={s["FilterResult"]}>
              {state?.filtersList?.map((item) => (
                <span key={item.value}>
                  <i
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FILTER",
                        key: item.key,
                        value: item,
                      })
                    }
                  >
                    <SpriteIcon IconName="closeIcon" />
                  </i>
                  {item.name}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className={s["MobileFilterTop"]}>
            <button onClick={() => setShowFilter(false)}>
              <SpriteIcon IconName="closeIcon" />
            </button>
          </div>
        )}
        <div className={s["FilterRow"]}>
          <div className={s["FilterLeft"]}>
            <span
              className={data.key === "Discipline" ? s.Active : ""}
              onClick={() =>
                setData({ data: state?.filterData?.streams, key: "Discipline" })
              }
            >
              Discipline
            </span>

            <span
              className={data.key === "Location/State" ? s.Active : ""}
              onClick={() =>
                setData({
                  data: state?.filterData?.state,
                  key: "Location/State",
                })
              }
            >
              State
            </span>
            {state?.filterData?.city?.length ? (
              <span
                className={data.key === "City" ? s.Active : ""}
                onClick={() =>
                  setData({ data: state?.filterData?.city, key: "City" })
                }
              >
                City
              </span>
            ) : null}
            <span
              className={data.key === "College Type" ? s.Active : ""}
              onClick={() =>
                setData({
                  data: state?.filterData?.collegeType,
                  key: "College Type",
                })
              }
            >
              College Type
            </span>
            <span
              className={data.key === "Program Type" ? s.Active : ""}
              onClick={() =>
                setData({
                  data: state?.filterData?.programType,
                  key: "Program Type",
                })
              }
            >
              Program Type
            </span>
            <span
              className={data.key === "Course Type" ? s.Active : ""}
              onClick={() =>
                setData({
                  data: state?.filterData?.courseLevel,
                  key: "Course Type",
                })
              }
            >
             Study Level
            </span>

            {/* <span
              className={data.key === "Course Duration" ? s.Active : ""}
              onClick={() =>
                setData({
                  data: state?.filterData?.courseDuration,
                  key: "Course Duration",
                })
              }
            >
              Course Duration
            </span> */}

            <span
              className={data.key === "Total Fees (Annually)" ? s.Active : ""}
              onClick={() =>
                setData({
                  data: state?.filterData?.totalFees,
                  key: "Total Fees (Annually)",
                })
              }
            >
              Course Fees (Annual)
            </span>
          </div>
          <div className={s["FilterRight"]}>
            <div className={`${s["ResultRow"]} ${s["Show"]}`}>
              {/* <div className={s["Search"]}>
                <input type="text" placeholder="Search Location" />
              </div> */}
              <FilterBox
                title={data.key}
                checkboxOptions={data.data}
                margin="0 0 20px"
                dispatch={dispatch}
                state={state}
              />
            </div>
          </div>
        </div>
        <div>
          <Button onClick={handleApply} buttonText="Apply Filters" />
          {/* <Button onClick={handleApply}></button> */}
        </div>
      </div>
    </div>
  );
};

export default MobileFilter;
