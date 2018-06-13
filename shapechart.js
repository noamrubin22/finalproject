window.onload = function() {

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

	createShapeChart()
}

	function createShapeChart() {
		// """ Creates a dynamic barchart """

		window.requestAnimationFrame(createShapeChart);

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