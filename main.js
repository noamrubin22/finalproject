window.onload = function(){


	// call uploadFile function
	uploadFile()

	source, analyserNode = playAudio()

	createBarChart(analyserNode)

	createCircleChart(analyserNode)

	synthesizer(source)
};