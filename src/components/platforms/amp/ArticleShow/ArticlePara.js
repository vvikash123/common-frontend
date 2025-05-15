import HtmlPara from "./HtmlPara";
import YTEmbed from "./YTEmbed";
import SocialEmbed from "./SocialEmbed";
import ShowEmbedVideo from "./ShowEmbedVideo";
import ShowPhoto from "./ShowPhoto";
import QuotesWidget from "@/components/common/QuotesWidget/QuotesWidget";

const ArticlePara = ({item, msid}) => {
  return (
    <>
       <HtmlPara
  htmlText={
    item?.htmlText
      ? item?.htmlText?.replace(/<!\[CDATA\[/g, '')?.replace(/]]>/g, '')
      : ''
  }
  isConditionalRendering={
    item?.htmlText?.trim() && !item?.iconType
  }
/>
{
        item?.htmlQuote ? <QuotesWidget data={item?.htmlQuote} /> : ''
      }

      <SocialEmbed 
      htmlText={item?.fbList }
      type={'fb'}
      isConditionalRendering={ item?.fbList}
      />
      <SocialEmbed 
      htmlText={item?.reditList
      }
      type={'reddit'}
      isConditionalRendering={ item?.reditList}
      />
       <SocialEmbed 
      htmlText={item?.instagramList
      }
      type={'instragram'}
      isConditionalRendering={ item?.instagramList}
      id={item?.socialId}
      />
      <SocialEmbed 
      type = 'twitter'
      htmlText={item?.twitterList
      }
      id={item?.socialId}
      isConditionalRendering={item?.twitterList}
      />
        <ShowPhoto 
        item = {item?.photoType?.list[0]}
        isConditionalRendering={item?.photoType && item?.photoType?.list?.length == 1}
        />
         <ShowEmbedVideo
           id={item?.id}
           image={item?.thumbUrl}
           title={item?.title}
           type={item?.type == 'SLIKE'}
           isConditionalRendering={item?.type && item?.type == "SLIKE"}
        />
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