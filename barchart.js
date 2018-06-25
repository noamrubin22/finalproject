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
	var w = d3.select("#timTest")._groups["0"]["0"].clientHeight;
	var h = d3.select("#timTest")._groups["0"]["0"].clientWidth;
	var bars = frequencyArray.length;
	// console.log(w);
	var padding = 0.2;
	var barWidth = w / bars;
	

	// append svg element
	var svg_div = d3.select("#timTest")
				.append("svg")
				.attr("id", "graph-svg")
				.attr("width", h)
				.attr("height", w - padding);


	// var graph_svg = d3.select("#graph-svg")

	var x = d3.scaleLinear()
				.domain([0, 255])
				.range([0, 160]);

	var y = d3.scaleLinear()
				.domain(255)
				.range([160, 0])


	// console.log(frequencyArray)
	// console.log(barWidth)
	// console.log(bars)
	// draw frequencybar
	svg_div.selectAll("rect")
		.data(frequencyArray)
		.enter()
		.append("rect")
		.attr("y", function(d, i) {
				return i * (w / bars) ;
		})
		.attr("x", function(d) {
			return - x(d);
		})
		.attr("height", barWidth *2 )
		.attr("width", function(d) {
			return h - x(d);
		})
		.attr("fill",  "yellow" );
};
