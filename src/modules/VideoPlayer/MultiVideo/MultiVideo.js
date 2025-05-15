import React, { useCallback, useEffect, useState } from 'react';
import {isMobile} from '@/utils/isMobile';
import { setGAValue } from '@/helpers/analytics/gaUtils';
import { CHANNEL_MSID } from '@/constants/index';

var playerConfig = [];
let vidoeObj = {};
function Player({ nextVideo=() => {}, isVideoStarted=() => {}, youTubePlayerClose= () => {},
handleClick= () => {} ,
onVideoStarted = () => {},
onVideoResumed= () => {},
onVideoPaused= () => {},
onVideoEnded= () => {},
onVideoCompleted= () => {},
}
) {
  const [msid, setMsid] = useState();
  const [id, setID] = useState();
  let masterVideo = '';
  useEffect(() => {
    // loadAdScript();
    setTimeout(() => {
      if (
        JSON.parse(localStorage.getItem('videoPlayerList')) != null &&
        typeof JSON.parse(localStorage.getItem('videoPlayerList')) == 'object'
      ) {
        let listing = JSON.parse(localStorage.getItem('videoPlayerList'))[0];

        if (process.env.ISCOMPANION_AD_ACTIVE == 'true') {
          if (!listing.isShort) {
            listing.config = {
              ...listing?.config,
              compAd: {
                width: 300,
                height: 250,
                container: document.getElementById(
                  `preroll-overlay${listing.id}`,
                ),
              },
            };
          }
        }
        if (window.spl && window.spl.load) {
          window.spl.load(listing?.config, function (status, config) {
            if (status) {
              JSON.parse(localStorage.getItem('videoPlayerList')).map(
                (item, index) => {
                  // if (isMobile() && !window['player' + item.id]) {
                  //   window['player' + item.id] = new window.SWPlayer(
                  //     item.config,
                  //   );
                  //   handleAdEvents(
                  //     window['player' + item.id],
                  //     item.id,
                  //     item.msid,
                  //     item.categoryType,
                  //     item.title,
                  //   );
                  //   handlePlayerEvents(
                  //     window['player' + item.id],
                  //     item.id,
                  //     item.msid,
                  //     item.categoryType,
                  //     item.title,
                  //   );
                  // }

                  if (process.env.ISCOMPANION_AD_ACTIVE == 'true') {
                    if (!item.isShort) {
                      item.config = {
                        ...item?.config,
                        compAd: {
                          width: 300,
                          height: 250,
                          container: document.getElementById(
                            `preroll-overlay${item.id}`,
                          ),
                        },
                      };
                    }
                  }

                  // if (!isMobile()) {
                  if (!window['player' + item.id]) {
                    window['player' + item.id] = new window.SWPlayer(
                      item.config,
                    );
                    handleAdEvents(
                      window['player' + item.id],
                      item.id,
                      item.msid,
                      item.categoryType,
                      item.title,
                    );
                    handlePlayerEvents(
                      window['player' + item.id],
                      item.id,
                      item.msid,
                      item.categoryType,
                      item.title,
                    );
                  }
                },
              );
            }
          });
        }
        const playerEvents = {
          onInit: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            // setGAValue('event', 'Player Error', {
            //   event_category: categoryType,
            //   event_label: title,
            // });
            setTimeout(() => {
              if (
                listing.isShort &&
                listing.id === slikeId &&
                window['player' + slikeId]
              ) {
                window['player' + slikeId].play();
              }
            }, 5);
          },
          onPlayerError: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            setGAValue('event', 'Player Error', {
              event_category: categoryType,
              event_label: title,
            });
          },
          onVideoStarted: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            isVideoStarted(eventData);

            setGAValue('event', 'Play', {
              event_category: categoryType,
              event_label: title,
            });
            onVideoStarted();
          },
          onVideoResumed: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            setGAValue('event', 'Resume', {
              event_category: categoryType,
              event_label: title,
            });
            onVideoResumed();
          },
          onVideoPaused: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            setGAValue('event', 'Pause', {
              event_category: categoryType,
              event_label: title,
            });
            onVideoPaused();
          },
          onVideoMuted: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            setGAValue('event', 'Mute', {
              event_category: categoryType,
              event_label: title,
            });
          },
          onVideoCompleted: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            setGAValue('event', 'Complete', {
              event_category: categoryType,
              event_label: title,
            });
            nextVideo();
            onVideoCompleted();
            let listingItem = JSON.parse(
              localStorage.getItem('videoPlayerList'),
            ).filter((i) => i.id === slikeId)[0];
            setTimeout(() => {
              if (
                listingItem?.isShort &&
                listingItem?.id === slikeId &&
                window['player' + slikeId]
              ) {
                window['player' + slikeId].load({ id: slikeId });
              }
            }, 0);
          },
          onVideoEnded: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            setGAValue('event', 'End', {
              event_category: categoryType,
              event_label: title,
            });
            nextVideo();
            onVideoEnded();
          },
          onVideoProgress: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            try {
              if (
                window['player' + slikeId]?.instanceManager?.dockMode &&
                categoryType != 'Live TV'
              ) {
                localStorage.setItem(
                  'pipPlayerData',
                  JSON.stringify({
                    title: title,
                    msid: msid,
                    id: slikeId,
                    categoryType: categoryType,
                    startTime: eventData?.currentTime,
                  }),
                );

                // docked video
                localStorage.setItem(
                  'dockedVideo',
                  JSON.stringify({
                    msid: msid,
                    id: slikeId,
                    categoryType: categoryType,
                    title: title,
                    startTime: eventData?.currentTime,
                  }),
                );
              }
            } catch (error) {
              console.log('Error', error);
            }
          },
          onDockEnter: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            localStorage.setItem('isDockOpen', true);
            let dom = localStorage.setItem(
              'dockedVideo',
              JSON.stringify({
                msid: msid,
                id: slikeId,
                categoryType: categoryType,
                title: title,
                startTime: eventData?.currentTime,
              }),
            );
            if (process.env.ISCOMPANION_AD_ACTIVE == 'true') {
              let listItem = JSON.parse(
                localStorage.getItem('videoPlayerList'),
              ).filter((i) => i.id === slikeId)[0];
              masterVideo = document.getElementById(
                `preroll-overlay${listItem.id}`,
              );
              if (masterVideo?.childNodes?.length > 0) {
                if (listItem?.isHome) {
                  masterVideo.classList.remove('rhs-player');
                }
                let rootElem;
                rootElem = !isMobile()
                  ? document.getElementsByClassName(
                      '__player __dock __dockBR __sml',
                    )[0]
                  : document.getElementsByClassName(
                      '__player __dock __dockBR __xS',
                    )[0];
                rootElem.appendChild(masterVideo);
              }
            }

            // setID(slikeId)
            if (isMobile()) {
              // scroll to top button position change accordingly botton sticky ad and pip open/close
              let el = document.getElementsByClassName(
                '__player __dock __dockBR __xS',
              );
              let elScrollTop = document.getElementById('scrollTop');
              let nativeShare = document.getElementById('native-share');
              if (
                document.getElementsByClassName(
                  '__player __dock __dockBR __xS',
                ) &&
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
          onUserClose: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            if (process.env.ISCOMPANION_AD_ACTIVE == 'true') {
              let companionAd = document?.getElementById(
                `preroll-overlay${slikeId}`,
              );
              if (companionAd && companionAd?.childNodes?.length > 0) {
                companionAd.style.display = 'none';
              }
            }
          },
          onDockExit: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            let rootElem = document.querySelector('.rootVideoContainer');

            if (process.env.ISCOMPANION_AD_ACTIVE == 'true') {
              let listItem = JSON.parse(
                localStorage.getItem('videoPlayerList'),
              ).filter((i) => i.id === slikeId)[0];
              let preroll = document.getElementById(
                `preroll-overlay${listItem.id}`,
              );
              if (preroll?.childNodes?.length > 0) {
                if (listItem?.isHome) {
                  masterVideo.classList.add('rhs-player');
                }
                let elem;
                elem = document.getElementById(`masterVideoPlayer${slikeId}`);
                elem.appendChild(preroll);
              }
            }

            if (rootElem) {
              rootElem.innerHTML = '';
            }
            try {
              if (window['player' + slikeId] != undefined) {
                if (localStorage.getItem('isDockOpen')) {
                  localStorage.removeItem('isDockOpen');
                }
                // if (localStorage.getItem('pipPlayerData')) {
                //   localStorage.removeItem('pipPlayerData');
                // }
                if (localStorage.getItem('dockedVideo')) {
                  localStorage.removeItem('dockedVideo');
                }
              }
            } catch (error) {
              console.log('Error', error);
            }
            // scroll to top and share button position change accordingly botton sticky ad and pip open/close
            if (isMobile()) {
              let id =
                document.getElementsByClassName(
                  '__player bottomStickyPip __md',
                ) ||
                document.getElementsByClassName(
                  '__player bottomStickyPip __sml',
                );
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
        };

        let adType = 'pre';
        const adEvents = {
          onAdImpression: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            if (eventData.type != undefined) {
              adType = eventData.type;
            }
            const ea = adType + '-adImpression';
            setGAValue('event', ea, {
              event_category: categoryType,
              event_label: title,
            });
          },
          onAdComplete: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            if (eventData.type != undefined) {
              adType = eventData.type;
            }
            const ea = adType + '-adComplete';
            setGAValue('event', ea, {
              event_category: categoryType,
              event_label: title,
            });
          },
          onAdSkip: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            if (eventData.type != undefined) {
              adType = eventData.type;
            }
            const ea = adType + '-adSkipped';
            setGAValue('event', ea, {
              event_category: categoryType,
              event_label: title,
            });
          },
          onAdError: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            if (eventData.type != undefined) {
              adType = eventData.type;
            }
            const ea = adType + '-adError';
            setGAValue('event', ea, {
              event_category: categoryType,
              event_label: title,
            });
          },
          onAdClick: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            if (eventData.type != undefined) {
              adType = eventData.type;
            }
            const ea = adType + '-adClick';
            setGAValue('event', ea, {
              event_category: categoryType,
              event_label: title,
            });
          },
          onAdResume: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            if (eventData.type != undefined) {
              adType = eventData.type;
            }
            const ea = adType + '-adResume';
            setGAValue('event', ea, {
              event_category: categoryType,
              event_label: title,
            });

            if (process.env.ISCOMPANION_AD_ACTIVE == 'true') {
              let companionAd = document?.getElementById(
                `preroll-overlay${slikeId}`,
              );
              if (companionAd?.childNodes?.length > 0) {
                if (companionAd) {
                  companionAd.style.display = 'block';
                }
              }
            }
          },
          onAdStart: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            if (eventData.type != undefined) {
              adType = eventData.type;
            }
            const ea = adType + '-adStart';
            setGAValue('event', ea, {
              event_category: categoryType,
              event_label: title,
            });
          },
          onAdPause: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
            if (eventData.type != undefined) {
              adType = eventData.type;
            }
            const ea = adType + '-adPaused';
            setGAValue('event', ea, {
              event_category: categoryType,
              event_label: title,
            });
          },
          onAdBlocked: (
            player,
            eventName,
            eventData,
            slikeId,
            msid,
            categoryType,
            title,
          ) => {
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
        function handlePlayerEvents(
          player,
          slikeId,
          msid,
          categoryType,
          title,
        ) {
          function eventToFunction(player, eventName, data) {
            var funcName = eventName.replace('spl', 'on');
            data = Object.assign({}, data, player.store.video);
            if (playerEvents && typeof playerEvents[funcName] === 'function') {
              playerEvents[funcName](
                player,
                funcName,
                data,
                slikeId,
                msid,
                categoryType,
                title,
              );
            }
          }
          Object.keys(window.SWPlayer.Events).forEach((eventKey) => {
            var eventName = window.SWPlayer.Events[eventKey];
            player.on(eventName, eventToFunction.bind(null, player));
          });
        }
        function handleAdEvents(player, slikeId, msid, categoryType, title) {
          function eventToFunction(player, eventName, data) {
            var funcName = eventName.replace('spl', 'on');
            var eventData = data || {};
            if (adEvents && typeof adEvents[funcName] === 'function') {
              adEvents[funcName](
                player,
                funcName,
                eventData,
                slikeId,
                msid,
                categoryType,
                title,
              );
            }
          }
          Object.keys(window?.SWPlayer?.AdEvents).forEach((eventKey) => {
            var eventName = window.SWPlayer.AdEvents[eventKey];
            player.on(eventName, eventToFunction.bind(null, player));
          });
        }
      }
    }, 500);
    return () => {
      try {
        if (localStorage.getItem('isDockOpen')) {
          let dockedVideo = JSON.parse(localStorage.getItem('dockedVideo'));
          if (dockedVideo) {
            localStorage.setItem(
              'pipPlayerData',
              JSON.stringify({
                title: dockedVideo?.title,
                msid: dockedVideo?.msid
                  ? dockedVideo?.msid
                  : CHANNEL_MSID[`${dockedVideo?.id}`],
                id: dockedVideo?.id,
                categoryType: dockedVideo?.categoryType,
                startTime: dockedVideo?.startTime,
              }),
            );
          }
        }
      } catch (error) {
        console.log('Error', error);
      }

      if (localStorage.getItem('isDockOpen') != undefined) {
        let dockedVideoData = JSON.parse(localStorage.getItem('dockedVideo'));
        let dockedDom = localStorage.getItem('dockedDom');

        // let rootElem = document.querySelector('.rootVideoContainer');

        // if (rootElem.innerHTML == '' && masterVideo && dockedVideoData) {
        //   rootElem.setAttribute('data-msid', dockedVideoData.msid);
        //   rootElem.appendChild(masterVideo);
        // }
      }

      try {
        if (localStorage.getItem('videoPlayerList')) {
          JSON.parse(localStorage.getItem('videoPlayerList')).map(
            (item, index) => {

              if (window[`player${item?.id}`]) {
                // window[`player${item?.id}`]?.destroy();
                delete window['player' + item.id];

              }

            },
          );
          if (localStorage.getItem('videoPlayerList')) {
            //localStorage.removeItem('videoPlayerList');
          }
        }
      } catch (error) {
        console.log('Error ', error);
      }

      /*JSON.parse(localStorage.getItem('videoPlayerList')).map((item, index) => {
        if (window['player' + item.id]) {
          delete window['player' + item.id];
        }
      });*/

      // if (localStorage.getItem('dockedVideo')) {
      //   localStorage.removeItem('dockedVideo');
      // }
      //if (localStorage.getItem('videoPlayerList')) {
      // localStorage.removeItem('videoPlayerList');
      //}
    };
  }, []);

  return <></>;
}

// Player.defaultProps = {
//   youTubePlayerClose: () => {},
//   handleClick: () => {},
//   nextVideo: () => {},
//   isVideoStarted: () => {},
// };

export default Player;
