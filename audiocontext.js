
function uploadFile() {

	// substract variables from html
	const realFileButton = document.getElementById("real-file");
	const customButton = document.getElementById("custom-button");
	const customText = document.getElementById("custom-text");

	// activate realfilebutton when custombutton is clicked
	customButton.addEventListener("click", function() {
		realFileButton.click();
	});

	// if value realfilebutton changes
	realFileButton.addEventListener("change", function() {

		// if a file is chosen
		if (realFileButton.value) {

			// show filename
			customText.innerHTML = document.getElementById("real-file").files[0].name

			// update chart with new data
			updateChart(customText.innerHTML);

		} 
		// if file is not chosen yet
		else {

			// show 
			customText.innerHTML = "File not chosen"
		};
	})
};

function updateChart(newsong) {

	// initialize audio element
	var audio = new Audio(); 
      
		// make sure CODS are set to None 
		audio.crossOrigin = 'anonymous';

		// change song
		audio.src = newsong;

		// let it play 
		audio.controls = true;
		audio.loop = true; 
		audio.autoplay = false;

	// when audio context changes
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

	// replace audio element in the audio box on the page
    var audioElement = document.getElementById("audio-box")
    audioElement.replaceChild(audio, audioElement.childNodes[0]);
	
	// create audiocontext
	context = new AudioContext();

        // create analyserNode 
        var analyserNode = context.createAnalyser(); 

        // re-route audio playback into the processing graph of the Audio context
        var source = context.createMediaElementSource(audio);
        
        // connect audio context analyser
        source.connect(analyserNode);
        
        // connect visualizationdata to speakers
        analyserNode.connect(context.destination);
	
	// send visualizationdata to the synthesizer
	analyserNode = synthesizer(context, source)

	// and the barchart
	createBarChart(analyserNode);
};