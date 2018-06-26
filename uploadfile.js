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
        
        // connect visualizationdata to destination
        analyserNode.connect(context.destination);
	
	analyserNode = synthesizer(context, source)

	createBarChart(analyserNode)


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

    // console.log(d3.select("#timTest")._groups["0"]["0"].clientWidth)

	// initialize properties
	var w = d3.select("#barchartSpot")._groups["0"]["0"].clientHeight;
	var h = d3.select("#barchartSpot")._groups["0"]["0"].clientWidth;
	var bars = frequencyArray.length;
	// console.log(w);
	var padding = 0.2;
	var barWidth = h / bars;
	
	// append svg element
	var svg_div = d3.select("#barchartSpot")
				.append("svg")
				.attr("id", "graph-svg")
				.attr("width", h)
				.attr("height", w - 30);

	// console.log(h)
	var x = d3.scaleLinear()
				.domain([0, 255])
				.range([0, h]);

	var y = d3.scaleLinear()
				.domain(255)
				.range([0, h])


	svg_div.selectAll("rect")
		.data(frequencyArray)
		.enter()
		.append("rect")
		.attr("y", function(d, i) {
				return i * (w / bars)
		})
		.attr("x", function(d) {
			return - x(d)})
		.attr("height", barWidth)
		.attr("width", function(d) {
			return h - x(d)
		})
		.attr("fill",  "yellow" );
};

};