var Track = {
	clickTag:function(){
		InnityHTMLAd.click({clickTAG: "clickTAG"});
	}
}

// ========== Innity Tracking Helper ==========

var timerTrackingID = null;
function triggerClickTag(clickTag) {
    if (typeof(pauseAllVideo) === 'function') {
        // Helper function to pause all video.
        pauseAllVideo();
    }
	InnityHTMLAd.click({clickTAG: clickTag});
};
function triggerTrack(track) {
	InnityHTMLAd.track(track);
};
function triggerTimerStart(id) {
	if(timerTrackingID === id) {
		return;
	}
	triggerTimerStop();
	InnityHTMLAd.startTimer(id);
	timerTrackingID = id;
};
function triggerTimerStop() {
	if(timerTrackingID !== null) {
		InnityHTMLAd.stopTimer(timerTrackingID);
	}
};
function trackingReset() {
	triggerTimerStop();
	timerTrackingID = null;
};