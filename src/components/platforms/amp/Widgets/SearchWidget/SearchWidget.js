import React, { useState, useEffect } from "react";
import classNames from "classnames";

import s from "./SearchWidget.module.scss";
import { fetchSearchCollageData } from "@/pages/api";
import SpriteIcon from "../Svg/SpriteIcon";

const SearchWidget = ({ margin, whiteBg, headerSearch, button = true, placeholder, type='all' }) => {
  const [searchText, setSearchText] = useState("");
  const [sections, setSections] = useState({});
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  // Debounce search text to avoid rapid API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchText]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedSearchText) {
        setSections({});
        return;
      }

      try {
        const response = await fetchSearchCollageData(
          "desktop",
          debouncedSearchText,
          1,
          10,
          type
        );

        const fetchedSections = response?.sections || {};
        setSections(fetchedSections);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchText]);

  // Combine all data dynamically from sections
  const combinedList = Object.values(sections).flat();

  return (
    <div
    className={classNames(
      s["SearchWidget"],
      {
        [s["whiteBgClass"]]: whiteBg,
        [s["headerSearch"]]: headerSearch,
        ...(type === 'location' && { [s["locationType"]]: true }),
      }
    )}
    
      style={{ margin }}
    >
      <input
        type="text"
        placeholder={placeholder ?? "Search Colleges, Exams, Courses & More"}
        className={s["search-input"]}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {button && (
        <button className={s["search-button"]}>
          <SpriteIcon IconName="search" /> Search
        </button>
      )}
      {combinedList.length > 0 && (
        <div className={s["AutoSearch"]}>
          {/* Display combined list */}
          <ul className={s["categoriesList"]}>
            {combinedList.map((item) => (
              <li key={item._id}>
                <a href={item.seoPath}>
                  <img
                    src="https://via.placeholder.com/150" // Placeholder for the image
                    alt={item.name || item.title}
                  />
                  <p>{item.name || item.title}</p>
                  <span>{item.type}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchWidget;
