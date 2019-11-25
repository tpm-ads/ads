function Spin(id, options) {
    this.startAutoAnimation = startAutoAnimation;

    var spinObj, spinEl;
    var extraOptions = mergeObject({
        sector: 3,
        // clockwise & counter-clockwise string following TweenMax library.
        autoSpinDirection: 'clockwise',
        sectorClickedCallback: null,
        sectorChangedCallback: null,
        autoSpinEnded: null
    }, options, 'extraOptions');
    var anglePerSector = 360 / extraOptions.sector;
    var sectorClicked = 0;
    var timeline;
    /**
     * Flag to prevent Android Chrome fired 2 times click event.
     * This variable was introduce on 17 Aug 2018.
     * @type Boolean
     */
    var isClicked = false;

    initClass();

    function initClass() {
        spinEl = document.getElementById(id);
        spinObj = Draggable.create('#'+id, {
            type: 'rotation',
            throwProps: true,
            snap: function(angle) {
                var snapAngle = Math.round(angle / anglePerSector) * anglePerSector;
                calcSectorSnaped(snapAngle, this.getDirection());

                return snapAngle;
            },
            onDragStart: cancelAutoAnimation,
            onClick: clickHandler
        });

        new CustomSamsungBrowserHandler();
    };

    function calcSectorSnaped(snapAngle, direction) {
        sectorClicked = Math.floor(Math.round(snapAngle % 360) / anglePerSector);
        if (sectorClicked <= 0) {
            sectorClicked = Math.abs(sectorClicked);
        }
        else {
            sectorClicked = extraOptions.sector - sectorClicked;
        }

        if (typeof(extraOptions.sectorChangedCallback) === 'function') {
            extraOptions.sectorChangedCallback(sectorClicked, direction);
        }
    };
    function clickOnSector() {
        if (typeof(extraOptions.sectorClickedCallback) === 'function') {
            extraOptions.sectorClickedCallback(sectorClicked);
        }
    }
    function clickHandler() {
        if (isClicked === true) {
            return;
        }

        if (platform.isSamsungBrowser() === true) {
          return;
        }
				
				if(detectNaverBrowser() === true) {
					return;
				}

        isClicked = true;
        setTimeout(function() {
            isClicked = false;
        }, 300);

        clickOnSector();
    }

    function startAutoAnimation() {
        var rotationValue = '-360deg';
        if (extraOptions.autoSpinDirection === 'clockwise') {
            rotationValue = '360deg';
        }

        timeline = new TimelineMax({onComplete:autoAnimationComplete});
        timeline.to(spinEl, 3, {rotation: rotationValue, ease: Back.easeOut.config(1.4), delay: 1});
    };
    function autoAnimationComplete() {
        if (typeof(extraOptions.autoSpinEnded) === 'function') {
            extraOptions.autoSpinEnded();
        }
    }
    function cancelAutoAnimation() {
        isClicked = false;
        timeline.kill();
    }

    function mergeObject(defaultObj, overrideObject, reference) {
        for (var attributeKey in overrideObject) {
            if (defaultObj.hasOwnProperty(attributeKey)) {
                defaultObj[attributeKey] = overrideObject[attributeKey];
            }
            else {
                console.warn('Key ['+attributeKey+'] not found in object merging process.', reference);
            }
        }

        return defaultObj;
    };

    function CustomSamsungBrowserHandler() {
        var clickEl;
        var initX = 0, touchTime = 0;

        initClass();

        function initClass() {
            if (typeof(platform) === 'undefined' || typeof(platform) !== 'object') {
                return console.error('platform library unavailable! This can be fix by include MobilePlatform.js');
            }

            if (platform.isSamsungBrowser() === false && detectNaverBrowser() === false) {
                return;
            }

            clickEl = document.getElementById('ad-invitation');
            bindTouchEvent();
        };

        function bindTouchEvent() {
            clickEl.addEventListener('touchstart', samsungTouchstart, false);
            clickEl.addEventListener('touchend', samsungTouchend, false);
        };
        function samsungTouchstart(e) {
            initX = e.changedTouches[0].clientX;
            touchTime = new Date().getTime();
        };
        function samsungTouchend(e) {
            var xDiff = Math.abs(initX - e.changedTouches[0].clientX);
            if (xDiff < 5) {
                var timeDiff = (new Date().getTime()) - touchTime;
                if (timeDiff < 600) {
                    clickOnSector();
                }
            }
        };
    };
		
		function detectNaverBrowser(){
			var ua = window.navigator.userAgent;
			if(ua.toLowerCase().indexOf('naver') > -1) {
				return true;
			}
			return false;
		};
};