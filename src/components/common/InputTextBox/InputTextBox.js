"use client";
import React from "react";
import style from "./InputTextBox.module.scss";
import SpriteIcon from "../Svg/SpriteIcon";

function InputTextBox(props) {
  const {
    id = "",
    name = "",
    iconName = "",
    iconWidth,
    iconHeight,
    inputType = "text",
    placeHolderText = "Place Title Here",
    changeStyle = "",
    marginBottom = 0,
    autoComplete = "",
    value = "",
    defaultValue = "",
    autoFocus = "",
    onChangeEvent,
    onKeyPressEvent,
    elementType = "textBox",
  } = props;
  return (
    <div
      className={`${style["input-box"]} ${style[changeStyle]}`}
      style={{ marginBottom: `${marginBottom}px` }}
    >
      {iconName != "" && (
        <SpriteIcon width={iconWidth} height={iconHeight} IconName={iconName} />
      )}
      {elementType === "textBox" && (
        <input
          name={name}
          id={id}
          type={inputType}
          placeholder={placeHolderText}
          // defaultValue={defaultValue}
          value={value}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          onChange={(e) => {
            e.persist();
            onChangeEvent(e);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onKeyPressEvent(e);
            }
          }}
        />
      )}

      {elementType === "selectBox" && (
        <select>
          <option>South Ex</option>
          <option>Hauzkhas</option>
          <option>Saket</option>
        </select>
      )}
    </div>
  );
}
export default InputTextBox;
