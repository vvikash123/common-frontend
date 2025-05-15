import React from "react";
import s from "./CheckBox.module.scss";

const Checkbox = ({ label, checked, onChange , isRadio }) => {
  return (
    <label className={s['custom-checkbox']}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`${s['checkbox-input']} ${ isRadio ? s['radiobtn'] : ""}`}

      />
      <span className={s['checkbox-label']}>{label}</span>
    </label>
  );
};

export default Checkbox;
