var basictimeline=null;

function bannerAnimationStart() {
    embedAutoplayVideo();
    registercClickTagEvent();

    // Append Animation Timeline
    appendTimeline(slideAnimation1);
    appendTimeline(slideAnimation2);
    appendTimeline(slideAnimation3);

};

function landOnSlide(slideIndex) {
    // slideIndex start from 1.
    console.log('landed on slide number: ' + slideIndex);
	
		// adjust slide index to follow total slide number.
		if(slideIndex >= document.getElementById("banner-swiper").getElementsByClassName("swiper-slide").length) {
			slideIndex = document.getElementById("banner-swiper").getElementsByClassName("swiper-slide").length;
		};

    switch (slideIndex) {
        case 1:
            slide1Show();
            break;
        case 2:
            slide2Show();
            break;
        case 3:
            slide3Show();

            break;
    }
		
		if(typeof(triggerTimerStart)==='function')triggerTimerStart("frame"+slideIndex);
};

function slide1Show() {
		pauseVideo();
    
        startTween(0);
        stopTween(1);
        stopTween(2);
};
function slide2Show() {
		pauseVideo();
    
        stopTween(0);
        startTween(1);
        stopTween(2);
};
function slide3Show() {
		playVideo();
    
        stopTween(0);
        stopTween(1);
        startTween(2);
};

function registercClickTagEvent(){
	var btns = document.getElementsByClassName('clicktag');
	for(var i=0; i<btns.length; i++) {
		(function(el){
			var clickTagId = el.getAttribute('data-clicktag');
			el.addEventListener('click', function(e){
				e.stopPropagation;
				InnityHTMLAd.click({clickTAG:clickTagId});
			});
		})(btns[i]);
	}
};

function slideAnimation1() {
	this.getFrame = fn;
	var frame = new TimelineMax({paused:true});
    function fn() { return frame};
    
	frame
    .fromTo('#beetle_ori', 0.7, {scale:0},{scale:1, ease: Power2.easeIn})
    .fromTo('#txt_lines', 0.3, {opacity:0, top:'85.0%'},{opacity:1, top:'81.1%', ease: Power0.easeNone})
    .fromTo('#slide_0_bg', 0.3, {left:'-100%'},{left:'0%', ease: Power0.easeNone}, '+=1')
    .to('#beetle_ori', 0.1, {opacity: 0}, '-=0.1')
    .to('#beetle_ori2', 0.1, {opacity: 1}, '-=0.1')
    .to('#beetle_ori2', 0.1, {opacity: 0}, '-=0.1')
    .to('#beetle_ori3', 0.2, {opacity: 1}, '-=0.1')
    .to('#beetle_ori3', 0.1, {opacity: 0})
    .to('#beetle_ori4', 0.2, {opacity: 1}, '-=0.1')
    .to('#beetle_ori4', 0.1, {opacity: 0})
    .to('#beetle_ori5', 0.1, {opacity: 1}, '-=0.1')
    .fromTo('#txt_lines', 0.3, {top:'81.1%'}, {top:'100%', opacity: 0, ease: Power0.easeNone}, '-=0.2')
    .fromTo('#txt_iconic', 0.3, {top:'85.0%'}, {top:'81.2%', opacity: 1, ease: Power0.easeNone});
	
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

// ========== Video template required code ==========

var forceFallbackRequest = {country:''};
//var forceFallbackRequest = {country:'TW'}; //*** Uncomment this if its from Taiwan request.

var videoPlayer = null, fallbackPlayer = null;
var visibilityHidden = 'hidden',disableVisibilityPlay = false;
function embedAutoplayVideo() {
    videoPlayer = new InnityAppsMobileAutoPlayVideo (
        'video-container',
        'video1',
        {
            webm: 'video1.webm',
            mp4: 'video1.mp4',
            mpg: 'video1.mpg',
            poster: 'video1.jpg',
            autoplay: false,
            loop: false,
            forceFallback: (function(){ return (forceFallbackRequest['country'].toLowerCase() === 'tw' && platform.getOS() === 'android') ? true : false;})(),
            // For fallback player.
            fullscreen: true,
            canvaswidth: '640',
            canvasheight: '360',
            midctatext: 'Learn More',
            playstatectatext: 'Learn More',
            urls: 'clickTAG',
            cpm: false
        },
        'video1.jpg' // this is fallback video poster.
    );

    fallbackPlayer = videoPlayer.getFallbackPlayer();
    if (fallbackPlayer !== null) {
        runFallbackVideo();
    }

    visibilityBinding();
};
function runFallbackVideo() {
    fallbackPlayer.noLoop(); // Preview will not loop after ended.
    fallbackPlayer.noAutoplay(); // Preview will not autoplay.
//    fallbackPlayer.remainPreviewAfterClick(); // Preview will remain there after clicked.
//    fallbackPlayer.setClickCallback(whenFallbackAutoplayIsClicked);
//    fallbackPlayer.addListener('load', fallbackVideoOnLoad);
//    fallbackPlayer.addListener('play', fallbackVideoPlayed);
//    fallbackPlayer.addListener('ended', whenPreviewEnded);
//    fallbackPlayer.setVideoEndedCallback(whenHTMLVideoPlayedEnded);
//    fallbackPlayer.fullscreenCallBack(checkVideoFullScreenStatus);
    fallbackPlayer.startEngine(); // This is always required!!!!!
};
function playVideo() {
    if (videoPlayer === null) {
        return;
    }

    if (fallbackPlayer !== null) {
        fallbackPlayer.playPreview();
        return;
    }

    videoPlayer.playVideo();
};
function pauseVideo() {
    if (videoPlayer === null) {
        return;
    }

    if (fallbackPlayer !== null) {
        fallbackPlayer.pausePreview();
        return;
    }

    videoPlayer.pauseVideo();
};
function toggleVideoPlayPause(_autoplay, _fallback, bool){
	if(_autoplay === null) { return; }
	var f = bool ? _autoplay.playVideo : _autoplay.pauseVideo; 
	if(_fallback !== null) { f = bool ? _fallback.playPreview : _fallback.pausePreview;}
	f();
};
function visibilityBinding() {
    var visibilityChangeEvent = 'visibilitychange';
    if (typeof(document.msHidden) !== 'undefined') {
        visibilityHidden = 'msHidden';
        visibilityChangeEvent = 'msvisibilitychange';
    }
    else if (typeof(document.webkitHidden) !== 'undefined') {
        visibilityHidden = 'webkitHidden';
        visibilityChangeEvent = 'webkitvisibilitychange';
    }
    document.addEventListener(visibilityChangeEvent, visibilityChange, false);
};
function visibilityChange() {
    if (fallbackPlayer !== null) {
        return;
    }
    if (document[visibilityHidden] === true) {
        // When browser is hidden or in background.
        videoPlayer.pauseVideo();
    }
    else {
        // When browser is active or focus.
        if(disableVisibilityPlay === false) {
					//videoPlayer.playVideo();
				}
    }
};
// ========== Video template required code ==========

function checkVideoFullScreenStatus(v) {
    switch(v) {
        case "openFS":
            console.log("open fs")
            break;
        case "closeFS":
            console.log("close vid fs")
            break;
    }
};
