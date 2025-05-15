import React from 'react';
import style from './PhotoVideoCard.module.scss';
import Typography from '../Typography/Typography';
import { getTargetURL } from '@/utils/common';
import SpriteIcon from '../Svg/SpriteIcon';

function PhotoVideoCard(props) {
  const {
    changeStyle,
    imgUrl,
    altText,
    elementType,
    titleText,
    elementClass,
    lineClamp,
    marginBottom,
    cardType,
    seopath,
    msid
  } = props;
  //console.log('props.....',props);
  // `${item?.seopath}-${item?.msid}`
  return (
    <a
      // href={seopath + `/${msid}`}
      href={getTargetURL({
        normalString: cardType === 'shorts'? `${seopath}-${msid}` : `${seopath}/photostory/${msid}.cms`,
      })}
      className={style[changeStyle]}
    >
     <figure className={`${style['figure']}`}>
        {cardType === 'shorts' || cardType === 'stories' ? (
          <span className={`${cardType != 'shorts' ? style['relative'] : ''}`}>
            {cardType === 'shorts' && <SpriteIcon IconName="whiteRoundPlayIcon" />}
            <img
              src={imgUrl}
              alt={altText}
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

PhotoVideoCard.defaultProps = {
  changeStyle: 'default',
  imgUrl: '/assets/health-images/images/img7.png',
  altText: 'Shorts',
  elementType: 'p',
  titleText: 'Best treatments for pre-mature Hair Fall',
  elementClass: '',
  lineClamp: 2,
  marginBottom: '0',
};


export default PhotoVideoCard;
