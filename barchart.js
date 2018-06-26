function createBarChart(anaylserNode) {
	// """ Creates a dynamic barchart """

	// // makes sure that data is updated before overdrawing it
	// window.requestAnimationFrame(function() {
	// 	createBarChart(analyserNode)
	// });

	// substract frequencies
	frequencyArray = new Uint8Array(analyserNode.frequencyBinCount);

	// copy frequency data into array
    analyserNode.getByteFrequencyData(frequencyArray);

    // clear svg
    d3.select("#graph-svg").remove();

    // console.log(d3.select("#timTest")._groups["0"]["0"].clientWidth)

	// initialize properties
	var w = d3.select("#barchartSpot")._groups["0"]["0"].clientHeight;
	// var w = 150;
	var h = d3.select("#barchartSpot")._groups["0"]["0"].clientWidth;
	frequencyArray = frequencyArray.filter(function(d) { return d > 0});
	var bars = frequencyArray.length;
	var padding = 0.2;
	var barWidth = h / bars;
	
	// append svg element
	var svg_div = d3.select("#barchartSpot")
				.append("svg")
				.attr("id", "graph-svg")
				.attr("width", h)
				.attr("height", w );


	var x = d3.scaleLinear()
				.domain([0, 255])
				.range([217, 0]);

	// var y = d3.scaleLinear()
	// 			.domain(255)
	// 			.range([0, h])

	// console.log(frequencyArray);



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
			// console.log(h- x(d));
			return x(d)
		})
		.attr("fill",  "yellow" );
};
