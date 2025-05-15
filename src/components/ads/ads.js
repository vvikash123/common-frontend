import React, { useEffect } from 'react';

export default function Advertisement({ src, sticky, bgWhite, showAd=false }) {
  const { adCode, size, divId } = src;

  useEffect(() => {
    if (showAd) {
      window.googletag = window.googletag || { cmd: [] };
      googletag.cmd.push(function () {
        googletag.defineSlot(adCode, size, divId).addService(googletag.pubads());
        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs();
        googletag.enableServices();
      });
      googletag.cmd.push(function () {
        googletag.display(divId);
      });

      return () => {
        googletag.cmd.push(function () {
          googletag.destroySlots();
        });
      };
    }
  }, [adCode, size, divId, showAd]);

  return (
    <div className={`ads-container ${sticky ? 'sticky-ads-section' : ''} ${bgWhite ? 'white-section' : ''}`} id={divId}>
    </div>
  );
}
