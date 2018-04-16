import {httpGet, httpPost} from '../common/js/http.js';



function getQueryString() {  
    var queryStr = location.search;
	if(!queryStr){
	   queryStr = location.hash;
	   queryStr = queryStr.substr(queryStr.indexOf("?"));
	}
    var qs = queryStr.substr(1), //
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
var qs = getQueryString();

if(qs['code']){
	httpGet('/wechat/portal/oauth/accesstoken', 
			{code: qs['code']}, 
			function(response){
				sessionStorage.Authorization = response;
				delete qs['code'];
				var url = location.hash.substr(1)
				if(url.indexOf('?') >=0){
				   url = url.substring(0, url.indexOf('?'));
				}
				
				url = url + "?" + $.param(qs);
				window.location.replace(url);
			}, 
			function(xhr,type){alert(type)});
}