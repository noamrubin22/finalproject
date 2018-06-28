
////////////////////////////////////////////////////////
// Minor Programmeren Finalproject Musicvisualization // 
//                                                    //
// Name:  Noam Rubin                                  //
// Studentnumber: 10800565                            //
//                                                    //
// 27 - 06 - 2018                                     // 
//                                                    // 
// This script creates a circle chart that updates    //
// with live data using the wavelength of a song. The //                                         //
// analyserNode provides the necessary information    //                                           
//                                                    //
////////////////////////////////////////////////////////

// global variables
var svgShaper, svgShaper2 ,svg1Height, svg1Width, svg2Height,svg2Width;

function createCircleChart(analyserNode) {
    /*creates svg environment and calls visualization function*/

    // initialize properties
    svg1Height = 400,
    svg1Width = 400;
    svg2Height = 600,
    svg2Width = 600;

    // append svg to div first svg
    svgShaper = d3.select('.svgShaper')
                .append('svg')
                .attr("id", "shape-svg")
                .attr("height", svg1Height)
                .attr("width", svg1Width);

    // append svg to div second svg
    svgShaper2 = d3.select('.svgShaper')
                    .append('svg')
                    .attr("id", "shape-svg2")
                    .attr("height", svg2Height)
                    .attr("width", svg2Width);

                   
    // call create shapechart function
    shapeVisualization(analyserNode);
};     

function shapeVisualization(analyserNode) {
    /*creates two wavelength visualizations*/

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
    var scaleRadius = d3.scaleLinear()
        .domain([0, d3.max(waveLengthArray)])
        .range([0, svg2Height]);

    // first colorscale
    var scaleHue1 = d3.scaleLinear()
        .domain([0, d3.max(waveLengthArray)])
        .range([0, 300]);

    // second colorscale
    var scaleHue2 = d3.scaleLinear()
        .domain([0, d3.max(waveLengthArray)])
        .range([300, 400]);

   // update first cirlce chart with data
   var circles = svgShaper.selectAll("circle")
                    .data(waveLengthArray)
                    .enter()
                    .append("circle")
                    .attr("r", function(d) { return d;})
                    .attr("cx", svg1Width /1.1)
                    .attr("cy", svg1Height / 7)
                    .attr("fill", "none")
                    .attr("stroke-width", 1)
                    .attr("stroke-opacity", 0.2)
                    .attr("stroke", function(d) { return d3.hsl(scaleHue1(d), 1, 1.2)});


   // update second circle chart with  data
    var circles = svgShaper2.selectAll("circle")
                    .data(waveLengthArray)
                    .enter()
                    .append("circle")
                    .attr("r", function(d) { return scaleRadius(d);})
                    .attr("cx", svg2Width)
                    .attr("cy", svg2Height)
                    .attr("fill", "none")
                    .attr("stroke-width", 1)
                    .attr("stroke-opacity", 0.2)
                    .attr("stroke", function(d) { return d3.hsl(scaleHue2(d), 2, 0.5)});
};


