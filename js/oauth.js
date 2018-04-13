function loadScript(url, callback){
	callback=callback||function(){};
	var script = document.createElement("script")
	script.type = "text/javascript";
	if (script.readyState){  //IE
		script.onreadystatechange = function(){
			if (script.readyState == "loaded" ||
			script.readyState == "complete"){
				script.onreadystatechange = null;
				callback();
			}
		};
	} else {  //Others: Firefox, Safari, Chrome, and Opera
		script.onload = function(){
		callback();
		};
	}
	script.src = url;
	document.getElementsByTagName('head')[0].appendChild(script);
}

function oauth(){
	
		var auth = sessionStorage.Authorization;
		if(auth == null){
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
							getUrlNumber = parseInt(getUrlNumber);
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

var ua = window.navigator.userAgent.toLowerCase(); 
if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
	//style="display: none"
	$('body').attr('style', 'display: none');
	loadScript("js/config.js?20180412=11", oauth);
} else { 
 
  window.stop ? window.stop() : document.execCommand("Stop");
  //$('body')
  //return;
} 

