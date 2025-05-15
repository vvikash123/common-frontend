import React, { useEffect, useState } from 'react';
import { isAMPRequest } from '@/utils/serverUtils';
import {
  getTargetURL,
  getGoogleTagCustomDimensions,
  getNewImageUrl,
} from '@/utils/common';
import { CATEGORY_TYPE_VIDEO } from '@/constants/index';
import style from './VideoShow.module.scss';
import { sendGAPageView, setGAValue } from '@/helpers/analytics/gaUtils';
import { setPageTargetData } from '@/utils/common';

function VideoShow({
  data = {},
  navigation,
  msid,
  nextmsid,
  userInfo,
  seoDataInfo,
  isGlance,
  isIzooto = false,
  setHandlePageTargetingDataFn,
  imageWidth,
}) {
  const info = { data, navigation, userInfo, msid };
  let [value] = data && data.data;
  const [autoPlay, setAutoPlay] = useState(value?.leadVideoAutoPlay ?? false);
  const [showFullContent, setShowFullContent] = useState(true);
  const [nextPlayer, SetNextPlayer] = useState(false);
  const [main, SetMain] = useState(value);
  const [videoId, SetVideoId] = useState(true);
  const [articleSortLink, setArticleSortLink] = useState(
    value ? value?.shortLink : ''
  );

  const [autoPlayList, setAutoPlayList] = useState(
    data?.data?.slice(1, 5) || []
  );
  useEffect(() => {
    setArticleSortLink(value?.shortLink);
  }, [value]);

  useEffect(() => {
    setAutoPlayList(data?.data?.slice(1, 5) || []);
  }, [msid]);

  const showFullContentHandler = () => {
    setShowFullContent(true);
  };

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
        window.player &&
        window.player.store &&
        window.player.store.isDockVisible === true
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

  const autoPlayHandler = () => {
    localStorage.setItem('video_autoplay', !autoPlay ? 1 : 0);
    setAutoPlay(!autoPlay);
  };

  let index = 0;
  const nextVideo = () => {
    if (
      Number(localStorage.getItem('video_autoplay')) === 1 &&
      data?.data?.length > 1
    ) {
      const currentAutoplayIndex = _findIndex(
        data?.data,
        (o) => o.msid === main.msid,
      );
      const nextVideoToPlay =
        autoPlayList[
        currentAutoplayIndex >= autoPlayList.length ? 0 : currentAutoplayIndex
        ];
      SetMain(nextVideoToPlay);
      setArticleSortLink(nextVideoToPlay?.shortLink);
      let newPath = `${getTargetURL({
        normalString: nextVideoToPlay?.seopath,
      })}-video-${nextVideoToPlay?.msid}`;

      if (isGlance) {
        let url = window.document.URL.split('?');
        newPath = newPath + `?${url[1]}`;
      }

      window.history.replaceState(null, nextVideoToPlay?.title, newPath);
      SetNextPlayer(true);
      let pagetargetObj = setPageTargetData(
        'video',
        '',
        navigation,
        data.data,
        seoDataInfo,
        nextVideoToPlay?.msid,
      );
      setHandlePageTargetingDataFn(pagetargetObj);
      let newMsid = nextVideoToPlay?.msid;
      let info = { data, navigation, userInfo, newMsid };
      sendGAPageView(
        window?.location?.pathname,
        nextVideoToPlay?.title,
        getGoogleTagCustomDimensions(info, newMsid),
      );

      if (!isAMPRequest() && (isGlance || isIzooto)) {
        changeURlGlance();
      }
    }
  };

  const mainData = main && main;
  let continue_watching = [];

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    continue_watching = JSON.parse(localStorage.getItem('continue_watching')) || [];
  }

  continue_watching =
    continue_watching && continue_watching.length
      ? continue_watching.filter((ele) => {
        return ele.msid == mainData.msid;
      })
      : [];

  const videoStartTime =
    continue_watching && continue_watching.length
      ? continue_watching[0].media.startTime
      : '';

  return (
    mainData && (
      <>
        <div className={`${style['article-banner']} article-banner`} id={mainData.msid} key={mainData.msid}>
      
          <div className={style['aspect-16-9']}>
            {mainData.media &&
              mainData?.media?.id &&
              mainData?.media?.rmname == 'Kaltura' ? (
              <div data-attr-slk={mainData?.media?.id} data-attr-msid={mainData?.msid} title={`${mainData.title}`} data-attr-cat={CATEGORY_TYPE_VIDEO} data-attr-autoplay={autoPlay}>
                {videoId ? (
                 <amp-iframe
                 title={mainData?.title}
                 layout="responsive"
                 sandbox="allow-scripts allow-same-origin allow-popups"
                 frameborder="0"
                 src={`${process.env.NEXT_PUBLIC_EMBED_VIDEO_HOST_URL}/amp-video/video-${
                   mainData?.media?.id
                 }?img=${getNewImageUrl({
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
                 })}`}
                 width="441"
                 height="232"
                 allow="fullscreen"
               >
                 <amp-img
                   layout="responsive"
                   width="441"
                   height="232"
                   src={getNewImageUrl({
                     msid: mainData?.msid || null,
                     imageSize:
                       mainData?.imageSize || mainData?.thumbsize || "",
                     imgWidth: imageWidth || null,
                     imgHeight: 211,
                     is1x1Img: false,
                     isArticleBanner: false,
                     updatedAt: mainData?.updatedate
                       ? mainData?.updatedate
                       : "",
                   })}
                   placeholder
                 ></amp-img>
               </amp-iframe>
                  
                ) : null}
              </div>
            ) : (
              <div className={style['Videoiframe']}>
                <amp-youtube
                  width="480"
                  height="270"
                  layout="responsive"
                  data-param-modestbranding="1"
                  data-param-rel="1"
                  data-videoid={mainData?.media?.id}
                />
              </div>
            )}
          </div>
        </div>

        <div className={style['Videocontainer']}>
          <h1 className='video-headingwrap'>{mainData.title}</h1>
        </div>

        <div className={style['container']}>
          <div className={`${style['f-s-15']} ${style['first__synopsis_color']} down ${!isAMPRequest() ? style['collapse'] : ''} ${showFullContent ? style['collapse-full-height'] : ''}`}>
            <p className='first__synopsis_color' dangerouslySetInnerHTML={{ __html: mainData.synopsis }} />
          </div>
        </div>
      </>
    )
  );
}

export default VideoShow;
