var tpmUtils={_label_ads_by:"Advertiserment",_custom_label_ads_by:0,appendDiv:function({position:e="insert",div_append_id:t,div_type:i="id",div_id:a,div_styles:n,div_percent:o=50}){let d=document.createElement("div"),s=document.getElementById(t)||0;return"class"==i&&(s=document.getElementsByClassName(t).length>0?document.getElementsByClassName(t)[0]:0),s?("before"==e&&s.parentNode.insertBefore(d,s),"after"==e&&s.parentNode.insertBefore(d,s.nextSibling),"append"==e&&s.appendChild(d),"split"==e&&(t="class"==i?"."+t:"#"+t,d=this.splitContent(t,a,o)),d.id=a,d.className="tpm-ads-unit",n&&(d.style=n),d):0},splitContent:function(e,t,i,a=""){if(!document.getElementById(t)){let n=e.charAt(0),o=0;switch(e=e.replace(n,""),n){case"#":o=document.getElementById(e)||0;break;case".":o=document.getElementsByClassName(e)[0]||0}if(o){let e=o.children,n=e.length,d=0;i>0&&i<100?d=Math.round(i*n/100):100==i&&(d=Math.round(n-1));let s=document.createElement("div");return s.id=t,s.style=a,e[d].parentNode.insertBefore(s,e[d]),s}}},isMobile:function(){return!!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)},isElementVisibleOnScreen:function(e){let t=e.offsetTop,i=e.offsetTop+e.offsetHeight,a=window.pageYOffset;return!!(a+window.innerHeight>t&&a<i&&document.hasFocus())},inPageGenerate:function(e,t,i="black"){const a=screen.width,n=screen.width;if(html='<div id="tpmInpageContainer" style="position:relative;z-index:2;height: '+n+"px; width: "+a+'px;">',html+="<div>",html+='<div style="text-align: left;color: white;font-size: 8px;background-color: black;height: 16px;line-height: 16px;text-transform: uppercase;padding-left: 5px;box-shadow: 0px 1px 15px black;margin-bottom: -1px;"> Advertisement </div>',html+='<div style="position: absolute; width:100%;background-color: '+i+";height: "+n+"px; clip: rect(0px, "+a+"px, "+n+'px, 0px)">',html+='<div style="display: inline-block;width: '+a+"px;height: "+n+'px;position: fixed;top: 5px;left: 0;-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0,0,0);"><div style="display: block;height:'+n+'px;position: relative;top:0px;text-align:center"><iframe id="tpmInpageFrame" style="display: block!important;margin: 0 auto;" width="360" height="640" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true"></iframe></div></div></div>',html+="</div>",html+="</div><br/>",!e)return console.log("selector error"),!1;e.style.height=1*n+30+"px",e.style.display="flex",e.innerHTML=html;let o='<body style="margin: 0 auto;overflow: hidden;text-align: center;">'+t+"</body>";document.getElementById("tpmInpageFrame").src="javascript:'"+o+"'"},inPageGenerateDirectTag:function(e,t,i,a,n,o="white",d=1,s=0){let l=n,r=screen.width;if(l=r,html='<div id="tpmInpageContainer" style="position:relative;z-index:2;height: '+l+"px; width: "+r+'px;">',html+="<div>",html+='<div style="text-align: left;color: white;font-size: 8px;background-color: black;height: 16px;line-height: 16px;text-transform: uppercase;padding-left: 5px;box-shadow: 0px 1px 15px black;margin-bottom: -1px;"> Advertisement </div>',html+='<div style="position: absolute; width:100%;background-color: '+o+";height: "+l+"px; clip: rect(0px, "+r+"px, "+l+'px, 0px)">',d&&(html+="<style>div {margin: 0;padding: 0;}.abgc {position: fixed;display: block;right: "+(r-a)/2+"px;top: 5px;text-rendering: geometricPrecision;z-index: 2147483646;z-index: 2147483646;}.abgc,.jar .abgc,.jar .cbb {opacity: 1;}.jaa .abgc,.jaa .cbb {display: none;}.abgc {cursor: pointer;}.cbb {height: 16px;z-index: 2147483646;background-color: #FFFFFF;opacity: 1;border: 1px solid #4A90E2;border-bottom-left-radius: 2px;padding-left: 3px;box-shadow: none;white-space: nowrap;}.cbb svg {vertical-align: top;height: 100%;}.il-text,.il-icon {vertical-align: top;display: inline-block;}.il-text {height: 15px;width: 30px;}.il-icon {height: 13px;width: 15px;}.il-text svg {fill: #4A90E2;}.il-icon svg {stroke: #4A90E2;stroke-width: 1;height: 70%;margin: 15%;}.cbb:hover {cursor: pointer;background-color: #888;border: 1px solid #777;}.cbb:hover .il-icon svg {stroke: #fff;}.cbb:hover .il-text svg {fill: #fff;}</style>",html+='<div aria-hidden="true" class="abgc" dir="ltr" id="abgc"><div aria-hidden="true" class="cbb" id="cbb"><div class="il-text"><p style="display: block;font-size: 8px;color: #4A90E2;line-height: 14px;font-family: sans-serif;">TPMedia</p></div><div class="il-icon"><svg viewbox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M3.25,5.5l4.5,4.5M11.75,5.5l-4.5,4.5"></path></svg></div></div></div>'),html+='<div style="display: inline-block;width: '+r+"px;height: "+l+'px;position: fixed;top: 5px;left: 0;-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0,0,0);"><div style="display: block;height:'+l+'px;position: relative;top:0px;text-align:center"><div id="tpmInpageDiv" style="display: block!important;margin: 0 auto;position:relative" ></div></div></div></div>',html+="</div>",html+="</div><br/>",!e)return console.log("selector error"),!1;e.style.height=1*l+"px",e.innerHTML=html;const p=document.getElementById("tpmInpageDiv");this.adxGenerate(p,t,i,a,n,s)},inPageGenerateDfp:function(e,t,i,a,n=0,o="",d="white"){let s=screen.width;if(s_height=s,html='<div id="tpmInpageContainer" style="position:relative;z-index:2;height: '+s_height+"px; width: "+s+'px;">',html+="<div>",html+='<div style="text-align: left;color: white;font-size: 8px;background-color: black;height: 16px;line-height: 16px;text-transform: uppercase;padding-left: 5px;box-shadow: 0px 1px 15px black;margin-bottom: -1px;"> Advertisement </div>',html+='<div style="position: absolute; width:100%;background-color: '+d+";height: "+s_height+"px; clip: rect(0px, "+s+"px, "+(s_height-20)+'px, 0px)">',html+='<div style="display: inline-block;width: '+s+"px;height: "+s_height+'px;position: fixed;top: 5px;left: 0;-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0,0,0);"><div style="display: block;height:'+s_height+'px;position: relative;top:0px;text-align:center"><div id="tpmInpageDiv" style="display: block!important;margin: 0 auto;position:relative" ></div></div></div></div>',html+="</div>",html+="</div><br/>",!e)return console.log("selector error"),!1;e.style.height=1*s_height+"px",e.innerHTML=html;const l=document.getElementById("tpmInpageDiv");this.dfpGenerate(l,t,i,a,n,o)},inPageGenerateDfpTag:function({container:e,div_id:t,slot_name:i,slot_size:a,refresh_ads:n=0,mapping_rule:o="",background:d="white"}){let s=screen.width;if(s_height=s,html='<div id="tpmInpageContainer" style="position:relative;z-index:2;height: '+s_height+"px; width: "+s+'px;">',html+="<div>",html+='<div style="text-align: left;color: white;font-size: 8px;background-color: black;height: 16px;line-height: 16px;text-transform: uppercase;padding-left: 5px;box-shadow: 0px 1px 15px black;margin-bottom: -1px;"> Advertisement </div>',html+='<div style="position: absolute; width:100%;background-color: '+d+";height: "+s_height+"px; clip: rect(0px, "+s+"px, "+(s_height-20)+'px, 0px)">',html+='<div style="display: inline-block;width: '+s+"px;height: "+s_height+'px;position: fixed;top: 5px;left: 0;-webkit-backface-visibility: hidden;-webkit-transform: translate3d(0,0,0);"><div style="display: block;height:'+s_height+'px;position: relative;top:0px;text-align:center"><div id="tpmInpageDiv" style="display: block!important;margin: 0 auto;position:relative" ></div></div></div></div>',html+="</div>",html+="</div><br/>",!e)return console.log("selector error"),!1;e.style.height=1*s_height+"px",e.innerHTML=html;let l={container:document.getElementById("tpmInpageDiv"),div_id:t,slot_name:i,slot_size:a,refresh_ads:n};this.dfpGenerateTag(l)},dfpGenerate:function(e,t,i,a,n=0,o="",d=1){this.addAdvertisementLabel(e),this.addObject(e,"div",t);let s=Math.round(1e6*Math.random()),l=document.createElement("script");l.src="https://www.googletagservices.com/tag/js/gpt.js",l.async=!0,l.type="text/javascript",e.appendChild(l);let r="var googletag = googletag || {};googletag.cmd = googletag.cmd || []; var tpm_ads_slot_"+s+"; googletag.cmd.push(function() { ";if(o&&(r+="var mapping_"+s+" = googletag.sizeMapping()."+o+".build(); "),r+="tpm_ads_slot_"+s+" = googletag.defineSlot('"+i+"', "+a+", '"+t+"')",o&&(r+=".defineSizeMapping(mapping_"+s+")"),r+=".addService(googletag.pubads()); googletag.pubads().enableSingleRequest(); googletag.pubads().collapseEmptyDivs();googletag.enableServices(); }); googletag.cmd.push(function() { googletag.display('"+t+"'); })",(l=document.createElement("script")).text=r,l.type="text/javascript",e.appendChild(l),n){let t=document.createElement("script"),i="";t.type="text/javascript",i="var counter_ads"+s+" = 0, refresh_times"+s+" = 0, p_container"+s+' = document.getElementById("'+e.id+'"), refresh'+s+" = setInterval(function() {if (tpmUtils.isElementVisibleOnScreen(p_container"+s+")) { counter_ads"+s+"++;} if (counter_ads"+s+" == "+n+") { googletag.pubads().refresh([tpm_ads_slot_"+s+']); console.log("Refresh: '+s+" after "+n+'s"); refresh_times'+s+"++; if( "+d+" > 0 && refresh_times"+s+"== "+d+"){ clearInterval(refresh"+s+");} counter_ads"+s+" = 0;}},1000);",t.text=i,e.appendChild(t)}},dfpGenerateTag:function({container:e,div_id:t,slot_name:i,slot_size:a,refresh_ads:n=0,mapping_rule:o=0,refresh_times:d=1,call_back_fnc:s=0}){this.addAdvertisementLabel(e),this.addObject(e,"div",t);let l=Math.round(1e6*Math.random()),r=document.createElement("script");r.src="https://www.googletagservices.com/tag/js/gpt.js",r.async=!0,r.type="text/javascript",e.appendChild(r);let p="var googletag = googletag || {};googletag.cmd = googletag.cmd || []; var tpm_ads_slot_"+l+"; googletag.cmd.push(function() { ";if(o&&(p+="var mapping_"+l+" = googletag.sizeMapping()."+o+".build(); "),p+="tpm_ads_slot_"+l+" = googletag.defineSlot('"+i+"', "+a+", '"+t+"')",o&&(p+=".defineSizeMapping(mapping_"+l+")"),p+=".addService(googletag.pubads()); googletag.pubads().enableSingleRequest(); googletag.pubads().collapseEmptyDivs();googletag.enableServices(); ",s&&(p+="googletag.pubads().addEventListener('slotRenderEnded', function(event) { if(event.slot == tpm_ads_slot_"+l+" && event.isEmpty){"+s+"}});"),p+="}); googletag.cmd.push(function() { googletag.display('"+t+"'); });",(r=document.createElement("script")).text=p,r.type="text/javascript",e.appendChild(r),n){let t=document.createElement("script"),i="";t.type="text/javascript",i="var counter_ads"+l+" = 0, refresh_times"+l+" = 0, container"+l+' = document.getElementById("'+e.id+'"), refresh'+l+" = setInterval(function() {if (tpmUtils.isElementVisibleOnScreen(container"+l+")) { counter_ads"+l+"++;} if (counter_ads"+l+" == "+n+") { googletag.pubads().refresh([tpm_ads_slot_"+l+']); console.log("Refresh: '+l+" after "+n+'s"); refresh_times'+l+"++; if( "+d+" > 0 && refresh_times"+l+"== "+d+"){ clearInterval(refresh"+l+");} counter_ads"+l+" = 0;}},1000);",t.text=i,e.appendChild(t)}},adxGenerate:function(e,t,i,a,n,o=0){let d=document.createElement("ins");d.className="adsbygoogle",d.setAttribute("data-ad-client",t),d.setAttribute("data-ad-slot",i),o?(d.style="display:block;",d.setAttribute("data-ad-format","auto"),d.setAttribute("data-full-width-responsive","true")):d.style="display:inline-block;width:"+a+"px;height:"+n+"px",e.appendChild(d);let s=document.createElement("script");s.type="application/javascript",s.text="(adsbygoogle = window.adsbygoogle || []).push({});",e.appendChild(s)},adxGenerateTag:function({container:e,ad_client:t,ad_slot:i,ad_width:a,ad_height:n,rspv:o=0}){this.addAdvertisementLabel(e);let d=document.createElement("ins");d.className="adsbygoogle",d.dataset.adClient=t,d.dataset.adSlot=i,o?(d.style="display:block;",d.dataset.adFormat="auto",d.dataset.fullWidthResponsive="true"):d.style="display:inline-block;width:"+a+"px;height:"+n+"px",e.appendChild(d);let s=document.createElement("script");s.type="application/javascript",s.text="(adsbygoogle = window.adsbygoogle || []).push({});",e.appendChild(s)},mgidGenerate:function(e,t,i,a="//jsc.mgid.com/z/w/z.wikidich.com"){this.addAdvertisementLabel(e),this.addObject(e,"div","M"+t+"ScriptRootC"+i,"","position:relative;width:100%;height:auto;margin: 0 auto;",'<div id="M'+t+"PreloadC"+i+'">Loading...</div>');let n=document.createElement("script");n.text='(function(){var D=new Date(),d=document,b="body",ce="createElement",ac="appendChild",st="style",ds="display",n="none",gi="getElementById",lp=d.location.protocol,wp=lp.indexOf("http")==0?lp:"https:";var i=d[ce]("iframe");i[st][ds]=n;d[gi]("M'+t+"ScriptRootC"+i+'")[ac](i);try{var iw=i.contentWindow.document;iw.open();iw.writeln("<ht"+"ml><bo"+"dy></bo"+"dy></ht"+"ml>");iw.close();var c=iw[b];}catch(e){var iw=d;var c=d[gi]("M'+t+"ScriptRootC"+i+'");}var dv=iw[ce]("div");dv.id="MG_ID";dv[st][ds]=n;dv.innerHTML='+i+';c[ac](dv);var s=iw[ce]("script");s.async="async";s.defer="defer";s.charset="utf-8";s.src=wp+"'+a+"."+i+'.js?t="+D.getYear()+D.getMonth()+D.getUTCDate()+D.getUTCHours();c[ac](s);})();',n.type="text/javascript",e.appendChild(n);let o=document.createElement("style");o.type="text/css",styles=".mgheader{ display:none!important} @media only screen and (max-width: 480px) {#MarketGidComposite"+i+" .mgline {width:100%!important}} .mctitle a {font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol!important; line-height:20px!important;font-weight:500!important;color: #039be5!important;}.mglbutton{background:#3f3f3f!important;right:5px!important;bottom:5px!important}.mgl{display:none!important} div.mg_addad"+i+" {display:none!important} .mgbox {max-width:100%!important;}",o.styleSheet?o.styleSheet.cssText=styles:o.appendChild(document.createTextNode(styles)),e.appendChild(o)},mgidGenerateTag:function({container:e,account_id:t,zone_id:i,domain:a="//jsc.mgid.com/z/w/z.wikidich.com"}){this.addAdvertisementLabel(e),this.addObject(e,"div","M"+t+"ScriptRootC"+i,"","position:relative;width:100%;height:auto;margin: 0 auto;",'<div id="M'+t+"PreloadC"+i+'">Loading...</div>');let n=document.createElement("script");n.text='(function(){var D=new Date(),d=document,b="body",ce="createElement",ac="appendChild",st="style",ds="display",n="none",gi="getElementById",lp=d.location.protocol,wp=lp.indexOf("http")==0?lp:"https:";var i=d[ce]("iframe");i[st][ds]=n;d[gi]("M'+t+"ScriptRootC"+i+'")[ac](i);try{var iw=i.contentWindow.document;iw.open();iw.writeln("<ht"+"ml><bo"+"dy></bo"+"dy></ht"+"ml>");iw.close();var c=iw[b];}catch(e){var iw=d;var c=d[gi]("M'+t+"ScriptRootC"+i+'");}var dv=iw[ce]("div");dv.id="MG_ID";dv[st][ds]=n;dv.innerHTML='+i+';c[ac](dv);var s=iw[ce]("script");s.async="async";s.defer="defer";s.charset="utf-8";s.src=wp+"'+a+"."+i+'.js?t="+D.getYear()+D.getMonth()+D.getUTCDate()+D.getUTCHours();c[ac](s);})();',n.type="text/javascript",e.appendChild(n);let o=document.createElement("style");o.type="text/css",styles=".mgheader{ display:none!important} @media only screen and (max-width: 480px) {#MarketGidComposite"+i+" .mgline {width:100%!important}} .mctitle a {font-family:-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol!important; line-height:20px!important;font-weight:500!important;color: #039be5!important;}.mglbutton{background:#3f3f3f!important;right:5px!important;bottom:5px!important}.mgl{display:none!important} div.mg_addad"+i+" {display:none!important} .mgbox {max-width:100%!important;}",o.styleSheet?o.styleSheet.cssText=styles:o.appendChild(document.createTextNode(styles)),e.appendChild(o)},tenMaxGenerate:function(e,t,i,a,n,o,d){this.addAdvertisementLabel(e);let s=document.createElement("ins");s.className="rmax",s.setAttribute("data-rmax-space-id",t),s.setAttribute("data-rmax-space-type",i),a>0&&s.setAttribute("data-rmax-space-width",a+"px"),n>0&&s.setAttribute("data-rmax-space-height",n+"px"),o&&s.setAttribute("data-target-pos",o),d&&s.setAttribute("data-target-gpt-container",d),e.appendChild(s);let l=document.createElement("script");l.src="//tenmax-static.cacafly.net/ssp/adsbytenmax.js",l.async=!0,e.appendChild(l)},amrGenerate:function(e,t){this.addAdvertisementLabel(e),this.addObject(e,"zone",t);let i=document.createElement("script");i.text='arfAsync.push("'+t+'");',i.type="text/javascript",e.appendChild(i)},amrGenerateTag:function({container:e,space_id:t}){this.addAdvertisementLabel(e),this.addObject(e,"zone",t);let i=document.createElement("script");i.text='arfAsync.push("'+t+'");',i.type="text/javascript",e.appendChild(i)},amrLibLoad:function(){if(!document.getElementById("arf-core-js")){let e=document.createElement("script");e.type="text/javascript",e.text="var arfAsync = arfAsync || [];",document.head.appendChild(e),(e=document.createElement("script")).type="text/javascript",e.id="arf-core-js",e.async=!0,e.src="//media1.admicro.vn/cms/Arf.min.js",document.head.appendChild(e)}},ggAdxLibLoad:function(){if(!document.getElementById("adx-core-lib")){let e=document.createElement("script");e.type="text/javascript",e.id="adx-core-lib",e.async=!0,e.src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",document.head.appendChild(e)}},epomGenerate:function(e,t,i){let a=document.createElement("ins");a.className=t,a.dataset.key=i,e.appendChild(a)},epomGenerateUniversalTag:function({container:e,class_name:t,key:i}){let a=document.createElement("ins");a.className=t,a.dataset.key=i,e.appendChild(a)},yoGenerateTag:function({container:e,key:t,call_back_fnc:i}){let a=document.createElement("script");a.text='var _avlVar = _avlVar || []; _avlVar.push(["'+t+'","[yo_page_url]","[width]","[height]"]);',e.appendChild(a),(a=document.createElement("script")).id="s-"+t,a.src="//ss.yomedia.vn/js/yomedia-sdk.js?v=3",i&&(a.onload=i,a.onerror=i),e.appendChild(a)},addObject:function(e,t,i="",a="",n="",o=""){let d=document.createElement(t);d.id=i,d.className=a,d.style=n,d.innerHTML=o,e.appendChild(d)},addAdvertisementLabel:function(e){e.getElementsByClassName("tpm_attribution")[0]||0||(this._custom_label_ads_by?this.addObject(e,"div","","tpm_attribution","","<span>"+this._label_ads_by+"</span><hr/>"):this.addObject(e,"div","","tpm_attribution","",this._label_ads_by))},initLib:function(){if(this.ggAdxLibLoad(),!document.getElementById("tpm-css-init")){let e=document.createElement("style");e.id="tpm-css-init",e.type="text/css";let t=".tpm_attribution {text-align: center;font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol!important;color: #757575;padding: 5px 0px;font-size: 10px;}";this._custom_label_ads_by&&(t+=".tpm_attribution {position:relative;z-index:1} .tpm_attribution span{position:relative;z-index:1;background:#f6f6f6;padding:0px 20px} .tpm_attribution hr {position: relative;top: -10px;width: 90%;z-index: 0;color: #d2d2d2;border: 0;border-top: 1px solid #ccc;margin: 0 auto;text-align: center;}"),e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t)),document.head.appendChild(e)}}};
