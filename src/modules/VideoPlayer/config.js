// import { LANG_CONST } from '../../constants';
import  { slikeApiKeys}  from '@/constants/index';
import { getAdType } from '@/utils/common';

 const slickAplKey =slikeApiKeys;
function getDefaultConfig(
  isPlay = 'true',
  datasrc,
  id = '',
  isMobile,
  queryParams,
  isAutoPlay = false,
) {
  return {
    apiKey: isMobile
      ? slickAplKey?.tnn?.mweb
      : slickAplKey?.tnn?.web,
    contEl: 'masterVideoPlayer' + id,
    // env: 'stg',
    debug: false,
    // version: '3.5.9',
    // version: '3.6.1',
    GDPR_MODE: false,
    colombiaCookieId: false,
    gaId: '',
    comscoreId: '',
    video: {
      id: id,
      url: '',
      playerType: '',
      image: datasrc,
      title: '',
      shareUrl: '',
      startTime: '',
      endTime: '',
      preRollUrl:
        'https://pubads.g.doubleclick.net/gampad/ads?iu=/21806551354/TN_English/Desktop/video/tn_engl_dskt_vid_lvtv_timesnow_preroll&description_url=https%3A%2F%2Fwww.timesnownews.com&tfcd=0&npa=0&sz=400x300%7C640x480&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&correlator=[placeholder]&vpmute=0&vpa=0&vad_type=linear&vpos=preroll',
    },
    player: {
      autoPlay: isAutoPlay,
      fallbackMute: false,
      mute: isAutoPlay ? true : false,
      skipAd: false,
      adSection: getAdType(),
      playlistUrl: '',
      playlist: true,
      playlistId: '',
      volume: 70,
      isAMP: true,
      adInterval: 30000,
      preRollAdBreak: [0, 300],
      //midRollAdBreak: [120, 240],
      gestureControls: false,
      playInBackground: true,
      bodyClickPlayToggle: false,
      scrollBehaviour: {
        inViewPercent: 60,
        dock: true,
      },
      midOverlayState: 0,
      custom_params: {
        demo: queryParams,
      },
    },
  };
}

const loadAdScript = () => {
  let id = 'slikeadscript';
  let s;
  if (document.getElementById(id) === null) {
    s = document.createElement('script');
    let el = document.getElementsByTagName('script')[0];
    s.async = true;
    s.src =
      (document.location.protocol == 'https:' ? 'https://' : 'http://') +
      'imasdk.googleapis.com/js/sdkloader/ima3.js';
    s.id = id;
    el.parentNode.insertBefore(s, el);
  }
  return s;
};

export { getDefaultConfig, loadAdScript };
