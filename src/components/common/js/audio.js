function audioRepeat(audio){
	audio.currentTime = 0;// replay
}

var interval_id;
function checkAudioStop(audio, img, imgpaused){
	if(audio!==null){
		if(audio.paused){
			img.src=imgpaused;
		}
	}
}

export default function audioControl(audio, img, imgplay, imgpaused){
	if(audio!==null){ 
		if(audio.paused){
			img.src=imgplay;
			audio.play();// play
			if(interval_id != null){
				window.clearInterval(interval_id);
				interval_id = null;
			}
			interval_id = window.setInterval(function() {checkAudioStop(audio,img,imgpaused)},10);
		}else{
			img.src=imgpaused;
			audio.pause();// pause
		}
	} 
}
/*audio_html_str = '<audio src="#file" preload id="music" hidden></audio>';
function audio_js(file){
	audio_str = audio_html_str.replace(new RegExp('#file',"igm"), file);
	document.write(audio_str);
}*/