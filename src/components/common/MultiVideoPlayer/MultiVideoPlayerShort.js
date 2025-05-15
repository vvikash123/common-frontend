import React, { useEffect } from 'react';
import VideoPlayer from '@/modules/VideoPlayer/MultiVideo/MultiVideoLoader';
import { consentCookieValue, getAdType } from '@/utils/common';
import {
  CATEGORY_TYPE_LIVE_TV,
  CATEGORY_TYPE_VIDEO_ARTICLE,
  IMG_DOMAIN,
  LANG_CONST,
  slikeApiKeys
} from '@/constants/index';
import { getNewImageUrl } from '@/utils/common';
//import {isMobile }from '@/utils/isMobile';
import isAMPRequest from '@/utils/serverUtils';

let arrList = {};
let List = [];

const getKeys = (slikeApiKeys) => ({
  'Unilist': {
    ...(slikeApiKeys?.tnn || {}),
  },
  default: {
    ...(slikeApiKeys?.tnn || {}),
  },
});

function getAdsApiKey(
  channelName = 'Unilist',
  categoryType,
  slikeApiKeys = {},
  isMobile
) {
  const adsKey = getKeys(slikeApiKeys);
  if (categoryType != CATEGORY_TYPE_LIVE_TV) {
    return isMobile ? adsKey?.default?.mweb : adsKey?.default?.web;
  }
  let key = adsKey[channelName] ? adsKey[channelName]['web'] : '';
  if (isMobile) {
    key = adsKey[channelName] ? adsKey[channelName]['mweb'] : '';
  }
  if (isMobile && isAMPRequest()) {
    key = adsKey[channelName] ? adsKey[channelName]['amp'] : '';
  }
  return key || (isMobile ? adsKey?.default?.mweb : adsKey?.default?.web);
}

function MultiVideoPlayer({
  data,
  mainData,
  index,
  idx = 0,
  style,
  articleLength,
  msid,
  isDock=true,
  aspectRatio='16/9',
  isShort=false,
  skipAd=false,
  headless=false,
  categoryType = CATEGORY_TYPE_VIDEO_ARTICLE,
  videoCount,
  channelTitle = '',
  isAutoplay=false,
  nextVideo=() => {},
  isVideoStarted,
  thumbImg,
  isGlance=false,
  demoKeyFromQuery,
  isLivetvWidget=false,
  isHome=false,
  isShow=false,
  hostId = 1005,
  imageWidth,
  isMobile
}) {
  // const langConst = LANG_CONST[hostId];
  const  LIVE_CHANNEL_ID  = 1005;
  useEffect(() => {
    try {
      if (window['player' + data?.media?.id]) {
        if (typeof window['player' + data?.media?.id]?.destroy === 'function') {
          window['player' + data?.media?.id]?.destroy();
        }
        delete window['player' + data?.media?.id];
      }
  
      let universalRootElem = document.getElementById('universalVideoPlayer');
      let dockedVideo = JSON.parse(localStorage.getItem('dockedVideo'));
  
      if (dockedVideo) {
        if (document.querySelectorAll('.__tClose ')[0]) {
          document.querySelectorAll('.__tClose ')[0].click();
        }
        if (
          typeof window !== 'undefined' &&
          window['player' + dockedVideo?.id] &&
          typeof window['player' + dockedVideo?.id]?.destroy === 'function'
        ) {
          window['player' + dockedVideo?.id]?.destroy();
          delete window['player' + dockedVideo?.id];
        }
        if (universalRootElem) {
          universalRootElem.innerHTML = '';
        }
      }
    } catch (error) {
      console.log('Error during cleanup: ', error);
    }
  
    // Initialization logic...
  
    return () => {
      List = [];
      if (
        typeof window !== 'undefined' &&
        window['player' + data?.media?.id] &&
        typeof window['player' + data?.media?.id]?.destroy === 'function'
      ) {
        window['player' + data?.media?.id]?.destroy();
        delete window['player' + data?.media?.id];
      }
    };
  }, []);
  

  return (
    // <ErrorBoundary key={`cover_video${index}`}>
      <div style={{ position: !isShort ? 'relative' : '', height: '100%' }}>
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
                isMobile ?
                isShort ? {
                      height: aspectRatio === '9/16' ? '100vh' : 'inherit',
                      width:'100%',
                      aspectRatio: aspectRatio === '9/16' ? '9/16' : 'inherit',
                      borderRadius: '0px',
                   } : {
                      height: aspectRatio === '9/16' ? '100%' : 'inherit',
                      aspectRatio: aspectRatio === '9/16' ? 'inherit' : '16/9',
                      borderRadius: '0px',
                    }
                  : {
                      height: aspectRatio === '9/16' ? '580px' : 'inherit',
                      aspectRatio: aspectRatio === '9/16' ? 'inherit' : '16/9',
                      borderRadius: '0px',
                    }
              }
              id={`masterVideoPlayer${data?.media?.id}`}
              className={`${style['playerCont']} playerContainer${data?.media?.id}`}
            >
              {process.env.ISCOMPANION_AD_ACTIVE == 'true' && !isShort && (
                <div
                  // style={styleValue}
                  className={`preroll-overlay ${isHome ? 'rhs-player' : ''}`}
                  id={`preroll-overlay${data.media.id}`}
                ></div>
              )}
              <>
                <VideoPlayer
                  isShort={isShort}
                  isDock={isDock}
                  dataIndex={articleLength}
                  videoCount={videoCount}
                  nextVideo={nextVideo}
                  isVideoStarted={isVideoStarted}
                />
              </>
            </div>
          </div>
        ) : null}
      </div>
    // </ErrorBoundary>
  );
}


export default MultiVideoPlayer;
