window.onload = function() {

	// call uploadFile function
	uploadFile()

	// play audio 
	var properties = playAudio("raga.mp3");

	// substract properties audio file
	context = properties[0]
	source = properties[1]
	analyserNode = properties[2];
	console.log("1", analyserNode);
	frequencyArray = new Uint8Array(analyserNode.frequencyBinCount);
	analyserNode.getByteFrequencyData(frequencyArray);
	console.log(frequencyArray);
	// create frequency barchart
	createBarChart(analyserNode)

	// create circle chart
	createCircleChart(analyserNode)

	// run synthesizer
	synthesizer(context, source)
};
