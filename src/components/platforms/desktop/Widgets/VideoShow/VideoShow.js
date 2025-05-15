import { GOOGLE_AD_DESK } from '@/constants/index';
import Advertisement from '@/components/ads/ads';
import React, { useEffect, useState } from 'react';
import { CATEGORY_TYPE_VIDEO } from '@/constants/index';
import { commonProperties, MIN_VIDEO_LENGTH } from '@/constants/index';
import style from './VideoShow.module.scss';
import MultiVideoPlayer from '@/components/common/MultiVideoPlayer/MultiVideoPlayer';
import { useRouter } from 'next/router'; // import the useRouter hook
import { getNewImageUrl, removeHtmlTags, displayTime, generateUrlPath, getTargetURL, setPageTargetData, getGoogleTagCustomDimensions } from '@/utils/common';
import SpriteIcon from '@/components/common/Svg/SpriteIcon';
import { sendGAEvent } from '@/helpers/analytics/gaUtils';

function VideoShow(props) {
  const {
    data = {},
    msid,
    nextmsid,
    navigation,
    ad,
    userInfo,
    translations,
    autoPlayList,
    imageWidth,
  } = props;

  const router = useRouter(); // use the useRouter hook
  let [value] = data && data.data;
  const [nextPlayer, setNextPlayer] = useState(false);
  const [main, setMain] = useState(value);
  const [videoId, setVideoId] = useState(false);
  const [nextPlay, setNextPlay] = useState(
    data?.data?.filter((item) => item.cmstype === "MEDIAVIDEO")
  );

  const calculateTime = (item = {}) => {
    if (item?.media?.durationms > MIN_VIDEO_LENGTH) {
      return displayTime(item.media.durationms);
    }
  };

  useEffect(() => {
    setMain(main);
    setNextPlayer(false);
    if (main && main.media && main.media.rmname === 'Kaltura') {
      setVideoId(true);
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
    // setShowFullContent(false);
  }, [nextmsid, nextPlayer]);

  useEffect(() => {
    setMain(value);
    setVideoId(true);
  }, [msid]);

  let index = 0;
  const mainData = main && main;
  const charLimit = 1000;
  let continue_watching = [];

  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    continue_watching = JSON.parse(localStorage.getItem('continue_watching')) || [];
  }
  continue_watching =
    continue_watching && continue_watching.length
      ? continue_watching.filter((ele) => {
        return ele.msid === mainData.msid;
      })
      : [];

  const videoStartTime =
    continue_watching && continue_watching.length
      ? continue_watching[0].media.startTime
      : '';

  let moreVideosFromLabel = navigation?.sub_sub_category
    ? navigation.sub_sub_category
    : navigation?.sub_category
      ? navigation?.sub_category
      : navigation?.category
        ? navigation.category
        : '';
  moreVideosFromLabel = `${
    translations?.['MORE_VIDEOS_FROM']
  } ${moreVideosFromLabel?.split('-')?.join(' ')}`;

  const handleUpNextClick = (seopath, msid) => {
    router.push(`${seopath}-video-${msid}`);
  };

  const nextVideo = () => {
    if (
      data?.data?.length > 1
    ) {
      const currentAutoplayIndex = nextPlay.findIndex(
        (o) => o.msid === main.msid
      );
      const nextVideoToPlay =
        nextPlay[
        currentAutoplayIndex >= nextPlay.length - 1 ? 0 : currentAutoplayIndex + 1
        ];

      setMain(nextVideoToPlay);
      const newPath = `${getTargetURL({
        normalString: nextVideoToPlay?.seopath,
      })}-video-${nextVideoToPlay?.msid}`;
      window.history.replaceState(null, nextVideoToPlay?.title, newPath);
      setNextPlayer(true);

      let pagetargetObj = setPageTargetData(
        'video',
        '',
        navigation,
        data.data,
        null,
        nextVideoToPlay?.msid,
      );
      setHandlePageTargetingDataFn(pagetargetObj);

      let newMsid = nextVideoToPlay?.msid;
      let info = { data, navigation, userInfo, newMsid };
      sendGAEvent(
        window?.location?.pathname,
        nextVideoToPlay?.title,
        getGoogleTagCustomDimensions(info, newMsid),
      );
    }
  };

  return (
    mainData && (
      <>
        <div className={style['tnn__container']}>
          <div className={style['tnn_video-show-grid']}>
            <div
              className={`${style['article-banner']}  ${style['show_videotnn']}`}
              id={mainData.msid}
              key={mainData.msid}
            >
              {mainData.media &&
                mainData.media?.id &&
                mainData.media.rmname === 'Kaltura' ? (
                <div className={style['tnn_video-Top']}>
                  <div data-attr-slk={mainData.media.id} title={mainData.msid}>
                    {videoId ? (
                      <MultiVideoPlayer
                        data={{
                          media: {
                            id: mainData.media.id,
                            msid: mainData.msid,
                          },
                        }}
                        index={11}
                        style={style}
                        articleLength={1}
                        mainData={mainData}
                        videoCount={1}
                        channelTitle={mainData.media.id}
                        categoryType={CATEGORY_TYPE_VIDEO}
                        videoId={{
                          id: mainData.media?.id || '',
                          startTime: videoStartTime || '',
                        }}
                        msid={mainData.msid}
                        playerId={mainData.media?.id}
                        nextVideo={nextVideo} // pass the nextVideo function
                        isAutoplay={''}
                        placeholder
                        thumbImg={getNewImageUrl({
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
                      />
                    ) : null}


                    <div className={style['video-Hover']}

                    >
                      {nextPlay && nextPlay?.slice(1, 15).map((item, index) => (

                        <div key={index} className={style['video-Row']}
                        >
                          <a
                            key={`${item?.msid}`}
                            href={generateUrlPath(item)}
                            title={`${removeHtmlTags(`${item?.title}`)}`}
                          >
                            <div className={style['video-Row-img']}>
                              <img src={
                                getNewImageUrl({
                                  msid: item?.msid || null,
                                  imageSize: item?.imageSize || item?.thumbsize || '',
                                  imgWidth: imageWidth || null,
                                  imgHeight: 203,
                                  is1x1Img: false,
                                  isArticleBanner: false,
                                  updatedAt: item?.updatedate ? item?.updatedate : '',
                                })
                              } alt={`${item?.title}`} />
                              <span>{calculateTime(item)}</span>
                            </div>
                            <h2> <SpriteIcon IconName="blackRoundPlayIcon" /> </h2>
                          </a>
                        </div>
                      ))

                      }
                    </div>

                  </div>

                </div>
              ) : (
                <div data-attr-slk={value?.media?.id} title={mainData.msid}>
                  <iframe
                    src={`https://www.youtube.com/embed/${mainData?.media?.id}`}
                    title="YouTube video player"
                    width="100%"
                    height="500px"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <h1 className={style['video-headingwrap']}>
                {mainData.title}
              </h1>
              <div className={style['f-s-15']}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: mainData.synopsis,
                  }}
                ></div>
              </div>
              <div className={`${style['user-profile']} ${style['justify']}`}>
              </div>

            </div>
            {/* <div className={style['tnn__video-rhs']}>
              {ad && Object.keys(ad).length > 0 ? (
                <div>
                  <Advertisement src={ad || GOOGLE_AD_DESK['about_us']['btf']} />
                </div>
              ) : null}
            </div> */}

          </div>
        </div>
      </>
    )
  );
}

export default VideoShow;
