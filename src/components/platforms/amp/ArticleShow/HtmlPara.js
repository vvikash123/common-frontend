import withConditionalWrapper from "@/components/hoc/withConditionalWrapper";

const sanitizeHtml = (htmlText) => {
  if (!htmlText) return '';

  // Remove disallowed custom tags
  let sanitizedText = htmlText.replace(/<\/?(bulletContentEmbed|bulletContentHeading|columnHead|columnHeadThumb|columnHeadTitle|bulleteContentBody|bulletContentRow|bulletContentRowHeading|bulletContentRowHead|bulletContentRowBody|bulletContentRowCell)[^>]*>/gi, '');

  // Clean up empty tags
  sanitizedText = sanitizedText.replace(/<[^\/>]+><\/[^>]+>/g, '');

  // Optionally, sanitize unsupported attributes if required
  sanitizedText = sanitizedText.replace(/<[^>]+(onclick|onload|style|class)[^>]*>/gi, (match) =>
    match.replace(/(onclick|onload|style|class)="[^"]*"/gi, '')
  );

  return sanitizedText.trim();
};

const HtmlPara = ({ htmlText }) => {

  const sanitizedHtml = sanitizeHtml(htmlText);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>;
};

export default withConditionalWrapper(HtmlPara);
