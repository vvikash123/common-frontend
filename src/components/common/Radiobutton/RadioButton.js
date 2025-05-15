import React from "react";
import s from "./RadioButton.module.scss";

const RadioButton = ({ label, checked, onChange, name }) => {
  return (
    <label className={s["custom-radio"]}>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className={s["radio-input"]}
        name={name}
      />
      <span className={s["radio-label"]}>{label}</span>
    </label>
  );
};

export default RadioButton;
