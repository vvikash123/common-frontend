import { LANG_CONST } from '../../constants';
import { langNameChannel } from '../../lang';
import { getAdType, getLangName } from '../../utils/common';

const langConst = LANG_CONST[langNameChannel[getLangName()]];

function getDefaultConfig(isPlay = 'true', datasrc, id = '', isMobile) {
  return {
    apiKey: isMobile
      ? langConst?.slikeApiKeys?.pod?.mweb
      : langConst?.slikeApiKeys?.pod?.web, //test403web5a8sg6o9ug  // ok api key
    contEl: 'masterVideoPlayer' + id,
    adContainer: '', // element add for adv
    debug: false,
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
      preRollUrl: ' ',
      postRollUrl: '',
    },
    player: {
      autoPlay: false,
      fallbackMute: false,
      mute: true,
      skipAd: true,
      // adSection: getAdType(),
      playlistUrl: '',
      playlist: false,
      playlistId: '',
      volume: 70,
      isAMP: true,
      // adInterval: 30000,
      preRollAdBreak: [0, 300],
      //midRollAdBreak: [120, 240],
      gestureControls: false,
      playInBackground: true,
      scrollBehaviour: {
        inViewPercent: 60,
      },
      midOverlayState: 0,
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
