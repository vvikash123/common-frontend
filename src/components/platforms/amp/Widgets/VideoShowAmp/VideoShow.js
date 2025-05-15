import NewsSchema from '@/helpers/seo/schemas/NewsArticleSchema';
import VideoSchema from '@/helpers/seo/schemas/VideoSchema';
import WebPage from '@/helpers/seo/schemas/WebPage';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { isAMPRequest } from '@/utils/serverUtils';
import {
  getSlug,
  getTargetURL,
  getGoogleTagCustomDimensions,
  isfirstphase,
} from '@/utils/common';
import {
  SOCIAL_SHARE_LINK,
  CATEGORY_TYPE_VIDEO,
} from '@/constants/index';
// import AuthorDetailWidget from '@/components/common/Widget/AuthorDetailWidget';
// import VideoStory from '@/Story/VideoStory';
import style from './VideoShow.module.scss';
import { getSEOFriendlyDate } from '@/utils/dateUtils';
import {
  sendGAPageView,
  setGAValue,
  
} from '@/helpers/analytics/gaUtils';
import SvgIcon from '@/components/common/Svg/SvgIcon';
import {
 
  setPageTargetData,
} from '@/utils/common';
import MultiVideoPlayer from '@/components/common/MultiVideoPlayer/MultiVideoPlayer';
// import Heading from '@/Heading/Heading';
import {
  getBaseUrlNew,
 
} from '@/utils/common';
function VideoShow({
  data={},
  getMSID,
  navigation,
  msid,
  nextmsid,
  userInfo,
  seo,
  className='',
  leadStory=false,
  imageSize=undefined,
  onLoadMore=undefined,
  inserts=[],
  dataGA={ },
  dataLoading=false,
  breadNavigation,
  breadSeopath,
  seoDataInfo,
  pathname,
  isGlance,
  isIzooto=false,
  isAppView=false,
  setHandlePageTargetingDataFn,
  translations,
  isEnglish,
  langConstant = {},
  lang,
  ad,
  ads
}) {
  const info = { data, navigation, userInfo, msid };
  let [value] = data && data.data;
  const [autoPlay, setAutoPlay] = useState(value?.leadVideoAutoPlay ?? false);
  const [showFullContent, setShowFullContent] = useState(true);
  const [nextPlayer, SetNextPlayer] = useState(false);
  const [main, SetMain] = useState(value);
  const [videoId, SetVideoId] = useState(false);
  const [articleSortLink, setArticleSortLink] = useState(
    value ? value?.shortLink : '',
  );
  // const [articleAppFlyerLink, setArticleAppFlyerLink] = useState(
  //   getBaseUrlNew(lang?.channel) + pathname,
  // );

  let sortLinkAmp = value ? value?.shortLink : '';
  const [autoPlayList, setAutoPlayList] = useState(
    data?.data?.slice(1, 5) || [],
  );

  const shareOnFacebook = () => {
    setGAValue('event', 'click', {
      event_category: 'Share',
      event_label: `facebook | ${window.location}`,
    });
  };
  const shareOnTwitter = () => {
    setGAValue('event', 'click', {
      event_category: 'Share',
      event_label: `twitter | ${window.location}`,
    });
  };
  const shareOnLinkedIn = () => {
    setGAValue('event', 'click', {
      event_category: 'Share',
      event_label: `linkedin | ${window.location}`,
    });
  };
  const shareOnWhatsapp = () => {
    setGAValue('event', 'click', {
      event_category: 'Share',
      event_label: `whatsapp | ${window.location}`,
    });
  };

  const getShareIcons = ({ mainData }) => {
    return (
      <div
        className={`${style['flex_wrap']} ${style['justify__content__center']} ${style['social-widgets']}`}
        key={`social_links__w`}
      >
        <span>Share:</span>
        <a
          target="_blank"
          rel="noreferrer nofollow"
          href={`${SOCIAL_SHARE_LINK.FB}${getBaseUrlNew(lang?.channel)}/${mainData?.seopath
            }-${getSlug(mainData.cmstype)}-${mainData.msid}`}
          onClick={shareOnFacebook}
        >
          <SvgIcon IconName="DarkFbIcon" key={'fb'} />
        </a>
        <a
          target="_blank"
          rel="noreferrer nofollow"
          href={`${SOCIAL_SHARE_LINK.TWITTER}${mainData.title?.replace(
            /\|/g,
            '',
          )}&url=${getBaseUrlNew(lang?.channel)}/${mainData?.seopath}-${getSlug(
            mainData.cmstype,
          )}-${mainData.msid}`}
          onClick={shareOnTwitter}
        >
          <SvgIcon IconName="DarkTwitterIconWithBorder" key={'tw'} />
        </a>
        <a
          target="_blank"
          rel="noreferrer nofollow"
          href={`${SOCIAL_SHARE_LINK.LINKEDIN}${getBaseUrlNew(lang?.channel)}/${mainData?.seopath
            }-${getSlug(mainData.cmstype)}-${mainData.msid}`}
          onClick={shareOnLinkedIn}
        >
          <SvgIcon IconName="DarkLinkIcon" key={'lkin'} />
        </a>
        <a
          target="_blank"
          rel="noreferrer nofollow"
          href={`${SOCIAL_SHARE_LINK.WHATSAPP}${getBaseUrlNew(lang?.channel)}/${mainData?.seopath
            }-${getSlug(mainData.cmstype)}-${mainData.msid}`}
          onClick={shareOnWhatsapp}
        >
          <SvgIcon IconName="DarkWhatsAppIcon" key={'wp'} />
        </a>
      </div>
    );
  };

  // useEffect(() => {
  //   try {
  //     if (typeof googletag != undefined) {
  //       googletag.cmd.push(function () {
  //         googletag.destroySlots();
  //       });
  //     }
  //     removeDfpScript();
  //     handleScriptLoad();
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // }, []);
  useEffect(() => {
    setArticleSortLink(value?.shortLink);
  }, [value]);
  useEffect(() => {
    setAutoPlayList(data?.data?.slice(1, 5) || []);
  }, [msid]);

  const showFullContentHandler = () => {
    setShowFullContent(true);
  };
  /**
   * Open in App moved to backend So commented here
   *
   */
  // const openInAppWithAppFlyer = () => {
  //   var oneLinkURL = 'https://tnn.onelink.me/j04O/';
  //   var mediaSource = {
  //     keys: ['utm_source'],
  //     defaultValue: 'webamp', //amp for accelerated mobile pages
  //   };
  //   var campaign = {
  //     keys: ['utm_campaign'],
  //     defaultValue: 'open_in_app',
  //   };
  //   var deepLinkValue = { defaultValue: document.location.href };

  //   var result = window?.AF_SMART_SCRIPT?.generateOneLinkURL({
  //     oneLinkURL: oneLinkURL,
  //     afParameters: {
  //       mediaSource: mediaSource,
  //       campaign: campaign,
  //       deepLinkValue: deepLinkValue,
  //     },
  //   });
  //   setArticleAppFlyerLink(result?.clickURL);
  // };
  // useEffect(() => {
  //   openInAppWithAppFlyer();
  // }, [value]);

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
    // breadNavigation(navigation);
    // breadSeopath(main);
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
    // setAutoPlay(Number(localStorage.getItem('video_autoplay')) === 1);
  }, []);
  // useEffect(() => {
  //   try {
  //     if (typeof googletag != undefined) {
  //       googletag.cmd.push(function () {
  //         googletag.destroySlots();
  //       });
  //     }
  //     // removeDfpScript();
  //     // handleScriptLoad();
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // }, []);

  // useEffect(() => {
  //   const url_path = window.location.pathname;
  //   setGAValueDimensions(getGoogleTagCustomDimensions(info, msid));
  //   sendGAPageView(url_path);
  // }, []);

  useEffect(() => {
    SetMain(value);
    SetVideoId(true);
  }, [msid]);
  const autoPlayHandler = () => {
    localStorage.setItem('video_autoplay', !autoPlay ? 1 : 0);
    setAutoPlay(!autoPlay);
  };
  useEffect(() => {
    // setPubAdsPageTargettingShowPages(
    //   'videoshow',
    //   data.data,
    //   navigation,
    //   msid,
    //   seoDataInfo,
    // );
  }, [msid]);

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
        <Head>
          <meta
            property="article:published_time"
            content={getSEOFriendlyDate(mainData?.insertdate)}
          />
          <meta
            property="article:modified_time"
            content={getSEOFriendlyDate(mainData?.updatedate)}
          />
          <meta
            data-react-helmet="true"
            name="robots"
            content="max-image-preview:large"
          />
        </Head>
        <VideoSchema
          data={mainData}
          path={getTargetURL({
            ...(mainData?.overridelink && {
              overrideString: mainData.overridelink,
            }),
            normalString: `${mainData.seopath}-${getSlug(mainData.cmstype)}-${mainData.msid
              }`,
          })}
        />
        <NewsSchema
          data={mainData}
          pathname={getTargetURL({
            ...(mainData?.overridelink && {
              overrideString: mainData.overridelink,
            }),
            normalString: `${mainData?.seopath}-${getSlug(mainData.cmstype)}-${mainData.msid
              }`,
          })}
        />
        <WebPage
          data={mainData}
          pathname={getTargetURL({
            ...(mainData?.overridelink && {
              overrideString: mainData.overridelink,
            }),
            normalString: `${mainData?.seopath}-${getSlug(mainData.cmstype)}-${mainData.msid
              }`,
          })}
        />
        <div
          className={`${style['article-banner']} article-banner`}
          id={mainData.msid}
          key={mainData.msid}
        >
          <div className={style['aspect-16-9']}>
            {mainData.media &&
              mainData?.media?.id &&
              mainData?.media?.rmname == 'Kaltura' ? (
              <div
                data-attr-slk={mainData?.media?.id}
                data-attr-msid={mainData?.msid}
                title={`${mainData.title}`}
                data-attr-cat={CATEGORY_TYPE_VIDEO}
                data-attr-autoplay={autoPlay}
              >
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
                    isAutoplay={autoPlay}
                    nextVideo={nextVideo}
                  />
                ) : null}
              </div>
            ) : (
              <div className={style['Videoiframe']}>
                <iframe
                  src={`https://www.youtube.com/embed/${mainData?.media?.id}`}
                  title="YouTube video player"
                  width="100%"
                  height="210px"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
          </div>
        </>
        )
        );
}
  
        export default VideoShow;
