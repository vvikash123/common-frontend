import { filterKeyMap, filterMap, statesData } from "@/constants";
import { fetchStateCityData } from "@/pages/api";

export const filterReducer = (state, action) => {
  const { type, key, value } = action;
  switch (type) {
    case "STREAM":
    case "RADIO_BUTTON":
    case "LOCATION": {
      const filterData = { ...state };
      if (filterData?.filters[key]) {
        filterData.filters[key][0] = value?.value?.toLowerCase();
      } else {
        filterData.filters[key] = [value?.value?.toLowerCase()];
      }
      filterData.pagination.activeTab = 1;
      filterData.pagination.list = [1, 2, 3, 4];
      filterData.isFilterChange = true;
      if (key === "city" || key === "state") {
        filterData.location = value?.value?.toLowerCase();
        if (key === "state" && filterData?.filters[key]?.length) {
          delete filterData.filters.city;
        }
      }
      let updatedFiltersList = filterData.filtersList.filter(
        (item) => item && item.key !== key
      );
      if (key === "state") {
        updatedFiltersList = updatedFiltersList.filter(
          (item) => item.key !== "city"
        );
      }
      updatedFiltersList.push(value);
      filterData.filtersList = updatedFiltersList;
      return filterData;
    }
    case "ADD_FILTER": {
      const filterData = { ...state };
      if (filterData?.filters[key]?.length) {
        filterData.filters[key].push(value?.value?.toLowerCase());
      } else {
        filterData.filters[key] = [value?.value?.toLowerCase()];
      }
      filterData.pagination.activeTab = 1;
      filterData.pagination.list = [1, 2, 3, 4];
      filterData.filtersList.push(value);
      filterData.isFilterChange = true;
      return filterData;
    }
    case "REMOVE_FILTER": {
      const filterData = { ...state };
      const updatedValue = filterData?.filters[key].filter(
        (item) => item != value?.value?.toLowerCase()
      );
      filterData.filters[key] = updatedValue;
      filterData.pagination.activeTab = 1;
      filterData.pagination.list = [1, 2, 3, 4];

      let updatedFiltersList = filterData.filtersList.filter(
        (item) =>
          item && item?.value?.toLowerCase() !== value?.value?.toLowerCase()
      );
      if (key === "state") {
        updatedFiltersList = updatedFiltersList.filter(
          (item) => item.key !== "city"
        );
      }
      if (key === "state") {
        delete filterData.filterData.city;
        delete filterData.filters.city;
      }
      filterData.filtersList = updatedFiltersList;
      filterData.isFilterChange = true;
      if (filterData?.filters?.city?.length) {
        filterData.location = filterData.filters.city[0];
      } else if (filterData?.filters?.state?.length) {
        filterData.location = filterData.filters.state[0];
      } else {
        filterData.location = "india";
      }
      return filterData;
    }
    case "UPDATE_STATE": {
      const filterData = { ...state };
      filterData.filters.state = [value?.toLowerCase()];
      return filterData;
    }
    case "UPDATE_PAGINATION": {
      const filterData = { ...state };
      filterData.pagination.list = value;
      filterData.isFilterChange = false;
      return filterData;
    }
    case "UPDATE_PAGE": {
      const filterData = { ...state };
      filterData.pagination.activeTab = value;
      filterData.isFilterChange = true;
      return filterData;
    }
    case "CLEAR_FILTER": {
      return {
        filters: {},
        pagination: { list: [1, 2, 3, 4], activeTab: 1 },
        filtersList: [],
        isFilterChange: true,
        filterData: state.filterData,
      };
    }

    case "UPDATE_FILTERS": {
      const filterData = { ...state };
      filterData[key] = value;
      return filterData;
    }
    case "UPDATE_CITIES": {
      const filterData = { ...state };
      if (key) {
        filterData.filterData[key] = value;
      }
      const newFilterlist = [];
      for (const key in state?.filters) {
        for (const value of state?.filters[key]) {
          const filterValue = filterData?.filterData[filterKeyMap[key]]?.find(
            (item) => item?.value?.toLowerCase() === value?.toLowerCase()
          );
          if (filterValue) {
            newFilterlist.push(filterValue);
          }
        }
      }
      filterData.filtersList = newFilterlist;
      return filterData;
    }

    case "UPDATE_LOCATION": {
      const filterData = { ...state };
      filterData.filters.state = [];
      filterData.filters.city = [value?.value?.toLowerCase()];
      const updatedFiltersList = filterData.filtersList.filter((item) =>
        item && (item.key === "state" || item.key === "city") ? false : true
      );
      updatedFiltersList.push(value);
      filterData.filtersList = updatedFiltersList;
      filterData.location = value?.value?.toLowerCase();
      return filterData;
    }
    case "SET_SINGLE_FILTER":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.key]: [action.value.value.toLowerCase()]
        },
        filtersList: [
          ...state.filtersList.filter(item => item.key !== action.key),
          { key: action.key, value: action.value.value.toLowerCase(), name: action.value.name }
        ],
        isFilterChange: true
      };
    default:
      return { ...state };
  }
};

export const getFiltersData = (pathname, query, states) => {
  const pathArray = pathname
    ?.split("/")?.[2]
    ?.split("top-")?.[1]
    ?.split("-in-");
  let discipline = null,
    location = null;
  if (pathArray && pathArray.length > 1) {
    discipline = pathArray[0];
    location = pathArray[1];
  }
  if (discipline && discipline === "colleges") {
    discipline = null;
  } else {
    discipline = discipline?.split("-")[0];
  }
  const initialState = {};
  if (discipline) {
    initialState.discipline = [discipline];
  }
  if (location && location !== "india") {
    if (isState(location, states)) {
      initialState.state = [location];
    } else {
      initialState.city = [location];
    }
  }

  for (const key in query) {
    if (Array.isArray(query[key])) {
      initialState[key] = query[key];
    } else {
      initialState[key] = [query[key]];
    }
  }
  if (pathname === "/colleges") {
    initialState.sorting = ["establishYear"];
  }
  return initialState;
};

export const getFilterList = (query) => {
  const list = [];
  for (const key in query) {
    if (key === "city" || key === "state") continue;
    if (Array.isArray(query[key])) {
      query[key].forEach((item) => {
        list.push(filterMap[item]);
      });
    } else list.push(filterMap[query[key]]);
  }
  return list;
};

export const isState = (location, states) => {
  return states.some((item) => item.value === location);
};
