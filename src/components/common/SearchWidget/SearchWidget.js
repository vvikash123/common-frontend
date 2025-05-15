import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import SpriteIcon from "../Svg/SpriteIcon";
import s from "./SearchWidget.module.scss";
import { fetchSearchCollageData } from "@/pages/api";
import NextImage from "@/utils/NextImage";
import { getNewImageUrl } from "@/utils/common";

const SearchWidget = ({
  margin,
  whiteBg,
  headerSearch,
  button = true,
  placeholder,
  type = "all",
}) => {
  const [searchText, setSearchText] = useState("");
  const [sections, setSections] = useState({});
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNoResult, setShowNoResult] = useState(false);
  const [error, setError] = useState(""); // State to handle error messages
  const widgetRef = useRef(null);

  // Debounce search text to avoid rapid API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 800); // 1 second debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedSearchText) {
        setSections({});
        setShowNoResult(false);
        return;
      }

      setLoading(true); // Start loading when the search text changes and is debounced
      try {
        const formattedSearchText = debouncedSearchText.replace(/\s+/g, "%20"); // Replace spaces with %20
        const response = await fetchSearchCollageData(
          "desktop",
          formattedSearchText,
          1,
          10,
          type
        );

        const fetchedSections = response?.sections || {};
        setSections(fetchedSections);
        setShowNoResult(Object.keys(fetchedSections).length === 0);
      } catch (error) {
        console.error("Error fetching suggestions", error);
        setError("An error occurred while fetching data."); // Set a user-friendly error message
        setSections({});
        setShowNoResult(true);
      } finally {
        setLoading(false); // Stop loading after the request finishes
      }
    };

    fetchSuggestions();
  }, [debouncedSearchText, type]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchClick = async () => {
    if (!searchText.trim()) {
      setError("Please enter a valid search query.");
      setShowNoResult(true); // Show "No Result Found" when the input is empty
      setSections({}); // Ensure no sections are displayed
      setShowSuggestions(true);
      return;
    }

    setError("");
    setShowSuggestions(true);
    setLoading(true); // Set loading to true when the search starts

    try {
      const formattedSearchText = searchText.replace(/\s+/g, "%20"); // Replace spaces with %20
      const response = await fetchSearchCollageData(
        "desktop",
        formattedSearchText,
        1,
        10,
        type
      );

      const fetchedSections = response?.sections || {};
      setSections(fetchedSections);
      setShowNoResult(Object.keys(fetchedSections).length === 0);
    } catch (error) {
      console.error("Error fetching suggestions", error);
      setError("An error occurred while fetching data.");
      setSections({});
      setShowNoResult(true);
    } finally {
      setLoading(false); // Stop loading after the request finishes
    }
  };

  const combinedList = Object.values(sections).flat();

  return (
    <div
      className={classNames(s["SearchWidget"], {
        [s["whiteBgClass"]]: whiteBg,
        [s["headerSearch"]]: headerSearch,
        ...(type === "location" && { [s["locationType"]]: true }),
      })}
      style={{ margin }}
      ref={widgetRef}
    >
      <input
        type="text"
        placeholder={placeholder ?? "Search Colleges, Exams, Courses & More"}
        className={s["search-input"]}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setError(""); // Clear the error when typing
          setShowSuggestions(true);
        }}
      />

      {button && (
        <a onClick={handleSearchClick} className={s["search-button"]}>
          <SpriteIcon IconName="search" /> Search
        </a>
      )}

      {showSuggestions && (
        <div className={s["AutoSearch"]}>
          {loading ? (
            <p>Loading...</p>
          ) : combinedList.length > 0 ? (
            <ul className={s["categoriesList"]}>
              {combinedList.map((item) => (
                <li key={item._id}>
                  <a href={item.seoPath}>
                    <i>
                      <NextImage
                        src={getNewImageUrl({
                          msid: item.msid,
                          imgWidth: 30,
                          imgHeight: 25,
                          imgSize: item?.thumbSize ? item?.thumbSize : "",
                          isArticleBanner: true,
                        })}
                        alt={item?.title}
                        width={30}
                        height={25}
                        layout={"fixed"}
                      />
                    </i>
                    <p>{item.name || item.title}</p>
                    <code>{item.type}</code>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className={s["no-results"]}>{error || "No Result Found"}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWidget;
