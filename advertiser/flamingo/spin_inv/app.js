var spinAd;
window.addEventListener('load', initCreative, false);

function initCreative() {	
		setTimeout(function(){
			for (var i = 0; i < materials.length; i++) {
				generateMaterial(materials[i], document.getElementById('invitation-content'));
			}
			imageLoadDelay();
		}, 100);		
						
    spinAd = new Spin('invitation-content', {
				sector: 3,
				autoSpinDirection: 'clockwise',
        sectorClickedCallback: postSectorClickToProxy,
				sectorChangedCallback: doChangesWhenSpin,
				autoSpinEnded: function(){doChangesWhenSpin(0)}
    });
    spinAd.startAutoAnimation();

    // Append Animation Timeline
    //appendTimeline(slideAnimation1);
    //appendTimeline(slideAnimation2);
    //appendTimeline(slideAnimation3);
};

function bannerAnimationStart(){
	// Banner Materials Generated.
}

function doChangesWhenSpin(sector){
	switch(sector) {
		case 0:
			startTween(0);
            stopTween(1);
            stopTween(2);
			break;
		case 1:	
			stopTween(0);
            startTween(1);
            stopTween(2);
			break;
		case 2:
			stopTween(0);
            stopTween(1);
            startTween(2);
			break;
	}
};

function slideAnimation1() {
	this.getFrame = fn;
	var frame = new TimelineMax({paused:true});
    function fn() { return frame};
    
	//frame.fromTo('#top', 0.5, {scale:0, opacity:0}, {scale:1, opacity:1, ease:Back.easeOut}, '-=0.5');
	
};

function slideAnimation2() {
	this.getFrame = fn;
	var frame = new TimelineMax({paused:true});
    function fn() { return frame};
    
	//frame.fromTo('#right', 0.5, {scale:0, opacity:0}, {scale:1, opacity:1, ease:Back.easeOut}, '-=0.5');
	
};

function slideAnimation3() {
	this.getFrame = fn;
	var frame = new TimelineMax({paused:true});
    function fn() { return frame};
    
	//frame.fromTo('#bottom', 0.5, {scale:0, opacity:0}, {scale:1, opacity:1, ease:Back.easeOut}, '-=0.5');

};

// ====== Timeline Template ======

var bannerTweens = [];
function appendTimeline(fn) {
	if(typeof fn !== 'function') { return; }
	var tl = new fn();
	bannerTweens.push(tl);
};
function startTween(t) {
    var total = bannerTweens.length - 1;
    if(total < t) { return; }
    if(typeof bannerTweens[t].getFrame().restart !== 'function') { return; }
    bannerTweens[t].getFrame().seek(0);
    bannerTweens[t].getFrame().play();
};
function stopTween(t) {
    var total = bannerTweens.length - 1;
    if(total < t) { return; }
    if(typeof bannerTweens[t].getFrame().pause !== 'function') { return; }
    bannerTweens[t].getFrame().pause();
    bannerTweens[t].getFrame().seek(0);
};