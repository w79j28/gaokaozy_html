//var ua = window.navigator.userAgent.toLowerCase(); 
//if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
//	//
//} else { 
//   window.stop ? window.stop() : document.execCommand("Stop");
//} 

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
var SERVICE_URL = "http://a0f61c09.ngrok.io";

	var qs = getQueryString();
	alert('code:' + qs['code'])
	if(qs['code'] != null){
		alert('code num ' + qs['code'] )
		$.get(SERVICE_URL + '/wechat/portal/oauth/accesstoken?code=' + qs['code'], function(response){
			sessionStorage.Authorization = response;
		},'jsonp');
	}
	else{
	    var auth = sessionStorage.Authorization;
	    alert('auth:' + auth);
	    alert(location.href);
	    $.get(SERVICE_URL + '/wechat/portal/oauth/url', {url: location.href}, function(response, status, xhr){
	    	alert(response);
	    	window.location.replace(response);
	    },'jsonp');
		if(auth == null){
        }
	   else{
		   // normal
	   }	
			
			
   }
    

