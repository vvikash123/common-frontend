import React, { useState, useEffect, useRef } from 'react';
import s from './ShortVideosComponet.module.scss';
import ShortVideoHeader from './ShortVideoHeader';
import ShortVideoFooter from './ShortVideoFooter';
import swiperStyle from 'swiper/swiper-bundle.css';
import { CATEGORY_TYPE_SHORT_VIDEO } from '@/constants/index';
import Swiper from 'swiper';
import { debounce, getGoogleTagCustomDimensions, slikePlayerAndEvent } from '@/utils/common';
import { setGAValue, sendGAPageView } from '@/helpers/analytics/gaUtils';
import MultiVideoPlayer from '@/components/common/MultiVideoPlayer/MultiVideoPlayerShort';
import { removeHtmlTags } from '@/utils/common';

const ShortVideo = ({
  responseData,
  onLoadMore,
  navigation,
  isMobile,
  setHandlePageTargetingDataFn,
  isGlance,
}) => {

  let userData;
  try {
    userData = JSON.parse(localStorage.getItem('userInfo'));
  } catch (err) {}

  const userInfo = {
    firstName: userData?.data?.firstName,
    lastName: userData?.data?.lastName,
    primaryEmail: userData?.data?.primaryEmail,
    ssoid: userData?.data?.ssoid,
    uid: userData?.data?.ssoid,
  };

  const data = responseData?.sections?.short_video_show || [];
  const msid = responseData?.sections?.short_video_show?.seo?.msid;
  const info = { data, navigation, userInfo, msid };

  const mainData = data?.data;
  const numberOfvideos = mainData?.length;
  const [isMute, setMute] = useState(false);
  const [currentSlikeId, setCurrentSlikeId] = useState();
  const muteRef = useRef(null);
  const currentSlikeRef = useRef(null);
  let videoarr = [];
  let increment = 0;

  useEffect(() => {
    const currentArticleData = mainData?.[0];
    setGAValue('event', 'Shorts scroll depth', {
      event_category: currentArticleData?.msid,
      event_label: 0,
    });
    currentSlikeRef.current = currentArticleData?.media?.id;
  }, []);

  mainData && mainData?.forEach((result, i) => {
    if (result?.msid) {
      videoarr.push(result);
    }
  });

  let pageCount = 10;

  const playPauseOnScroll = (id) => {
    if (pageCount === id) {
      pageCount += 15;
      onLoadMore();
      slider.update();
      slider.updateSlides();
      slider.updateSlidesClasses();
    }
    if (muteRef.current) {
      window['player' + data?.data[id]?.media?.id]?.mute();
    } else {
      window['player' + data?.data[id]?.media?.id]?.unmute();
    }
  };

  const updateUrlAndTitle = (id) => {
    if (data?.data[id].adCode === undefined) {
      const currentArticleData = data?.data[id];
      const { title, seopath, msid, seo, shortLink = '' } = currentArticleData;
      const correctSeoPathArr = seopath;
      let newPath = `/${correctSeoPathArr}-reels-${msid}`;
      let url = window?.document?.URL?.split('?');
      if (localStorage.getItem('shortVideoList')) {
        slikePlayerAndEvent(currentArticleData);
      }
      if (url?.length > 1 && url[1]) {
        newPath = newPath + `?${url[1]}`;
      }
      window.document.title = title;
      sendGAPageView(newPath, title, getGoogleTagCustomDimensions(info, msid));

      if (typeof window && typeof window.fireComscore === 'function') {
        debounce(window.fireComscore(), 50);
      }
      window.history.replaceState(null, title, newPath);
      setGAValue('event', 'Shorts scroll depth', {
        event_category: msid,
        event_label: id,
      });
      let pagetargetObj = setPageTargetData(
        'short-videos',
        '',
        navigation,
        data.data,
        seo,
        msid,
      );
      setHandlePageTargetingDataFn(pagetargetObj);
      !isGlance &&
        typeof pSUPERFLY !== undefined &&
        pSUPERFLY.virtualPage({
          sections: pagetargetObj?.categoryString,
          authors: pagetargetObj?.createdBy,
        });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const slider = new Swiper('.swiper-container', {
        init: true,
        slidesPerView: 1,
        direction: 'vertical',
        observer: true,
        autoHeight: true,
        on: {
          init: function (swiper) {
            const slider = document.querySelector('.process-slider');
            slider.style.height = '100vh';
          },
          slideChange: function (swiper) {
            const slider = document.querySelector('.process-slider');
            slider.style.height = '100vh';
          },
        },
      });

      slider.on('slideNextTransitionEnd', function (e) {
        playPauseOnScroll(e.realIndex);
        updateUrlAndTitle(e.realIndex);
        window['player' + data?.data[e.realIndex]?.media?.id]?.play();
        window['player' + data?.data[e.previousIndex]?.media?.id]?.pause();
        currentSlikeRef.current = data?.data[e.realIndex]?.media?.id;
      });

      slider.on('slidePrevTransitionEnd', function (e) {
        playPauseOnScroll(e.realIndex);
        updateUrlAndTitle(e.realIndex);
        window['player' + data?.data[e.realIndex]?.media?.id]?.play();
        window['player' + data?.data[e.previousIndex]?.media?.id]?.pause();
        currentSlikeRef.current = data?.data[e.realIndex]?.media?.id;
      });
    }
  }, [data]);

  const isVideoStarted = (muteStatus) => {
    if (isMute === null) {
      setMute(muteStatus?.muted);
      muteRef.current = muteStatus?.muted;
    }
  };

  if (!mainData && mainData?.length <= 0) {
    return '';
  }

  return (
    <>
      <div style={{ height: '100%' }}>
        <ShortVideoHeader />
        <div className="swiper-container process-slider">
          <div className="swiper-wrapper">
            {mainData?.map((singlePlayer, index) => {
              if (singlePlayer?.msid) {
                increment = increment + 1;
              }
              if (singlePlayer?.adCode) {
                return (
                  <div key={singlePlayer?.msid} className="swiper-slide">
                    {/* <AdCaller
                      isShortAd={true}
                      {...singlePlayer}
                      className={`${s.bottomStickyAd}`}
                    />
                    <div className={s['drop-drown-arrow']}>
                      <p>Scroll Down</p>
                      <span
                        className={`${s['scroll-down-link']} ${s['scroll-down-arrow']}`}
                      ></span>
                    </div> */}
                  </div>
                );
              }
              return (
                <div key={singlePlayer.msid} className="swiper-slide">
                  <MultiVideoPlayer
                    data={singlePlayer}
                    index={index}
                    idx={index}
                    articleLength={increment}
                    mainData={singlePlayer}
                    msid={singlePlayer?.msid}
                    videoCount={videoarr?.length}
                    style={s}
                    isAutoplay={true}
                    isLivetvWidget={true}
                    isDock={false}
                    aspectRatio="9/16"
                    isShort={true}
                    skipAd={true}
                    headless={true}
                    isMute={isMute}
                    isYoutube={singlePlayer?.media?.isYoutube}
                    categoryType={CATEGORY_TYPE_SHORT_VIDEO}
                    isVideoStarted={(status) => isVideoStarted(status)}
                    isMobile={isMobile}
                  />
                  <ShortVideoFooter
                    title={removeHtmlTags(singlePlayer?.title || '')}
                    description={removeHtmlTags(
                      singlePlayer?.secondarysummary || '',
                    )}
                    mediaId={singlePlayer?.media?.id}
                    synopsis={singlePlayer?.synopsis}
                    mainData={singlePlayer}
                    setMute={setMute}
                    isMute={isMute}
                    currentSlikeRef={currentSlikeRef}
                    headingType={singlePlayer?.headingType || ''}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortVideo;
