import MultiVideoPlayer from '@/components/common/MultiVideoPlayer/MultiVideoPlayer'
import withConditionalWrapper from '@/components/hoc/withConditionalWrapper'
import { IMG_DEFAULT } from '@/constants'
import React from 'react'

const ShowEmbedVideo = ( {
    id,
    image,
    title,
  }) => {
   let  urlTitle  = title?.toLowerCase().split(' ').join('-'); 
  //  console.log('WWWWWW' , 
  //  id,
  //  image,
  //  title,)
  return (
    <div>
        <amp-iframe 
           title={title}
           layout="responsive" 
           sandbox="allow-scripts allow-same-origin allow-popups"
           frameborder="0" 
           src = {`${process.env.NEXT_PUBLIC_EMBED_VIDEO_HOST_URL}/amp-video/video-${id}?img=${image}`}
           height = '100' 
           width = '150'
           allow="fullscreen"
      >
      </amp-iframe>
    </div>
  )
}

export default withConditionalWrapper(ShowEmbedVideo)