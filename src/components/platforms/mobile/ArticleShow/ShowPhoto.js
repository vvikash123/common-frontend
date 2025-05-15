import withConditionalWrapper from '@/components/hoc/withConditionalWrapper'
import { getNewImageUrl } from '@/utils/common'
import NextImage from '@/utils/NextImage'
import React from 'react'

const ShowPhoto = ({item}) => {
  return (
    <div>
         <NextImage 
          src={getNewImageUrl({
          msid: item.msid ,
         imgWidth: 340,
         imgHeight: 220,
        imgSize: item?.thumbsize ? item?.thumbsize : '',
        isArticleBanner: true,
         })}
       alt={item?.title}
      width={340}
      height={220}
      layout={'fixed'}
    />
   {item?.title && <span>{item?.title}</span>}

    </div>
  )
}

export default  withConditionalWrapper(ShowPhoto)