window.onload = function() {

	// call uploadFile function
	uploadFile()

	var tim = playAudio();
	context = tim[0]
	source = tim[1]
	analyserNode = tim[2]
	// context, audio, analyserNode = playAudio()
	console.log(context, source, analyserNode)

	createBarChart(analyserNode)

	createCircleChart(analyserNode)

	synthesizer(context, source)
};