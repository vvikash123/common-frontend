import { useState } from "react";
import axios from "axios";
import style from "./EnquiryForm.module.scss";
import SpriteIcon from "../Svg/SpriteIcon";
import { API_DOMAIN, channelId } from "@/constants";

const EnquiryForm = ({ setShowEnqForm }) => {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [commentError, setCommentError] = useState("");  
  
  const [respMessage, setRespMessage] = useState("");

  const onSubmit = async () => {
    const url = `/api/enquiry`;
    const response = await axios.post(
      `${API_DOMAIN}${url}?channel=${channelId}`,
      {
        to_mail: "sas@gmail.com",
        from_mail: email,
        description: comment,
        full_name: fullName,
        mobile: mobile,
      }
    );
    setRespMessage(response?.data.response) 
    setFullName('')
    setMobile('') 
    setEmail('')  
    setComment('')
    setTimeout(function(){
      setRespMessage('')
   }, 3000);
  };

  const validateBeforeSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    if (
      fullName.trim().length == 0 ||
      mobile.trim().length == 0 ||
      email.trim().length == 0 ||
      comment.trim().length == 0
    ) {
      valid = false;
      if (fullName.trim().length == 0) {
        setFullNameError("Full name is required");
      }
      if (mobile.trim().length == 0) {
        setMobileError("Mobile is required");
      }
      if (email.trim().length == 0) {
        setEmailError("Email is required");
      }
      if (comment.trim().length == 0) {
        setCommentError("Comment is required");
      }
    } else {
      if (!/^[a-zA-Z\s]*$/.test(fullName.trim())) {
        setFullNameError(
          "Name should not contain special characters or numbers"
        );
        valid = false;
      }
      if (!/^[789]\d{9}$/.test(mobile.trim())) {
        setMobileError("Enter valid mobile number");
        valid = false;
      }
      if (
        !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
          email.trim()
        )
      ) {
        setEmailError("Please provide a valid email address");
        valid = false;
      }
      if (comment.trim().length > 150) {
        setCommentError("Exceeded 150 characters");
        valid = false;
      }

      if(valid === true ) {
        onSubmit();
      }
    }
  };  

  return (
    <div className={style["EnquiryForm"]}>
      <form>
        <div className={style["EnquiryRow"]}>
          <div className={style["top"]}>
            <p>Send Enquiry</p>
            <i
              onClick={() => {
                setShowEnqForm(false);
              }}
            >
              <SpriteIcon IconName="close" />
            </i>
          </div>          

          <div className={style["EnquiryINput"]}>
            <div className={style["Input"]}>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={fullName}
                placeholder="Enter Full Name"
                onChange={(e) => {
                  setFullName(e.target.value);
                  setFullNameError("");
                }}
              />
              <span style={{ color: "red", marginBottom: "10px" }}>
                {fullNameError}
              </span>
            </div>

            <div className={style["Input"]}>
              <label>Mobile</label>
              <input
                type="text"
                name="mobile"
                value={mobile}
                placeholder="Enter Mobile Number"
                onChange={(e) => {
                  setMobile(e.target.value);
                  setMobileError("");
                }}
              />
              <span style={{ color: "red", marginBottom: "10px" }}>
                {mobileError}
              </span>
            </div>

            <div className={style["Input"]}>
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={email}
                placeholder="Enter Email Address"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              <span style={{ color: "red", marginBottom: "10px" }}>
                {emailError}
              </span>
            </div>

            <div className={style["Input"]}>
              <label>Comment</label>
              <textarea
                name="comment"
                value={comment}
                placeholder="Enter Comment"
                onChange={(e) => {
                  setComment(e.target.value);
                  setCommentError("");
                }}
              ></textarea>
              <span style={{ color: "red", marginBottom: "10px" }}>
                {commentError}
              </span>
            </div>
          </div>
          <div className={style["Btn"]}>
            <button              
              onClick={(event) => {
                validateBeforeSubmit(event);
              }}
            >       
                Submit       
            </button>
            
          </div>
          <div className={style["respMessage"]} style={{ color: "green", marginBottom: "10px" }}>
                {respMessage}
              </div>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;
