import { useState } from "react";

const NewsletterWidget = () => {
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");

  const submitNewsLetter = () => {
    var filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (emailValue == "") {
      setEmailError("Please enter email id");
    } else if (!filter.test(emailValue)) {
      setEmailError("Please provide a valid email address");
    } else {
      // console.log("emailValue", emailValue);
    }
  };

  return (
    <>
      <div className="NewsletterWidget">
        <div className="NewsletterRow">
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
        <div className="NewsletterWidgetInout">
          <input
            type="text"
            id="email_id"
            placeholder="Your email"
            onChange={(e) => {
              setEmailValue(e.target.value);
              setEmailError("");
            }}
          />

          <button id="subscribeNow" aria-label="subscribe Now" onClick={submitNewsLetter}></button>
        </div>
        {emailError && (
          <div style={{ color: "#fff", margin: "5px" }}>{emailError}</div>
        )}
      </div>
      <style jsx global>
      {`
  
  .NewsletterWidget {
    width: calc(100% - 20px);
    border-radius: 12px;
    background-color: #4c64e0;
    padding: 0;
    overflow: hidden;
    border: 2px solid #4c60e0;
    margin: 20px 10px;
 }
  .NewsletterWidget .NewsletterRow {
    padding: 20px 20px 10px;
 }
  .NewsletterWidget .NewsletterRow h4 {
    color: rgba(169, 229, 255, 1);
    font-size: 12px;
    font-weight: 700;
    font-style: Bold;
    letter-spacing: 1.2px;
    line-height: 16px;
    text-transform: uppercase;
 }
  .NewsletterWidget .NewsletterRow p {
    color: rgba(255, 255, 255, 1);
    font-family: var(--fontFamily);
    font-size: 24px;
    font-weight: 900;
    line-height: 30px;
    text-transform: uppercase;
    padding: 4px 0;
 }
  .NewsletterWidget .NewsletterRow span {
    opacity: 0.8;
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
 }
  .NewsletterWidget .NewsletterRow span strong {
    font-weight: bold;
 }
  .NewsletterWidget .NewsletterWidgetInout {
    width: 100%;
    position: relative;
    height: 60px;
 }
  .NewsletterWidget .NewsletterWidgetInout input {
    width: 100%;
    height: 100%;
    border: 0;
    appearance: none;
    padding: 0 20px;
    outline: none;
 }
  .NewsletterWidget .NewsletterWidgetInout button {
    border: 2px solid #4c64e0;
    background-color: #4c64e0;
    position: absolute;
    right: 0;
    top: 0;
    width: 76px;
    height: 100%;
    opacity: 0.8;
    background-image: url(/assets/icons/health/newsletterIcon.svg);
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
 }
  
  
`}
    </style>
    </>
  );
};

export default NewsletterWidget;
