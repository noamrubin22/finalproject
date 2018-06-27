////////////////////////////////////////////////////////
// Minor Programmeren Finalproject Musicvisualization // 
//                                                    //
// Name:  Noam Rubin                                  //
// Studentnumber: 10800565                            //
//                                                    //
// 27 - 06 - 2018                                    // 
//                                                    // 
// This script creates a circle chart that updates    //
// with live data using the wavelength of a song. The //                                         //
// analyserNode provides the necessary information    //                                           
//                                                    //
////////////////////////////////////////////////////////

function createCircleChart(analyserNode) {

    // initialize properties
    svg1Height = 400,
    svg1Width = 400;
    svg2Height = 500,
    svg2Width = 500;

    // append svg to div first svg
    var svgShaper = d3.select('.svgShaper')
                .append('svg')
                .attr("id", "shape-svg")
                .attr("height", svg1Height)
                .attr("width", svg1Width);

    // append svg to div second svg
    var svgShaper2 = d3.select('.svgShaper')
                    .append('svg')
                    .attr("id", "shape-svg2")
                    .attr("height", svg2Height)
                    .attr("width", svg2Width);

                   
    // select id
    var shape_svg = d3.select("#shape-svg")
    var shape_svg2 = d3.select("#shape-svg2")

    // call create shapechart function
    shapeVisualization(analyserNode)
};     

function shapeVisualization(analyserNode) {

    // remove drawn circles 
    d3.selectAll("circle").remove(); 

    // update circlechart constantly
	window.requestAnimationFrame(function() {
        shapeVisualization(analyserNode)
    });

	// substract frequencies
	waveLengthArray = new Uint8Array(analyserNode.frequencyBinCount);

	// copy wavelength data to array
    analyserNode.getByteTimeDomainData(waveLengthArray);

    // scale for radius
    var radiusScale = d3.scaleLinear()
        .domain([0, d3.max(waveLengthArray)])
        .range([0, svgHeight]);

    // first colorscale
    var hueScale1 = d3.scaleLinear()
        .domain([0, d3.max(waveLengthArray)])
        .range([0, 250]);

    // second colorscale
    var hueScale2 = d3.scaleLinear()
        .domain([0, d3.max(waveLengthArray)])
        .range([0, 360]);

   // update first cirlce chart with data
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


   // update second circle chart with  data
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
};


