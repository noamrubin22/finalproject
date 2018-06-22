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


	var graph_svg = d3.select("#graph-svg")

	// draw frequencybar
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
		.attr("fill",  "blue" );
};
