import {httpGet, httpPost} from './http.js';

function oauth(){
	
		var auth = sessionStorage.Authorization;
		if(!auth){
			var pathStr = location.pathname;
			pathStr = pathStr.substring(0, pathStr.lastIndexOf("/"));
			httpGet('/wechat/portal/oauth/url', 
					{url: location.protocol+"//"+location.host+pathStr+"/code.html#"+location.pathname+location.search}, 
					function(response){
						window.location.replace(response);
					}, 
					function(xhr,type){
						var getUrlNumber = sessionStorage.GetOauthUrlNumber;
						if(getUrlNumber){
							getUrlNumber = parseInt(getUrlNumber) + 1;
						}
						else{
							getUrlNumber = 1;
						}
						
						if(getUrlNumber > 3){
						   	window.stop ? window.stop() : document.execCommand("Stop");
						}
						else{
							sessionStorage.GetOauthUrlNumber = getUrlNumber;
							window.location.reload();
						}
					});
		}
	   else{
		   // normal
		   $('body').removeAttr('style');  
	   }	
	//}
}   


export default function oauthCheck(){
	var ua = window.navigator.userAgent.toLowerCase(); 
	if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
		//style="display: none"
		$('body').attr('style', 'display: none');
	//	loadScript("js/config.js?20180412=11", oauth);
		oauth();
	} else { 
	  console.log('Not Weixin!');
	  window.stop ? window.stop() : document.execCommand("Stop");
	  //$('body')
	  //return;
	} 
}


