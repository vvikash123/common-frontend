import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { consentCookieValue, getAdType, getNewImageUrl } from '@/utils/common';
import {
  CATEGORY_TYPE_LIVE_TV,
  CATEGORY_TYPE_VIDEO_ARTICLE,
  IMG_DOMAIN,
  LIVE_CHANNEL_ID,
  slikeApiKeys,
} from '@/constants/index';
import isAMPRequest from '@/utils/serverUtils';
const VideoPlayer = dynamic(() => import('@/modules/VideoPlayer/MultiVideo/MultiVideoLoader'), { ssr: false });

const getKeys = (slikeApiKeys) => ({
  'Unilist': {
    ...(slikeApiKeys?.tnn || {}),
  },
  default: {
    ...(slikeApiKeys?.tnn || {}),
  },
});

function getAdsApiKey(channelName = 'Unilist', categoryType, slikeApiKeys = {},isMobile) {
  const adsKey = getKeys(slikeApiKeys);
  if (categoryType !== CATEGORY_TYPE_LIVE_TV) {
    return isMobile ? adsKey?.default?.mweb : adsKey?.default?.web;
  }
  let key = adsKey[channelName]?.web || '';
  if (isMobile) {
    key = adsKey[channelName]?.mweb || '';
  }
  if (isMobile && isAMPRequest()) {
    key = adsKey[channelName]?.amp || '';
  }
  return key || (isMobile ? adsKey?.default?.mweb : adsKey?.default?.web);
}

const preloadImage = (url) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = url;
  document.head.appendChild(link);
};

const MultiVideoPlayer = ({
  data,
  mainData,
  index,
  idx = 0,
  style,
  articleLength,
  msid,
  isDock = true,
  aspectRatio = '16/9',
  isShort = false,
  skipAd = false,
  headless = false,
  categoryType = CATEGORY_TYPE_VIDEO_ARTICLE,
  videoCount,
  channelTitle = '',
  isAutoplay = false,
  nextVideo = () => {},
  isVideoStarted,
  thumbImg,
  isGlance = false,
  demoKeyFromQuery,
  isLivetvWidget = false,
  isHome = false,
  isShow = false,
  imageWidth,
  isMobile=false,
  onVideoStarted ,
  onVideoResumed,
  onVideoPaused,
  onVideoEnded,
  onVideoCompleted,
  playerListData
}) => {
  const [list, setList] = useState([]);
  

  useEffect(() => {
    try {
      const playerId = `player${data?.media?.id}`;
      
      if (window[playerId]?.destroy) {
        window[playerId]?.destroy();
        delete window[playerId];
      }
  
      let universalRootElem = document.getElementById('universalVideoPlayer');
      let dockedVideo = JSON.parse(localStorage.getItem('dockedVideo'));
  
      if (dockedVideo) {
        document.querySelector('.__tClose')?.click();
        if (window[`player${dockedVideo.id}`]?.destroy) {
          window[`player${dockedVideo.id}`]?.destroy();
          delete window[`player${dockedVideo.id}`];
        }
        if (universalRootElem) {
          universalRootElem.innerHTML = '';
        }
      }
  
      if (idx === 0) {
        document.querySelector('.__tClose')?.click();
      }
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  
    // Preload images and other setup logic...
  
    return () => {
      try {
        if (window[`player${data?.media?.id}`]?.destroy) {
          window[`player${data?.media?.id}`]?.destroy();
          delete window[`player${data?.media?.id}`];
        }
        setList([]);
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    };
  }, [data?.media?.id]);
  
  return (
    <div style={{ position: !isShort ? 'relative' : '', height: '100%' , width: '100%' }}>
      {data?.media?.id ? (
        <div
          className={isShort ? '' : style['videoContainer']}
          style={{ height: isShort ? '100%' : 'initial' }}
        >
          <div
            key={index}
            data-attr-slk={data?.media?.id || ''}
            title={msid}
            data-attr-msid={data?.media?.msid || msid}
            data-attr-autoplay={isAutoplay}
            data-attr-cat={categoryType}
            style={
              isMobile
                ? {
                    height: aspectRatio === '9/16' ? '100%' : '100%',
                    aspectRatio: aspectRatio === '9/16' ? 'inherit' : '16/9',
                    borderRadius: '0px',
                  }
                : {
                    height: aspectRatio === '9/16' ? '1120px' : '670px',
                    aspectRatio: aspectRatio === '9/16' ? 'inherit' : '16/9',
                    borderRadius: '0px',
                  }
            }
            id={`masterVideoPlayer${data?.media?.id}`}
            className={`${style['playerCont']} playerContainer${data?.media?.id}`}
          >
            {process.env.ISCOMPANION_AD_ACTIVE === 'true' && !isShort && (
              <div
                className={`preroll-overlay ${isHome ? 'rhs-player' : ''}`}
                id={`preroll-overlay${data.media.id}`}
              ></div>
            )}
            <VideoPlayer
              isShort={isShort}
              isDock={isDock}
              dataIndex={articleLength}
              videoCount={videoCount}
              nextVideo={nextVideo}
              isVideoStarted={isVideoStarted}
              onVideoStarted ={onVideoStarted}
              onVideoResumed={onVideoResumed}
              onVideoPaused={onVideoPaused}
              onVideoEnded={onVideoEnded}
              onVideoCompleted={onVideoCompleted}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(MultiVideoPlayer);
