import React, { useEffect, useState } from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import style from './ShortVideosComponet.module.scss';
import { getBaseUrlNew, removeHtmlTags } from '@/utils/common';
import {
  ShortMuteIcon,
  ShortPauseIcon,
  ShortPlayIcon,
  ShortShareIcon,
  ShortSpeakerIcon,
  ShareFacebookSmall,
  ShareTwitterSmall,
  ShareWhatsappSmall,
  ShareLinkedInSmall,
  DarkFbIcon,
  DarkTwitterIcon,
  DarkLinkIcon,
  DarkWhatsAppIcon,
} from '@/components/common/Svg/Svg';
import { setGAValue } from '@/helpers/analytics/gaUtils';
import { SOCIAL_SHARE_LINK } from '@/constants/index';
import { getTargetURL, getSlug, getBaseUrl } from '@/utils/common';

let shareData = {};

const ShareOption = ({ type, title, mainData, lang }) => {
  const [shareObj, setShareObj] = useState();
  useEffect(() => {
    SOCIAL_SHARE_LINK &&
      Object.keys(SOCIAL_SHARE_LINK).map((item) => {
        let iconObj = {
          type: item,
          title: title,
          url: SOCIAL_SHARE_LINK,
          href: getBaseUrlNew(lang?.channel) + mainData,
        };
        shareData[item] = iconObj;
      });
    setShareObj(shareData);
  }, []);
  const shareOnFacebook = () => {
    setGAValue('event', 'click', {
      event_category: 'Share',
      event_label: `facebook | ${window.location}`,
    });
  };
  const shareOnTwitter = () => {
    setGAValue('event', 'click', {
      event_category: 'Share',
      event_label: `Twitter | ${window.location}`,
    });
  };
  const shareOnLinkedIn = () => {
    setGAValue('event', 'click', {
      event_category: 'Share',
      event_label: `LinkedIn | ${window.location}`,
    });
  };
  const shareOnWhatsapp = () => {
    setGAValue('event', 'click', {
      event_category: 'Share',
      event_label: `WhatsApp | ${window.location}`,
    });
  };
  function showIcon(type, size) {
    switch (type) {
      case 'FB':
        return size != 'small' ? (
          <>
            <span onClick={shareOnFacebook}>
              <DarkFbIcon key={'fb'} />
            </span>
          </>
        ) : (
          <>
            <span onClick={shareOnFacebook}>
              <ShareFacebookSmall />
            </span>
          </>
        );
      case 'TWITTER':
        return size != 'small' ? (
          <>
            <span onClick={shareOnTwitter}>
              <DarkTwitterIcon key={'tw'} />
            </span>
          </>
        ) : (
          <>
            <span onClick={shareOnTwitter}>
              <ShareTwitterSmall />
            </span>
          </>
        );
      case 'LINKEDIN':
        return size != 'small' ? (
          <>
            <span onClick={shareOnLinkedIn}>
              <DarkLinkIcon key={'lkin'} />
            </span>
          </>
        ) : (
          <>
            <span onClick={shareOnLinkedIn}>
              <ShareLinkedInSmall />
            </span>
          </>
        );
      case 'WHATSAPP':
        return size != 'small' ? (
          <>
            <span onClick={shareOnWhatsapp}>
              <DarkWhatsAppIcon key={'wp'} />
            </span>
          </>
        ) : (
          <>
            <span onClick={shareOnWhatsapp}>
              <ShareWhatsappSmall />
            </span>
          </>
        );
      default:
        return '';
    }
  }
  return (
    <div className={style['tnn__share-icon-g']}>
      {shareObj &&
        Object.values(shareObj).map((item, index) => {
          return (
            <a
              key={index}
              target="_blank"
              rel="noreferrer nofollow"
              href={
                item.type && item.type == 'TWITTER'
                  ? item.url[item.type] +
                    encodeURIComponent(item.title) +
                    '&url=' +
                    encodeURIComponent(item.href)
                  : item.url[item.type] + encodeURIComponent(item.href)
              }
            >
              {showIcon(item.type, type)}
            </a>
          );
        })}
    </div>
  );
};

let mediaIdarr = [];

