var tpmUtils={_label_ads_by:"Advertiserment",splitContent:function(t,e,i,a){if(!document.getElementById(e)){let n=jQuery(t).contents().length,o=0;return i>0&&i<100?o=Math.round(i*n/100):100==i&&(o=Math.round(n-1)),v_style=a||"",jQuery(jQuery(t).contents()[o]).after('<div id="'+e+'" style="'+v_style+'"></div>'),document.getElementById(e)}},isMobile:function(){return!!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},isElementVisibleOnScreen:function(t){let e=t.offsetTop,i=t.offsetTop+t.offsetHeight,a=window.pageYOffset;return!!(a+window.innerHeight>e&&a<i&&document.hasFocus())},inPageGenerate:function(t,e,i="black"){const a=screen.width,n=screen.width;if(html='<div id="tpmInpageContainer" style="position:relative;z-index:2;height: '+n+"px; width: "+a+'px;">',html+="<div>",html+='<div style="text-align: left;color: white;font-size: 8px;background-color: black;height: 16px;line-height: 16px;text-transform: uppercase;padding-left: 5px;box-shadow: 0px 1px 15px black;margin-bottom: -1px;"> Advertisement </div>',html+='<div style="position: absolute; width:100%;background-color: '+i+";height: "+n+"px; clip: rect(0px, "+a+"px, "+n+'px, 0px)">',html+='<div style="display: inline-block;width: '+a+"px;height: "+n+'px;position: fixed;top: 5px;left: 0;-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0,0,0);"><div style="display: block;height:'+n+'px;position: relative;top:0px;text-align:center"><iframe id="tpmInpageFrame" style="display: block!important;margin: 0 auto;" width="360" height="640" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true"></iframe></div></div></div>',html+="</div>",html+="</div><br/>",!t)return console.log("selector error"),!1;t.style.height=1*n+30+"px",t.style.display="flex",t.innerHTML=html;let o='<body style="margin: 0 auto;overflow: hidden;text-align: center;">'+e+"</body>";document.getElementById("tpmInpageFrame").src="javascript:'"+o+"'"},inPageGenerateDirectTag:function(t,e,i,a,n,o="white",d=1,l=0){let s=n,r=screen.width;if(s=r,html='<div id="tpmInpageContainer" style="position:relative;z-index:2;height: '+s+"px; width: "+r+'px;">',html+="<div>",html+='<div style="text-align: left;color: white;font-size: 8px;background-color: black;height: 16px;line-height: 16px;text-transform: uppercase;padding-left: 5px;box-shadow: 0px 1px 15px black;margin-bottom: -1px;"> Advertisement </div>',html+='<div style="position: absolute; width:100%;background-color: '+o+";height: "+s+"px; clip: rect(0px, "+r+"px, "+s+'px, 0px)">',d&&(html+="<style>div {margin: 0;padding: 0;}.abgc {position: fixed;display: block;right: "+(r-a)/2+"px;top: 5px;text-rendering: geometricPrecision;z-index: 2147483646;z-index: 2147483646;}.abgc,.jar .abgc,.jar .cbb {opacity: 1;}.jaa .abgc,.jaa .cbb {display: none;}.abgc {cursor: pointer;}.cbb {height: 16px;z-index: 2147483646;background-color: #FFFFFF;opacity: 1;border: 1px solid #4A90E2;border-bottom-left-radius: 2px;padding-left: 3px;box-shadow: none;white-space: nowrap;}.cbb svg {vertical-align: top;height: 100%;}.il-text,.il-icon {vertical-align: top;display: inline-block;}.il-text {height: 15px;width: 30px;}.il-icon {height: 13px;width: 15px;}.il-text svg {fill: #4A90E2;}.il-icon svg {stroke: #4A90E2;stroke-width: 1;height: 70%;margin: 15%;}.cbb:hover {cursor: pointer;background-color: #888;border: 1px solid #777;}.cbb:hover .il-icon svg {stroke: #fff;}.cbb:hover .il-text svg {fill: #fff;}</style>",html+='<div aria-hidden="true" class="abgc" dir="ltr" id="abgc"><div aria-hidden="true" class="cbb" id="cbb"><div class="il-text"><p style="display: block;font-size: 8px;color: #4A90E2;line-height: 14px;font-family: sans-serif;">TPMedia</p></div><div class="il-icon"><svg viewbox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M3.25,5.5l4.5,4.5M11.75,5.5l-4.5,4.5"></path></svg></div></div></div>'),html+='<div style="display: inline-block;width: '+r+"px;height: "+s+'px;position: fixed;top: 5px;left: 0;-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0,0,0);"><div style="display: block;height:'+s+'px;position: relative;top:0px;text-align:center"><div id="tpmInpageDiv" style="display: block!important;margin: 0 auto;position:relative" ></div></div></div></div>',html+="</div>",html+="</div><br/>",!t)return console.log("selector error"),!1;t.style.height=1*s+"px",t.innerHTML=html;const p=document.getElementById("tpmInpageDiv");tpmUtils.adxGenerate(p,e,i,a,n,l)},inPageGenerateDfp:function(t,e,i,a,n=0,o="",d="white"){let l=screen.width;if(s_height=l,html='<div id="tpmInpageContainer" style="position:relative;z-index:2;height: '+s_height+"px; width: "+l+'px;">',html+="<div>",html+='<div style="text-align: left;color: white;font-size: 8px;background-color: black;height: 16px;line-height: 16px;text-transform: uppercase;padding-left: 5px;box-shadow: 0px 1px 15px black;margin-bottom: -1px;"> Advertisement </div>',html+='<div style="position: absolute; width:100%;background-color: '+d+";height: "+s_height+"px; clip: rect(0px, "+l+"px, "+(s_height-20)+'px, 0px)">',html+='<div style="display: inline-block;width: '+l+"px;height: "+s_height+'px;position: fixed;top: 5px;left: 0;-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0,0,0);"><div style="display: block;height:'+s_height+'px;position: relative;top:0px;text-align:center"><div id="tpmInpageDiv" style="display: block!important;margin: 0 auto;position:relative" ></div></div></div></div>',html+="</div>",html+="</div><br/>",!t)return console.log("selector error"),!1;t.style.height=1*s_height+"px",t.innerHTML=html;const s=document.getElementById("tpmInpageDiv");tpmUtils.dfpGenerate(s,e,i,a,n,o)},dfpGenerate:function(t,e,i,a,n=0,o="",d=1){tpmUtils.addAdvertisementLabel(t),tpmUtils.addObject(t,"div",e);let l=Math.round(1e6*Math.random()),s=document.createElement("script");s.src="https://www.googletagservices.com/tag/js/gpt.js",s.async=!0,s.type="text/javascript",t.appendChild(s);let r="var googletag = googletag || {};googletag.cmd = googletag.cmd || []; var tpm_ads_slot_"+l+"; googletag.cmd.push(function() { ";if(o&&(r+="var mapping_"+l+" = googletag.sizeMapping()."+o+".build(); "),r+="tpm_ads_slot_"+l+" = googletag.defineSlot('"+i+"', "+a+", '"+e+"')",o&&(r+=".defineSizeMapping(mapping_"+l+")"),r+=".addService(googletag.pubads()); googletag.pubads().enableSingleRequest(); googletag.pubads().collapseEmptyDivs();googletag.enableServices(); }); googletag.cmd.push(function() { googletag.display('"+e+"'); })",(s=document.createElement("script")).text=r,s.type="text/javascript",t.appendChild(s),n){let e=document.createElement("script"),i="";e.type="text/javascript",i="var counter_ads"+l+" = 0, refresh_times"+l+" = 0, p_container"+l+' = document.getElementById("'+t.id+'"), refresh'+l+" = setInterval(function() {if (tpmUtils.isElementVisibleOnScreen(p_container"+l+")) { counter_ads"+l+"++;} if (counter_ads"+l+" == "+n+") { googletag.pubads().refresh([tpm_ads_slot_"+l+']); console.log("Refresh: '+l+" after "+n+'s"); refresh_times'+l+"++; if( "+d+" > 0 && refresh_times"+l+"== "+d+"){ clearInterval(refresh"+l+");} counter_ads"+l+" = 0;}},1000);",e.text=i,t.appendChild(e)}},adxGenerate:function(t,e,i,a,n,o=0){let d=document.createElement("ins");d.className="adsbygoogle",d.setAttribute("data-ad-client",e),d.setAttribute("data-ad-slot",i),o?(d.style="display:block;",d.setAttribute("data-ad-format","auto"),d.setAttribute("data-full-width-responsive","true")):d.style="display:inline-block;width:"+a+"px;height:"+n+"px",t.appendChild(d);let l=document.createElement("script");l.type="application/javascript",l.text="(adsbygoogle = window.adsbygoogle || []).push({});",t.appendChild(l)},mgidGenerate:function(t,e,i,a="//jsc.mgid.com/z/w/z.wikidich.com"){tpmUtils.addAdvertisementLabel(t),tpmUtils.addObject(t,"div","M"+e+"ScriptRootC"+i,"","position:relative;width:100%;height:auto;margin: 0 auto;",'<div id="M'+e+"PreloadC"+i+'">Loading...</div>');let n=document.createElement("script");n.text='(function(){var D=new Date(),d=document,b="body",ce="createElement",ac="appendChild",st="style",ds="display",n="none",gi="getElementById",lp=d.location.protocol,wp=lp.indexOf("http")==0?lp:"https:";var i=d[ce]("iframe");i[st][ds]=n;d[gi]("M'+e+"ScriptRootC"+i+'")[ac](i);try{var iw=i.contentWindow.document;iw.open();iw.writeln("<ht"+"ml><bo"+"dy></bo"+"dy></ht"+"ml>");iw.close();var c=iw[b];}catch(e){var iw=d;var c=d[gi]("M'+e+"ScriptRootC"+i+'");}var dv=iw[ce]("div");dv.id="MG_ID";dv[st][ds]=n;dv.innerHTML='+i+';c[ac](dv);var s=iw[ce]("script");s.async="async";s.defer="defer";s.charset="utf-8";s.src=wp+"'+a+"."+i+'.js?t="+D.getYear()+D.getMonth()+D.getUTCDate()+D.getUTCHours();c[ac](s);})();',n.type="text/javascript",t.appendChild(n);let o=document.createElement("style");o.type="text/css",styles=".mgheader{ display:none!important} @media only screen and (max-width: 480px) {#MarketGidComposite"+i+" .mgline {width:100%!important}} .mctitle a {font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol!important; line-height:20px!important;font-weight:500!important;color: #039be5!important;}.mglbutton{background:#3f3f3f!important;right:5px!important;bottom:5px!important}.mgl{display:none!important} div.mg_addad"+i+" {display:none!important} .mgbox {max-width:100%!important;}",o.styleSheet?o.styleSheet.cssText=styles:o.appendChild(document.createTextNode(styles)),t.appendChild(o)},tenMaxGenerate:function(t,e,i,a,n,o,d){tpmUtils.addAdvertisementLabel(t);let l=document.createElement("ins");l.className="rmax",l.setAttribute("data-rmax-space-id",e),l.setAttribute("data-rmax-space-type",i),a>0&&l.setAttribute("data-rmax-space-width",a+"px"),n>0&&l.setAttribute("data-rmax-space-height",n+"px"),o&&l.setAttribute("data-target-pos",o),d&&l.setAttribute("data-target-gpt-container",d),t.appendChild(l);let s=document.createElement("script");s.src="//tenmax-static.cacafly.net/ssp/adsbytenmax.js",s.async=!0,t.appendChild(s)},amrGenerate:function(t,e){tpmUtils.addAdvertisementLabel(t),tpmUtils.addObject(t,"zone",e);let i=document.createElement("script");i.text='arfAsync.push("'+e+'");',i.type="text/javascript",t.appendChild(i)},amrLibLoad:function(){if(!document.getElementById("arf-core-js")){let t=document.createElement("script");t.type="text/javascript",t.text="var arfAsync = arfAsync || [];",document.head.appendChild(t),(t=document.createElement("script")).type="text/javascript",t.id="arf-core-js",t.async=!0,t.src="//media1.admicro.vn/cms/Arf.min.js",document.head.appendChild(t)}},ggAdxLibLoad:function(){if(!document.getElementById("adx-core-lib")){let t=document.createElement("script");t.type="text/javascript",t.id="adx-core-lib",t.async=!0,t.src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",document.head.appendChild(t)}},ex8Generate:function(t,e){tpmUtils.addObject(t,"div","zoneid_"+e);let i=document.createElement("script");i.type="text/javascript",i.async=!0,i.src="https://console.ex8.io/vast_mediation/vast_multi.js?&zoneid="+e,document.head.appendChild(i)},epomGenerate:function(t,e,i){let a=document.createElement("ins");a.className=e,a.dataset.key=i,t.appendChild(a)},addObject:function(t,e,i="",a="",n="",o=""){let d=document.createElement(e);d.id=i,d.className=a,d.style=n,d.innerHTML=o,t.appendChild(d)},addAdvertisementLabel:function(t){t.getElementsByClassName("tpm_attribution")[0]||0||tpmUtils.addObject(t,"div","","tpm_attribution","",tpmUtils._label_ads_by)},initLib:function(){if(tpmUtils.ggAdxLibLoad(),!document.getElementById("tpm-css-init")){let t=document.createElement("style");t.id="tpm-css-init",t.type="text/css";let e=".tpm_attribution {text-align: center;font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol!important;color: #757575;padding: 5px 0px;font-size: 10px;}";t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),document.head.appendChild(t)}}};
