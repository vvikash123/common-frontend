import React, { useEffect, useState } from "react";
import s from "./DownloadCollegeBrochure.module.scss";
import SpriteIcon from "../Svg/SpriteIcon";
import CommonGridBox from "../CommonGridBox/CommonGridBox";
import axios from "axios";
import { getNewImageUrl } from "@/utils/common";
import { fetchStateCityData } from "@/pages/api";
import { isMobile } from "@/utils/isMobile";
import Link from "next/link";

const DownloadCollegeBrochure = ({ data, setShowForm, origin }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    state: "",
    city: "",
    course: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false); // Checkbox validation state
  const [formError, setFormError] = useState("");

  const fetchStates = async (params) => {
    try {
      const response = await fetchStateCityData(params);
  
      const listData = response?.response?.sections?.cities;
      if (params.state) {
        setCities(listData || []);
      } else {
        setStates(listData || []);
      }
    } catch (error) {
      console.error("Error fetching state/city data:", error);
    }
  };
  

  // Fetch states on component mount
  useEffect(() => {
    fetchStates({});
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    if (formData.state) {
      fetchStates({ state: formData.state });
    }
  }, [formData.state]);

  const handleOnChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleBrochureDownload = (pdfMsid, thumbSize) => {
    if (typeof window !== "undefined" && pdfMsid) {
      const src = getNewImageUrl({
        msid: pdfMsid,
        imgSize: thumbSize,
        imgWidth: isMobile() ? 560 : 1120,
        imgHeight: isMobile() ? 250 : 500,
        is1x1Img: true,
      });
      window.open(src, "_blank");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(""); // Reset error state

    // Validate form fields
    if (!formData.name || !formData.email || !formData.mobile || !formData.course || !formData.state || !formData.city) {
      setFormError("Please fill in all required fields.");
      return;
    }

    if (!termsAccepted) {
      setFormError("Please accept the terms to proceed.");
      return;
    }

    try {
      const payload = JSON.stringify({
        campaign_name: "Education Campaign",
        form_name: "Education Campaign_Form 1",
        form_data: [
          { key: "your_name", value: formData.name, type: "text" },
          { key: "email_id", value: formData.email, type: "email" },
          { key: "phone", value: formData.mobile, type: "tel" },
          { key: "course_interested_in", value: formData.course, type: "select-one" },
          { key: "state", value: formData.state, type: "select-one" },
          { key: "city", value: formData.city, type: "select-one" },
          { key: "college", value: data?.collegeName, type: "text" },
        ],
        verification_data: {
          captcha_verification: "",
          captchaValue: null,
          captchaId: null,
          phone_verification: false,
          email_verification: false,
        },
        meta_data: { referer: window.location.href, user_agent: origin },
      });

      const finalFormData = new FormData();
      finalFormData.append("finalPayload", payload);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LMS_DOMAIN}/submit-form-data/${process.env.NEXT_PUBLIC_LMS_CAMP_ID}/${process.env.NEXT_PUBLIC_LMS_FORM_ID}`,
        finalFormData
      );
      

      if (response.status === 200) {
        if (data?.enquire ) {
          alert("Form submitted successfully!"); 
          
        }else {
          handleBrochureDownload(data?.brochureMsid, data?.brouchureThumSize);
        
        }
      }

      setShowForm(false);
    } catch (error) {
      console.error("Form submission error:", error.response?.data || error.message);
      setFormError("Failed to submit the form. Please try again.");
    }
  };
  const isMobileDevice = isMobile();
  return (
    <div className={`${s["DownloadCollegeBrochure"]}`}>
      <div className={s["DownloadForm"]}>
        <div className={s["Top"]}>Register Here</div>
        <button className={s["CloseIcon"]} onClick={() => setShowForm(false)}>
          <SpriteIcon IconName="closeIcon" />
        </button>
        <div className={s["FormSection"]}>
          <span>{data?.collegeName}</span>
          <CommonGridBox gridType="gridBox"   changeStyle={isMobileDevice ? "grid-1" : "grid-3"}  yGap={20} xGap={30}>
            <div className={s["InputRow"]}>
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className={s["InputRow"]}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className={s["InputRow"]}>
              <input
                type="tel"
                placeholder="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className={s["InputRow"]}>
              <select name="course" value={formData.course} onChange={handleOnChange} required>
                <option value="">Course interested in</option>
                {data?.collegeDiscipline?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className={s["InputRow"]}>
              <select name="state" value={formData.state} onChange={handleOnChange} required>
                <option value="">State</option>
                {states.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={s["InputRow"]}>
              <select name="city" value={formData.city} onChange={handleOnChange} required>
                <option value="">City</option>
                {cities.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </CommonGridBox>
          <div className={s["InputCheck"]}>
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms">
              I accept the <Link href="/info/terms-conditions">Terms of Use</Link>.
            </label>
          </div>
          {formError && <p className={s["Error"]}>{formError}</p>}
          <button className={s["Submit"]} onClick={handleSubmit}>
            Submit
          </button>
          {/* <span className={s["submitting"]}>
            By submitting this form, you accept and agree to our{" "}
            <a href="/info/terms-conditions">Terms of Use</a>.
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default DownloadCollegeBrochure;
