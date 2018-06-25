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
	var padding = 1;
	var barHeight = w - padding;
	var barWidth = h / bars;
	

	// append svg element
	var svg_div = d3.select("#timTest")
				.append("svg")
				.attr("id", "graph-svg")
				.attr("width", h)
				.attr("height", w);


	// var graph_svg = d3.select("#graph-svg")

	var x = d3.scaleLinear()
				.domain([0, 255])
				.range([0, 160]);

	// var xScale = d3.scaleLinear()
	// 					.domain([d3.min(frequencyArray, function(d)  {
	// 						console.log(d)
	// 						return d })]), d3.max(frequencyArray, function(d) { return d})
	// 					.range([0, h], 0.1);

	// var yScale = d3.scaleLinear()
	// 				.domain([d3.max(frequencyArray, function(d) {
	// 					return d })])
	// 				.range([0, h], 0.1);

	console.log(frequencyArray)

	// draw frequencybar
	svg_div.selectAll("rect")
		.data(frequencyArray)
		.enter()
		.append("rect")
		.attr("y", function(d, i) {
				return i * w / bars - padding;
		})
		.attr("x", function(d) {
			return - x(d);
		})
		.attr("height", barWidth)
		.attr("width", function(d) {
			return h - x(d);
		})
		.attr("fill",  "yellow" );
};
