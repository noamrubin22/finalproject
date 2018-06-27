////////////////////////////////////////////////////////
// Minor Programmeren Finalproject Musicvisualization // 
//                                                    //
// Name:  Noam Rubin       	                          //
// Studentnumber: 10800565							  //
// 													  // 
// This script lets the user load a mp3 file and 	  //
// updates the visualization                          //                                         //
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


	function createBarChart(anaylserNode) {
		// """ Creates a dynamic barchart """

		// makes sure that data is updated before overdrawing it
		window.requestAnimationFrame(function() {
			createBarChart(analyserNode)
		});

		// substract frequencies
		frequencyArray = new Uint8Array(analyserNode.frequencyBinCount);

		// copy frequency data into array
	    analyserNode.getByteFrequencyData(frequencyArray);

	    // clear svg
	    d3.select("#graph-svg").remove();

		// initialize properties
		var w = d3.select("#barchartSpot")._groups["0"]["0"].clientHeight;
		var h = d3.select("#barchartSpot")._groups["0"]["0"].clientWidth;
		frequencyArray = frequencyArray.filter(function(d) { return d > 0});
		var bars = frequencyArray.length;
		var barWidth = h / bars;

		// append svg element
		var svg_div = d3.select("#barchartSpot")
					.append("svg")
					.attr("id", "graph-svg")
					.attr("width", h)
					.attr("height", w );

		// create x scale
		var x = d3.scaleLinear()
					.domain([0, 255])
					.range([217, 0]);

		// append rectangles
		svg_div.selectAll("rect")
			.data(frequencyArray)
			.enter()
			.append("rect")
			.attr("y", function(d, i) {
					return i * (w / bars)
			})
			.attr("x", function(d) {
					return 0})
			.attr("height", barWidth)
			.attr("width", function(d) {
				return x(d)
			})
			.attr("fill",  "yellow" );
	};
};
