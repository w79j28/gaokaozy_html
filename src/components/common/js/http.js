import {SERVICE_URL, defaultTimeout} from './config.js';



function httpClient(method, url, data, successfun, errorfun, timeout){
	if(!url){return;}
	if(!successfun){successfun=function(){}}
	if(!errorfun){errorfun=function(){}}
	if(!timeout){timeout=defaultTimeout;}
	var auth = sessionStorage.Authorization;
	var httpUrl = SERVICE_URL + url;
	$.ajax({
		  type: method,
		  url: httpUrl,
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

export function httpGet(url, data, successfun, errorfun, timeout){
	httpClient('GET', url, data, successfun, errorfun, timeout);
}

export function httpPost(url, data, successfun, errorfun, timeout){
	httpClient('POST', url, data, successfun, errorfun, timeout);
}

export function httpPut(url, data, successfun, errorfun, timeout){
	httpClient('PUT', url, data, successfun, errorfun, timeout);
}

export function httpDelete(url, data, successfun, errorfun, timeout){
	httpClient('DELETE', url, data, successfun, errorfun, timeout);
}
