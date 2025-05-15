import React from "react";
import s from "./AuthorInfo.module.scss"; // Import the CSS module

const AuthorInfo = ({ className }) => {
  return (
    <p className={`${s.author} ${className ? s[className] : ''}`}>
      <i></i>
      <strong>Aarushi Bhadury <span>Updated Oct 9, 2024 | 12:00 AM IST</span></strong>
      
    </p>
  );
};

export default AuthorInfo;
