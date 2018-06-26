function createCircleChart(analyserNode) {
	// """ Creates a dynamic barchart """
    // initialize properties
    svgHeight = 400,
    svgWidth = 400;

    // append svg to div
    var svgShaper = d3.select('.svgShaper')
                .append('svg')
                .attr("id", "shape-svg")
                .attr("height", 400)
                .attr("width", 400);

    var svgShaper2 = d3.select('.svgShaper')
                    .append('svg')
                    .attr("id", "shape-svg2")
                    .attr("height", 500)
                    .attr("width", 500);
                    // .attr("style" flo )

    var svgShaper3 = d3.select('.svgShaper')
                    .append('svg')
                    .attr("id", "shape-svg3")
                    .attr("height", 400)
                    .attr("width", 400);
                   

    var svgShaper4 = d3.select('.svgShaper')
                    .append('svg')
                    .attr("id", "shape-svg4")
                    .attr("height", 400)
                    .attr("width", 400);
                   

    shape_svg = d3.select("#shape-svg")
    shape_svg2 = d3.select("#shape-svg2")
    // shape_svg3 = d3.select("#shape-svg3")
    // shape_svg4 = d3.select("#shape-svg4")
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
        .range([0, svgHeight]);

    var hueScale1 = d3.scaleLinear()
        .domain([0, d3.max(waveLengthArray)])
        .range([0, 250]);


    var hueScale2 = d3.scaleLinear()
        .domain([0, d3.max(waveLengthArray)])
        .range([0, 360]);


   // update d3 chart with new data
   var circles = shape_svg.selectAll("circle")
                    .data(waveLengthArray)
                    .enter()
                    .append("circle")
                    .attr("r", function(d) { return d;})
                    .attr("cx", svgWidth /1.1)
                    .attr("cy", svgHeight / 8.9)
                    .attr("fill", "none")
                    .attr("stroke-width", 1)
                    .attr("stroke-opacity", 0.2)
                    .attr("stroke", function(d) { return d3.hsl(hueScale1(d), 1, 0.5)});


   // update d3 chart with new data
    var circles = shape_svg2.selectAll("circle")
                    .data(waveLengthArray)
                    .enter()
                    .append("circle")
                    .attr("r", function(d) { return radiusScale(d);})
                    .attr("cx", svgWidth)
                    .attr("cy", svgHeight)
                    .attr("fill", "none")
                    .attr("stroke-width", 1)
                    .attr("stroke-opacity", 0.2)
                    .attr("stroke", function(d) { return d3.hsl(hueScale2(d), 1, 0.5)});

   // update d3 chart with new data
    var circles = shape_svg3.selectAll("circle")
                    .data(waveLengthArray)
                    .enter()
                    .append("circle")
                    .attr("r", function(d) { return d;})
                    .attr("cx", svgWidth / 1.5)
                    .attr("cy", svgHeight / 2)
                    .attr("fill", "none")
                    .attr("stroke-width", 1)
                    .attr("stroke-opacity", 0.2)
                    .attr("stroke", function(d) { return d3.hsl(hueScale1(d), 1, 0.5)});

   // update d3 chart with new data
    var circles = shape_svg4.selectAll("circle")
                    .data(waveLengthArray)
                    .enter()
                    .append("circle")
                    .attr("r", function(d) { return d;})
                    .attr("cx", svgWidth / 1.5)
                    .attr("cy", svgHeight / 2)
                    .attr("fill", "none")
                    .attr("stroke-width", 1)
                    .attr("stroke-opacity", 0.2)
                    .attr("stroke", function(d) { return d3.hsl(hueScale1(d), 1, 0.5)});



};


