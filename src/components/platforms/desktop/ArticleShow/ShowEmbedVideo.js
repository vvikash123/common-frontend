import MultiVideoPlayer from '@/components/common/MultiVideoPlayer/MultiVideoPlayer'
import withConditionalWrapper from '@/components/hoc/withConditionalWrapper'
import React from 'react'

const ShowEmbedVideo = ( {
    id,
    image,
    msid,
    title,
  }) => {
  return (
    <div className='abc'>
       <MultiVideoPlayer
          data={{
            media: {
              id: id,
              msid: '',
            },
          }}
          index={11}
          idx={11}
          articleLength={1}
          videoCount={1}
          channelTitle={msid || title}
          mainData={{}}
          thumbImg={image}
          style={''}
          msid={msid}
          isMobile={true}
        />
    </div>
  )
}

export default withConditionalWrapper(ShowEmbedVideo)