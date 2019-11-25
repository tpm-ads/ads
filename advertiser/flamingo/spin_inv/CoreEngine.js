var mobileEngage;
var platform;
var version = '4.6.3';
var isVersionDifferentWarned = false;
var iosWorkAroundEl = null, iosWorkAroundCounter = 0;

window.addEventListener('load', initSpinInv, false);

function initSpinInv() {
    platform = new MobilePlatform();
    mobileEngage = new meSpinInv();
    bindEvents();
    postReadyToProxy();
    setIOSWorkaround();
};

function messageHandler(event) {
    var supportedMsg = event.data;
    if (typeof(supportedMsg.owner) === 'undefined' || supportedMsg.owner !== 'Innity' || typeof(supportedMsg.adType) === 'undefined') {
        return;
    }

    if (supportedMsg.version != version) {
        if (isVersionDifferentWarned === false) {
            console.warn('Proxy and ad version is different! Proxy v' + supportedMsg.version + ' vs Ad v'+version);
            isVersionDifferentWarned = true;
        }
    }

    switch (supportedMsg.action.action) {}
};
function postReadyToProxy() {
    parent.postMessage({owner: 'Innity', adType: 'innity-apps-mobile-spin-inv', action: 'adReady', version: version}, '*');
};
function postSectorClickToProxy(sector) {
    parent.postMessage({owner: 'Innity', adType: 'innity-apps-mobile-spin-inv', action: 'clicked', data: {sector: sector}, version: version}, '*');
};
function bindEvents() {
    window.addEventListener('message', messageHandler, false);
};

/**
 * This is a workaround to enable iOS Safari touch events after user scroll the page.
 */
function setIOSWorkaround() {
    if (platform.getOS() === 'ios') {
        iosWorkAroundEl = document.getElementById('ios-workaround');
        setInterval(iosAppendText, 500);
    }
}
function iosAppendText() {
    iosWorkAroundEl.innerHTML += '.';
    iosWorkAroundCounter++;

    if (iosWorkAroundCounter >= 100) {
        iosWorkAroundCounter = 0;
        iosWorkAroundEl.innerHTML = '';
    }
}

// ========== Element Generator ==========

var imagesToLoad = 0;

/**
 * Generate HTML element based on elementData attribute. <br />
 * elementData.elType => type of created element <br/>
 * elementData.id => id of created element <br/>
 * elementData.cssClass => CSS classes of created element, is an array of string <br/>
 * elementData.innerHTML => direct content of created element <br/>
 * elementData.clickFunc => function called when created element is clicked, must be function name <br/>
 * elementData.clickTag => clickTag trigger by created element <br/>
 * elementData.cssStyle => inline CSS style of created element, object of cssStyleAttributeName => value <br/> eg:{'backgroundColor': 'rgba(255, 0, 148, 1)} <br/>
 * elementData.attrs => Attributes of created element, object of attributeName => value <br/> eg:{src: 'my_image.png'} <br/>
 * elementData.childs => children inside created element, array of elementData object <br/>
 * @param {object} elementData
 * @param {element} container
 */
function generateMaterial(elementData, container) {
    var elementType = (typeof(elementData.elType) === 'undefined') ? 'div' : elementData.elType;
    var materialEl = document.createElement(elementType);
    if(typeof(elementData.id) !== 'undefined') {
        materialEl.setAttribute('id', elementData.id);
    }
    if(typeof(elementData.cssClass) === 'object' && typeof(elementData.cssClass.length) === 'number') {
        for(var i = 0; i < elementData.cssClass.length; i++) {
            materialEl.classList.add(elementData.cssClass[i]);
        }
    }
    if(typeof(elementData.innerHTML) !== 'undefined') {
        materialEl.innerHTML = elementData.innerHTML;
    }
    if(typeof(elementData.clickFunc) === 'function') {
        materialEl.addEventListener('click', function(e) {
            e.stopPropagation();
            elementData.clickFunc(materialEl);
        }, false);
    }
    if(typeof(elementData.clickTag) !== 'undefined') {
        materialEl.addEventListener('click', function(e) {
            e.stopPropagation();
            triggerClickTag(elementData.clickTag);
        }, false);
    }
    if(typeof(elementData.cssStyle) !== 'undefined' && typeof(elementData.cssStyle) === 'object') {
        for(var cssKey in elementData.cssStyle) {
            materialEl.style[cssKey] = elementData.cssStyle[cssKey];
        }
    }
    if(typeof(elementData.attrs) !== 'undefined' && typeof(elementData.attrs) === 'object') {
        for(var attrName in elementData.attrs) {
            materialEl.setAttribute(attrName, elementData.attrs[attrName]);
        }
    }
    if(typeof(elementData.childs) !== 'undefined' && typeof(elementData.childs) === 'object') {
        for (var i = 0; i < elementData.childs.length; i++) {
            generateMaterial(elementData.childs[i], materialEl);
        }
    }
    container.appendChild(materialEl);
}
function imageLoadDelay() {
    if(imagesToLoad > 0)
        setTimeout(imageLoadDelay, 100);
    else
    {
        if(typeof(bannerAnimationStart) === 'function') {
            setTimeout(bannerAnimationStart, 100);
        }
    }
};
function mainContent(container) {
    for (var i = 0; i < materials.length; i++) {
        generateMaterial(materials[i], container);
    }

    if(typeof(bannerAnimationStart) === 'function') {
        setTimeout(bannerAnimationStart, 100);
    }
}