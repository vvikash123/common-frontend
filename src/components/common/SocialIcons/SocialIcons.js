import React from "react";
import s from "./SocialIcons.module.scss";
import SpriteIcon from "../Svg/SpriteIcon";
import { getBaseUrlNew, getSlug } from '@/utils/common';
import { SOCIAL_SHARE_LINK } from "@/constants";

const SocialIcons = ({ data, lang, shareOnFacebook, shareOnTwitter, shareOnLinkedIn, shareOnWhatsapp  , isFilter=false}) => {
  const socialUrl = data?.currentUrl || `${data?.seopath}-${getSlug(data?.cmstype)}-${data?.msid}`;
  return (

    <ul className={s['SocialIcons']}>
      <li><a 
        target="_blank"
        rel="noreferrer nofollow"
        href={`${SOCIAL_SHARE_LINK.WHATSAPP}${isFilter ? socialUrl : `${getBaseUrlNew(lang?.channel)}/${socialUrl}`}`}
        onClick={shareOnWhatsapp}
     ><SpriteIcon IconName="instaWhite" /></a></li>
      <li><a 
         target="_blank"
         rel="noreferrer nofollow"
         href={`${SOCIAL_SHARE_LINK.FB}${isFilter ? socialUrl : `${getBaseUrlNew(lang?.channel)}/${socialUrl}`}`}
         onClick={shareOnFacebook}
      ><SpriteIcon IconName="WhiteFb" /></a></li>
      <li><a 
        target="_blank"
        rel="noreferrer nofollow"
        href={`${SOCIAL_SHARE_LINK.TWITTER}${data?.title}&url=${isFilter ? socialUrl : `${getBaseUrlNew(lang?.channel)}/${socialUrl}`}`}
        onClick={shareOnTwitter}
      ><SpriteIcon IconName="twitterWhite" /></a></li>
  </ul>
  );
};

export default SocialIcons;
