import { useState } from "react";
import style from "./NewsletterWidget.module.scss";
import Script from "next/script";

const NewsletterWidget = () => {
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const submitNewsLetter = () => {
    var filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (emailValue == "") {
      setEmailError("Please enter email id");
    } else if (!filter.test(emailValue)) {
      setEmailError("Please provide a valid email address");
    } else {
      console.log("emailValue", emailValue);
      if (window._izq && typeof window._izq.push === "function") {
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
    <>
      <div className={style.NewsletterWidget}>
        <div className={style.NewsletterRow}>
          <h4>Newsletter</h4>
          <p>
            Stay Tuned <br />
            stay healthy
          </p>
          <span>
            Get the best in <strong>health & wellness updates</strong> in your
            inbox.
          </span>
        </div>
        {emailError && (
          <div className={style.Error}>{emailError}</div>
        )}
        {submitMessage && (
          <div className={style.submitMessage}>
            {submitMessage}
          </div>
        )}
        <div className={style.NewsletterWidgetInout}>
          <input
            type="text"
            id="email_id"
            placeholder="Your email"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
              setEmailError("");
            }}
          />
          <button id="subscribeNow" aria-label="subscribe Now" onClick={submitNewsLetter}></button>
        </div>
        
      </div>
      <Script
        defer
        src="https://cdn.izooto.com/scripts/a75b6469baa399d6e38a02d7cfafcb640f505009.js"
      ></Script>
      <Script
        id="izq-init"
        dangerouslySetInnerHTML={{
          __html: `window._izq = window._izq || []; window._izq.push(["init"]);`,
        }}
      />
    </>
  );
};

export default NewsletterWidget;
