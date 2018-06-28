////////////////////////////////////////////////////////
// Minor Programmeren Finalproject Musicvisualization // 
//                                                    //
// Name:  Noam Rubin       	                          //
// Studentnumber: 10800565							  //
// 													  //
// 27 - 06 - 2018                                	  // 
//		    									      // 												
// This script lets the user load a mp3 file and 	  //
// updates the visualization                          //                                         
//                                                    //
////////////////////////////////////////////////////////

function uploadFile() {
	/* lets user upload a file and updates charts*/

	// substract variables from html
	const realFileButton = document.getElementById("real-file");
	const customButton = document.getElementById("custom-button");
	const customText = document.getElementById("custom-text");

	// activate realfilebutton when custombutton is clicked
	customButton.addEventListener("click", function() {
		realFileButton.click();
	});

	// if value realfilebutton changes
	realFileButton.addEventListener("change", function() {

		// if a file is chosen
		if (realFileButton.value) {

			// show filename
			customText.innerHTML = document.getElementById("real-file").files[0].name

			// update chart with new data
			var properties = playAudio(customText.innerHTML);
			
			// substract properties audio file
			context = properties[0]
			source = properties[1]
			analyserNode = properties[2];

			// create frequencyArray and fill it
			frequencyArray = new Uint8Array(analyserNode.frequencyBinCount);
			analyserNode.getByteFrequencyData(frequencyArray);

			// create frequency barchart
			createBarChart(analyserNode);

			// create circle chart
			createCircleChart(analyserNode);

			// create linegraph
			startLineContext(analyserNode);

			// run synthesizer
			synthesizer(context, source);

		} 
		// if file is not chosen yet
		else {

			// show 
			customText.innerHTML = "File not chosen";
		};
	})
};