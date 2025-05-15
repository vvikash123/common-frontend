import React, { useState, useEffect } from "react";
import s from "./TopCollages.module.scss";
import CollagesWidget from "../CollagesWidget/CollagesWidget";
import CustomSlideBox from "../CustomSlideBox/CustomSlideBox";
import ContainerBox from "../ContainerBox/ContainerBox";
import TitleComponent from "../TitleComponent/TitleComponent";
import { fetchSearchResultData } from "@/pages/api";
import Button from "../Button/Button";

const TopCollages = (props) => {
  const { isMobile, componentData , origin } = props;

  const [selectedCategory, setSelectedCategory] = useState(
    componentData?.data?.tabs?.[0]?.id || "" // Default to the first category
  );
  const [collageData, setCollageData] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  // Extract categories from componentData
  const categories = componentData?.data?.tabs || [];

  // Fetch data based on the selected category
  const fetchSearch = async () => {
    setLoading(true); // Set loading to true before API call
    try {
      const response = await fetchSearchResultData(
        "desktop",
        selectedCategory, // Pass the selected category ID to the API
        1,
        10
      );

      const fetchedData = response?.sections?.top10 || [];
      setCollageData(fetchedData);
      setPagination(response?.sections?.pagination || []);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchSearch();
    }
  }, [selectedCategory]);

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className={s["TopCollages"]}>
      <ContainerBox>
        {/* Title Component */}
        <TitleComponent
          title={componentData?.seeMore?.text ?? "Top Colleges"}
          link={componentData?.seeMore?.link}
          margin="0px 0 20px 0"
          headingLevel="h3"
        />

        {/* Categories Navigation */}
        <div className={s["Collageslinks"]}>
          <CustomSlideBox marginBottom={0}>
            {categories?.map((category) => (
              <li
                key={category?.id}
                className={selectedCategory === category?.id ? s["active"] : ""}
                onClick={() => handleCategorySelect(category?.id)}
              >
                {category?.Label}
              </li>
            ))}
          </CustomSlideBox>
        </div>

        {/* Display loading, fetched data, or no data message */}
        {loading ? (
           <Button
           buttonType={"text"}
           buttonText={"Loading..."}
           changeStyle={"video-load-more-disabled"}
         />
        ) : collageData?.length > 0 ? (
          collageData?.map((collage, index) => (
            <CollagesWidget key={index} data={collage} 
            origin={origin}
            />
          ))
        ) : (
          <p>No colleges found for the selected category.</p>
        )}
      </ContainerBox>
    </div>
  );
};

export default TopCollages;
