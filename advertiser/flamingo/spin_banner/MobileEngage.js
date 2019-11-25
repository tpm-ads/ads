function meSpinBanner(opts) {
    this.onResize = onResize;
    this.slideTo = slideTo;

    var extraOptions = mergeObject({
        spaceBetween: 15
    }, opts, 'Spin Swiper');
    var adContainer;
	var bannerAd = new SwiperBanner();

	initClass();

    function initClass() {
        adContainer = document.getElementById('apps-ad');
        window.addEventListener('resize', onResize, false);
        onResize();
    };

    function onResize() {
        // Only set pixel height in not ios device.
        // ios device use 100% for fixed position element.
        if (platform.getOS() !== 'ios') {
            adContainer.style.height = window.innerHeight+'px';
        }

        bannerAd.onResize();
    };

    function slideTo(index) {
        bannerAd.slideTo(index);
    };

	// Class object.
	function SwiperBanner() {
		this.onResize = onResize;
        this.slideTo = slideTo;

        var swiper = null, defaultSlidesPerView = 1.3;
		var el = document.getElementById('banner-swiper');
        var delayResize = null;

        initClass();

        function initClass() {
            swiper = new Swiper('#banner-swiper', {
                slidesPerView: defaultSlidesPerView,
                centeredSlides: true,
                spaceBetween: extraOptions.spaceBetween,
                onInit: delayResize,
                onSlideChangeEnd: onSlideChangedEndToCreative
            });
        };

        function onResize() {
            if (window.innerWidth > window.innerHeight) {
                horizontalResizeHanlder();
            }
            else {
                verticalResizeHandler();
            }

            var imgs = document.getElementsByClassName('banner-image');
            if (imgs.length < 1) {
                return;
            }
            var width = imgs[0].clientWidth;
            var newHeight = width / 0.75;
            el.style.height = newHeight+'px';
            adjustToCenter(newHeight);

            if (delayResize === null) {
                delayResize = setTimeout(delayResizeHandler, 50);
            }
        };
        function verticalResizeHandler() {
            if (swiper !== null) {
                swiper.params.slidesPerView = defaultSlidesPerView;
                swiper.onResize();
            }
        };
        function horizontalResizeHanlder() {
            if (swiper !== null) {
                swiper.params.slidesPerView = 4;
                swiper.onResize();
            }
        };
        function adjustToCenter(height) {
            el.style.top = ((window.innerHeight - height) / 2)+'px';
        };
        function delayResizeHandler() {
            onResize();
            clearTimeout(delayResize);
            delayResize = null;
        };

        function slideTo(index) {
            swiper.slideTo(index);
            onSlideChangedEndToCreative({activeIndex: index});
        };
        function onSlideChangedEndToCreative(swiper) {
            if (typeof(landOnSlide) === 'function') {
                landOnSlide(swiper.activeIndex + 1);
            }
        };
	};

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
};