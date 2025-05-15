import React from "react";
import style from "./AuthorDetails.module.scss";
import Typography from "../Typography/Typography";
//import SpriteIcon from "../Svg/SpriteIcon";
import LinkWrapper from "../LinkWrapper/LinkWrapper";
import { generateAuthorPath } from "@/utils/common";


function AuthorDetails(props) {
  const { changeStyle='default', author } = props;
  return (
    <>
      {author?.displayType === "default" && (
        <div className={`${style[changeStyle]}`}>
          <Typography
            elementType={"p"}
            textValue={author?.approvedBy}
            changeStyle={"author"}
          />
          <div className={`${style["author-name"]}`}>
            {/* <SpriteIcon IconName="blueRightCheck" /> */}
            <LinkWrapper
              condition={author?.authorName || ''}
              wrapper={(child) => <a href={generateAuthorPath(author) || ''} title={author?.authorName || ''} className={`${style['w-100']} ${style['d-flex']}`}>{child}</a>}
            >  
            <Typography
              elementType={"p"}
              textValue={author.authorName}
              changeStyle={"author-name"}
            />
            </LinkWrapper>
          </div>
        </div>
      )}

      {author?.displayType === "inline-display" && (
        <div className={`${style[changeStyle]} ${style["inline-display"]}`}>
          <div className={`${style["author-name"]}`}>
            {/* <SpriteIcon IconName="blueRightCheck" /> */}
            <Typography
              elementType={"p"}
              textValue={author?.approvedBy}
              changeStyle={"author-inline"}
            />
            <LinkWrapper
              condition={author?.authorName || ''}
              wrapper={(child) => <a href={generateAuthorPath(author) || ''} title={author?.authorName || ''} className={`${style['w-100']} ${style['d-flex']}`}>{child}</a>}
            >  
            <Typography
              elementType={"p"}
              textValue={author.authorName}
              changeStyle={"author-name-inline"}
            />
            </LinkWrapper>
          </div>
        </div>
      )}

      {author?.displayType === "inline-with-font-size-14" && (
        <div className={`${style[changeStyle]} ${style["inline-display"]}`}>
          <div className={`${style["author-name"]}`}>
            {/* <SpriteIcon IconName="blueRightCheck" /> */}
            <Typography
              elementType={"p"}
              textValue={author?.approvedBy}
              changeStyle={"author-inline-14"}
            />
            <LinkWrapper
              condition={author?.authorName || ''}
              wrapper={(child) => <a href={generateAuthorPath(author) || ''} title={author?.authorName || ''} className={`${style['w-100']} ${style['d-flex']}`}>{child}</a>}
            >  
            <Typography
              elementType={"p"}
              textValue={author?.authorName}
              changeStyle={"author-name-inline-14"}
            />
            </LinkWrapper>
          </div>
        </div>
      )}
    </>
  );
}

export default AuthorDetails;
