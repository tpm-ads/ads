const generateAds=()=>{tpmUtils._label_ads_by="Ads by TPMedia";tpmUtils.initLib();tpmUtils.amrLibLoad();const t=[];let e=[{name:"tpads_top_banner",div_append_id:"main_content",div_type:"id",position:"before",div_id:"tpads_top_banner",type:{adx:{ad_unit:"/93656639/Tpmedia/giavang.net_pc_728x90",div_id:"tpads_top_banner_adx",sizes:"[[970,250],[970,90], [728,90]]",refresh:30}},div_styles:"width: 970px;height: auto;margin:0 auto;text-align:center;padding:5px"},{name:"tpads_float_left",div_append_id:"main_container",div_type:"id",position:"append",div_id:"tpads_float_left",type:{adx:{ad_unit:"/93656639/Tpmedia/giavang.net_pc_728x90",div_id:"tpads_float_left_adx",sizes:"[[120,600], [160,600]]",refresh:30}},div_styles:"width: 160px;height: 600px;position: fixed;left: 300px;bottom: 15;"},{name:"tpads_float_right",div_append_id:"main_container",div_type:"id",position:"append",div_id:"tpads_float_right",type:{adx:{ad_unit:"/93656639/Tpmedia/giavang.net_pc_728x90",div_id:"tpads_float_right_adx",sizes:"[[120,600], [160,600]]",refresh:30}},div_styles:"width: 160px;height: 600px;position: fixed;right: 300px;bottom: 15;"},{name:"tpads_float_bottom",div_append_id:"main_container",div_type:"id",position:"append",div_id:"tpads_float_bottom",type:{adx:{ad_unit:"/93656639/Tpmedia/giavang.net_pc_728x90",div_id:"tpads_float_bottom_adx",sizes:"[[970,90], [728,90]]",refresh:30}},div_styles:"width: 970px;height: 90px;position: fixed;text-align:center;left: 50%;bottom: 0;z-index: 10000;right: 50%;margin: 20px -485px;"},{name:"tpads_under_gold_link",div_append_id:"bangvanglink",div_type:"class",position:"after",div_id:"tpads_under_gold_link",type:{adx:{ad_unit:"/93656639/Tpmedia/giavang.net_pc_728x90",div_id:"tpads_under_gold_link_adx",sizes:"[[336,280], [300,250]]",refresh:30}},div_styles:"width: 336px;height: 280px;margin:0 auto;text-align:center"},{name:"tpads_column_left_1",div_append_id:"topbox",div_type:"class",position:"after",div_id:"tpads_column_left_1",type:{adx:{ad_unit:"/93656639/Tpmedia/giavang.net_pc_728x90",div_id:"tpads_column_left_1_adx",sizes:"[[336,280], [300,250]]",refresh:30}},div_styles:"width: 336px;height: 280px;margin:0 auto;text-align:center"},{name:"tpads_column_left_2",div_append_id:"login_form",div_type:"id",position:"after",div_id:"tpads_column_left_2",type:{adx:{ad_unit:"/93656639/Tpmedia/giavang.net_pc_728x90",div_id:"tpads_column_left_1_adx",sizes:"[[336,280], [300,250]]",refresh:30}},div_styles:"width: 336px;height: 280px;margin:0 auto;text-align:center"}],i=".tpm-ads-unit {position:relative}";i+=".tpm_attribution {position:absolute;bottom:-15px;right:5px;font-size:9px!important}";if(tpmUtils.isMobile())e=t;else{let t=document.body.children[2];t.id="main_container";t.children[1].id="main_content";let e="//div[text()='Trỏ chuột vào tên thành viên để xem tỷ lệ chốt trúng của thành viên đó (tỷ lệ trúng cao được đánh dấu màu tím)']",i=document.evaluate(e,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;i&&(i.nextSibling.nextSibling.nextSibling.nextSibling.id="login_form")}var d=document.createElement("style");d.type="text/css";d.styleSheet?d.styleSheet.cssText=i:d.appendChild(document.createTextNode(i));document.getElementsByTagName("head")[0].appendChild(d);for(let t of e){let e=tpmUtils.appendDiv(t),i=t.type.adx||0,d=(t.type.adplus,t.type.mgid||0),a=t.type.epom||0,n=t.type.amr||0;t.type.html;if(e){if(i){let e=i.backup||0,d={container:document.getElementById(t.div_id),div_id:i.div_id,slot_name:i.ad_unit,slot_size:i.sizes,mapping_rule:i.mapping_rule,refresh_ads:i.refresh,refresh_times:i.refresh_times};if(i.inpage){d.background="white";tpmUtils.inPageGenerateDfp(d)}else{if(e)switch(e.type){case"epom":d.call_back_fnc="tpmUtils.epomGenerate(document.getElementById('"+t.div_id+"'), '"+e.class_name+"','"+e.key+"');";break;case"mgid":d.call_back_fnc="tpmUtils.mgidGenerate(document.getElementById('"+t.div_id+"'), "+e.account_id+","+e.zone_id+",'"+e.domain+"');"}tpmUtils.dfpGenerateTag(d)}}if(d){let e={container:document.getElementById(t.div_id),account_id:d.account_id,zone_id:d.zone_id,domain:d.domain};tpmUtils.mgidGenerateTag(e)}if(a){let e={container:document.getElementById(t.div_id),class_name:a.class_name,key:a.key};tpmUtils.epomGenerateUniversalTag(e)}if(n){let e={container:document.getElementById(t.div_id),space_id:n.ad_unit};tpmUtils.amrGenerateTag(e)}}}js_tag=document.createElement("script");js_tag.id="tpm-epm";js_tag.async=!0;js_tag.defer=!0;js_tag.src="//aj1559.online/ba298f04.js";document.body.appendChild(js_tag);js_tag=document.createElement("script");js_tag.id="tpm-optad";js_tag.async=!0;js_tag.src="//get.optad360.io/sf/40cb65f0-69bf-42bb-aabb-42871f716c06/plugin.min.js";document.head.appendChild(js_tag);js_tag=document.createElement("script");js_tag.id="tpm-epmd";js_tag.async=!0;js_tag.src="//aj1047.online/194c03ba.js";document.body.appendChild(js_tag)};if("undefined"==typeof tpmUtils){let t=document.createElement("script");t.id="tpm-util";t.async=!0;t.src="https://cdn.statically.io/gh/tpm-ads/ads/master/publisher/js/tpmUtil.js";t.onload=generateAds;document.head.append(t)}else generateAds();
