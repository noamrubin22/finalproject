////////////////////////////////////////////////////////
// Heuristieken: Finalproject Musicvisualization      //
//                                                    //
// Name:  Noam Rubin       	                          //
//                                                    //                                         //
//                                                    //
////////////////////////////////////////////////////////

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
			// console.log(document.getElementById("real-file").files[0].name)

			// show filename
			customText.innerHTML = document.getElementById("real-file").files[0].name

			// call updatebarchart function
			updateChart(customText.innerHTML);

		
		// if file is not chosen yet
		} else {
			customText.innerHTML = "No file chosen, yet."
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

	// replace audio element to the audio box on the page
    var audioElement = document.getElementById("audio_box")
    audioElement.replaceChild(audio, audioElement.childNodes[0]);
	
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
	
	analyserNode = synthesizer(context, source)

	createBarChart(analyserNode)

	// createShapeChart(analyserNode)


	function createBarChart() {
		// """ Creates a dynamic barchart """

		window.requestAnimationFrame(createBarChart);

		// substract frequencies
		frequencyArray = new Uint8Array(analyserNode.frequencyBinCount);

	    analyserNode.getByteFrequencyData(frequencyArray);


	    
	    // console.log(frequencyArray);
	    
	    // clear svg 
	    d3.select("svg").remove();

		// initialize properties
		var w = 1100;
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
					// .attr("x", 109)
					// .attr("y", 200);
					
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
				return - d;
			})
			.attr("height", barWidth)
			.attr("width", function(d) {
				return h - d;
			})
			.attr("fill", "blue" );
	};
};