// function frequencyBarChart(){ 

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
			// console.log("hoi")

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

		// // add created audio element to the audio box on the page
	 //    document.getElementById("audio_box").appendChild(audio);
		
		// create audiocontext
		context = new AudioContext();

	        // create analyserNode 
	        var analyserNode = context.createAnalyser(); 

	        // re-route audio playback into the processing graph of the Audio context
	        var source = context.createMediaElementSource(audio);
	        
	        // connect audio context analyser
	        source.connect(analyserNode);
	        
	        // connect visualizationdata to destination
	        analyserNode.connect(context.destination);

		return analyserNode;
    } 
     	// createBarChart(analyserNode)

	function createBarChart(anaylserNode) {
		// """ Creates a dynamic barchart """

		window.requestAnimationFrame(function() {
			createBarChart(analyserNode)
		});
		// console.log(analyserNode)
		// substract frequencies
		frequencyArray = new Uint8Array(analyserNode.frequencyBinCount);

		// copy frequency data into array
        analyserNode.getByteFrequencyData(frequencyArray);
        // console.log("hey")
        
        // console.log(frequencyArray);
        // console.log(anaylserNode)
        // clear svg 
        d3.select("svg").remove();

		// initialize properties
		var w = 1000;
		var h = 400;
		var bars = frequencyArray.length;
		var barHeight = w - padding
		var barWidth = h / bars;
		var padding = 1;

		// append svg element
		var svg_div = d3.select(".svg-div")
					.append("svg")
					.attr("id", "graph-svg")
					.attr("width", w)
					.attr("height", h);


		var graph_svg = d3.select("#graph-svg")

		// add rectangles
		graph_svg.selectAll("rect")
			.data(frequencyArray)
			.enter()
			.append("rect")
			.attr("y", function(d, i) {
					return i * w / bars - padding;
			})
			.attr("x", function(d) {
				return - d ;
			})
			.attr("height", barWidth)
			.attr("width", function(d) {
				return h - d;
			})
			.attr("fill", "blue" );
			// console.log("haay")
	};
// };