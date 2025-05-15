import { useState, useEffect } from "react";
import style from "./ShareButton.module.scss";
import { SpriteIcon } from "../Svg/SpriteIcon";
import NextImage from "@/utils/NextImage";
import { SOCIAL_SHARE_LINK } from "@/constants";
import OutsideClickHandler from "../OutsideClickHandler/OutsideClickHandler";

function ShareButton(props) {
  const { changeStyle, iconName, titleText='', seopath='' } = props;
  const [showShareButtonTray, setShowShareButtonTray] = useState(false);

  const toggleShareButtonTray = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareButtonTray(!showShareButtonTray);
  };

  const handleOutsideClick = () => {
    setShowShareButtonTray(false);
  };
  const siteUrl = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;
  return (
    <>
      <OutsideClickHandler onOutsideClick={handleOutsideClick}>
        <span
          id="share_button"
          title="Social share"
          onClick={(e) => {
            toggleShareButtonTray(e);
          }}
          className={`${style[changeStyle]}`}
        >
          <SpriteIcon IconName={iconName} />
        </span>
        {showShareButtonTray ? (
          <ul className={`${style["showShareButton"]}`}>
            <li>
              <a
                href={`${SOCIAL_SHARE_LINK.FB}${seopath}`}
                style={{ width: "19px", height: "18px", position: "relative" }}
                title={titleText}
              >
                {" "}
                <NextImage
                  width={10}
                  height={10}
                  layout="responsive"
                  src={`${siteUrl}/assets/icons/health/facebook.svg`}
                />
              </a>
            </li>
            <li>
              <a
                href={`${SOCIAL_SHARE_LINK.WHATSAPP}${seopath}`}
                style={{ width: "20px", height: "19px", position: "relative" }}
                title={titleText}
              >
                {" "}
                <NextImage
                  width={10}
                  height={10}
                  layout="responsive"
                  src={`${siteUrl}/assets/icons/health/WhatsApp.svg`}
                />
              </a>
            </li>
            <li>
              <a
                href={`${SOCIAL_SHARE_LINK.TWITTER}${seopath}`}
                style={{ width: "15px", height: "14px", position: "relative" }}
                title={titleText}
              >
                {" "}
                <NextImage
                  width={10}
                  height={10}
                  layout="responsive"
                  src={`${siteUrl}/assets/icons/health/X.svg`}
                />
              </a>
            </li>
          </ul>
        ) : null}
      </OutsideClickHandler>
    </>
  );
}

export default ShareButton;
