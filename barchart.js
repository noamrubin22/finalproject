
window.onload = function(){
	

	// initialize audio element
	var audio = new Audio(); 
      
		// make sure CODS are set to None 
		audio.crossOrigin = 'anonymous';

		// choose song
		audio.src = "raga.mp3";

		// let it play 
		audio.controls = true;
		audio.loop = true; 
		audio.autoplay = true;
		console.log("hoi")

	audio.onchange = function(){
	// """ Being executed when audio context changes """

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
    document.getElementById("audio_box").appendChild(audio);
	
	// create audiocontext
	context = new AudioContext();

        // create analyserNode 
        var analyserNode = context.createAnalyser(); 

        // 
        var canvas = document.getElementById("analyser_render"); 

        // re-route audio playback into the processing graph of the Audio context
        var source = context.createMediaElementSource(audio);
        
        // connect audio context analyser
        source.connect(analyserNode);
        
        // connect visualizationdata to destination
        analyserNode.connect(context.destination);

	createBarChart()

	function createBarChart() {
		// """ Creates a dynamic barchart """

		window.requestAnimationFrame(createBarChart);

		// substract frequencies
		frequencyArray = new Uint8Array(analyserNode.frequencyBinCount);
        analyserNode.getByteFrequencyData(frequencyArray);
        
        console.log(frequencyArray);
        
        // clear svg 
        d3.select("svg").remove();

		// initialize properties
		var w = 900;
		var h = 900;
		var bars = frequencyArray.length;
		var barHeight = w - padding
		var barWidth = h / bars;
		var padding = 1;

		// append svg element
		var svg = d3.select("body")
					.append("svg")
					.attr("width", w)
					.attr("height", h);

		// add rectangles
		svg.selectAll("rect")
			.data(frequencyArray)
			.enter()
			.append("rect")
			.attr("y", function(d, i) {
					return i * w / bars - padding;
			})
			.attr("x", function(d) {
				return h - d;
			})
			.attr("height", barWidth)
			.attr("width", function(d) {
				return d;
			})
			.attr("fill", "grey" );
	}
}