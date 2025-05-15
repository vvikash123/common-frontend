import React from 'react';

export default function SvgIcon({ IconName, size, ColorTheme }) {
  return (
    <svg className={`icon-${size}`}>
      <use xlinkHref={`/assets/icons/svg/sprite-global.svg#${IconName}`}></use>
    </svg>
  );
}

SvgIcon.defaultProps = {
  IconName: '',
  size: 'md',
  ColorTheme: 'light',
};
