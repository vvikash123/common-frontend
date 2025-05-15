import React, { useState, useEffect, useRef } from 'react';
import s from './ShortVideosComponet.module.scss';
import ShortVideoHeader from './ShortVideoHeader';
import ShortVideoFooter from './ShortVideoFooter';
import Slider from 'react-slick';
import MultiVideoPlayer from '@/components/common/MultiVideoPlayer/MultiVideoPlayerShort';
import {
  removeHtmlTags,
  getGoogleTagCustomDimensions,
  setPageTargetData,
} from '@/utils/common';
import {
  debounce
} from '@/utils/common';
import { CATEGORY_TYPE_SHORT_VIDEO } from '@/constants/index';
import {
  sendGAPageView,
  setGAValue,
} from '@/helpers/analytics/gaUtils';
import Progressbar from './Progressbar';

const ShortVideo = ({
  responseData,
  navigation
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

  const sliderRef = useRef();
  const [isMute, setMute] = useState(false);
  const [aList, setAList] = useState(1);
  const [pageCount, setPageCount] = useState(12);
  const currentSlikeRef = useRef(null);
  const mainData = data?.data;
  const numberOfvideos = mainData?.length;

  useEffect(() => {
    const currentArticleData = mainData?.[0];
    setGAValue('event', 'Shorts scroll depth', {
      event_category: currentArticleData?.msid,
      event_label: 0,
    });
    currentSlikeRef.current = currentArticleData?.media?.id;
  }, []);

  const setHandlePageTargetingDataFn = (pagetargetObj) => {
    if (typeof pSUPERFLY !== 'undefined') {
      pSUPERFLY.virtualPage({
        sections: pagetargetObj?.categoryString,
        authors: pagetargetObj?.createdBy,
      });
    }
  };

  const updateUrlAndTitle = (oldId, id) => {
    const currentArticleData = data?.data?.[id];
    const { title, seopath, msid, seo, shortLink = '' } = currentArticleData;
    const correctSeoPathArr = seopath;
    const newPath = `/${correctSeoPathArr}-reels-${msid}`;
    window.document.title = title;
    sendGAPageView(newPath, title, getGoogleTagCustomDimensions(info, msid));
    window.history?.replaceState(null, title, newPath);
    if (typeof window !== 'undefined' && typeof window.fireComscore === 'function') {
      debounce(window?.fireComscore(), 50);
    }
    setGAValue('event', 'Shorts scroll depth', {
      event_category: msid,
      event_label: id,
    });
    let pagetargetObj = setPageTargetData(
      'short-videos',
      '',
      navigation,
      data?.data,
      seo,
      msid,
    );
    setHandlePageTargetingDataFn(pagetargetObj);
  };

  const next = () => {
    if (aList !== 1) {
      sliderRef?.current?.slickPrev();
    }
  };

  const previous = () => {
    if (numberOfvideos !== aList) {
      sliderRef?.current?.slickNext();
    }
  };

  try {
    if (typeof document !== 'undefined') {
      document.onkeydown = function (e) {
        switch (e.keyCode) {
          case 38:
            next();
            break;
          case 40:
            previous();
            break;
        }
      };
    }
  } catch (error) {
    console.error(error);
  }

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    swipeToSlide: true,
    afterChange: function (oldIndex) {},
    beforeChange: function (oldId, id) {
      window['player' + data?.data[oldId]?.media?.id]?.pause();

      if (pageCount === id) {
        onLoadMore();
        setPageCount((prev) => prev + 10);
      }
      let isMuteValue = localStorage.getItem('isMute');
      setAList(id + 1);
      if (data?.data[id].adCode === undefined) {
        updateUrlAndTitle(oldId, id);
        try {
          if (data?.data[id]?.media?.id) {
            window['player' + data?.data[oldId]?.media?.id]?.pause();
            window['player' + data?.data[id]?.media?.id]?.play();
          }
          if (data.data[id]?.media?.isYoutube === 1 && isMuteValue === 'true') {
            setTimeout(() => {
              window['player' + data?.data[id]?.media?.id].mute();
            }, 1100);
          }
        } catch (error) {
          console.error(error);
        }
      }
      currentSlikeRef.current = data?.data[id]?.media?.id;
    },
  };

  const handleVideoEnded = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPlay();
    }
  };

  if (!mainData) {
    return '';
  }
  return (
    <>
    <div className={s['short-overlay']}>
        <div className={s['short-wrap']}>
          <ShortVideoHeader />
          <div className={s['swiper']}>
            <Slider ref={sliderRef} {...settings}>
              {mainData?.map((singlePlayer, index) => {
                if (singlePlayer?.adCode) {
                  return (
                    <div key={singlePlayer?.msid} className={s['swiper-item']}>
                      <div style={{ height: '580px' }}>
                        {/* <AdCaller
                          isShortAd={true}
                          {...singlePlayer}
                          className={`${s.bottomStickyAd}`}
                        /> */}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={singlePlayer?.msid} className={s['swiper-item']}>
                    <MultiVideoPlayer
                      data={singlePlayer}
                      index={index}
                      idx={index}
                      articleLength={numberOfvideos}
                      mainData={singlePlayer}
                      msid={singlePlayer?.msid}
                      videoCount={numberOfvideos}
                      style={s}
                      isAutoplay={true}
                      isLivetvWidget={true}
                      isDock={false}
                      aspectRatio="9/16"
                      isShort={true}
                      skipAd={true}
                      headless={true}
                      categoryType={CATEGORY_TYPE_SHORT_VIDEO}
                      onEnded={handleVideoEnded}
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
                    <Progressbar mediaId={singlePlayer?.media?.id} />
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortVideo;
