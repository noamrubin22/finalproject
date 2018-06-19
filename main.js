window.onload = function(){


	// call uploadFile function
	uploadFile()

	analyserNode = playAudio()

	createBarChart(analyserNode)

	createCircleChart(analyserNode)
	
	synthesizer()
};