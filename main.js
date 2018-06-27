////////////////////////////////////////////////////////
// Minor Programmeren Finalproject Musicvisualization // 
//                                                    //
// Name:  Noam Rubin       	                          //
// Studentnumber: 10800565							  //
// 													  //
// 27 - 06 - 2018                                	  // 
//		    									      // 											  
// This is the main script for the 					  //
// music visualization							 	  //
//                       							  //
////////////////////////////////////////////////////////

window.onload = function() {

	// call uploadFile function
	uploadFile()

	// play audio 
	var properties = playAudio("raga.mp3");

	// substract properties audio file
	context = properties[0]
	source = properties[1]
	analyserNode = properties[2];

	// create frequency barchart
	createBarChart(analyserNode)

	// create circle chart
	createCircleChart(analyserNode)

	// run synthesizer
	synthesizer(context, source)
};
