import withConditionalWrapper from "@/components/hoc/withConditionalWrapper";
import { Parser } from "htmlparser2";

const SocialEmbed = ({ htmlText, type, id }) => {
  let parseObj = null;
  const parser = new Parser(
    {
      onopentag(name, attributes) {
        parseObj = { tagName: name, attributes };
      },
    },
    { decodeEntities: true }
  );

  parser.write(htmlText);
  parser.end();

  if (parseObj?.tagName == "iframe") {
    let attributes = parseObj?.attributes;
    if (parseObj?.attributes?.id == "reddit-embed") {
      htmlText = `<amp-iframe src=${attributes?.src} sandbox="allow-scripts allow-same-origin allow-popups" 
         height=${attributes?.height}
         allowfullscreen
         frameborder="0"
         >
         </amp-iframe>`;
    } else if (parseObj?.attributes?.src?.includes("www.facebook.com")) {
      let dataSource =
        decodeURIComponent(parseObj?.attributes?.src)?.split("&show_text") ??
        [];
      if (dataSource && dataSource?.length > 0) {
        dataSource = dataSource[0] ?? "";
        if (dataSource?.split("href=")?.length > 1) {
          dataSource = dataSource?.split("href=");
          dataSource = dataSource[1];
        }
      }
      htmlText = `<amp-facebook width=${attributes?.width} height=${attributes?.height}
      layout="responsive"
      data-href=${dataSource}>
     </amp-facebook>`;
    }
  } else if (parseObj?.tagName == "script") {
    if (type == "twitter") {
      htmlText = `<amp-twitter width="375" height="472" layout="responsive" data-tweetid=${id}>
          </amp-twitter>`;
    } else if (type == "instragram" && !htmlText?.includes("www.reddit.com")) {
      htmlText = `<amp-instagram data-shortcode=${id} width="600" height="450" layout="responsive">
          </amp-instagram>`;
    } else if (htmlText?.includes("www.reddit.com")) {
      const regex =
        /href="(https:\/\/www\.reddit\.com\/r\/ipl\/comments\/[^"]+)"/;
      const match = htmlText.match(regex);
      if (match && match[1]) {
        const postUrl = match[1];
        htmlText = `<amp-reddit layout="responsive" width="400" height="400" data-embedtype="comment" data-src=${postUrl}>
  </amp-reddit>`;
      }
    }
  }

  return <div dangerouslySetInnerHTML={{ __html: htmlText }}></div>;
};

export default withConditionalWrapper(SocialEmbed);
