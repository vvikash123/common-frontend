import withConditionalWrapper from "@/components/hoc/withConditionalWrapper"

const HtmlPara = ({htmlText}) => {
  return (
         <div dangerouslySetInnerHTML={{__html : htmlText}}></div>
  )
}

export default withConditionalWrapper(HtmlPara)