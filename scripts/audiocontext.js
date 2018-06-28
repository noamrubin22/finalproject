////////////////////////////////////////////////////////
// Minor Programmeren Finalproject Musicvisualization // 
//                                                    //
// Name:  Noam Rubin       	                          //
// Studentnumber: 10800565							  //
// 													  //
// 27 - 06 - 2018                                	  // 
//		    									      //  													  
// This script plays the chosen song, creates an	  //
// audiocontext and returns the context, sourc and    //
// analyserNode										  // 
//			                                          //
////////////////////////////////////////////////////////

function playAudio(song) {
	/* returns audio-element, context and analyserNode */

	// initialize audio element
	var audio = new Audio(); 
      
		// make sure CODS are set to None 
		audio.crossOrigin = 'anonymous';

		// use uploaded song
		audio.src = "audio/"  + song;
	
		// let it play 
		audio.controls = true;
		audio.loop = true; 
		audio.autoplay = false;

	// if audio changes
	audio.onchange = function() {

		// create files in this 
		var files = this.files;

		// store objecturl 
		var file = URL.createObjectURL(files[0]); 

				// set objecturl to audioplayer
				audio_player.src = file; 

	// play audio
	audio_player.play();
	};

	// replace audio element in the audio box on the page
    var audioElement = document.getElementById("audio-box");
    audioElement.replaceChild(audio, audioElement.childNodes[0]);
	
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