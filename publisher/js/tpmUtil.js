var tpmUtils={splitContent:function(a,b,c,f){if(!document.getElementById(b)){var g=jQuery(a).contents().length,e=0;0<c&&100>c?e=Math.round(c*g/100):100==c&&(e=Math.round(g-1));f?v_style=f:v_style="";jQuery(jQuery(a).contents()[e]).after('<div id="'+b+'" style="'+v_style+'"></div>');return document.getElementById(b)}},isMobile:function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?!0:!1},isElementVisibleOnScreen:function(a){var b=a.offsetTop+a.offsetHeight,
c=window.pageYOffset;return c+window.innerHeight>a.offsetTop&&c<b&&document.hasFocus()?!0:!1},inPageGenerate:function(a,b,c){var f=screen.width,g=screen.width;html='<div id="tpmInpageContainer" style="position:relative;z-index:2;height: '+g+"px; width: "+f+'px;">';html+="<div>";html+='<div style="text-align: left;color: white;font-size: 8px;background-color: black;height: 16px;line-height: 16px;text-transform: uppercase;padding-left: 5px;box-shadow: 0px 1px 15px black;margin-bottom: -1px;"> Advertisement </div>';
html+='<div style="position: absolute; width:100%;background-color: '+(void 0===c?"black":c)+";height: "+g+"px; clip: rect(0px, "+f+"px, "+g+'px, 0px)">';html+='<div style="display: inline-block;width: '+f+"px;height: "+g+'px;position: fixed;top: 5px;left: 0;-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0,0,0);"><div style="display: block;height:'+g+'px;position: relative;top:0px;text-align:center"><iframe id="tpmInpageFrame" style="display: block!important;margin: 0 auto;" width="360" height="640" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true"></iframe></div></div></div>';
html+="</div>";html+="</div><br/>";if(!a)return console.log("selector error"),!1;a.style.height=1*g+30+"px";a.style.display="flex";a.innerHTML=html;a='<body style="margin: 0 auto;overflow: hidden;text-align: center;">'+b+"</body>";document.getElementById("tpmInpageFrame").src="javascript:'"+a+"'"},inPageGenerateDirectTag:function(a,b,c,f,g,e,d,h){d=screen.width;h=h?h:0;html='<div id="tpmInpageContainer" style="position:relative;z-index:2;height: '+d+"px; width: "+d+'px;">';html+="<div>";html+='<div style="text-align: left;color: white;font-size: 8px;background-color: black;height: 16px;line-height: 16px;text-transform: uppercase;padding-left: 5px;box-shadow: 0px 1px 15px black;margin-bottom: -1px;"> Advertisement </div>';
html+='<div style="position: absolute; width:100%;background-color: '+(e?e:"white")+";height: "+d+"px; clip: rect(0px, "+d+"px, "+d+'px, 0px)">';html+="<style>div {margin: 0;padding: 0;}.abgc {position: fixed;display: block;right: "+(d-f)/2+"px;top: 5px;text-rendering: geometricPrecision;z-index: 2147483646;z-index: 2147483646;}.abgc,.jar .abgc,.jar .cbb {opacity: 1;}.jaa .abgc,.jaa .cbb {display: none;}.abgc {cursor: pointer;}.cbb {height: 16px;z-index: 2147483646;background-color: #FFFFFF;opacity: 1;border: 1px solid #4A90E2;border-bottom-left-radius: 2px;padding-left: 3px;box-shadow: none;white-space: nowrap;}.cbb svg {vertical-align: top;height: 100%;}.il-text,.il-icon {vertical-align: top;display: inline-block;}.il-text {height: 15px;width: 30px;}.il-icon {height: 13px;width: 15px;}.il-text svg {fill: #4A90E2;}.il-icon svg {stroke: #4A90E2;stroke-width: 1;height: 70%;margin: 15%;}.cbb:hover {cursor: pointer;background-color: #888;border: 1px solid #777;}.cbb:hover .il-icon svg {stroke: #fff;}.cbb:hover .il-text svg {fill: #fff;}</style>";
html+='<div aria-hidden="true" class="abgc" dir="ltr" id="abgc"><div aria-hidden="true" class="cbb" id="cbb"><div class="il-text"><p style="display: block;font-size: 8px;color: #4A90E2;line-height: 14px;font-family: sans-serif;">TPMedia</p></div><div class="il-icon"><svg viewbox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M3.25,5.5l4.5,4.5M11.75,5.5l-4.5,4.5"></path></svg></div></div></div>';html+='<div style="display: inline-block;width: '+d+
"px;height: "+d+'px;position: fixed;top: 5px;left: 0;-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0,0,0);"><div style="display: block;height:'+d+'px;position: relative;top:0px;text-align:center"><div id="tpmInpageDiv" style="display: block!important;margin: 0 auto;position:relative" ></div></div></div></div>';html+="</div>";html+="</div><br/>";if(!a)return console.log("selector error"),!1;a.style.height=1*d+"px";a.innerHTML=html;a=document.getElementById("tpmInpageDiv");a.innerHTML=
"";tpmUtils.adxGenerate(a,b,c,f,g,h)},dfpGenerate:function(a,b,c,f,g){tpmUtils.addAdvertisementLabel(a);tpmUtils.addObject(a,"div",b);var e=Math.round(1E6*Math.random()),d=document.createElement("script");d.src="https://www.googletagservices.com/tag/js/gpt.js";d.async=!0;d.type="text/javascript";a.appendChild(d);d=document.createElement("script");d.text="var googletag = googletag || {};googletag.cmd = googletag.cmd || []; var tpm_ads_slot_"+e+"; googletag.cmd.push(function() { tpm_ads_slot_"+e+" = googletag.defineSlot('"+
c+"', "+f+", '"+b+"').addService(googletag.pubads()); googletag.pubads().enableSingleRequest(); googletag.pubads().collapseEmptyDivs();googletag.enableServices(); }); googletag.cmd.push(function() { googletag.display('"+b+"'); })";d.type="text/javascript";a.appendChild(d);g&&(b=document.createElement("script"),b.type="text/javascript",b.text="var counter_ads"+e+" = 0, p_container"+e+' = document.getElementById("'+a.id+'"), refresh'+e+" = setInterval(function() {if (tpmUtils.isElementVisibleOnScreen(p_container"+
e+")) { counter_ads"+e+"++;} if (counter_ads"+e+" == "+g+") { googletag.pubads().refresh([tpm_ads_slot_"+e+']); console.log("Refresh: '+e+" after "+g+'s"); clearInterval(refresh'+e+"); counter_ads"+e+" = 0;}},1000);",a.appendChild(b))},adxGenerate:function(a,b,c,f,g,e){var d=document.createElement("ins");e=e?e:0;d.className="adsbygoogle";d.setAttribute("data-ad-client",b);d.setAttribute("data-ad-slot",c);e?(d.style="display:block;",d.setAttribute("data-ad-format","auto"),d.setAttribute("data-full-width-responsive",
"true")):d.style="display:inline-block;width:"+f+"px;height:"+g+"px";a.appendChild(d);b=document.createElement("script");b.type="application/javascript";b.text="(adsbygoogle = window.adsbygoogle || []).push({});";a.appendChild(b)},mgidGenerate:function(a,b,c,f){f=void 0===f?"//jsc.mgid.com/z/w/z.wikidich.com":f;tpmUtils.addAdvertisementLabel(a);tpmUtils.addObject(a,"div","M"+b+"ScriptRootC"+c,"","position:relative;width:100%;height:auto;margin: 0 auto;",'<div id="M'+b+"PreloadC"+c+'">Loading...</div>');
var g=document.createElement("script");g.text='(function(){var D=new Date(),d=document,b="body",ce="createElement",ac="appendChild",st="style",ds="display",n="none",gi="getElementById",lp=d.location.protocol,wp=lp.indexOf("http")==0?lp:"https:";var i=d[ce]("iframe");i[st][ds]=n;d[gi]("M'+b+"ScriptRootC"+c+'")[ac](i);try{var iw=i.contentWindow.document;iw.open();iw.writeln("<ht"+"ml><bo"+"dy></bo"+"dy></ht"+"ml>");iw.close();var c=iw[b];}catch(e){var iw=d;var c=d[gi]("M'+b+"ScriptRootC"+c+'");}var dv=iw[ce]("div");dv.id="MG_ID";dv[st][ds]=n;dv.innerHTML='+
c+';c[ac](dv);var s=iw[ce]("script");s.async="async";s.defer="defer";s.charset="utf-8";s.src=wp+"'+f+"."+c+'.js?t="+D.getYear()+D.getMonth()+D.getUTCDate()+D.getUTCHours();c[ac](s);})();';g.type="text/javascript";a.appendChild(g);b=document.createElement("style");b.type="text/css";styles=".mgheader{ display:none!important} @media only screen and (max-width: 480px) {#MarketGidComposite"+c+" .mgline {width:100%!important}} .mctitle a {font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol!important; line-height:20px!important;font-weight:500!important;color: #039be5!important;}.mglbutton{background:#3f3f3f!important;right:5px!important;bottom:5px!important}.mgl{display:none!important} div.mg_addad"+
c+" {display:none!important} .mgbox {max-width:100%!important;}";b.styleSheet?b.styleSheet.cssText=styles:b.appendChild(document.createTextNode(styles));a.appendChild(b)},tenMaxGenerate:function(a,b,c,f,g,e,d){tpmUtils.addAdvertisementLabel(a);var h=document.createElement("ins");h.className="rmax";h.setAttribute("data-rmax-space-id",b);h.setAttribute("data-rmax-space-type",c);0<f&&h.setAttribute("data-rmax-space-width",f+"px");0<g&&h.setAttribute("data-rmax-space-height",g+"px");e&&h.setAttribute("data-target-pos",
e);d&&h.setAttribute("data-target-gpt-container",d);a.appendChild(h);b=document.createElement("script");b.src="//tenmax-static.cacafly.net/ssp/adsbytenmax.js";b.async=!0;a.appendChild(b)},amrGenerate:function(a,b){tpmUtils.addAdvertisementLabel(a);tpmUtils.addObject(a,"zone",b);var c=document.createElement("script");c.text='arfAsync.push("'+b+'");';c.type="text/javascript";a.appendChild(c)},amrLibLoad:function(){if(!document.getElementById("arf-core-js")){var a=document.createElement("script");a.type=
"text/javascript";a.text="var arfAsync = arfAsync || [];";document.head.appendChild(a);a=document.createElement("script");a.type="text/javascript";a.id="arf-core-js";a.async=!0;a.src="//media1.admicro.vn/cms/Arf.min.js";document.head.appendChild(a)}},ggAdxLibLoad:function(){if(!document.getElementById("adx-core-lib")){var a=document.createElement("script");a.type="text/javascript";a.id="adx-core-lib";a.async=!0;a.src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";document.head.appendChild(a)}},
ex8Generate:function(a,b){tpmUtils.addObject(a,"div","zoneid_"+b);a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src="https://console.ex8.io/vast_mediation/vast_multi.js?&zoneid="+b;document.head.appendChild(a)},epomGenerate:function(a,b,c){var f=document.createElement("ins");f.className=b;f.dataset.key=c;a.appendChild(f)},addObject:function(a,b,c,f,g,e){b=document.createElement(b);b.id=c||"";b.className=f||"";b.style=g||"";b.innerHTML=e||"";a.appendChild(b)},addAdvertisementLabel:function(a){a.getElementsByClassName("tpm_attribution")[0]||
tpmUtils.addObject(a,"div","","tpm_attribution","","Advertisement")},initLib:function(){tpmUtils.ggAdxLibLoad();if(!document.getElementById("tpm-css-init")){var a=document.createElement("style");a.id="tpm-css-init";a.type="text/css";a.styleSheet?a.styleSheet.cssText=".tpm_attribution {text-align: center;font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol!important;color: #757575;padding: 5px 0px;font-size: 10px;}":
a.appendChild(document.createTextNode(".tpm_attribution {text-align: center;font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol!important;color: #757575;padding: 5px 0px;font-size: 10px;}"));document.head.appendChild(a)}}};
