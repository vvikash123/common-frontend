import withConditionalWrapper from "@/components/hoc/withConditionalWrapper"
import { YouTubeEmbed } from '@next/third-parties/google'

const YTEmbed = ({id}) => {
  return (
    <YouTubeEmbed videoid={id} height="auto" width="auto" params="controls=0" />
  )
}

export default withConditionalWrapper(YTEmbed)