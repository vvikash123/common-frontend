import React from 'react'
import style from './CustomSlideBox.module.scss';

const CustomSlideBox = ({ children, gridGap=6, marginTop=0, marginBottom=24, changeStyle='', elementType='divBox' }) => {
  return (
    <div className={`${style['default']} ${style[changeStyle]}`}>
      {elementType === 'divBox' &&
        <div className={`${style['overflow']}`} style={{ gap: `0 ${gridGap}px`, marginTop: `${marginTop}px`, marginBottom: `${marginBottom}px` }}>
          {children}
        </div>
      }
      {elementType === 'ulBox' &&
        <ul className={`${style['overflow']}`} style={{ gap: `0 ${gridGap}px`, marginTop: `${marginTop}px`, marginBottom: `${marginBottom}px` }}>
          {children}
        </ul>
      }
    </div>
  );
};

export default CustomSlideBox;