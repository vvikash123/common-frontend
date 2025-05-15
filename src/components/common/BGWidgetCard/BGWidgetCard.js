
import React from 'react';

import style from './BGWidgetCard.module.scss';
import SpriteIcon from '../Svg/SpriteIcon';


const  BGWidgetCard = (props) => {

    const { langConstant = {}, imgMsid, text, url } = props;

  return (
    <div className={`${style['heart-widget']}`}>
        <span> <SpriteIcon IconName="whiteRightUpArrow" /></span>
      <a href={url}>
        <img src={`https://static.tnn.in/photo/${imgMsid}.cms`}/>
        <h3>{text}</h3>
      </a>
    </div>
  );
};



export default BGWidgetCard
;
