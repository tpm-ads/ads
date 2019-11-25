function meSpinInv() {
	var invAd = new Invitation();

	initClass();

    function initClass() {
        window.addEventListener('resize', onResize, false);
        onResize();
    };

    function onResize() {
        invAd.onResize();
    };

	// Class object.
	function Invitation() {
		this.onResize = onResize;

		var el = document.getElementById('ad-invitation');

        function onResize() {
            el.style.height = el.clientWidth+'px';
        };
	};
};