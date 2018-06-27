function playAudio() {

	// initialize audio element
	var audio = new Audio(); 
      
		// make sure CODS are set to None 
		audio.crossOrigin = 'anonymous';

		// use uploaded song
		audio.src = "raga.mp3";
	
		// let it play 
		audio.controls = true;
		audio.loop = true; 
		audio.autoplay = false;

	audio.onchange = function(){

		// create files in this 
		var files = this.files;

		// store objecturl 
		var file = URL.createObjectURL(files[0]); 

				// set objecturl to audioplayer
				audio_player.src = file; 

	// play audio
	audio_player.play();
	};

	// add created audio element to the audio box on the page
   	document.getElementById("audio-box").appendChild(audio);
	
	// create audiocontext
	var context = new AudioContext();

    // create analyserNode 
    var analyserNode = context.createAnalyser(); 

    // re-route audio playback into the processing graph of the Audio context
    var source = context.createMediaElementSource(audio);
    
    // connect audio context analyser
    source.connect(analyserNode);
    
    // connect visualizationdata to destination
    analyserNode.connect(context.destination);

	return [context, source, analyserNode];
}