function audio_repeat(id){
	var audio = document.getElementById(id); 
	audio.currentTime = 0;// replay
}

var interval_id;
function checkAudioStop(id, img){
	var audio = document.getElementById(id); 
	if(audio!==null){
		if(audio.paused){
			img.src="images/laba0412.png";
		}
	}
}

function audio_control(id, img){
	var audio = document.getElementById(id); 
	if(audio!==null){ 
		if(audio.paused){
			img.src="images/laba0412.gif";
			audio.play();// play
			if(interval_id != null){
				window.clearInterval(interval_id);
				interval_id = null;
			}
			interval_id = window.setInterval(function() {checkAudioStop(id,img)},10);
		}else{
			img.src="images/laba0412.png";
			audio.pause();// pause
		}
	} 
}
/*audio_html_str = '<audio src="#file" preload id="music" hidden></audio>';
function audio_js(file){
	audio_str = audio_html_str.replace(new RegExp('#file',"igm"), file);
	document.write(audio_str);
}*/