window.onload = function() {

	// call uploadFile function
	uploadFile()

	var properties = playAudio();
	context = properties[0]
	source = properties[1]
	analyserNode = properties[2];

	createBarChart(analyserNode)

	createCircleChart(analyserNode)

	synthesizer(context, source)
};