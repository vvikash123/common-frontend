import React, { useState, useRef, useEffect } from "react";
import style from "./StayTuned.module.scss";
import ContainerBox from "../ContainerBox/ContainerBox";
import Image from "next/image";

// Regex for email validation
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const StayTuned = (props) => {
  const { isMobile, navigation } = props;

  // State hooks
  const [emailValue, setEmailValue] = useState(""); // Track email input
  const [emailError, setEmailError] = useState(""); // Display error message
  const [submitMessage, setSubmitMessage] = useState(""); // Display success message
  const [isSubmitted, setIsSubmitted] = useState(false); // Disable the form after submission

  const emailIdInput = useRef();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.izooto.com/scripts/64369f6e5376d697172507959c6593c56948ff94.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      console.log("iZooto script loaded successfully.");
    };
    script.onerror = () => {
      console.error("Failed to load iZooto script.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  // Submit Newsletter function
  const submitNewsLetter = () => {
    if (!emailValue) {
      setEmailError("Please enter an email address.");
      setSubmitMessage("");
      return;
    }

    if (!emailPattern.test(emailValue)) {
      setEmailError("Please provide a valid email address.");
      setSubmitMessage("");
      return;
    }

    // Clear errors
    setEmailError("");

    // Check for iZooto script
    if (window._izq && typeof window._izq.push === "function") {
      try {
        window._izq.push(["init", { email: emailValue }]);
        setEmailValue(""); // Clear the input
        setSubmitMessage("Thank you for subscribing!");
        setIsSubmitted(true); // Disable form
      } catch (error) {
        console.error("Error pushing to iZooto:", error);
        setEmailError("An error occurred. Please try again later.");
      }
    } else {
      setEmailError("iZooto script not loaded properly.");
    }
  };

  return (
   <div className={style["subscribenow"]} style={{ minHeight: "344px" }}>
      <ContainerBox>
        <div className={style["subscribeRow"]}>
          <div className={style["left"]}>
            <p>Learn More, <strong>Grow Faster</strong></p>
            <span>Get Updates Straight to Your Inbox!</span>
            <div className={style["input"]}>
              <input
                ref={emailIdInput}
                type="text"
                placeholder="Enter your email address"
                value={emailValue}
                onChange={(e) => {
                  setEmailValue(e.target.value); // Track email input
                  setEmailError(""); // Clear errors on typing
                }}
                disabled={isSubmitted} // Disable input after submission
              />
              <button
                onClick={submitNewsLetter}
                disabled={isSubmitted || !!emailError || !emailValue} // Disable if submitted, has errors, or empty
              >
                SUBSCRIBE NOW
              </button>
            </div>
            {/* Display error or success message */}
            {emailError && <span className={style["errorText"]}>{emailError}</span>}
            {submitMessage && <p className={style["successText"]}>{submitMessage}</p>}
          </div>
          <div className={style["right"]}>
            {/* <img
              src="https://static.tnn.in/photo/113698732.cms"
              alt="Stay Tuned"
            /> */}
            <Image
              src={"https://static.tnn.in/photo/113698732.cms"}
              alt="Stay Tuned"
              width="500"
              height="300"
              />
          </div>
        </div>
      </ContainerBox>
    </div>
  );
};

export default StayTuned;
