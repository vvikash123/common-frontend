'use client'
import React from 'react';
import decodeHtml from '@/utils/htmlDecoder';
import LinkWrapper from '../LinkWrapper/LinkWrapper';
import { renderToStaticMarkup } from 'react-dom/server';


 const boldKeywords = (text, keywords ) => {
    const textArray = text.split(' ');
    const highlightedText = [];
  
    for (let i = 0; i < textArray.length; i++) {
      const word = textArray[i];
  
      if (keywords.includes(word)) {
        let multitext = [word];
  
        for (let j = i + 1; j < textArray.length; j++) {
          if (keywords.includes(textArray[j])) {
            multitext.push(textArray[j]);
            i = j; 
          } else {
            break;
          }
        }

        highlightedText.push(
          <strong key={i}>
            {multitext.join(" ")}{" "}
          </strong>
        );
      } else {
        highlightedText.push(
          <React.Fragment key={i}>
            {word}{" "}
          </React.Fragment>
        );
      }
    }

    return <>{highlightedText}</>;
  };

const DynamicHeading = (props) => {
  const { tag: Tag, style, changeStyle, titleBreak='', titleText, children, moreButtonLink, boldText = [] } = props;
  
  let html = renderToStaticMarkup(<>{children}</>)
  let text = renderToStaticMarkup(<>{boldKeywords(decodeHtml(titleText) || '', boldText)}</>)

  let tagClass = `${style['default-title']} ${style[titleBreak]}`;
let htmlContent = `<${Tag} class="${tagClass}">${text} ${html || ''}</${Tag}>`;


  return (
    <LinkWrapper
      condition={moreButtonLink}
      wrapper={(child) => <a href={moreButtonLink} className={`${style['inline-block']}`} title={titleText}>{child}</a>}
    >
      <div className={`${style['inline-block']} ${style[changeStyle]} `} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </LinkWrapper>

  );
};

export default DynamicHeading;