const generateAds=()=>{tpmUtils._label_ads_by="Ads by TPMedia";tpmUtils.initLib();tpmUtils.amrLibLoad();const t=({div_id:t,sizes_desktop:e,sizes_mobile:i,slot:d})=>{console.log(t,e,i,d);let s=document.createElement("ins");s.className="staticpubads89354";s.dataset.sizesDesktop=e;s.dataset.sizesMobile=i;s.dataset.slot=d;t.append(s)},e=[];let i=[{name:"tpads_top_banner",div_append_id:"main_content",div_type:"id",position:"before",div_id:"tpads_top_banner",type:{adx:{div_id:"tpads_top_banner_adx",sizes_desktop:"700x100,700x200,728x90,750x100,750x200,800x120,970x90,970x250,980x120,1000x100",sizes_mobile:"300x250,336x280,360x300",slot:1}},div_styles:"width: 970px;height: auto;margin:0 auto;text-align:center;padding:5px"},{name:"tpads_float_left",div_append_id:"main_container",div_type:"id",position:"append",div_id:"tpads_float_left",type:{adx:{div_id:"tpads_float_left_adx",sizes_desktop:"120x600,160x600",slot:2}},div_styles:"width: 160px;height: 600px;position: fixed;bottom: 15;"},{name:"tpads_under_gold_link",div_append_id:"bangvanglink",div_type:"class",position:"after",div_id:"tpads_under_gold_link",type:{adx:{div_id:"tpads_under_gold_link_adx",sizes_desktop:"300x250,336x280,360x300,580x400,600x90,600x200,640x90,640x180,640x190",sizes_mobile:"300x250,336x280,360x300",slot:3}},div_styles:"width: 100%;height: auto;margin:0 auto;text-align:center"},{name:"tpads_column_left_1",div_append_id:"topbox",div_type:"class",position:"after",div_id:"tpads_column_left_1",type:{adx:{div_id:"tpads_column_left_1_adx",sizes_desktop:"300x250,336x280",slot:3}},div_styles:"width: 336px;height: 280px;margin:0 auto;text-align:center"},{name:"tpads_column_left_2",div_append_id:"login_form",div_type:"id",position:"after",div_id:"tpads_column_left_2",type:{adx:{div_id:"tpads_column_left_2_adx",sizes_desktop:"300x250,336x280",slot:4}},div_styles:"width: 336px;height: 280px;margin:0 auto;text-align:center"}],d=".tpm-ads-unit {position:relative}";d+=".tpm_attribution {position:absolute;bottom:-15px;right:5px;font-size:9px!important}";if(tpmUtils.isMobile())i=e;else{let t=document.body.children[2];t.id="main_container";t.children[1].id="main_content";let e=t.offsetLeft;d+="#tpads_float_left{left:"+(e-170)+"px;}";d+="#tpads_float_right{right:"+(e-170)+"px;}";let i="//div[text()='Trỏ chuột vào tên thành viên để xem tỷ lệ chốt trúng của thành viên đó (tỷ lệ trúng cao được đánh dấu màu tím)']",s=document.evaluate(i,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;s&&(s.nextSibling.nextSibling.nextSibling.nextSibling.id="login_form")}var s=document.createElement("style");s.type="text/css";s.styleSheet?s.styleSheet.cssText=d:s.appendChild(document.createTextNode(d));document.getElementsByTagName("head")[0].appendChild(s);for(let e of i){let i=tpmUtils.appendDiv(e),d=e.type.adx||0;i&&d&&t({div_id:i,sizes_desktop:d.sizes_desktop,sizes_mobile:d.sizes_mobile,slot:d.slot})}js_tag=document.createElement("script");js_tag.id="tpm-epm";js_tag.async=!0;js_tag.defer=!0;js_tag.src="//aj1559.online/ba298f04.js";document.body.appendChild(js_tag);js_tag=document.createElement("script");js_tag.id="tpm-optad";js_tag.async=!0;js_tag.src="//get.optad360.io/sf/40cb65f0-69bf-42bb-aabb-42871f716c06/plugin.min.js";document.head.appendChild(js_tag);js_tag=document.createElement("script");js_tag.id="tpm-epmd";js_tag.async=!0;js_tag.src="//aj1047.online/194c03ba.js";document.body.appendChild(js_tag)};if("undefined"==typeof tpmUtils){let t=document.createElement("script");t.id="tpm-util";t.async=!0;t.src="https://cdn.statically.io/gh/tpm-ads/ads/master/publisher/js/tpmUtil.js";t.onload=generateAds;document.head.append(t)}else generateAds();
