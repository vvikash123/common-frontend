import React, { useEffect } from 'react';

/**
 *
 * @param {*} props ad values like DivId, adCode, size
 * @param {*} pageTarget targeting values like category, sub-category, pagetype, msid, article-index
 * @param {*} children children props for ads div
 */
export default function Advertisement(props) {
  const { adCode, size, divId, pageTarget } = props;

  useEffect(() => {
    let SlotArr = [],
      sec = pageTarget?.section?.category,
      subsec = pageTarget?.section?.sub_category,
      ptype = pageTarget?.page,
      metaInfoAttr = pageTarget?.metaInfoAttr,
      id = pageTarget?.msid,
      sequence = pageTarget?.article_index,
      query = pageTarget?.query && Object.values(pageTarget?.query)[0];

    let INITIAL_RENDERING = !0,
      pubmaticOn = !0,
      BID_TIMEOUT = 2e3,
      // apstagSlots = (pubSlots = []),
      APS_CONFIG = {
        pubID: '2202a6a5-32cd-4e86-a8b6-48b0a3829463',
        adServer: 'googletag',
        bidTimeout: BID_TIMEOUT,
      };

    apstag.init(APS_CONFIG);

    let slotID = { slotID: divId, sizes: size, slotName: adCode };

    window.googletag = window.googletag || { cmd: [] };

    /**
     * googletag.cmd.push() main method for create and display ads
     */
    googletag.cmd.push(function () {
      /**
       *  ADS slot define and Ready to display
       * * AdCode, size, section, subsection, pagetype and other value added
       * ? defineOutOfPageSlot method used to display WEB-INTERSTITIAL ad
       * ? defineSlot method used to display dfp ad
       * ? googletag.display(DivId) method used to display ad on divId
       */
      let ab =
        adCode?.includes('_ROS_Interstitial') ||
        adCode?.includes('_iZooto_Interstitial')
          ? googletag
              .defineOutOfPageSlot(
                adCode,
                googletag.enums.OutOfPageFormat.INTERSTITIAL,
              )
              ?.addService(googletag.pubads())
          : googletag
              .defineSlot(adCode, size, divId)
              ?.addService(googletag.pubads());

      SlotArr.push(ab);
      /**
       * ? googletag.pubads().clearTargeting() method clear previous targeting
       * ? googletag.pubads().setTargeting() method to set targeting for ads
       * ? googletag.pubads().enableSingleRequest() Enable SRA
       * ? googletag.pubads().setCentering(true) Make ads centered
       * ? googletag.pubads().setPrivacySettings() Allows configuration of all privacy settings from a single API
       * ? googletag.pubads().disableInitialLoad() Disables requests for ads on page load
       * ? googletag.enableServices() Enables all GPT services that have been defined for ad slots on the page.
       */

      googletag.pubads().clearTargeting();
      sec && googletag.pubads().setTargeting('section', [sec]);
      subsec && googletag.pubads().setTargeting('subsec', [subsec]);
      ptype && googletag.pubads().setTargeting('page', [ptype]);
      metaInfoAttr &&
        googletag.pubads().setTargeting('keyword', [metaInfoAttr]);
      id && googletag.pubads().setTargeting('articleid', [id]);
      sequence &&
        googletag.pubads().setTargeting('article_sequence', [sequence]);
      query && googletag.pubads().setTargeting('demo', [query]);

      googletag.pubads().setCentering(!0),
        googletag.pubads().enableSingleRequest(),
        googletag.pubads().enableAsyncRendering(),
        googletag.pubads().setPrivacySettings({
          restrictDataProcessing: true,
        });

      /**
       * ?Enabled Jio Ads
       * * Events based on ad slot Request, impressionViewable and slot loaded
       * * checking isEnabledJioAds value in localStorage for Jio AD
       */

      let isEnabledJioAds = false;
      try {
        isEnabledJioAds = JSON.parse(localStorage.getItem('isEnabledJioAds'));
      } catch (e) {
        // console.log('Error : isEnabledJioAds', e);
      }
      if (isEnabledJioAds) {
        // add event to sign the slot as redered or not

        googletag.pubads().addEventListener('slotRequested', function (event) {
          let slot = event.slot.getSlotElementId();
          // console.log('slot slotRequested', slot, event);
        });
        googletag
          .pubads()
          .addEventListener('slotResponseReceived', function (event) {
            let slot = event.slot.getSlotElementId();
            // console.log('slot slotResponseReceived', slot, event);
          });
        googletag
          .pubads()
          .addEventListener('slotRenderEnded', function (event) {
            let slot = event.slot.getSlotElementId();
            // console.log('slot slotRenderEnded', slot, event);
          });
        googletag
          .pubads()
          .addEventListener('slotVisibilityChanged', function (event) {
            let slot = event.slot.getSlotElementId();
            // console.log('slot slotVisibilityChanged', slot, event);
          });
        googletag.pubads().addEventListener('slotOnload', function (event) {
          let slot = event.slot.getSlotElementId();
          // console.log('slot slotOnload', slot, event);
        });
        googletag
          .pubads()
          .addEventListener('impressionViewable', function (event) {
            let slot = event.slot.getSlotElementId();
            // console.log('slot impressionViewable', slot, event);
          });
      }

      googletag.pubads().disableInitialLoad(), googletag.enableServices();
    });
    let isPubDone = false,
      isApsDone = false;

    googletag.cmd.push(function () {
      /**
       * ? googletag.display(divId) to display on divId
       */
      googletag.display(divId);

      /**
       * ?SlotArr is used for bid for ads
       * ?apstag.fetchBids method for biding
       * @param slots accept array (slotID object hold values { slotID: divId, sizes: size, slotName: adCode })
       * @param timesout bid timeout values BID_TIMEOUT
       * ?PWT.setAuctionTimeout() bid timeout method within 1000 milisecond
       */
      SlotArr &&
        pubmaticOn &&
        apstag.fetchBids(
          { slots: [slotID] || [], timeout: BID_TIMEOUT },
          () => {
            isApsDone = true;
          },
        );
      if (
        window?.PWT?.requestBids &&
        typeof window?.PWT?.requestBids === 'function'
      ) {
        PWT.initAdserverSet = false;
        PWT.setAuctionTimeout(1000);
        PWT.requestBids(
          PWT.generateConfForGPT(SlotArr),
          function (adUnitsArray) {
            PWT.addKeyValuePairsToGPTSlots(adUnitsArray);
            // initAdserver();
            isPubDone = true;
          },
        );
      } else {
        isPubDone = true;
      }

      /**
       * refresh is method to display after bidding ads
       * ?apstag.setDisplayBids() this method display ad after bidding and new ad will display
       * ?googletag.pubads().refresh(SlotArr) this method refresh to render the bid ad
       */
      let refresh = () => {
        if (isPubDone && isApsDone) {
          googletag.cmd.push(function () {
            apstag.setDisplayBids(), googletag.pubads().refresh(SlotArr);
          });
        } else {
          setTimeout(refresh, 100);
        }
      };

      refresh();
    });

    return () => {
      googletag.cmd.push(function () {
        googletag.destroySlots();
      });
    };
  }, []);

  return <>{props.children}</>;
}
