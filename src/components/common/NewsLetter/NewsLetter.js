import React, { useState } from "react";
import style from "./NewsLetter.module.scss";
import InputTextBox from "../InputTextBox/InputTextBox";
import NextImage from "@/utils/NextImage";
import Script from "next/script";

function NewsLetter(props) {
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitMessage, setSubmitMessage] = useState('');

  const changeEmailEvent = (e) => {
    setEmailValue(e.target.value);
    setEmailError("");
  };
  const submitNewsLetter = () => {
    var filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (emailValue == "") {
      setEmailError("Please enter email id");
    } else if (!filter.test(emailValue)) {
      setEmailError("Please provide a valid email address");
    } else {
      // console.log("emailValue", emailValue);
      if (window._izq && typeof window._izq.push === 'function') {
        try {
            window._izq.push(["init", { email: emailValue }]);
            setEmailValue("");
            setSubmitMessage("Thank you for subscribing!");
          } catch (error) {
            console.log("Error pushing to iZooto:", error);
            setEmailError("An error occurred. Please try again later.");
          }
      } else {
        setEmailError("iZooto script not loaded properly");
      }
    }
  };
  return (
    <div className={`${style["letterbox"]}`}>
      <div className={`${style["topbox_cover"]}`}>
        <div className={`${style["letterbox_top"]}`}>
          <div className={`${style["radial-gradient"]}`}>
            <span>NewsLetter</span>
            <h4>
              STAY TUNED <br />
              STAY HEALTHY!
            </h4>
            <p>
              Get the best in <strong>health & wellness updates</strong> in your
              inbox
            </p>
          </div>
        </div>
        <div className={`${style["letterbox_mid"]}`}>
        <div style={{ color: "#fff", marginBottom: "10px", fontWeight:"bold" }}>
            {submitMessage}
          </div>
          <InputTextBox
            id={'email-input'}
            name={'email-input'}
            inputType={"email"}            
            placeHolderText={"Your email"}
            value={emailValue}
            changeStyle={"newsletter"}
            onChangeEvent={changeEmailEvent}
            autoComplete="off"
          />
          {emailError && (
            <div style={{ color: "#fff", margin: "5px" }}>{emailError}</div>
          )}
          <button id="subscribeNow" aria-label="subscribe Now" onClick={submitNewsLetter}>Subscribe Now</button>
          
        </div>
      </div>
      <div className={`${style["letter_cover-box-front"]}`}>
        {/* <p>Medically reviewed!</p> */}
        <NextImage src="/assets/health-images/images/mailFront.svg" />
      </div>
      <div className={`${style["letter_cover-box"]}`}>
        <NextImage src="/assets/health-images/images/mailBack.svg" />
      </div>
      <Script defer src="https://cdn.izooto.com/scripts/a75b6469baa399d6e38a02d7cfafcb640f505009.js"></Script>
      <Script
        id="izq-init"
        dangerouslySetInnerHTML={{
          __html: `window._izq = window._izq || []; window._izq.push(["init"]);`,
        }}
      />
    </div>
    
  );
}

export default NewsLetter;
