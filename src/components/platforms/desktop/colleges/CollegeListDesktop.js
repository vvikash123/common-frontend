import React, { useState, useEffect, useReducer } from "react";
import CollagesWidget from "@/components/common/CollagesWidget/CollagesWidget";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import FilterBox from "@/components/common/FilterBox/FilterBox";
import GridLayout from "@/components/common/GridLayout/GridLayout";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import GridRhs from "@/components/common/GridRhs/GridRhs";
import ListingTopSection from "@/components/common/ListingTopSection/ListingTopSection";
import Pagination from "@/components/common/Pagination/Pagination";
import SearchWidget from "@/components/common/SearchWidget/SearchWidget";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import { filterReducer, isState } from "@/utils/utils";
import makeRequest from "@/utils/makeRequest";
import style from "./CollegeListMobile.module.scss";
import { fetchStateCityData } from "@/pages/api";
import TopStreams from "@/components/common/TopStreams/TopStreams";
import { useRouter } from 'next/router';

// Modal Component for "No Data Found" message
const NoDataFoundModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className={style["modal"]}>
      <div className={style["modal-content"]}>
        <p>No Data Found</p>
        <p>It seems there are no colleges matching with your selected filters. Please try adjusting your filters or resetting them to explore more options.</p>
        <TopStreams />
        <button onClick={onClose}><SpriteIcon IconName="closeIcon" /></button>
      </div>
    </div>
  );
};

