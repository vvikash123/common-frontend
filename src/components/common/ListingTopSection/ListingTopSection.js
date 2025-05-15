import React, { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import s from "./ListingTopSection.module.scss";
import ContainerBox from "../ContainerBox/ContainerBox";
import dynamic from 'next/dynamic';

const SocialIcons = dynamic(() => import('../SocialIcons/SocialIcons'), { ssr: false });
const CommonGridBox = dynamic(() => import('../CommonGridBox/CommonGridBox'), { ssr: false });

const ListingTopSection = (props) => {
  const { isMobile = false, dispatch, state, articleData, setCityList, canonicalElement } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const onClickHandler = (key, value) => {
    dispatch({
      type: "UPDATE_LOCATION",
      key: key,
      value: { key, value, name: value?.toLowerCase() },
    });
    if (setCityList) {
      setCityList((list) => [...list, value]);
    }
  };

  const shareOnFacebook = () => {
    setGAValue("event", "click", {
      event_category: "Share",
      event_label: `facebook | ${window.location}`,
    });
  };

  const shareOnTwitter = () => {
    setGAValue("event", "click", {
      event_category: "Share",
      event_label: `twitter | ${window.location}`,
    });
  };

  const shareOnLinkedIn = () => {
    setGAValue("event", "click", {
      event_category: "Share",
      event_label: `linkedin | ${window.location}`,
    });
  };

  const shareOnWhatsapp = () => {
    setGAValue("event", "click", {
      event_category: "Share",
      event_label: `whatsapp | ${window.location}`,
    });
  };

  const generateCityUrl = (city) => {
    return `/colleges/top-colleges-in-${city.toLowerCase()}`;
  };

  const heroImgUrl = "https://images.unilist.in/thumb/msid-114039744,thumbsize-93738,width-450,height-254,resizemode-75/114039744.jpg";

  return (
    <>
      {/* Preload Hero Image */}
      {/* <Head>
        <link rel="preload" as="image" href={heroImgUrl} />
      </Head> */}

      <div className={s["HeroSection"]}>
        <Image
      src={heroImgUrl}
      alt="Top Colleges Hero"
      width={isMobile ? 400 : 800}
      height={400}
      priority
      fetchPriority="high"
      quality={75} // reduce quality slightly to reduce size
      sizes="(max-width: 800px) 100vw, 800px"
      className={s["heroImage"]}
        />

        <div className={s["CityRow"]}>
          <ContainerBox marginTop={0}>
            <ul>
              {["Delhi", "Mumbai", "Kolkata", "Nagpur", "Pune", "Bangalore", "Jaipur", "Hyderabad"].map((city) => (
                <li
                  key={city}
                  className={state?.filters?.city?.includes(city.toLowerCase()) ? s.active : ""}
                >
                  <a
                    href={generateCityUrl(city)}
                    className={s.cityLink}
                    onClick={() => onClickHandler("city", city)}
                  >
                    <i>
                       <Image
                        src={`/assets/icons/education/${city === "Pune" ? "Pune2" : city}.svg`}
                        alt={`${city} Icon`}
                        width = {40}
                        height = {40}
                        />
                    </i>
                    <span>{city}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ContainerBox>
        </div>
      </div>

      <ContainerBox marginTop={!articleData?.body ? -40 : -190}>
      <div
  className={`${s["ListingTopSection"]} ${!articleData?.body ? s["noContent"] : ""}`}
  style={isMobile ? { minHeight: "212px" } : {}}
>
          <h1>{articleData?.title}</h1>

          {articleData?.body && (
            <div className={s["articleContainer"]}>
              <p
                className={`${s["articleBody"]} ${
                  isExpanded ? s["expanded"] : s["collapsed"]
                }`}
                dangerouslySetInnerHTML={{ __html: articleData?.body }}
              ></p>

              <button className={s["toggleButton"]} onClick={toggleExpanded}>
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            </div>
          )}

          {articleData?.body && (
            <CommonGridBox
              gridType="gridBox"
              changeStyle={isMobile ? "" : "grid-1"}
              yGap={20}
              xGap={16}
            >
              <SocialIcons
                data={{
                  currentUrl: `${canonicalElement?.href}`,
                  title: `${canonicalElement?.href}`,
                }}
                lang={""}
                isFilter={true}
                shareOnFacebook={shareOnFacebook}
                shareOnTwitter={shareOnTwitter}
                shareOnLinkedIn={shareOnLinkedIn}
                shareOnWhatsapp={shareOnWhatsapp}
              />
            </CommonGridBox>
          )}
        </div>
      </ContainerBox>
    </>
  );
};

export default ListingTopSection;
