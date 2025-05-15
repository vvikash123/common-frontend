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
         imgWidth: 900,
         imgHeight: 525,
        imgSize: item?.thumbsize ? item?.thumbsize : '',
        isArticleBanner: true,
         })}
       alt={item?.title}
      width={900}
      height={525}
      layout={'fixed'}
    />
   {item?.title && <span>{item?.title}</span>}
    </div>
  )
}

export default  withConditionalWrapper(ShowPhoto)