const CollegeListDesktop = ({
  colleges,
  filters,
  page,
  selectedFilters,
  limit,
  location,
  origin,
}) => {
  const initialState = {
    filters: selectedFilters,
    pagination: {
      list: page > 3 ? [page - 3, page - 2, page - 1, page] : [1, 2, 3, 4],
      activeTab: page,
    },
    filtersList: [],
    isFilterChange: true,
    location,
    filterData: filters,
  };

  const router = useRouter();
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const [collegeList, setCollegeList] = useState(colleges);
  const [showNoDataModal, setShowNoDataModal] = useState(false); // State for showing modal

  // Define canonicalElement here
  const [canonicalElement, setCanonicalElement] = useState(null);

  useEffect(() => {
    setCanonicalElement(document.querySelector('link[rel="canonical"]'));
  }, []);

  const toQueryString = (query) => {
    const params = new URLSearchParams();

    for (const key in query) {
      if (key === "discipline" || key === "state" || key === "city") continue; // Skip certain keys
      if (Array.isArray(query[key])) {
        query[key]?.forEach((val) => params.append(key, val)); // Handle arrays
      }
    }

    const queryString = params.toString();

    if (canonicalElement) {
      const currentUrl = new URL(window.location.href);
      currentUrl.search = queryString;
      canonicalElement.setAttribute('href', currentUrl.toString());
    }

    return queryString;
  };

  const fetchData = async (params, signal) => {
    delete params.top;
    try {
      const response = await makeRequest.fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/times-education/search`,
        params,
        signal
      );
      const fetchedData = response?.data?.response;

      if (fetchedData?.sections?.searchData?.length === 0) {
        setShowNoDataModal(true); // Show modal if no data is found
      } else {
        setCollegeList(fetchedData);
        setShowNoDataModal(false); // Hide modal if data is found
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchState = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/times-education/get-city-list`;
    try {
      const response = await makeRequest.fetch(url, {
        city: state.filters.city[0],
      });
      dispatch({
        type: "UPDATE_STATE",
        key: "state",
        value: response?.data?.response?.sections?.cities?.[0]?.value,
      });
    } catch (error) {
      console.error("Error fetching college list: ", error);
    }
  };

  useEffect(() => {
    if (state?.filters.city?.length || isState(state.location, state.filterData.state)) {
      fetchState();
    }
  }, []);

  const fetchCities = async () => {
    const responseData = await fetchStateCityData({
      state: state.filters.state[0],
    });

    const cities = responseData?.response?.sections?.cities || [];
    dispatch({ type: "UPDATE_CITIES", key: "city", value: cities });
  };

  useEffect(() => {
    if (state?.filters?.state?.length) {
      fetchCities();
    }
  }, [state?.location, state.filters.state]);

  useEffect(() => {
    const queryPath = toQueryString(state.filters);    
    // Normalize city names to prevent double hyphens
    let formattedLocation = state.location;
    // Check if location contains multiple hyphens (like in the case of "uttar-pradesh---other")
    if (formattedLocation && formattedLocation.includes('-')) {
      // Replace multiple consecutive hyphens with a single hyphen
      formattedLocation = formattedLocation.replace(/-+/g, '-');
    }
  
    if (state?.filters?.discipline?.length) {
      window.history.replaceState(
        null,
        null,
        `/colleges/top-${state?.filters?.discipline?.[0]?.toLowerCase()}-colleges-in-${formattedLocation}${queryPath?.length ? `?${queryPath}` : ""}`
      );
    } else if (formattedLocation && formattedLocation !== "india") {
      window.history.replaceState(
        null,
        null,
        `/colleges/top-colleges-in-${formattedLocation}${queryPath?.length ? `?${queryPath}` : ""}`
      );
    } else {
      window.history.replaceState(
        null,
        null,
        `/colleges${queryPath?.length ? `?${queryPath}` : ""}`
      );
    }
  
    const controller = new AbortController();
    if (state?.isFilterChange) {
      fetchData(
        {
          ...state.filters,
          pageType: "CollegeListing",
          page: state?.pagination?.activeTab || 1,
          limit: limit,
        },
        controller.signal
      );
    }
  
    return () => {
      if (state?.isFilterChange) {
        controller.abort();
      }
    };
  }, [state]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const handleShowMore = async () => {
    setLoading(true);
    const nextPage = currentPage + 1;
  
    try {
      const response = await makeRequest.fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/times-education/search`,
        {
          ...state.filters,
          pageType: "CollegeListing",
          page: nextPage,
          limit: limit,
        }
      );
      
      const newColleges = response?.data?.response?.sections?.searchData || [];
      
      if (newColleges.length > 0) {
        setCollegeList((prev) => ({
          ...prev,
          sections: {
            ...prev.sections,
            searchData: [...prev.sections.searchData, ...newColleges],
          },
        }));
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error("Error fetching more colleges:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      {/* Modal for "No Data Found" */}
      <NoDataFoundModal
        show={showNoDataModal}
        onClose={() => {
          setShowNoDataModal(false);
          router.push('/colleges').then(() => {
            window.location.reload(); // Refresh the page after redirection
          });
        }}
      />

      <ListingTopSection
        isMobile={false}
        dispatch={dispatch}
        state={state}
        articleData={collegeList?.sections?.articleData}
        canonicalElement={canonicalElement} // Pass canonicalElement here
      />
      <ContainerBox marginTop={30}>
        <GridLayout>
          <GridRhs className="grid-rhs2">
            <div className={style["stickyrow"]}>
              {state?.filters?.discipline?.length ? (
                <div className={`${style.rhshead}`}>
                  <p style={{ textTransform: "capitalize" }}>
                    {`${state?.filters?.discipline}`} Colleges
                  </p>
                  <span>
                    (Total {collegeList?.sections?.pagination?.count} Colleges)
                  </span>
                </div>
              ) : null}

              <div className={`${style.filters}`}>
                {state?.filtersList?.length ? (
                  <>
                    <div className={`${style.filtersTop}`}>
                      <strong>Filters By</strong>
                      <span
                        onClick={() =>
                          dispatch({
                            type: "CLEAR_FILTER",
                            value: null,
                            name: null,
                          })
                        }
                      >
                        <SpriteIcon IconName="CleaFilters" /> Clear Filters
                      </span>
                    </div>
                    <div className={`${style.filtersresutl}`}>
                      {state?.filtersList?.map((item) => (
                        <span key={item?.value}>
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
                          {item?.name}
                        </span>
                      ))}
                    </div>
                  </>
                ) : null}
                <FilterBox
                  title="Sort By"
                  checkboxOptions={state?.filterData?.sortBy}
                  margin="0 0 20px"
                  dispatch={dispatch}
                  state={state}
                />
              </div>
              <div className={`${style.filters}`}>
                <FilterBox
                  key="Discipline"
                  title="Discipline"
                  checkboxOptions={state?.filterData?.streams}
                  margin="0 0 20px"
                  dispatch={dispatch}
                  state={state}
                />
              </div>
              <div className={`${style.filters}`}>
                <FilterBox
                  title="Location/State"
                  checkboxOptions={state?.filterData?.state || []}
                  margin="0 0 20px"
                  dispatch={dispatch}
                  state={state}
                />
              </div>
              {state?.filterData?.city?.length ? (
                <div className={`${style.filters}`}>
                  <FilterBox
                    title="City"
                    checkboxOptions={state?.filterData.city}
                    margin="0 0 20px"
                    dispatch={dispatch}
                    state={state}
                    iscity={true}
                  />
                </div>
              ) : null}
              <div className={`${style.filters}`}>
                <FilterBox
                  key="College_Type"
                  title="College Type"
                  checkboxOptions={state?.filterData?.collegeType} 
                  margin="0 0 20px"
                  dispatch={dispatch}
                  state={state}
                />
              </div>
              <div className={`${style.filters}`}>
                <FilterBox
                  title="Program Type"
                  checkboxOptions={state?.filterData.programType}
                  margin="0 0 20px"
                  dispatch={dispatch}
                  state={state}
                  isRadio={false}
                />
              </div>

              <div className={`${style.filters}`}>
                <FilterBox
                  title="Study Level"
                  checkboxOptions={state?.filterData.courseLevel}
                  margin="0 0 20px"
                  dispatch={dispatch}
                  state={state}
                  isRadio={false}

                />
              </div>
              {/* <div className={`${style.filters}`}>
                <FilterBox
                  title="Course Duration"
                  checkboxOptions={state?.filterData.courseDuration}
                  margin="0 0 20px"
                  dispatch={dispatch}
                  state={state}
                  isRadio={false}

                />
              </div> */}
              <div className={`${style.filters}`}>
                <FilterBox
                  title="Course Fees (Annual)"
                  checkboxOptions={state?.filterData.totalFees}
                  margin="0 0 20px"
                  dispatch={dispatch}
                  state={state}
                  isRadio={false}
                />
              </div>
            </div>
          </GridRhs>

          <GridLhs>
            <SearchWidget margin="0px 0 20px" whiteBg={true} type="college" placeholder='Search Colleges & News' />
            {collegeList?.sections?.searchData?.map((item) => (
              <CollagesWidget
                className="grid-1"
                data={item}
                key={item?.collegeId}
                origin={origin}
              />
            ))}
         {collegeList?.sections?.pagination?.count > collegeList?.sections?.searchData?.length && (
  <div className={style.showMoreContainer}>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <button onClick={handleShowMore} className={style.showMoreButton}>
        Show More
      </button>
    )}
  </div>
)}
          </GridLhs>
        </GridLayout>
      </ContainerBox>
    </>
  );
};

export default CollegeListDesktop;
