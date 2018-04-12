var ua = window.navigator.userAgent.toLowerCase(); 
if (ua.match(/MicroMessenger/i) == 'micromessenger') { 
	//
} else { 
  window.stop ? window.stop() : document.execCommand("Stop");
} 

var loading;
loading = weui.loading('loading', {
    className: 'custom-classname'
});

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


function oauth(){
	var qs = getQueryString();
	if(qs['code'] != null){
		$.get(SERVICE_URL + '/wechat/portal/oauth/accesstoken?code=' + qs['code'], function(response){
			sessionStorage.Authorization = response;
			delete qs['code'];
			window.location.replace(location.pathname + "?" +  $.param(qs));
			
		});
	}
	else{
		var auth = sessionStorage.Authorization;
		if(auth == null){
			if(loading != null){
				   loading.hide(function() {
					   //console.log('`loading` has been hidden');
				   });
			}
			$.ajax({
				  type: 'GET',
				  url: SERVICE_URL + '/wechat/portal/oauth/url',
				  // data to be added to query string:
				  data: {url: location.href},
				  // type of data we are expecting in return:
				  //dataType: 'jsonp',
				  timeout: 5000,
				  context: $('body'),
				  success: function(response){
					// Supposing this JSON payload was received:
					//   {"project": {"id": 42, "html": "<div>..." }}
					// append the HTML to context object.
					//this.append(data.project.html)
					  loading = weui.loading('loading', {
						    className: 'custom-classname'
					  });
					  window.location.replace(response);
				  },
				  error: function(xhr, type){
					alert('error!:'+JSON.stringify(xhr) + ', type' + JSON.stringify(type))
				  }
			});
		}
	   else{
		   // normal
		   if(loading != null){
			   loading.hide(function() {
				   //console.log('`loading` has been hidden');
			   });
		   }
	   }	
	}
}   
loadScript("js/config.js?20180412=2", oauth);
