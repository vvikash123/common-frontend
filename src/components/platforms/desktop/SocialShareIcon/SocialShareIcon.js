import React from 'react';
import style from './SocialShareIcon.module.scss';

import {
  SOCIAL_SHARE_LINK,
} from '@/constants/index';
import SvgIcon from '@/components/common/Svg/SvgIcon';
import { getBaseUrlNew, getSlug } from '@/utils/common';
import SpriteIcon from '@/components/common/Svg/SpriteIcon';

const SocialShareIcons = ({ data, lang, shareOnFacebook, shareOnTwitter, shareOnLinkedIn, shareOnWhatsapp }) => {
  return (
    <div className={`${style['flex_wrap']} ${style['justify__content__around']} ${style['social-widgets']}`}>
      <a
        target="_blank"
        rel="noreferrer nofollow"
        href={`${SOCIAL_SHARE_LINK.FB}${getBaseUrlNew(lang?.channel)}/${data?.seopath}-${getSlug(data?.cmstype)}-${data?.msid}`}
        onClick={shareOnFacebook}
      >
        <SpriteIcon IconName="WhiteFb" key={'fb'} />
      </a>
      <a
        target="_blank"
        rel="noreferrer nofollow"
        href={`${SOCIAL_SHARE_LINK.TWITTER}${data?.title}&url=${getBaseUrlNew(lang?.channel)}/${data?.seopath}-${getSlug(data?.cmstype)}-${data?.msid}`}
        onClick={shareOnTwitter}
      >
        <SpriteIcon IconName="twitterWhite" key={'tw'} />
      </a>
      {/* <a
        target="_blank"
        rel="noreferrer nofollow"
        href={`${SOCIAL_SHARE_LINK.LINKEDIN}${getBaseUrlNew(lang?.channel)}/${data?.seopath}-${getSlug(data?.cmstype)}-${data?.msid}`}
        onClick={shareOnLinkedIn}
      >
        <SvgIcon IconName="DarkLinkIcon" key={'lkin'} />
      </a> */}
      <a
        target="_blank"
        rel="noreferrer nofollow"
        href={`${SOCIAL_SHARE_LINK.WHATSAPP}${getBaseUrlNew(lang?.channel)}/${data?.seopath}-${getSlug(data?.cmstype)}-${data?.msid}`}
        onClick={shareOnWhatsapp}
      >
        <SpriteIcon IconName="instaWhite" key={'wp'} />
      </a>
    </div>
  );
};

// export default SocialShareIcons;

export default SocialShareIcons;
