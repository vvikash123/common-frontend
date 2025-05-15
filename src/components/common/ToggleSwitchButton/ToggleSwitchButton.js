import React, { useEffect, useState } from "react";
import style from './ToggleSwitchButton.module.scss';

function ToggleSwitchButton(props) {
  const { onToggle, changeStyle, buttonText, buttonType, iconName, isAnchor, key, seopath } = props;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const storedAutoplay = JSON.parse(localStorage.getItem("autoplay"));
    if (storedAutoplay !== null) {
      setIsChecked(storedAutoplay);
    }
  }, []);

  const handleToggleChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onToggle(checked);
  };

  return (
    <div className={`${style['toggle-box']}`}>
      {buttonText}
      <label className={`${style['switch']}`}>
        <input type="checkbox" checked={isChecked} onChange={handleToggleChange} />
        <p className={`${style['slider']} ${style['round']}`}></p>
      </label>
    </div>
  );
}

ToggleSwitchButton.defaultProps = {
  changeStyle: 'default',
  buttonText: 'Autoplay',
  iconName: 'grayShareIcon',
  isAnchor: false,
  key: '',
  seopath: ''
};

export default ToggleSwitchButton;
