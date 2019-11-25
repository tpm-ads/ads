// Staging
InnityAd = function(id, host, level) {
	console.log("Ad " + id + " registered to host: " + host);
}
InnityAd.prototype.log = function(event, status) {
	this.trace(event + ": " + status);
}
InnityAd.prototype.trace = function(msg) {
	try {
		console.log(msg);
	}catch(e) {}
}
InnityVideo = function(eid, video, logger) {
	this.video = video;
	this.video.eid = eid;
	this.video.started = false;
	this.video.playing = false;
	this.video.finished= false;
	this.video.played_25 = false;
	this.video.played_50 = false;
	this.video.played_75 = false;
	this.video.logger = logger;
	this.video.mute = this.video.defaultMuted;
	this.video.addEventListener("play", this.videoHandler, false);
	this.video.addEventListener("pause", this.videoHandler, false);
	this.video.addEventListener("ended", this.videoHandler, false);
	this.video.addEventListener("timeupdate", this.onTimeupdate, false);
	this.video.addEventListener("volumechange", this.onVolumechange, false);
	try {
		console.log("Video obj:" + video.id + ", id:" + eid + ", registered to logger: " + logger);
	}catch(e) {}
	
}
InnityVideo.prototype.videoHandler = function(e) {
	if(this.started && e.type == "pause" && this.currentTime < this.duration) {
		this.logger.log(this.eid, "p");
		this.logger.log(this.eid + "_Pause", "c");
		this.logger.log(this.eid + "_Audio", "p");
		this.playing = false;
	}
	if(this.started && e.type == "play") {
		this.logger.log(this.eid, "r");
		this.logger.log(this.eid + "_Play", "c");
		if(this.volume > 0 && !this.mute) {
			this.logger.log(this.eid + "_Audio", "s");
		}
		this.playing = true;
	}
	if(e.type == "play") {
		if(this.finished) {
			this.logger.log(this.eid + "_Replay", "c");
			this.finished = false;
		}
	}
	if(e.type == "ended") {
		this.logger.log(this.eid, "f");
		if(this.volume > 0 && !this.mute) {
			this.logger.log(this.eid + "_Audio", "f");
		}
		this.started = false;
		this.playing = false;
		this.finished= true;
		this.played_25 = false;
		this.played_50 = false;
		this.played_75 = false;
	}
}
InnityVideo.prototype.onTimeupdate = function() {
	if(this.currentTime > 0 && !this.started) {
		if(this.volume > 0 && !this.mute) {
			this.logger.log(this.eid + "_Audio", "s");
		}
		this.started = true;
		this.playing = true;
		this.logger.log(this.eid, "s");
	}
	if(this.currentTime > (this.duration * 0.25) && !this.played_25) {
		this.played_25 = true;
		this.logger.log(this.eid + "_25", "c");
	}
	if(this.currentTime > (this.duration * 0.5) && !this.played_50) {
		this.played_50 = true;
		this.logger.log(this.eid + "_50", "c");
	}
	if(this.currentTime > (this.duration * 0.75) && !this.played_75) {
		this.played_75 = true;
		this.logger.log(this.eid + "_75", "c");
	}
}
InnityVideo.prototype.onVolumechange = function() {
	if(this.muted) {
		this.mute = true;
		this.logger.log(this.eid + "_Mute", "c");
		if(this.playing) {
			this.logger.log(this.eid + "_Audio", "p");
		}
	}
	if(this.mute && !this.muted && this.volume > 0) {
		this.mute = false;
		this.logger.log(this.eid + "_Unmute", "c");
		if(this.playing) {
			this.logger.log(this.eid + "_Audio", "s");
		}
	}
}
InnityVideo.prototype.pm = function(msg, target) {
	try {
		parent.postMessage(msg, target);
	}catch(e) {}
}
var InnityHTMLAd = {
	"id" : "test",
	"host" : "http://",
	"urls" : [],
	"vids" : [],
	"dco" : "",
	"cb" : new Date().getTime(),
	"init" : function(initOnLoad) {
		this.initOnLoad = initOnLoad;
		if(this.initOnLoad) {
			this.InnityAd = new InnityAd(this.id, this.host, "");
		}
		var self = this;
		function _setAdReady() {
			self.setAdReady();
		}
		try {
			window.addEventListener("load", _setAdReady, false);
		}catch(e) {}
	},
	"track" : function(event) {
		this.InnityAd.log(event, "c");
		this.pm("interaction|" + event + ",c", "*");
	},
	"startTimer" : function(event) {
		this.InnityAd.log(event, "s");
		this.pm("interaction|" + event + ",s", "*");
	},
	"stopTimer" : function(event) {
		this.InnityAd.log(event, "p");
		this.pm("interaction|" + event + ",p", "*");
	},
	"resumeTimer" : function(event) {
		this.InnityAd.log(event, "r");
		this.pm("interaction|" + event + ",r", "*");
	},
	"attachVideo" : function(obj) {
		this.vids.push(obj);
		this.InnityVideo = new InnityVideo("_Video" + this.vids.length, obj, this.InnityAd);
	},
	"endVideo" : function(event) {
		this.InnityAd.log(event, "f");
		this.pm("interaction|" + event + ",f", "*");
	},
	"impact" : function() {
		this.pm(this.id + "_impact", "*");
	},
	"expand" : function() {
		this.pm(this.id + "_expand", "*");
		this.trace("ad expansion requested");
	},
	"expanded" : function() {
		if(!this.initOnLoad) {
			this.InnityAd = new InnityAd(this.id, this.host, "");
		}
		this.pm(this.id + "_expanded", "*");
		this.trace("ad expanded");
	},
	"subExpand" : function() {
		this.pm(this.id + "_subExpand", "*");
	},
	"subExpanded" : function() {
		this.pm(this.id + "_subExpanded", "*");
	},
	"shrink" : function() {
		this.pm(this.id + "_shrink", "*");
		this.trace("ad shrink");
	},
	"shrinked" : function() {
		this.pm(this.id + "_shrinked", "*");
	},
	"clearRM" : function() {
		this.InnityAd.clear();
	},
	"close" : function() {
		this.pm(this.id + "_close", "*");
		this.trace("ad closed");
	},
	"closed" : function() {
		this.pm(this.id + "_closed", "*");
	},
	"click" : function(options) {
        // Customize for staging.
        if (typeof(DesignerClickTag[options.clickTAG]) !== 'undefined') {
          window.open(DesignerClickTag[options.clickTAG]);
        } else if(typeof options.url == "string") {
					window.open(options.url);
				}
				this.trace(options);

//		if(typeof options == "object") {
//			if(typeof options.clickTAG != "undefined" && typeof this.urls[options.clickTAG] != "undefined") {
//				var lnk = this.dco != "" ? this.urls[options.clickTAG] + "&type=" + this.dco : this.urls[options.clickTAG];
//			} else if(typeof options.url == "string") {
//				var lnk = options.url;
//			}
//		}else if(typeof options == "string") {
//			if(typeof this.urls[options] != "undefined") {
//				var lnk = this.dco != "" ? this.urls[options] + "&type=" + this.dco : this.urls[options];
//			}
//		}
//		if(typeof lnk != "undefined" && lnk != "") {
//			window.open(lnk);
//		} else {
//			this.trace(options);
//		}
	},
	"setAdReady" : function() {
		this.pm(this.id + "_adReady", "*");
	},
	"setDCO" : function(dco) {
		this.dco = dco;
		this.trace("DCO captured: " + this.dco);
	},
	"getParam" : function(param) {
		return decodeURIComponent((new RegExp("[?|&]" + param + "=" + "([^&;]+?)(&|#|;|$)").exec(self.location.href)||[,""])[1].replace(/\+/g, "%20"))||"";
	},
	"dispatch" : function(data) {
		(new Image()).src = data;
	},
	"trace" : function(msg) {
		try {
			console.log(msg);
		}catch(e) {}
	},
	"pm" : function(msg, target) {
		try {
			parent.postMessage(msg, target);
		}catch(e) {}
	}
}

// For Staging Purposes Only

function innityAd_getURLParameterData(name) {
	if(location.href.indexOf("?")>1){
		var elem = {};
		var params = location.href.split("?")[1].split("&");

		for ( i in params)
			elem[params[i].split("=")[0]] = params[i].split("=")[1];
			
		if(name in elem) 
			return elem[name];
	}
};

InnityHTMLAd.id = (typeof innityAd_getURLParameterData("adid") == "undefined") ? "ad-staging" : innityAd_getURLParameterData("adid");
if (typeof innityAd_getURLParameterData("init") !== "undefined") {InnityHTMLAd.init(innityAd_getURLParameterData("init"));} else {InnityHTMLAd.init(true);}

InnityHTMLAd.socialhub = false;