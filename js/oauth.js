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

var SERVICE_URL = "http://wang79j28.tunnel.qydev.com";

	var qs = getQueryString();
	if(qs['code'] != null){
		alert('code num :' + qs['code'] )
		$.get(SERVICE_URL + '/wechat/portal/oauth/accesstoken?code=' + qs['code'], function(response){
			sessionStorage.Authorization = response;
			delete qs['code'];
			alert(location.pathname + "?" +  $.param(qs));
			window.location.replace(location.pathname + "?" +  $.param(qs));
			
		});
	}
	else{
	    var auth = sessionStorage.Authorization;
	   
	    
	    
		if(auth == null){
			alert("55auth:" + auth + ", href:" +location.href);
			
			
			$.ajax({
				  type: 'GET',
				  url: SERVICE_URL + '/wechat/portal/oauth/url',
				  // data to be added to query string:
				  data: {url: location.href},
				  // type of data we are expecting in return:
				  //dataType: 'jsonp',
				  timeout: 300,
				  context: $('body'),
				  success: function(response){
					// Supposing this JSON payload was received:
					//   {"project": {"id": 42, "html": "<div>..." }}
					// append the HTML to context object.
					//this.append(data.project.html)
					window.location.replace(response);
				  },
				  error: function(xhr, type){
					alert('Ajax error! error=55:'+JSON.stringify(xhr) + ', type' + JSON.stringify(type))
				  }
			});
			

        }
	   else{
		   // normal
	   }	
			
			
   }
    

