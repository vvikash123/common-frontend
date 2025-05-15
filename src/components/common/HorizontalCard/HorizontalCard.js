import React from "react";
import style from "./HorizontalCard.module.scss";
import NextImage from "@/utils/NextImage";
import Typography from "../Typography/Typography";
import AuthorDetails from "../AuthorDetails/AuthorDetails";
import Button from "../Button/Button";
import ShareButton from "../ShareButton/ShareButton";
import {
  generateUrlPath,
  getArticleIcon,
  mutateArrayOfObject,
  removeHtmlTags,
} from "@/utils/common";
import LinkWrapper from "../LinkWrapper/LinkWrapper";

function HorizontalCard(props) {
  const {
    changeStyle = "figure",
    imgUrl = "",
    isMoreButtons = false,
    inLineStyle,
    cardSettingData,
    defaultTextValues,
    author,
    item,
    objectFit,
    isLazzy    
  } = props;

  const updatedSettingCardData = mutateArrayOfObject(
    cardSettingData,
    defaultTextValues,
    "text"
  );

  const siteURL = process.env.NEXT_PUBLIC_WEBAPP_BASE_URL;
  const articleClass = getArticleIcon(item?.cmstype || '')

  return (
    <figure className={`${style[changeStyle]}`}>
      <LinkWrapper
        condition={item?.seopath || ""}
        wrapper={(child) => (
          <a
            href={generateUrlPath(item) || ""}
            className={`${style["w-100"]} ${style["d-flex"]}`}
            title={item?.title || ''}
          >
            {child}
          </a>
        )}
      >
         <div className={`${style["IconRow"]}`}>
         <NextImage changeStyle={changeStyle} priority={isLazzy} src={imgUrl} objectFit={objectFit}/>
         <div className={`${style["Icon"]} ${style[articleClass]}`}>{articleClass}</div>
         </div>
        
      </LinkWrapper>
      <figcaption className={`${style["figcaption"]}`}>
        {updatedSettingCardData?.map((elem, index) => {
          return (
            <LinkWrapper
              key={index}
              condition={index < 3 || ""}
              wrapper={(child) =>
                index === 0 ? (
                  <a
                    href={`${siteURL}/${removeHtmlTags(elem?.text) || ""}`}
                    className={`${style["w-100"]} ${style["d-flex"]}`}
                    title={elem?.text}
                  >
                    {child}
                  </a>
                ) : (
                  <a
                    href={generateUrlPath(item) || ""}
                    className={`${style["w-100"]} ${style["d-flex"]}`}
                    title={item?.title || ''}
                  >
                    {child}
                  </a>
                )
              }
            >
              <Typography
                key={index}
                elementType={elem?.elementType || "p"}
                textValue={removeHtmlTags(elem?.text)}
                changeStyle={elem?.elementClass}
                lineClamp={elem?.lineClamp}
                marginBottom={elem?.marginBottom}
              />
            </LinkWrapper>
          );
        })}
        {inLineStyle != "" && (
          <div className={`${style["footer"]}`}>
            <AuthorDetails author={author} />
            {isMoreButtons && (
              <div className={`${style["footer-rhs"]}`}>
                <ShareButton
                  buttonType={"icon"}
                  changeStyle={"share-icon"}
                  iconName={"grayShareIcon"}
                  seopath={generateUrlPath(item) || ""}
                  titleText={item?.title || ''}
                />
                <LinkWrapper
                  condition={item?.seopath || ""}
                  wrapper={(child) => (
                    <a
                      href={generateUrlPath(item) || ""}
                      className={`${style["w-100"]} ${style["d-flex"]}`}
                      title={'Read More'}
                    >
                      {child}
                    </a>
                  )}
                >
                  {" "}
                  <Button
                    buttonType={"text"}
                    buttonText={"Read More"}
                    changeStyle={"read-more"}
                    isAnchor={false}
                    seopath={generateUrlPath(item) || ""}
                  />
                </LinkWrapper>
              </div>
            )}
          </div>
        )}
      </figcaption>
    </figure>
  );
}

export default HorizontalCard;
