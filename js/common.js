Zepto(function($){
	$('.container').attr("style","height: "+(getClientHeight()-66)+"px");
  
	// tabbar
	$('#fill-out').on('click', function(e){ 
		//
		window.location.replace('3.html');
	});
	
    // observe all clicks inside #content:
	$('#online-pay').on('click', function(e){ 
		//
		window.location.replace('2.html');
	});

})

function getClientHeight(){
   var clientHeight=0;
   if(document.body.clientHeight&&document.documentElement.clientHeight)
   {
   var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;   
   }
   else
   {
   var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;   
   }
   return clientHeight;
}
