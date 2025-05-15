import React from 'react';
import style from './PhotoVideoCard.module.scss';
import NextImage from '@/utils/NextImage';
import Typography from '../Typography/Typography';
import { getTargetURL } from '@/utils/common';
import SpriteIcon from '../Svg/SpriteIcon';

function PhotoVideoCard(props) {
  const {
    changeStyle='default',
    imgUrl='/assets/health-images/images/img7.png',
    altText='Shorts',
    elementType='p',
    titleText='Best treatments for pre-mature Hair Fall',
    elementClass='',
    lineClamp=2,
    marginBottom=0,
    cardType,
    seopath,
    priority=false,
    msid
  } = props;
  return (
    <a
     href={cardType === 'shorts'? getTargetURL({normalString:`${seopath}-${msid}`}) : `${seopath}`}
      className={style[changeStyle]}
      title={titleText}
    >
     <figure className={`${style['figure']}`}>
        {cardType === 'shorts' || cardType === 'stories' ? (
          <span className={`${cardType != 'shorts' ? style['relative'] : ''}`}>
            {cardType === 'shorts' && <SpriteIcon IconName="whiteRoundPlayIcon" />}
            <NextImage
              changeStyle={changeStyle}
              src={imgUrl}
              alt={titleText || altText}
              priority={priority}
            />
            {cardType === 'stories' && (
              <ul className={`${style['story-dots']}`}>
                {[...Array(7)].map((_, index) => (
                  <li
                    key={index}
                    className={`${index === 0 ? style['active'] : ''}`}
                  ></li>
                ))}
              </ul>
            )}
          </span>
        ) : null}
        <figcaption className={`${style['figcaption']}`}>
          <Typography
            elementType={elementType}
            textValue={titleText}
            changeStyle={elementClass}
            lineClamp={lineClamp}
            marginBottom={marginBottom}
          />
        </figcaption>
      </figure>
    </a>
  );
}

export default PhotoVideoCard;
