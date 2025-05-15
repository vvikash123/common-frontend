import React, { useEffect, useState } from 'react';
import { isAMPRequest } from '@/utils/serverUtils';
import {
  CATEGORY_TYPE_VIDEO,
} from '@/constants/index';
import style from './VideoShow.module.scss';
import {
  setGAValue,

} from '@/helpers/analytics/gaUtils';
import MultiVideoPlayer from '@/components/common/MultiVideoPlayer/MultiVideoPlayer';
import { getNewImageUrl } from '@/utils/common';
// import Heading from '@/Heading/Heading';
function VideoShow({
  data = {},
  navigation,
  msid,
  nextmsid,
  userInfo,
  imageWidth,
  isMobile=false
}) {
  let [value] = data && data.data;
  const [autoPlay, setAutoPlay] = useState(value?.leadVideoAutoPlay ?? false);
  const [showFullContent, setShowFullContent] = useState(true);
  const [nextPlayer, SetNextPlayer] = useState(false);
  const [main, SetMain] = useState(value);
  const [videoId, SetVideoId] = useState(false);
  const [articleSortLink, setArticleSortLink] = useState(
    value ? value?.shortLink : '',
  );

  const [autoPlayList, setAutoPlayList] = useState(
    data?.data?.slice(1, 5) || [],
  );



  useEffect(() => {
    setArticleSortLink(value?.shortLink);
  }, [value]);
  useEffect(() => {
    setAutoPlayList(data?.data?.slice(1, 5) || []);
  }, [msid]);



  useEffect(() => {
    try {
      if (value) {
        setArticleSortLink(value?.shortLink);
      }
    } catch (e) {
      console.log('Error in useEffect:', e);
    }
  }, [value]);
  useEffect(() => {
    SetMain(main);
    SetNextPlayer(false);
    if (main?.media?.rmname == 'Kaltura') {
      SetVideoId(true);
    } else {
      if (
        window &&
        window?.player &&
        window?.player?.store &&
        window?.player?.store?.isDockVisible === true
      ) {
        if (document.querySelectorAll('.__tClose ')[0]) {
          document.querySelectorAll('.__tClose ')[0].click();
        }
      }
    }
    setShowFullContent(true);
  }, [nextmsid, nextPlayer]);

  useEffect(() => {
    SetMain(value);
    SetVideoId(true);
  }, [msid]);

 const mainData = main && main;
  let continue_watching = [];

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    continue_watching = JSON.parse(localStorage.getItem('continue_watching')) || [];
  }
  continue_watching =
    continue_watching && continue_watching?.length
      ? continue_watching?.filter((ele) => {
        return ele?.msid == mainData?.msid;
      })
      : [];

  const videoStartTime =
    continue_watching && continue_watching?.length
      ? continue_watching[0]?.media?.startTime
      : '';

  return (
    mainData && (
      <>
        <div
          className={`${style['article-banner']} article-banner`}
          id={mainData?.msid}
          key={mainData?.msid}
        >
          <div className={style['aspect-16-9']}>
            {mainData?.media &&
              mainData?.media?.id &&
              mainData?.media?.rmname == 'Kaltura' ? (
              <div
                data-attr-slk={mainData?.media?.id}
                data-attr-msid={mainData?.msid}
                title={`${mainData?.title}`}
                data-attr-cat={CATEGORY_TYPE_VIDEO}
                data-attr-autoplay={autoPlay}
              >
                {videoId ? (
                  <MultiVideoPlayer
                    data={{
                      media: {
                        id: mainData?.media?.id,
                        msid: mainData?.msid,
                      },
                    }}
                    index={11}
                    style={style}
                    articleLength={1}
                    mainData={mainData}
                    videoCount={1}
                    channelTitle={mainData?.media?.id}
                    categoryType={CATEGORY_TYPE_VIDEO}
                    videoId={{
                      id: mainData?.media?.id || '',
                      startTime: videoStartTime || '',
                    }}
                    msid={mainData?.msid}
                    playerId={mainData?.media?.id}
                    isAutoplay={autoPlay}
                    nextVideo={''}
                    placeholder

                    thumbImg ={getNewImageUrl({
                      msid: mainData?.msid || null,
                      imageSize:
                        mainData?.imageSize || mainData?.thumbsize || "",
                      imgWidth: imageWidth || null,
                      imgHeight: 203,
                      is1x1Img: false,
                      isArticleBanner: false,
                      updatedAt: mainData?.updatedate
                        ? mainData?.updatedate
                        : "",
                    })}
                    isMobile={isMobile}

                  />
                ) : null}
              </div>
            ) : (
              <div className={style['Videoiframe']}>
                <iframe
                  src={`https://www.youtube.com/embed/${mainData?.media?.id}`}
                  title="YouTube video player"
                  width="100%"
                  height="210px"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
          {/* <div className={style['VideoShare']}>
            {getShareIcons({ mainData })}
          </div> */}
          <div className={style['Videocontainer']}>
            <h1 className={style['video-headingwrap']}>{mainData?.title}</h1>

          </div>


          <div className={style['container']}>
            <div
              className={`${style['f-s-15']} ${style['first__synopsis_color']
                } down ${!isAMPRequest() ? style['collapse'] : ''} ${showFullContent ? style['collapse-full-height'] : ''
                }`}            >
              <p
                className={style['f-s-15']}
                dangerouslySetInnerHTML={{
                  __html: mainData?.synopsis,
                }} >

              </p>
            </div>
          </div>
        </div>

      </>
    )
  );
}

export default VideoShow;
