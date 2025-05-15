import SvgIcon from 'components/common/Svg/SvgIcon';
import React, { useCallback, useEffect, useState } from 'react';
import { getImageUrl } from '@/utils/common';
import isMobile from 'utils/isMobile';
import { getDefaultConfig, loadAdScript } from './config';
import { setGAValue } from 'helpers/analytics/gaUtils';
import { isAMPRequest } from 'utils/serverUtils';
import { PlayerIcon } from 'components/common/Svg/Svg';
import LazyImage from '../../components/common/LazyImage';
import { langConsumer } from 'lang/langProvider';

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
  isVideoStarted,
  isLiveTv,
  autoPlay = false,
  demoFromQuery,
  langConstant = {},
}) {
  const { CHANNEL_MSID, CHANNEL_NAME, LIVE_CHANNEL_ID } = langConstant;
  const [state, setState] = useState({
    isSdkLoaded: false,
  });
  const videoHeight = isMobile() ? '228px' : '463px';
  const videoCircle = isMobile() ? '0px' : '8px';
  const videoOverflow = isMobile() ? 'initital' : 'hidden';
  let title = fullData ? fullData.title : '';
  if (CHANNEL_MSID[`${videoData.id}`] == msid) {
    title = CHANNEL_NAME[`${videoData.id}`] + '|' + `${videoData.id}`;
    categoryType = 'Live TV';
  }
  if (videoData.length > 0) {
    for (var i = 0; i < videoData.length; i++) {
      var PLAYER_CONFIG1 = getDefaultConfig(
        false,
        '',
        videoData[i],
        isMobile(),
      );
      playerConfig.push(PLAYER_CONFIG1);
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
    try {
      if (
        localStorage.getItem('videoPlayerList') &&
        localStorage.getItem('isDockOpen')
      ) {
        if (document.querySelectorAll('.__tClose ')[0]) {
          document.querySelectorAll('.__tClose ')[0].click();
        }
        JSON.parse(localStorage.getItem('videoPlayerList')).map(
          (item, index) => {
            if (window['player' + item.id]) {
              window['player' + item.id]?.destroy();
              delete window['player' + item.id];
            }
          },
        );
        if (localStorage.getItem('dockedVideo')) {
          localStorage.removeItem('dockedVideo');
        }
        if (localStorage.getItem('videoPlayerList')) {
          localStorage.removeItem('videoPlayerList');
        }
      }
    } catch (error) {
      console.log('Error ', error);
    }
    try {
      let universalRootElem = document.getElementById('universalVideoPlayer');
      let dockedVideo = JSON.parse(localStorage.getItem('dockedVideo'));
      if (dockedVideo) {
        if (document.querySelectorAll('.__tClose ')[0]) {
          document.querySelectorAll('.__tClose ')[0].click();
        }
        if (typeof window != undefined && window['player' + dockedVideo?.id]) {
          window['player' + dockedVideo?.id]?.destroy();
          delete window['player' + dockedVideo?.id];
        }
        if (universalRootElem) {
          universalRootElem.innerHTML = '';
        }
        if (localStorage.getItem('dockedVideo')) {
          localStorage.removeItem('dockedVideo');
        }
      }
    } catch (error) {
      console.log('Error ', error);
    }
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
      try {
        if (localStorage.getItem('isDockOpen')) {
          let dockedVideo = JSON.parse(localStorage.getItem('dockedVideo'));
          if (dockedVideo) {
            localStorage.setItem(
              'pipPlayerData',
              JSON.stringify({
                title: dockedVideo?.title,
                msid: dockedVideo?.msid,
                id: dockedVideo?.id,
                categoryType: dockedVideo?.categoryType,
                startTime: dockedVideo?.startTime,
              }),
            );
          }
          if (typeof window != 'undefined' && window?.player) {
            window?.player?.destroy();
            delete window?.player;
          }
        }
      } catch (error) {
        console.log('Error', error);
      }

      if (
        window &&
        window.player &&
        window.player.instanceManager &&
        window.player.instanceManager.dockMode
      ) {
        if (isVideo) {
          let rootElem = '';
          // if (masterVideo) {
          //   rootElem = document.querySelectorAll('.playerContainer')[0];
          // } else {
          //   rootElem = document.querySelector('.rootVideoContainer');
          // }
          // if (rootElem.innerHTML == '') {
          //   rootElem.setAttribute('data-msid', msid);
          //   rootElem.appendChild(masterVideo);
          // }
        }
      } else {
        if (window?.player) {
          delete window.player;
        }
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
    var datasrc =
      +msid != 1
        ? getImageUrl(+msid || null, +imageSize || null, +imageWidth || null)
        : `${process.env.SLIKE_THUMB_IMAGE_URL}/${videoData?.id?.slice(
            2,
            4,
          )}/${videoData?.id?.slice(4, 6)}/${videoData?.id}/thumb.jpg`;

    var defaultConfig = [];
    videoData &&
      videoData.id &&
      (defaultConfig = getDefaultConfig(
        isPlay,
        datasrc,
        videoData.id,
        isMobile(),
        demoFromQuery,
        autoPlay,
      ));
    playerConfig.push(defaultConfig);
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
      nextVideo();
    },
    onVideoEnded: (player, eventName, eventData) => {
      setGAValue('event', 'End', {
        event_category: categoryType,
        event_label: title,
      });
      nextVideo();
    },
    onVideoProgress: (player, eventName, eventData) => {
      try {
        if (
          window?.player?.instanceManager?.dockMode &&
          categoryType != 'Live TV'
        ) {
          localStorage.setItem(
            'pipPlayerData',
            JSON.stringify({
              title: title,
              msid: msid,
              id: videoData?.id,
              categoryType: categoryType,
              startTime: eventData?.currentTime,
            }),
          );

          // docked video
          localStorage.setItem(
            'dockedVideo',
            JSON.stringify({
              msid: msid,
              id: videoData?.id,
              categoryType: categoryType,
              title: title,
              startTime: eventData?.currentTime,
            }),
          );
        }
      } catch (error) {
        console.log('Error', error);
      }

      try {
        let getItems,
          data,
          isExists = false;
        // multiple slike player status for played once
        if (localStorage.getItem('isVideoPlayed')) {
          let isVideoIdExist = JSON.parse(
            localStorage.getItem('isVideoPlayed'),
          );
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
      } catch (error) {
        console.log('Error', error);
      }

      try {
        let getItems,
          data,
          isExists = false;
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

                if (data.length === 11) {
                  data && data.pop();
                }
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

      try {
        if (localStorage.getItem('isDockOpen')) {
          localStorage.removeItem('isDockOpen');
        }

        if (localStorage.getItem('pipPlayerData')) {
          localStorage.removeItem('pipPlayerData');
        }
        if (localStorage.getItem('dockedVideo')) {
          localStorage.removeItem('dockedVideo');
        }
      } catch (error) {
        console.log('Error', error);
      }
      // scroll to top and share button position change accordingly botton sticky ad and pip open/close
      if (isMobile()) {
        let id =
          document.getElementsByClassName('__player bottomStickyPip __md') ||
          document.getElementsByClassName('__player bottomStickyPip __sml');
        if (id.length != 0) {
          id[0].classList.remove('bottomStickyPip');
        }
        let elScrollTop = document.getElementById('scrollTop');
        let nativeShare = document.getElementById('native-share');

        if (elScrollTop) {
          elScrollTop.style.bottom = '';
        }
        if (nativeShare) {
          nativeShare.style.bottom = '';
        }
      }
    },
    onDockEnter: (player, eventName, eventData) => {
      localStorage.setItem('isDockOpen', true);

      localStorage.setItem(
        'dockedVideo',
        JSON.stringify({
          msid: msid,
          id: videoData?.id,
          categoryType: categoryType,
          title: title,
          startTime: eventData?.currentTime,
        }),
      );

      if (isMobile()) {
        // scroll to top button position change accordingly botton sticky ad and pip open/close
        let el = document.getElementsByClassName(
          '__player __dock __dockBR __xS',
        );
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
    const finalConfig = getPlayerConfig();

    window.spl.load(finalConfig, function (sdkLoadStatus, config) {
      // ******** This is for Live TV channel Change ********
      try {
        if (
          typeof window !== 'undefined' &&
          typeof window.player !== 'undefined' &&
          isLiveTv
        ) {
          window.player && window?.player?.destroy();
        }
      } catch (error) {
        console.log('Error ', error);
      }
      setTimeout(() => {
        if (
          document.getElementById(`masterVideoPlayer${videoData.id}`) != null
        ) {
          document.getElementById(
            `masterVideoPlayer${videoData.id}`,
          ).innerHTML = '';
        }
        try {
          if (
            typeof window !== 'undefined' &&
            typeof window.player !== 'undefined'
          ) {
            window.player && window?.player?.destroy();
          }
        } catch (error) {
          console.log('Error', error);
        }

        if (sdkLoadStatus && finalConfig) {
          setState((state) => ({ ...state, isSdkLoaded: true }));
          let player = new window.SWPlayer(finalConfig);
          window.player = player;
          masterVideo = document.querySelectorAll('.playerContainer')[0];
          setTimeout(() => {
            if (autoPlay) {
              window.player.play();
            }
          }, 1000);
          handlePlayerEvents(player);
          handleAdEvents(player);
        }
      }, 2000);
    });
  }
  // ============================event===================================
  // function handleSlikePlayerEvents(player, title, id, index) {
  //   const playerEvents = {
  //     onPlayerError: (player, eventName, eventData) => {
  //       ga('send', 'event', 'Video story', 'Error', 'story title');
  //     },
  //     onInit: (player, eventName, eventData) => {
  //       // window.scrollTo(0,1);
  //     },
  //     onVideoStarted: (player, eventName, eventData) => {
  //       ga('send', 'event', 'Video story', 'Play', 'story title');
  //     },
  //     onVideoResumed: (player, eventName, eventData) => {
  //       ga('send', 'event', 'Video story', 'Resume', 'story title');
  //     },
  //     onVideoPaused: (player, eventName, eventData) => {
  //       ga('send', 'event', 'Video story', 'Pause', 'story title');
  //     },
  //     onVolumeChange: (player, eventName, eventData) => {
  //       console.log('Player event ', eventName, eventData);
  //     },
  //     onVideoMuted: (player, eventName, eventData) => {},
  //     onVideoCompleted: (player, eventName, eventData) => {
  //       ga('send', 'event', 'Video story', 'Complete', 'story title');
  //     },
  //     onVideoEnded: (player, eventName, eventData) => {},
  //     onVideoProgress: (player, eventName, eventData) => {
  //       if (
  //         window &&
  //         window.player &&
  //         window.player.store &&
  //         window.player.store.isDockVisible === false
  //       ) {
  //         // window.scrollBy(0, -0.1);
  //       }
  //     },
  //     onVideoFullscreenchange: (player, eventName, eventData) => {},
  //     onDockEnter: (player, eventName, eventData) => {
  //       masterVideo = document.querySelectorAll('.playerContainer')[index];
  //       divCount = index;
  //     },
  //     onDockExit: () => {
  //       let rootElem = document.querySelector('.rootVideoContainer');

  //       if (rootElem) {
  //         rootElem.innerHTML = '';
  //       }
  //     },
  //   };

  //   handlePlayerEvents(player);
  //   function handlePlayerEvents(player) {
  //     function eventToFunction(player, eventName, data) {
  //       var funcName = eventName.replace('spl', 'on');
  //       data = Object.assign({}, data, player.store.video);
  //       if (playerEvents && typeof playerEvents[funcName] === 'function') {
  //         playerEvents[funcName](player, funcName, data);
  //       }
  //     }
  //     Object.keys(window.SWPlayer.Events).forEach((eventKey) => {
  //       var eventName = window.SWPlayer.Events[eventKey];
  //       player.on(eventName, eventToFunction.bind(null, player));
  //     });
  //   }
  // }
  //=============================event===================================

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
        setPlayPauseSvgPath();
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
      {videoData &&
        videoData.id &&
        (state.isSdkLoaded ? (
          <div
            className="playerContainer"
            id={`masterVideoPlayer${videoData.id}`}
            style={{
              height: 'initial',
              aspectRatio: '16/9',
              borderRadius: videoCircle,
              overflow: videoOverflow,
            }}
          ></div>
        ) : (
          <div
            onClick={playVideo}
            className="box-gradient"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <div
              className="player-icon"
              style={{
                position: 'absolute',
                top: '41%',
                left: 'calc(50% - 30px)',
                zIndex: 99,
                transform: "translate('-50%', '-50%')",
              }}
            >
              <PlayerIcon />
            </div>
            <LazyImage
              datasrc={`${process.env.NEXT_PUBLIC_PHOTO_API}/thumb/resizemode-4,msid-${msid},width-360/${msid}.jpg`}
              alt=""
              className="mb-5"
              style={{
                width: '100%',
                height: 'initial',
                aspectRatio: '16/9',
                borderRadius: videoCircle,
                position: 'relative',
                objectFit: 'cover',
              }}
            />
          </div>
        ))}
    </>
  );
}

Player.defaultProps = {
  youTubePlayerClose: () => {},
  handleClick: () => {},
};

export default langConsumer(Player);
