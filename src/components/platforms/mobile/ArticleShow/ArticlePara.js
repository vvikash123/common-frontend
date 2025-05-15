import HtmlPara from "./HtmlPara";
import YTEmbed from "./YTEmbed";
import SocialEmbed from "./SocialEmbed";
import ShowEmbedVideo from "../../desktop/ArticleShow/ShowEmbedVideo";
import ShowPhoto from "./ShowPhoto";
import { useEffect, useState } from "react";
import QuotesWidget from "@/components/common/QuotesWidget/QuotesWidget";

const ArticlePara = ({item, msid}) => {
  

  let [isLoadLazyContent, setLoadLazyContent] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (!isLoadLazyContent) {
      setLoadLazyContent(true);
    }
  }
  return (
    <>
        <HtmlPara 
        htmlText={
            item?.htmlText
              ? item?.htmlText
                  .replace(/(<!\[CDATA\[)/gm, '')
                  .replace(/(]]>)/gm, '')
              : ''
          }
          isConditionalRendering={
            (item?.htmlText?.length > 0) &&
           (item?.htmlText.trim()) &&
            !item?.iconType
          }
        />
        {
        item?.htmlQuote ? <QuotesWidget data={item?.htmlQuote} /> : ''
      }
   
      <SocialEmbed 
      htmlText={item?.fbList }
      isConditionalRendering={ item?.fbList && isLoadLazyContent }
      />
  
      <SocialEmbed 
      htmlText={item?.reditList
      }
      isConditionalRendering={ item?.reditList && isLoadLazyContent}
      />
      <SocialEmbed 
      htmlText={item?.instagramList
      }
      isConditionalRendering={ item?.instagramList}
      />
     <SocialEmbed 
      htmlText={item?.twitterList
      }
      isConditionalRendering={item?.twitterList && isLoadLazyContent}
      />
        <ShowPhoto 
        item = {item?.photoType?.list[0]}
        isConditionalRendering={item?.photoType && item?.photoType?.list?.length == 1}
        />
        {item?.id &&  <ShowEmbedVideo
           id={item?.id}
           image={item?.thumbUrl}
           msid={msid}
           title={item?.title}
           type={item?.type == 'SLIKE'}
           isConditionalRendering={item?.type && item?.type == "SLIKE" && isLoadLazyContent}
        /> }
        
        <YTEmbed 
            id = {item?.youtubeList?.id}
            isConditionalRendering={
                item?.youtubeList !== undefined
              }
        />
        </>
    
  )
}

export default ArticlePara