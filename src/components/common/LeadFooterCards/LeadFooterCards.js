import React from 'react';

import style from './LeadFooterCards.module.scss';

import SpriteIcon from '../../common/Svg/SpriteIcon';

function LeadFooterCards(props) {
  const { langConstant = {}, translations, addLangPath, lang, cardType, title, para, icons } = props;
  return (
    <div className={`${style['LeadFooterCards']} ${cardType === 'AyurvedaHerbals' && style['AyurvedaHerbals']} ${cardType === 'CommunityHub' && style['CommunityHub']}`}>
      <div className={`${style['head-panel']}`}>
        <SpriteIcon IconName={icons} />
      </div>
      <div className={`${style['footer-panel']}`}>
        <h2 className={`${style['title']}`}> {title} </h2>
        <p className={`${style['para']}`}> {para} </p>
      </div>
    </div>
  )
}



export default LeadFooterCards;
