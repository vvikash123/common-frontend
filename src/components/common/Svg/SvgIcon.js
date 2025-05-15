import React from 'react';

export default function SvgIcon({ IconName='', size='md', ColorTheme='light' }) {
  return (
    <svg className={`icon-${size}`}>
      <use xlinkHref={`/assets/icons/svg/sprite-global.svg#${IconName}`}></use>
    </svg>
  );
}

