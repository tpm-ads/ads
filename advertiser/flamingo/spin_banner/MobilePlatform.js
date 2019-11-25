function MobilePlatform() {
	this.getOS = getOS;
	this.getOSVersion = getOSVersion;
	this.getBrowserName = getBrowserName;
    this.getBrowserVersion = getBrowserVersion;
    this.getVersion = getVersion;

    // Public helper functions.
    this.isIosSkype = isIosSkype;
    this.isIosWeChat = isIosWeChat;
    this.isSamsungBrowser = isSamsungBrowser;

    this.debug = debug;

    /**
     * Consist of <b>ios</b>, <b>android</b> & <b>other</b>
     * @type String
     */
	var os = 'other';
	var osVersion = '0';
    /**
     * Consist of <b>chrome</b>, <b>safari</b>, <b>samsungbrowser</b>,
     * <b>facebook</b>, <b>wechat</b>, <b>crios</b>, <b>line</b>,
     * <b>other</b>
     * @type String
     */
	var browserName = 'other';
    var browsersVersion = {
        'chrome': '0',
        'samsungbrowser': '0',
        'safari': '0',
        'crios': '0' // ios Chrome
    };
    /**
     * A checking to determine is the library latest.
     * @type String
     */
    var version = '4.6.3';
    var ua = null;

    initClass();

    function initClass() {
        ua = window.navigator.userAgent;

        osDetection();
        browserDetection();
    };

	function osDetection() {
		if(/(iPhone|iPod|iPad)/i.test(ua)) {
			os = 'ios';
			var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
			osVersion = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
		}
		else if(ua.toLowerCase().indexOf('android') > -1) {
			os = 'android';
			var v = ua.match(/Android (\d+(?:\.\d+){0,2})/i);
			if(v !== null) {
				osVersion = v[v.length - 1];
			}
		}
	};

    function browserDetection() {
        if (os === 'ios') {
            iosBrowserDetection();
        }
        else if (os === 'android') {
            androidBrowserDetection();
        }
   };
    function iosBrowserDetection() {
        var standalone = window.navigator.standalone;
        var isSafariKeyExist = /safari/i.test(ua);
        var isChrome = /CriOS/i.test(ua);

        if (!standalone && isSafariKeyExist === true) {
            if (isChrome === true) {
                browserName = 'chrome';
                iosChromeVersionDetection();
                return;
            }

            var isLine = /Line/i.test(ua);
            if (isLine === true) {
                browserName = 'line';
                return;
            }

            browserName = 'safari';
            browsersVersion['safari'] = osVersion.join('.');
        }
        else if (standalone && isSafariKeyExist === false) {
            // Standalone, homepage icon page
        }
        else {
            // In app browser
            if (/\bFB[\w_]+\//i.test(ua) === true) {
                browserName = 'facebook';
            }
            else if (/\bMicroMessenger\//i.test(ua) === true) {
                browserName = 'wechat';
            } else if (/\bInstagram\b/i.test(ua) === true) {
        browserName = 'instagram';
      }
            else {
                // So far Skype don't have any key to detect.
                browserName = 'other';
            }
        }
    };
    function iosChromeVersionDetection() {
        var analysis = ua.match(/(crios(?=\/))\/?\s*(\d+)/i) || [];
        if (analysis[1].toLowerCase() === 'crios') {
            browsersVersion['crios'] = analysis[2];
        }
    };
    function androidBrowserDetection() {
		if (!!window.chrome && ua.toLowerCase().indexOf('chrome') > -1) {
			browserName = 'chrome';
            androidChromeVersionDetection();
		}

        if (ua.toLowerCase().indexOf('samsungbrowser') > -1) {
			browserName = 'samsung';
            samsungBrowserVersionDetection();
        }

		if (ua.toLowerCase().indexOf('firefox') > -1) {
			browserName = 'firefox';
		}
    };
    function androidChromeVersionDetection() {
        var analysis = ua.match(/(chrome(?=\/))\/?\s*(\d+)/i) || [];
        if (analysis[1].toLowerCase() === 'chrome') {
            browsersVersion['chrome'] = analysis[2];
        }
    };
    function samsungBrowserVersionDetection() {
        var analysis = ua.match(/(samsungbrowser(?=\/))\/?\s*(\d+)/i) || [];
        if (analysis[1].toLowerCase() === 'samsungbrowser') {
            browsersVersion['samsungbrowser'] = analysis[2];
        }
    };

	function getOS() {
		return os;
	};
	function getOSVersion() {
		return osVersion;
	};
	function getBrowserName() {
		return browserName;
	};
    function getBrowserVersion() {
        return browsersVersion;
    };
    function getVersion() {
        return version;
    };

    /**
     * Detect iOS Skype in app browser.
     * @returns {Boolean} TRUE if is iOS Skype in app browser, else FALSE.
     */
    function isIosSkype() {
        return os === 'ios' && browserName === 'other';
    };
    /**
     * Detect iOS WeChat in app browser.
     * @returns {Boolean} TRUE if is iOS WeChat in app browser, else FALSE.
     */
    function isIosWeChat() {
        return os === 'ios' && browserName === 'wechat';
    };
    function isSamsungBrowser() {
        return browsersVersion.samsungbrowser > 0;
    };

    /**
     * For debug purpose.
     * @returns {String}
     */
    function debug() {
        var stringValue = '';
        if (os === 'ios') {
            stringValue = os+' Version '+osVersion.join('.')+' with '+browserName;
        }
        else {
            stringValue = os+' Version '+osVersion+' with '+browserName;
        }
        return stringValue;
    };
};