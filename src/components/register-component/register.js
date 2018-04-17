
import '../common/style/app.css';
import 'weui';
import weui from 'weui.js';

import LabaGif from '../common/images/laba.gif';
import LabaPng from '../common/images/laba.png';
import audioControl from '../common/js/audio.js';
import {httpPost} from '../common/js/http.js';
import oauthCheck from '../common/js/oauth.js';


// oauthCheck();

$(function () {
	// if (process.env.NODE_ENV !== 'production') {
	    // console.log('Looks like we are in development mode!');
		
	// }
    // else{
		// alert('production !') 
	// }	
	
	$('#audio_img').on('click', function(e){ 
	    // audioControl(audio, img, imgplay, imgpaused)
        audioControl($('audio')[0], this, LabaGif, LabaPng);
    });
	// httpPost('/postgreeting', 
	// '{ "content": "payload", "id": 999 }', 
	// function(response){
		// alert(response.body.id);
		// window.location.replace('2.html');
	// });
	
	$('#formSubmitBtn').on('click', function(e){ 
        //
       //window.location.replace('2.html');
      
       
        httpPost('/postgreeting', 
    		    '{ "content": "payload", "id": 999 }', 
    		    function(response){
    		    	alert(response.body.id);
    		    	
		});
	});
})