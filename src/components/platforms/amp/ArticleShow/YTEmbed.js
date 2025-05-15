import withConditionalWrapper from "@/components/hoc/withConditionalWrapper"
import { YouTubeEmbed } from '@next/third-parties/google'

const YTEmbed = ({id}) => {
  return (
  <amp-youtube width="480" height="270" layout="responsive" data-param-modestbranding="1" data-param-rel="1" data-videoid={id}>
  </amp-youtube>
  )
}

export default withConditionalWrapper(YTEmbed)