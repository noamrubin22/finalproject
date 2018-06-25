function createCircleChart(analyserNode) {
	// """ Creates a dynamic barchart """
    // initialize properties
    svgHeight = 900,
    svgWidth = 900;

   svgShaper = d3.select('.svgShaper')
                .append('svg')
                .attr("id", "shape-svg")
                .attr("height", svgHeight)
                .attr("width", svgWidth);


    shape_svg = d3.select("#shape-svg")
    createShapeChart(analyserNode)
};     

function createShapeChart(analyserNode) {

    d3.selectAll("circle").remove(); 
    // console.log(analyserNode)

	window.requestAnimationFrame(function() {
        createShapeChart(analyserNode)
    });

	// substract frequencies
	waveLengthArray = new Uint8Array(analyserNode.frequencyBinCount);

	// copy wavelength data to array
    analyserNode.getByteTimeDomainData(waveLengthArray);
    // console.log(analyserNode)
    // scale things to fit
    var radiusScale = d3.scaleLinear()
        .domain([0, d3.max(waveLengthArray)])
        .range([0, svgHeight/2 - 30]);

    var hueScale = d3.scaleLinear()
        .domain([0, d3.max(waveLengthArray)])
        .range([0, 360]);

   // update d3 chart with new data
   var circles = shape_svg.selectAll("circle")
                    .data(waveLengthArray)
                    .enter()
                    .append("circle")
                    .attr("r", function(d) { return radiusScale(d);})
                    .attr("cx", svgWidth / 1.5)
                    .attr("cy", svgHeight / 6)
                    .attr("fill", "none")
                    .attr("stroke-width", 1)
                    .attr("stroke-opacity", 0.4)
                    .attr("stroke", function(d) { return d3.hsl(hueScale(d), 1, 0.5)});
};


