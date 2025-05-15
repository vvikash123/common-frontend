import CollagesWidget from "@/components/common/CollagesWidget/CollagesWidget";
import ContainerBox from "@/components/common/ContainerBox/ContainerBox";
import GridLayout from "@/components/common/GridLayout/GridLayout";
import GridLhs from "@/components/common/GridLhs/GridLhs";
import ListingTopSection from "@/components/common/ListingTopSection/ListingTopSection";
import SearchWidget from "@/components/common/SearchWidget/SearchWidget";
import makeRequest from "@/utils/makeRequest";
import { filterReducer, getFiltersData, isState } from "@/utils/utils";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";
import MobileFilter from "../MobileFilter/MobileFilter";
import MobileSortByFilter from "../MobileFilter/MobileSortByFilter";
import style from "./CollegeListMobile.module.scss";
import SpriteIcon from "@/components/common/Svg/SpriteIcon";
import { fetchStateCityData } from "@/pages/api";
import TopStreams from "@/components/common/TopStreams/TopStreams";

// Modal Component for "No Data Found" message
const NoDataFoundModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className={style["modal"]}>
      <div className={style["modal-content"]}>
        <p>No Data Found</p>
        <p>It seems there are no colleges matching with your selected filters. Please try adjusting your filters or resetting them to explore more options.</p>

      <TopStreams isMobile={true} />
       
        <button className={style["modal-button"]} onClick={onClose}><SpriteIcon IconName="closeIcon" /></button>
      </div>
    </div>
  );
};


const CollegeListMobile = ({
  colleges,
  filters,
  page,
  filterList,
  selectedFilters,
  limit,
  location,
}) => {
  const initialState = {
    filters: selectedFilters,
    pagination: {
      list: page > 2 ? [page - 2, page - 1, page] : [1, 2, 3],
      activeTab: page,
    },
    filtersList: [],
    isFilterChange: true,
    location,
    filterData: filters,
  };
  const router = useRouter();

  const [state, dispatch] = useReducer(filterReducer, initialState);
  const [showFilter, setShowFilter] = useState(false);
  const [sortByFilter, setSortByFilter] = useState(false);
  const [collegeList, setCollegeList] = useState(colleges);
  const [cityList, setCityList] = useState([]);
  const [showNoDataModal, setShowNoDataModal] = useState(false); // State for showing modal
  const [canonicalElement, setCanonicalElement] = useState(null);

  useEffect(() => {
    setCanonicalElement(document.querySelector('link[rel="canonical"]'));
  }, []);

  const toQueryString = (query) => {
    const params = new URLSearchParams();
  
    // Iterate over the query object and build the query string
    for (const key in query) {
      if (key === "discipline" || key === "state" || key === "city") continue; // Skip certain keys
      if (Array.isArray(query[key])) {
        query[key]?.forEach((val) => params.append(key, val)); // Handle arrays
      }
    }
  
    const queryString = params.toString();
  
    // Function to update canonical URL
    const updateCanonicalUrl = (selector) => {
      const canonicalElement = document.querySelector(selector);
      if (canonicalElement) {
        const currentUrl = new URL(window.location.href);
        
        // Remove any existing query parameters
        currentUrl.search = queryString;
  
        // Set the canonical URL with updated query params
        canonicalElement.setAttribute('href', currentUrl.toString());
      }
    };
  
    // Update canonical URL for desktop
    updateCanonicalUrl('link[rel="canonical"]');
  
    // Update canonical URL for mobile (if a separate canonical exists for mobile)
    updateCanonicalUrl('link[rel="alternate"][media="only screen and (max-width: 640px)"]');
  
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
    if (
      state?.filters.city?.length ||
      isState(state.location, state.filterData.state)
    ) {
      fetchState();
    }
  }, []);

  //fetch the city list on state change
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

  const fetchDataAndUpdateUrl = (signal) => {
    // Normalize location to prevent multiple consecutive hyphens
    let formattedLocation = state.location;
    
    // Always normalize the location to replace multiple hyphens with single ones
    if (formattedLocation) {
      // Replace multiple consecutive hyphens with a single hyphen
      formattedLocation = formattedLocation.replace(/-+/g, '-');
    }
  
    if (state?.filters?.discipline?.length) {
      const queryPath = toQueryString({
        ...state.filters,
        page: state?.pagination?.activeTab || 1,
      });
      window.history.replaceState(
        null,
        null,
        `/colleges/top-${state?.filters?.discipline?.[0]?.toLowerCase()}-colleges-in-${formattedLocation}${queryPath?.length ? `?${queryPath}` : ""}`
      );
      setShowFilter(false);
    } else if (formattedLocation && formattedLocation !== "india") {
      const queryPath = toQueryString(state.filters);
      window.history.replaceState(
        null,
        null,
        `/colleges/top-colleges-in-${formattedLocation}${
          queryPath?.length ? `?${queryPath}` : ""
        }`
      );
    } else {
      const queryPath = toQueryString(state.filters, true);
      window.history.replaceState(
        null,
        null,
        `/colleges${queryPath?.length ? `?${queryPath}` : ""}`
      );
    }
  
    fetchData({
      ...state.filters,
      pageType: "CollegeListing",
      page: state?.pagination?.activeTab || 1,
      limit,
      signal,
    });
  };
  useEffect(() => {
    const controller = new AbortController();
    fetchDataAndUpdateUrl(controller.signal);
    return () => controller.abort();
  }, [state.pagination.activeTab, state?.filters?.sorting?.[0], cityList]);

  useEffect(() => {
    dispatch({ type: "UPDATE_CITIES" });
  }, []);
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
          });// Redirect to /colleges
        }}
      />
      <ListingTopSection
        isMobile={true}
        articleData={collegeList?.sections?.articleData}
        state={state}
        dispatch={dispatch}
        setCityList={setCityList}
        canonicalElement={canonicalElement} // Pass canonicalElement here

      />

      <ContainerBox marginTop={10}>
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
        <GridLayout>
          <GridLhs>
            <SearchWidget margin="0px 0 20px" whiteBg={true} placeholder='Search Colleges & News' />
            <div className={`${style.SortBtn}`}>
              <button onClick={() => setSortByFilter(true)}>
                <SpriteIcon IconName="SortIcon" /> Sort
              </button>
              <button onClick={() => setShowFilter(true)}>
                <SpriteIcon IconName="FilterIcon2" /> Filter
              </button>
            </div>
            {sortByFilter && (
              <MobileSortByFilter
                state={state}
                filters={filters}
                dispatch={dispatch}
                fetchDataAndUpdateUrl={fetchDataAndUpdateUrl}
                setSortByFilter={setSortByFilter}
                isShowSortBy={true}
              />
            )}
            {showFilter && (
              <MobileFilter
                state={state}
                filters={filters}
                dispatch={dispatch}
                fetchDataAndUpdateUrl={fetchDataAndUpdateUrl}
                setShowFilter={setShowFilter}
              />
            )}
            {collegeList?.sections?.searchData?.map((item) => (
              <CollagesWidget
                className="marginBottom"
                data={item}
                key={item?.collegeId}
                isMobile = {true}
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

export default CollegeListMobile;

