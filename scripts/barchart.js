////////////////////////////////////////////////////////
// Minor Programmeren Finalproject Musicvisualization // 
//                                                    //
// Name:  Noam Rubin       	                          //
// Studentnumber: 10800565							  //
// 													  //
// 27 - 06 - 2018                                	  // 
//		    									      // 											 
// This script creates a barchart that updates with   //
// live data using the frequency of a song. The       //                                         
// analyserNode obtaints all necessary information	  //                                           
//   												  //
////////////////////////////////////////////////////////

function createBarChart(anaylserNode) {
	/* creates a dynamic barchart */

	// // makes sure that data is updated before overdrawing it
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

	// filter zero values in frequencyarray
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
		.style("stroke", "#8000ff");
};
