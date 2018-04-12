var ua = window.navigator.userAgent.toLowerCase(); 
if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
	//style="display: none"
	$('body').attr('style', 'display: none');
} else { 
  window.stop ? window.stop() : document.execCommand("Stop");
} 

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

function getQueryString() {  
    var qs = location.search.substr(1), //
    args = {}, //
    items = qs.length ? qs.split("&") : [], //
    item = null,
    len = items.length;
 
    for(var i = 0; i < len; i++) {
		item = items[i].split("=");
		var name = decodeURIComponent(item[0]),
		  value = decodeURIComponent(item[1]);
		if(name) {
		  args[name] = value;
		}
   }
   return args;
}

function httpClient(method, url, data, successfun, errorfun, timeout){
	if(!url){return;}
	if(!successfun){successfun=function(){}}
	if(!errorfun){errorfun=function(){}}
	if(!timeout){timeout=defaultTimeout;}
	var auth = sessionStorage.Authorization;
	$.ajax({
		  type: method,
		  url: SERVICE_URL + url,
		  data: data,
		  timeout: timeout,
		  context: $('body'),
		  headers: {'Content-Type': 'application/json', 'Origin': location.protocol+"//"+location.host, 'Access-Control-Request-Method':method, 'Access-Control-Request-Headers':'origin, content-type, accept, authorization, Pragma, Cache-control, Expires','Authorization':auth},
		  success: function(response){
			  successfun(response);
		  },
		  error: function(xhr, type){
			//alert('error!:'+JSON.stringify(xhr) + ', type' + JSON.stringify(type))
			  errorfun(xhr,type);
		  }
	});
}

function httpGet(url, data, successfun, errorfun, timeout){
	httpClient('GET', url, data, successfun, errorfun, timeout);
}

function httpPost(url, data, successfun, errorfun, timeout){
	httpClient('POST', url, data, successfun, errorfun, timeout);
}

function httpPut(url, data, successfun, errorfun, timeout){
	httpClient('PUT', url, data, successfun, errorfun, timeout);
}

function httpDelete(url, data, successfun, errorfun, timeout){
	httpClient('DELETE', url, data, successfun, errorfun, timeout);
}

function oauth(){
	var qs = getQueryString();
	if(qs['code'] != null){
		httpGet('/wechat/portal/oauth/accesstoken', 
				{code: qs['code']}, 
				function(response){
					sessionStorage.Authorization = response;
					delete qs['code'];
					window.location.replace(location.pathname + "?" +  $.param(qs));
				}, 
				function(xhr,type){});
	}
	else{
		var auth = sessionStorage.Authorization;
		if(auth == null){
			httpGet('/wechat/portal/oauth/url', 
					{url: location.href}, 
					function(response){
						window.location.replace(response);
					}, 
					function(xhr,type){
						window.location.reload();
					});
		}
	   else{
		   // normal
		   $('body').removeAttr('style');  
	   }	
	}
}   
loadScript("js/config.js?20180412=11", oauth);
