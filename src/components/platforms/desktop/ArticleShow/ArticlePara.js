import HtmlPara from "./HtmlPara";
import { YouTubeEmbed } from "@next/third-parties/google";
import YTEmbed from "./YTEmbed";
import SocialEmbed from "./SocialEmbed";
import ShowPhoto from "./ShowPhoto";
import ShowEmbedVideo from "./ShowEmbedVideo";
import QuotesWidget from "@/components/common/QuotesWidget/QuotesWidget";

const ArticlePara = ({ item, msid }) => {
  return (
    <>
      <HtmlPara
        htmlText={
          item?.htmlText
            ? item?.htmlText?.replace(/(<!\[CDATA\[)/gm, "").replace(/(]]>)/gm, "")
            : ""
        }
        isConditionalRendering={
          item?.htmlText?.length > 0 && item?.htmlText?.trim() && !item?.iconType
        }
      />
      {
        item?.htmlQuote ? <QuotesWidget data={item?.htmlQuote} /> : ''
      }
      
      <SocialEmbed
        htmlText={item?.fbList}
        isConditionalRendering={item?.fbList}
      />
      <SocialEmbed
        htmlText={item?.reditList}
        isConditionalRendering={item?.reditList}
      />
      <SocialEmbed
        htmlText={item?.instagramList}
        isConditionalRendering={item?.instagramList}
      />
      <SocialEmbed
        htmlText={item?.twitterList}
        isConditionalRendering={item?.twitterList}
      />
      <ShowPhoto
        item={item?.photoType?.list[0]}
        isConditionalRendering={
          item?.photoType && item?.photoType?.list?.length == 1
        }
      />
      {item?.id &&  <ShowEmbedVideo
        id={item?.id}
        image={item?.thumbUrl}
        msid={msid}
        title={item?.title}
        type={item?.type == "SLIKE"}
        isConditionalRendering={item?.type && item?.type == "SLIKE"}
      />}
     
      <YTEmbed
        id={item?.youtubeList?.id}
        isConditionalRendering={item?.youtubeList !== undefined}
      />
    </>
  );
};

export default ArticlePara;
