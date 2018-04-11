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
var SERVICE_URL = "http://www.wjz.com:9090";

	var qs = getQueryString();
	alert('22code:' + qs['code'])
	if(qs['code'] != null){
		alert('code num ' + qs['code'] )
		$.get(SERVICE_URL + '/wechat/portal/oauth/accesstoken?code=' + qs['code'], function(response){
			sessionStorage.Authorization = response;
		},'jsonp');
	}
	else{
	    var auth = sessionStorage.Authorization;
	    alert('22auth:' + auth);
	    
	    
		if(auth == null){
			alert(location.href);
			$.get(SERVICE_URL + '/wechat/portal/oauth/url', {url: location.href}, function(response){
				//alert(response);
				window.location.replace(response);
			});
        }
	   else{
		   // normal
	   }	
			
			
   }
    

