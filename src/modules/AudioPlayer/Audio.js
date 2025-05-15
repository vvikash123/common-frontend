import SvgIcon from 'components/common/Svg/SvgIcon';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { getImageUrl } from 'utils/common';
import isMobile from 'utils/isMobile';
import { getDefaultConfig, loadAdScript } from './config';
import { setGAValue } from 'helpers/analytics/gaUtils';
import { isAMPRequest } from 'utils/serverUtils';
import { PlayerIcon } from 'components/common/Svg/Svg';
import { langConsumer } from '../../lang/langProvider';

var playerConfig = [];
let vidoeObj = {};
function Player({
  fullData = {},
  categoryType,
  videoData = {},
  isShare,
  msid,
  isVideo = true,
  isPlay = true,
  imageSize = {},
  imageWidth = {},
  isVideoStart = false,
  playerId = 0,
  youTubePlayerClose,
  handleClick,
  nextVideo,
  isLiveTv,
  video,
  controlls,
  langConstant = {},
}) {
  const { LIVE_CHANNEL_ID } = langConstant;
  const [state, setState] = useState({
    isSdkLoaded: false,
  });
  const adRef = useRef();
  const videoHeight = isMobile() ? '228px' : '463px';
  const videoCircle = isMobile() ? '0px' : '8px';
  const videoOverflow = isMobile() ? 'initital' : 'hidden';
  let title = fullData ? fullData.title : '';
  if (videoData.length > 0) {
    for (var i = 0; i < videoData.length; i++) {
      var PLAYER_CONFIG1 = getDefaultConfig(
        false,
        '',
        videoData[i],
        isMobile(),
      );
      // playerConfig.push(PLAYER_CONFIG1);
    }
  }

  let masterVideo = '';
  let divCount = '';
  useEffect(() => {
    if (isLiveTv) {
      if (window.spl && window.player != undefined) {
        loadAdScript();
        playerInit();
      }
    }
  }, [videoData]);

  useEffect(() => {
    if (
      window.SWPlayer &&
      !state.isSdkLoaded &&
      window &&
      window.player == undefined
    ) {
      loadAdScript();
      playerInit();
    } else if (window.spl && window.player == undefined) {
      loadAdScript();
      playerInit();
    }
    return () => {
      if (
        window &&
        window.player &&
        window.player.instanceManager &&
        window.player.instanceManager.dockMode
      ) {
        if (isVideo) {
          let rootElem = '';
          if (masterVideo) {
            rootElem = document.querySelectorAll('.playerContainer')[0];
          } else {
            rootElem = document.querySelector('.rootVideoContainer');
          }
          if (rootElem.innerHTML == '') {
            rootElem.setAttribute('data-msid', msid);
            rootElem.appendChild(masterVideo);
          }
        }
      } else {
        if (!localStorage.getItem('isLoginClick')) {
          if (isVideo) {
            // window && window.history.go(0);
          }
        }
      }
    };
  }, []);
  useEffect(() => {
    if (playerId != 0 && window && window.player && window.player.store) {
      playVideo();
    }
  }, [playerId]);
  useEffect(() => {
    if (
      isVideoStart &&
      window &&
      window.player &&
      window.player.store &&
      window.player.store.isDockVisible === true
    ) {
      playVideo();
    } else if (
      isVideoStart &&
      window &&
      window.player &&
      window.player.store &&
      window.player.store.isDockVisible === false
    ) {
      playVideo();
    }
  }, [isVideoStart]);

  function getPlayerConfig() {
    var datasrc = getImageUrl(
      +msid || null,
      +imageSize || null,
      +imageWidth || null,
    );

    var defaultConfig = [];
    videoData &&
      videoData.id &&
      (defaultConfig = getDefaultConfig(isPlay, datasrc, msid, isMobile()));
    //playerConfig.push(defaultConfig);
    if (playerConfig && Object.keys(playerConfig).length > 0) {
      Object.keys(playerConfig).forEach(function (key) {
        if (playerConfig[key]) {
          defaultConfig[key] =
            typeof playerConfig[key] === 'object'
              ? { ...defaultConfig[key], ...playerConfig[key] }
              : playerConfig[key];
        }
      });
    }

    if (videoData && videoData.id) {
      defaultConfig.video = { ...defaultConfig.video, ...videoData };
    }
    return defaultConfig;
  }
  const playerEvents = {
    onPlayerError: () => {
      setGAValue('event', 'Player Error', {
        event_category: categoryType,
        event_label: title,
      });
    },
    onVideoStarted: (player, eventName, eventData) => {
      youTubePlayerClose(true);
      setGAValue('event', 'Play', {
        event_category: categoryType,
        event_label: title,
      });
    },
    onVideoResumed: (player, eventName, eventData) => {
      handleClick('SLK', 0);
      youTubePlayerClose(true);
      setGAValue('event', 'Resume', {
        event_category: categoryType,
        event_label: title,
      });
    },
    onVideoPaused: (player, eventName, eventData) => {
      youTubePlayerClose(false);
      setGAValue('event', 'Pause', {
        event_category: categoryType,
        event_label: title,
      });
    },
    onVideoMuted: (player, eventName, eventData) => {
      setGAValue('event', 'Mute', {
        event_category: categoryType,
        event_label: title,
      });
    },
    onVideoCompleted: (player, eventName, eventData) => {
      setGAValue('event', 'Complete', {
        event_category: categoryType,
        event_label: title,
      });
      // nextVideo();
    },
    onVideoEnded: (player, eventName, eventData) => {
      setGAValue('event', 'End', {
        event_category: categoryType,
        event_label: title,
      });
    },
    onVideoProgress: (player, eventName, eventData) => {
      let getItems,
        data,
        isExists = false;
      // multiple slike player status for played once
      if (localStorage.getItem('isVideoPlayed')) {
        let isVideoIdExist = JSON.parse(localStorage.getItem('isVideoPlayed'));
        if (Object.keys(isVideoIdExist).includes(videoData.id)) {
          Object.values(vidoeObj).forEach((item) => {
            if (item.slikeId === videoData.id) {
              item.startTime = eventData.currentTime;
            }
          });
          localStorage.setItem('isVideoPlayed', JSON.stringify(vidoeObj));
        } else {
          vidoeObj[videoData.id] = {
            slikeId: videoData.id,
            isPlayedOnce: true,
            startTime: eventData.currentTime,
          };
          localStorage.setItem('isVideoPlayed', JSON.stringify(vidoeObj));
        }
      } else {
        vidoeObj[videoData.id] = {
          slikeId: videoData.id,
          isPlayedOnce: true,
          startTime: 0,
        };
        localStorage.setItem('isVideoPlayed', JSON.stringify(vidoeObj));
      }

      try {
        //Live TV media ID check
        if (window?.location?.href.includes('/videos/')) {
          if (player.store.mediaId != LIVE_CHANNEL_ID) {
            getItems = JSON.parse(localStorage.getItem('continue_watching'));

            if (msid && getItems && getItems.length > 0) {
              // INSERT / UPDATE
              data = getItems.map((value, index) => {
                if (value?.media?.id === player.store.mediaId) {
                  fullData.media.startTime = eventData.currentTime;
                  value = fullData;
                  isExists = true;
                }
                return value;
              });

              //INSERT / UPDATE
              if (isExists) {
                //UPDATE
                data
                  ? localStorage.setItem(
                      'continue_watching',
                      JSON.stringify(data),
                    )
                  : '';
              } else {
                // INSERT
                data && data.unshift(fullData);
                data
                  ? localStorage.setItem(
                      'continue_watching',
                      JSON.stringify(data),
                    )
                  : '';
              }
            }

            //First Entry
            if (msid && !getItems) {
              player &&
              player.store &&
              player.store.mediaId &&
              fullData &&
              Object.keys(fullData).length != 0
                ? localStorage.setItem(
                    'continue_watching',
                    JSON.stringify([fullData]),
                  )
                : null;
            }
          }
        }
      } catch (err) {}

      if (
        window &&
        window.player &&
        window.player.store &&
        window.player.store.isDockVisible === false
      ) {
        // window.scrollBy(0, -0.1);
      }
    },
    onDockExit: () => {
      let rootElem = document.querySelector('.rootVideoContainer');

      if (rootElem) {
        rootElem.innerHTML = '';
      }
      if (localStorage.getItem('isDockOpen')) {
        localStorage.removeItem('isDockOpen');
      }
      // scroll to top and share button position change accordingly botton sticky ad and pip open/close
      let ab =
        document.getElementsByClassName('__player bottomStickyPip __md') ||
        document.getElementsByClassName('__player bottomStickyPip __sml');
      if (ab.length != 0) {
        ab[0].classList.remove('bottomStickyPip');
      }
      let elScrollTop = document.getElementById('scrollTop');
      let nativeShare = document.getElementById('native-share');

      if (elScrollTop) {
        elScrollTop.style.bottom = '';
      }
      if (nativeShare) {
        nativeShare.style.bottom = '';
      }
    },
    onDockEnter: () => {
      localStorage.setItem('isDockOpen', true);

      // scroll to top button position change accordingly botton sticky ad and pip open/close
      let el = document.getElementsByClassName('__player __dock __dockBR __xS');
      let elScrollTop = document.getElementById('scrollTop');
      let nativeShare = document.getElementById('native-share');
      if (
        document.getElementsByClassName('__player __dock __dockBR __xS') &&
        localStorage.getItem('bottomSticky') === 'true'
      ) {
        el && el[0] && el[0].classList.add('bottomStickyPip');
        if (elScrollTop) {
          elScrollTop.style.bottom = '324px';
        }
        if (nativeShare) {
          nativeShare.style.bottom = '284px';
        }
      } else {
        el && el[0] && el[0].classList.remove('bottomStickyPip');
        if (elScrollTop) {
          elScrollTop.style.bottom = '';
        }
        if (nativeShare) {
          nativeShare.style.bottom = '';
        }
      }
    },
  };
  let adType = 'pre';
  const adEvents = {
    onAdImpression: (player, eventName, eventData) => {
      if (eventData.type != undefined) {
        adType = eventData.type;
      }
      const ea = adType + '-adImpression';
      // console.log('===add type ', adType);
      setGAValue('event', ea, {
        event_category: categoryType,
        event_label: title,
      });
    },
    onAdComplete: (player, eventName, eventData) => {
      if (eventData.type != undefined) {
        adType = eventData.type;
      }
      const ea = adType + '-adComplete';
      setGAValue('event', ea, {
        event_category: categoryType,
        event_label: title,
      });
    },
    onAdSkip: (player, eventName, eventData) => {
      if (eventData.type != undefined) {
        adType = eventData.type;
      }
      const ea = adType + '-adSkipped';
      setGAValue('event', ea, {
        event_category: categoryType,
        event_label: title,
      });
    },
    onAdError: (player, eventName, eventData) => {
      if (eventData.type != undefined) {
        adType = eventData.type;
      }
      const ea = adType + '-adError';
      setGAValue('event', ea, {
        event_category: categoryType,
        event_label: title,
      });
    },
    onAdClick: (player, eventName, eventData) => {
      if (eventData.type != undefined) {
        adType = eventData.type;
      }
      const ea = adType + '-adClick';
      setGAValue('event', ea, {
        event_category: categoryType,
        event_label: title,
      });
    },
    onAdResume: (player, eventName, eventData) => {
      if (eventData.type != undefined) {
        adType = eventData.type;
      }
      const ea = adType + '-adResume';
      setGAValue('event', ea, {
        event_category: categoryType,
        event_label: title,
      });
    },
    onAdStart: (player, eventName, eventData) => {
      if (eventData.type != undefined) {
        adType = eventData.type;
      }
      const ea = adType + '-adStart';
      setGAValue('event', ea, {
        event_category: categoryType,
        event_label: title,
      });
    },
    onAdPause: (player, eventName, eventData) => {
      if (eventData.type != undefined) {
        adType = eventData.type;
      }
      const ea = adType + '-adPaused';
      setGAValue('event', ea, {
        event_category: categoryType,
        event_label: title,
      });
    },
    onAdBlocked: (player, eventName, eventData) => {
      if (eventData.type != undefined) {
        adType = eventData.type;
      }
      const ea = adType + '-adBlocked';
      setGAValue('event', ea, {
        event_category: categoryType,
        event_label: title,
      });
    },
  };

  const handleAdEvents = useCallback(
    (player) => {
      var eventToFunction = (player, eventName, data) => {
        var funcName = eventName.replace('spl', 'on');
        var eventData = data || {};
        if (typeof adEvents[funcName] === 'function') {
          adEvents[funcName](player, funcName, eventData);
        }
      };
      Object.keys(window.SWPlayer.AdEvents).forEach((eventKey) => {
        var eventName = window.SWPlayer.AdEvents[eventKey];
        player.on(eventName, eventToFunction.bind(null, player));
      });
    },
    [adEvents],
  );
  function playerInit() {
    let finalConfig = getPlayerConfig();
    if (Array.isArray(finalConfig) && finalConfig.length === 0) {
      finalConfig = getDefaultConfig();
      if (Object.keys(video).indexOf('url') >= 0) {
        finalConfig['contEl'] = 'masterVideoPlayer' + msid;
      } else {
        finalConfig['contEl'] = 'masterVideoPlayer' + msid;
      }
    }

    finalConfig.controls = controlls;
    if (Object.keys(video).indexOf('url') >= 0) {
      delete finalConfig.video.id;
      finalConfig.video.url = video.url;

      finalConfig.video.title = video?.title ?? '';
    } else {
      delete finalConfig.video.url;
      finalConfig.video.id = video.id;

      finalConfig.video.title = video?.title ?? '';
    }
    finalConfig.adContainer = document.getElementById('outSideAdContainer');
    // console.log("===test", document.querySelector('.add'), adRef)
    window.spl.load(finalConfig, function (sdkLoadStatus, config) {
      setTimeout(() => {
        if (document.getElementById(`masterVideoPlayer${msid}`) != null) {
          document.getElementById(`masterVideoPlayer${msid}`).innerHTML = '';
        }
        if (
          typeof window !== 'undefined' &&
          typeof window.player !== 'undefined'
        ) {
          window.player && window?.player?.destroy();
        }

        if (sdkLoadStatus) {
          setState((state) => ({ ...state, isSdkLoaded: true }));
          const player = new window.SWPlayer(finalConfig);
          window.player = player;
          masterVideo = document.querySelectorAll('.playerContainer')[0];
          // setTimeout(() => {
          //   window.player.play();
          // }, 1000);
          handlePlayerEvents(player);
          handleAdEvents(player);
        }
      }, 2000);
    });
  }

  function setPlayPauseSvgPath() {
    let addClass = document.getElementsByClassName('__ply');
    let playBtn = document.getElementsByClassName('path');
    if (
      playBtn &&
      playBtn[0] &&
      playBtn[0].attributes &&
      playBtn[0].attributes[1] &&
      playBtn[0].attributes[1].value ===
        'M11,10 L16,13.74 16,22.28 11,26 M16,13.74 L22,18 22,18 16,22.28'
    ) {
      addClass[0].className = '__ply pause';
    }
    if (
      playBtn &&
      playBtn[0] &&
      playBtn[0].attributes &&
      playBtn[0].attributes[1] &&
      playBtn[0].attributes[1].value ===
        'M11,11 L15,11 15,25 11,25 M18,11 L22,11 22,25 18,25'
    ) {
      addClass[0].className = '__ply play';
    }
  }

  const handlePlayerEvents = useCallback(
    (player, isStepVideo = false) => {
      let eventToFunction = (player, eventName, data) => {
        const funcName = eventName.replace('spl', 'on');
        // setPlayPauseSvgPath();
        data = Object.assign({}, data, player.store.video);

        if (typeof playerEvents[funcName] === 'function') {
          playerEvents[funcName](player, funcName, data);
        }
      };
      Object.keys(window.SWPlayer.Events).forEach((eventKey) => {
        const eventName = window.SWPlayer.Events[eventKey];
        player.on(eventName, eventToFunction.bind(null, player));
      });
    },

    [playerEvents],
  );
  function playVideo() {
    let rootElem = document.querySelector('.rootVideoContainer');
    if (rootElem) {
      rootElem.innerHTML = '';
      playerInit();
    }
  }

  return (
    <>
      <div className="podcast-wrap">
        <div id="outSideAdContainer" style={{ position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '14px',
              left: '14px',
              zIndex: 8,
            }}
          >
            {!isAMPRequest() ? (
              <SvgIcon className="icon-audio-player" IconName="audioIcon" />
            ) : (
              ''
            )}
          </div>
          <img
            className="mb-5 podcast-image"
            src={`${process.env.NEXT_PUBLIC_PHOTO_API}/thumb/resizemode-4,msid-${msid},width-360/${msid}.jpg`}
            alt=""
            style={{
              width: '100%',
              maxWidth: '100%',
              height: 'initial',
              aspectRatio: 0,
              borderRadius: videoCircle,
              position: 'relative',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
        <div
          className="playerContainer __sast audio-control"
          id={`masterVideoPlayer${msid}`}
          style={{
            height: 'initial',
            aspectRatio: 0,
            borderRadius: videoCircle,
            overflow: videoOverflow,
          }}
        ></div>
      </div>
    </>
  );
}

Player.defaultProps = {
  youTubePlayerClose: () => {},
  handleClick: () => {},
};

export default langConsumer(Player);