const ShortVideoFooter = ({
  title,
  description,
  mediaId,
  synopsis,
  mainData,
  setMute,
  isMute,
  currentSlikeRef,
  headingType,
  lang,
}) => {
  const [duration, setDuration] = useState('');
  const [totalDuration, settotalDuration] = useState('');
  const [isCompleted, setCompleted] = useState(false);
  const [isControlShow, setControlShow] = useState(false);
  const [isPause, setPause] = useState(false);
  const [isShareVisible, setSharevisible] = useState(false);
  const [isVideoStarted, setVideoStarted] = useState();

  useEffect(() => {
    localStorage.removeItem('isMute');
  }, []);
  useEffect(() => {
    mediaIdarr.push(mediaId);
    if (window?.['player' + mediaId]?.store?.video?.paused !== true) {
      setInterval(() => {
        updateDurationHandler();
      });

      if (
        window?.['player' + mediaId]?.store?.video?.muted !== 'undefined' &&
        window?.['player' + mediaId]?.store?.video?.muted
      ) {
        setMute(true);
        // localStorage.setItem('isMute', true);
      } else {
        setMute(false);
        // localStorage.setItem('isMute', false);
      }
    }
  });

  const speakerHandler = () => {
    if (window?.['player' + mediaId]?.store?.video?.started === true) {
      if (isMute) {
        mediaIdarr?.forEach((item) => {
          setMute(true);
          try {
            window['player' + item]?.unmute();
          } catch (err) {
            console.log(err);
          }
        });
      } else {
        mediaIdarr?.forEach((item) => {
          setMute(false);
          try {
            window['player' + item]?.mute();
          } catch (err) {
            console.log(err);
          }
        });
      }
    }
  };

  const updateDurationHandler = () => {
    try {
      setDuration(window?.['player' + mediaId]?.store?.video?.currentTime);
      settotalDuration(window?.['player' + mediaId]?.store?.video?.duration);
      setVideoStarted(window?.['player' + mediaId]?.store?.video?.started);
      // setMute(window?.['player' + mediaId]?.store?.video?.muted);
      setCompleted(window?.['player' + mediaId]?.store?.video?.completed);
    } catch (error) {
      console.error(error);
    }
  };

  const playAndPauseHandler = () => {
    let playerId = window['player' + mediaId];
    if (playerId?.store?.video?.paused) {
      playerId?.play();
      setPause(true);
    } else {
      playerId?.pause();
      setPause(false);
    }
    setControlShow(true);
    setTimeout(() => {
      setControlShow(false);
    }, 3000);
  };
  const secondsToHms = (time) => {
    const minutes = '0' + Math.floor(time / 60);
    const seconds = '0' + (time - minutes * 60);
    return minutes.substr(-2) + ':' + seconds.substr(-2);
  };

  // if user change tab on mobile then video behaviour
  useEffect(() => {
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        window['player' + currentSlikeRef.current]?.play();
      } else {
        window['player' + currentSlikeRef.current]?.pause();
      }
    });
    return () => {
      window.removeEventListener('visibilitychange', null);
    };
  }, []);

  // let timimg = duration ? (
  //   <p className={style['timing']}>
  //     <small>
  //       {secondsToHms(Math.floor(duration))} /{' '}
  //       {secondsToHms(Math.floor(totalDuration))}
  //     </small>
  //   </p>
  // ) : (
  //   ''
  // );

  return (
    <>
      {!isCompleted ? (
        <button
          className={style['playPause']}
          onClick={() => playAndPauseHandler()}
        >
          {isControlShow && (isPause ? <ShortPauseIcon /> : <ShortPlayIcon />)}
        </button>
      ) : (
        ''
      )}
      <div className={style['ft-box']}>
        <div className={style['ft-content']}>
          {headingType === 'h1' ? <h1>{title}</h1> : <h4>{title}</h4>}
          {/* <p>{description}</p> */}
        </div>

        {/* MUTE  UNMUTE ICONS */}
        <div className={style['icons']}>
          <button onClick={() => speakerHandler()}>
            {isMute ? <ShortMuteIcon /> : <ShortSpeakerIcon />}
          </button>

          {/* SHARE FUNCTION */}
          <div className={style['share-parent']}>
            <button onClick={() => setSharevisible(!isShareVisible)}>
              <ShortShareIcon />
            </button>
            {isShareVisible ? (
              <ShareOption
                type="small"
                mainData={getTargetURL({
                  ...(mainData?.overridelink && {
                    overrideString: mainData.overridelink,
                  }),
                  normalString: `short-videos/${mainData.seopath}-${getSlug(
                    mainData.cmstype,
                  )}-reels-${mainData?.msid}`,
                })}
                title={removeHtmlTags(mainData?.title)}
                lang={lang}
              />
            ) : (
              ''
            )}
          </div>
        </div>

        {/* TIMING */}
        {/* <div style={{ width: '100%', height: '25px' }}>{timimg}</div> */}
      </div>
    </>
  );
};

export default ShortVideoFooter;
