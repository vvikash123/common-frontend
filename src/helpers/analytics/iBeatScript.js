const logibevent = `function(e, t) {
    null == this.obj && null != window._ibeat_track && (this.obj = window._ibeat_track,
    iBeatPgTrend.initialize(void 0, !0, !1, t)),
    this.url = window.location.href,
    this.action = e;
    var i = "https://" + this.logServer + "/ping?";
    i += "&url=" + encodeURIComponent(this.url),
    i += "&et=" + encodeURIComponent(t),
    i += "&sid=" + encodeURIComponent(this.sessionId),
    i += "&ua=" + encodeURIComponent(this.agentType),
    i += "&ln=" + encodeURIComponent(this.loggedin),
    i += "&ref=" + encodeURIComponent(this.referer),
    i += "&ut=" + encodeURIComponent(this.visitorType),
    i += "&pot=" + encodeURIComponent(this.pageOpenTime),
    "po" == t ? iBeatPgTrend.eventArray.push((new Date).getTime()) : "px" == t && (i += "&pct=" + encodeURIComponent((new Date).getTime())),
    totalTimeSpentNow = na[2](),
    i += "&at=" + encodeURIComponent(totalTimeSpentNow - iBeatPgTrend.totalTimeSpent),
    totalActiveTimeNow = (new Date).getTime() - iBeatPgTrend.pageOpenTime,
    i += "&tt=" + encodeURIComponent(totalActiveTimeNow - iBeatPgTrend.totalActiveTime),
    null != this.obj && (i += "&obj=" + encodeURIComponent(JSON.stringify(this.obj))),
    iBeatPgTrend.totalActiveTime = totalActiveTimeNow,
    iBeatPgTrend.totalTimeSpent = totalTimeSpentNow,
    iBeatPgTrend.lastHitTime = (new Date).getTime(),
    null != iBeatPgTrend.referer && "" != iBeatPgTrend.referer && null != localStorage.getItem("ib_pos") && null == iBeatPgTrend.xPath && (iBeatPgTrend.xPath = localStorage.getItem("ib_pos").includes(window.location.href) ? localStorage.getItem("ib_pos") : ""),
    null != iBeatPgTrend.xPath && "" != iBeatPgTrend.xPath && (i += "&xpt=" + encodeURIComponent(iBeatPgTrend.xPath));
    console.log('preIbeatData', window.preIbeatData)
    console.log('current Data', this)
    if(!(window.preIbeatData && window.preIbeatData.url !== this.url  && (this.obj && window.preIbeatData.obj === JSON.stringify(this.obj)))){
        this.sendRequest(i)
        let preIbeatData={
            url:this.url,
            obj:JSON.stringify(this.obj)
        }
        window.preIbeatData=preIbeatData;
    }
}`;

export default {
  __html: `window._ibeat_track = null;//window._ibeat_track || {};
        function loadiBeat() {
            var s = document.createElement("script"),
            el = document.getElementsByTagName("script")[0];
            s.async = true;
            s.src = 'https://agi-static.indiatimes.com/cms-common/ibeat.min.js';
            el.parentNode.insertBefore(s, el);
            // var ibeatInterval = setInterval(()=>{
            //     if(window.iBeatPgTrend){
            //       window.iBeatPgTrend.logibevent=$/{logibevent};
            //       clearInterval(ibeatInterval);
            //       console.log('Finished logibevent')
            //     }
            // }, 1000)
        };
        // Lets wait for eu response.
        if (window.TimesGDPR && TimesGDPR.common.consentModule.gdprCallback){
            TimesGDPR.common.consentModule.gdprCallback(function(dataObj){
                if (dataObj.isEUuser){_ibeat_track= {sCookie: false};}
                setTimeout(()=>{
                    loadiBeat();
                }, 5000)

            });
        }
        else{
            // _ibeat_track= {sCookie: false}; 
            setTimeout(()=>{
                loadiBeat();
            }, 5000)
        }`,
};
