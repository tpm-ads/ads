var tpmUtils={splitContent:function(a,b,d,f){if(!document.getElementById(b)){var e=jQuery(a).contents().length,g=0;0<d&&100>d?g=Math.round(d*e/100):100==d&&(g=Math.round(e-1));f?v_style=f:v_style="";jQuery(jQuery(a).contents()[g]).after('<div id="'+b+'" style="'+v_style+'"></div>');return document.getElementById(b)}},isMobile:function(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?!0:!1},isElementVisibleOnScreen:function(a){var b=a.offsetTop+a.offsetHeight,
d=window.pageYOffset;return d+window.innerHeight>a.offsetTop&&d<b&&document.hasFocus()?!0:!1},inPageGenerate:function(a,b,d){var f=screen.width,e=screen.width;html='<div id="tpmInpageContainer" style="position:relative;z-index:2;height: '+e+"px; width: "+f+'px;">';html+="<div>";html+='<div style="text-align: left;color: white;font-size: 8px;background-color: black;height: 16px;line-height: 16px;text-transform: uppercase;padding-left: 5px;box-shadow: 0px 1px 15px black;margin-bottom: -1px;"> Advertisement </div>';
html+='<div style="position: absolute; width:100%;background-color: '+(void 0===d?"black":d)+";height: "+e+"px; clip: rect(0px, "+f+"px, "+e+'px, 0px)">';html+='<div style="display: inline-block;width: '+f+"px;height: "+e+'px;position: fixed;top: 5px;left: 0;-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0,0,0);"><div style="display: block;height:'+e+'px;position: relative;top:0px;text-align:center"><iframe id="tpmInpageFrame" style="display: block!important;margin: 0 auto;" width="360" height="640" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true"></iframe></div></div></div>';
html+="</div>";html+="</div><br/>";if(!a)return console.log("selector error"),!1;a.style.height=1*e+30+"px";a.style.display="flex";a.innerHTML=html;a='<body style="margin: 0 auto;overflow: hidden;text-align: center;">'+b+"</body>";document.getElementById("tpmInpageFrame").src="javascript:'"+a+"'"},inPageGenerateDirectTag:function(a,b,d,f,e,g,c,h){c=screen.width;h=h?h:0;html='<div id="tpmInpageContainer" style="position:relative;z-index:2;height: '+c+"px; width: "+c+'px;">';html+="<div>";html+='<div style="text-align: left;color: white;font-size: 8px;background-color: black;height: 16px;line-height: 16px;text-transform: uppercase;padding-left: 5px;box-shadow: 0px 1px 15px black;margin-bottom: -1px;"> Advertisement </div>';
html+='<div style="position: absolute; width:100%;background-color: '+(g?g:"white")+";height: "+c+"px; clip: rect(0px, "+c+"px, "+c+'px, 0px)">';html+="<style>div {margin: 0;padding: 0;}.abgc {position: fixed;display: block;right: "+(c-f)/2+"px;top: 5px;text-rendering: geometricPrecision;z-index: 2147483646;z-index: 2147483646;}.abgc,.jar .abgc,.jar .cbb {opacity: 1;}.jaa .abgc,.jaa .cbb {display: none;}.abgc {cursor: pointer;}.cbb {height: 16px;z-index: 2147483646;background-color: #FFFFFF;opacity: 1;border: 1px solid #4A90E2;border-bottom-left-radius: 2px;padding-left: 3px;box-shadow: none;white-space: nowrap;}.cbb svg {vertical-align: top;height: 100%;}.il-text,.il-icon {vertical-align: top;display: inline-block;}.il-text {height: 15px;width: 30px;}.il-icon {height: 13px;width: 15px;}.il-text svg {fill: #4A90E2;}.il-icon svg {stroke: #4A90E2;stroke-width: 1;height: 70%;margin: 15%;}.cbb:hover {cursor: pointer;background-color: #888;border: 1px solid #777;}.cbb:hover .il-icon svg {stroke: #fff;}.cbb:hover .il-text svg {fill: #fff;}</style>";
html+='<div aria-hidden="true" class="abgc" dir="ltr" id="abgc"><div aria-hidden="true" class="cbb" id="cbb"><div class="il-text"><p style="display: block;font-size: 8px;color: #4A90E2;line-height: 14px;font-family: sans-serif;">TPMedia</p></div><div class="il-icon"><svg viewbox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M3.25,5.5l4.5,4.5M11.75,5.5l-4.5,4.5"></path></svg></div></div></div>';html+='<div style="display: inline-block;width: '+c+
"px;height: "+c+'px;position: fixed;top: 5px;left: 0;-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0,0,0);"><div style="display: block;height:'+c+'px;position: relative;top:0px;text-align:center"><div id="tpmInpageDiv" style="display: block!important;margin: 0 auto;position:relative" ></div></div></div></div>';html+="</div>";html+="</div><br/>";if(!a)return console.log("selector error"),!1;a.style.height=1*c+"px";a.innerHTML=html;a=document.getElementById("tpmInpageDiv");a.innerHTML=
"";tpmUtils.adxGenerate(a,b,d,f,e,h)},inPageGenerateDfp:function(a,b,d,f,e,g,c){e=void 0===e?0:e;g=void 0===g?"":g;c=void 0===c?"black":c;var h=screen.width;s_height=h;html='<div id="tpmInpageContainer" style="position:relative;z-index:2;height: '+s_height+"px; width: "+h+'px;">';html+="<div>";html+='<div style="text-align: left;color: white;font-size: 8px;background-color: black;height: 16px;line-height: 16px;text-transform: uppercase;padding-left: 5px;box-shadow: 0px 1px 15px black;margin-bottom: -1px;"> Advertisement </div>';
html+='<div style="position: absolute; width:100%;background-color: '+(c?c:"white")+";height: "+s_height+"px; clip: rect(0px, "+h+"px, "+(s_height-20)+'px, 0px)">';html+='<div style="display: inline-block;width: '+h+"px;height: "+s_height+'px;position: fixed;top: 5px;left: 0;-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0,0,0);"><div style="display: block;height:'+s_height+'px;position: relative;top:0px;text-align:center"><div id="tpmInpageDiv" style="display: block!important;margin: 0 auto;position:relative" ></div></div></div></div>';
html+="</div>";html+="</div><br/>";if(!a)return console.log("selector error"),!1;a.style.height=1*s_height+"px";a.innerHTML=html;a=document.getElementById("tpmInpageDiv");a.innerHTML="";tpmUtils.dfpGenerate(a,b,d,f,e,g)},dfpGenerate:function(a,b,d,f,e,g){e=void 0===e?0:e;g=void 0===g?"":g;tpmUtils.addAdvertisementLabel(a);tpmUtils.addObject(a,"div",b);var c=Math.round(1E6*Math.random()),h=document.createElement("script");h.src="https://www.googletagservices.com/tag/js/gpt.js";h.async=!0;h.type="text/javascript";
a.appendChild(h);h=document.createElement("script");dfp_text="var googletag = googletag || {};googletag.cmd = googletag.cmd || []; var tpm_ads_slot_"+c+"; googletag.cmd.push(function() { ";g&&(dfp_text+="var mapping_"+c+" = googletag.sizeMapping()."+g+".build(); ");dfp_text+="tpm_ads_slot_"+c+" = googletag.defineSlot('"+d+"', "+f+", '"+b+"')";g&&(dfp_text+=".defineSizeMapping(mapping_"+c+")");dfp_text+=".addService(googletag.pubads()); googletag.pubads().enableSingleRequest(); googletag.pubads().collapseEmptyDivs();googletag.enableServices(); }); googletag.cmd.push(function() { googletag.display('"+
b+"'); })";h.text=dfp_text;h.type="text/javascript";a.appendChild(h);e&&(b=document.createElement("script"),b.type="text/javascript",b.text="var counter_ads"+c+" = 0, p_container"+c+' = document.getElementById("'+a.id+'"), refresh'+c+" = setInterval(function() {if (tpmUtils.isElementVisibleOnScreen(p_container"+c+")) { counter_ads"+c+"++;} if (counter_ads"+c+" == "+e+") { googletag.pubads().refresh([tpm_ads_slot_"+c+']); console.log("Refresh: '+c+" after "+e+'s"); clearInterval(refresh'+c+"); counter_ads"+
c+" = 0;}},1000);",a.appendChild(b))},adxGenerate:function(a,b,d,f,e,g){var c=document.createElement("ins");g=g?g:0;c.className="adsbygoogle";c.setAttribute("data-ad-client",b);c.setAttribute("data-ad-slot",d);g?(c.style="display:block;",c.setAttribute("data-ad-format","auto"),c.setAttribute("data-full-width-responsive","true")):c.style="display:inline-block;width:"+f+"px;height:"+e+"px";a.appendChild(c);b=document.createElement("script");b.type="application/javascript";b.text="(adsbygoogle = window.adsbygoogle || []).push({});";
a.appendChild(b)},mgidGenerate:function(a,b,d,f){f=void 0===f?"//jsc.mgid.com/z/w/z.wikidich.com":f;tpmUtils.addAdvertisementLabel(a);tpmUtils.addObject(a,"div","M"+b+"ScriptRootC"+d,"","position:relative;width:100%;height:auto;margin: 0 auto;",'<div id="M'+b+"PreloadC"+d+'">Loading...</div>');var e=document.createElement("script");e.text='(function(){var D=new Date(),d=document,b="body",ce="createElement",ac="appendChild",st="style",ds="display",n="none",gi="getElementById",lp=d.location.protocol,wp=lp.indexOf("http")==0?lp:"https:";var i=d[ce]("iframe");i[st][ds]=n;d[gi]("M'+
b+"ScriptRootC"+d+'")[ac](i);try{var iw=i.contentWindow.document;iw.open();iw.writeln("<ht"+"ml><bo"+"dy></bo"+"dy></ht"+"ml>");iw.close();var c=iw[b];}catch(e){var iw=d;var c=d[gi]("M'+b+"ScriptRootC"+d+'");}var dv=iw[ce]("div");dv.id="MG_ID";dv[st][ds]=n;dv.innerHTML='+d+';c[ac](dv);var s=iw[ce]("script");s.async="async";s.defer="defer";s.charset="utf-8";s.src=wp+"'+f+"."+d+'.js?t="+D.getYear()+D.getMonth()+D.getUTCDate()+D.getUTCHours();c[ac](s);})();';e.type="text/javascript";a.appendChild(e);
b=document.createElement("style");b.type="text/css";styles=".mgheader{ display:none!important} @media only screen and (max-width: 480px) {#MarketGidComposite"+d+" .mgline {width:100%!important}} .mctitle a {font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol!important; line-height:20px!important;font-weight:500!important;color: #039be5!important;}.mglbutton{background:#3f3f3f!important;right:5px!important;bottom:5px!important}.mgl{display:none!important} div.mg_addad"+
d+" {display:none!important} .mgbox {max-width:100%!important;}";b.styleSheet?b.styleSheet.cssText=styles:b.appendChild(document.createTextNode(styles));a.appendChild(b)},tenMaxGenerate:function(a,b,d,f,e,g,c){tpmUtils.addAdvertisementLabel(a);var h=document.createElement("ins");h.className="rmax";h.setAttribute("data-rmax-space-id",b);h.setAttribute("data-rmax-space-type",d);0<f&&h.setAttribute("data-rmax-space-width",f+"px");0<e&&h.setAttribute("data-rmax-space-height",e+"px");g&&h.setAttribute("data-target-pos",
g);c&&h.setAttribute("data-target-gpt-container",c);a.appendChild(h);b=document.createElement("script");b.src="//tenmax-static.cacafly.net/ssp/adsbytenmax.js";b.async=!0;a.appendChild(b)},amrGenerate:function(a,b){tpmUtils.addAdvertisementLabel(a);tpmUtils.addObject(a,"zone",b);var d=document.createElement("script");d.text='arfAsync.push("'+b+'");';d.type="text/javascript";a.appendChild(d)},amrLibLoad:function(){if(!document.getElementById("arf-core-js")){var a=document.createElement("script");a.type=
"text/javascript";a.text="var arfAsync = arfAsync || [];";document.head.appendChild(a);a=document.createElement("script");a.type="text/javascript";a.id="arf-core-js";a.async=!0;a.src="//media1.admicro.vn/cms/Arf.min.js";document.head.appendChild(a)}},ggAdxLibLoad:function(){if(!document.getElementById("adx-core-lib")){var a=document.createElement("script");a.type="text/javascript";a.id="adx-core-lib";a.async=!0;a.src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";document.head.appendChild(a)}},
ex8Generate:function(a,b){tpmUtils.addObject(a,"div","zoneid_"+b);a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src="https://console.ex8.io/vast_mediation/vast_multi.js?&zoneid="+b;document.head.appendChild(a)},epomGenerate:function(a,b,d){var f=document.createElement("ins");f.className=b;f.dataset.key=d;a.appendChild(f)},addObject:function(a,b,d,f,e,g){b=document.createElement(b);b.id=d||"";b.className=f||"";b.style=e||"";b.innerHTML=g||"";a.appendChild(b)},addAdvertisementLabel:function(a){a.getElementsByClassName("tpm_attribution")[0]||
tpmUtils.addObject(a,"div","","tpm_attribution","","Advertisement")},initLib:function(){tpmUtils.ggAdxLibLoad();if(!document.getElementById("tpm-css-init")){var a=document.createElement("style");a.id="tpm-css-init";a.type="text/css";a.styleSheet?a.styleSheet.cssText=".tpm_attribution {text-align: center;font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol!important;color: #757575;padding: 5px 0px;font-size: 10px;}":
a.appendChild(document.createTextNode(".tpm_attribution {text-align: center;font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol!important;color: #757575;padding: 5px 0px;font-size: 10px;}"));document.head.appendChild(a)}}};
