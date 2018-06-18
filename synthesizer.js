function synthesizer(waveform) {

// 	// initliaze audiocontext
// 	let audioContext = new (window.AudioContext || window.webkitAudioContext);

// 	// store osc div in variable
// 	var osc = document.getElementById("osc");

// 	// when square is clicked 
// 	osc.onmousedown = function() {

// 		// substract value pitch-slider
// 		var oscPitch= document.getElementById("oscPitch").value;

// 		// create oscillator
// 		oscillator = audioContext.createOscillator();
// 		oscillator.type = waveform;
// 		oscillator.frequency.value = oscPitch;
// 		oscillator.connect(audioContext.destination);
// 		oscillator.start();
// 		console.log("hoi");
// 	};

// 	// disconnect the oscillator when mouse is gone
// 	osc.onmouseup = function() {
// 		oscillator.disconnect();
// 	};
// };


// // create list for 'currently-playing oscillators'
// let currentOsc = [];

	// volumenode
	let masterGainNode = null;

	// create variables that will manipulate the song
	let wavePicker = document.querySelector("select[name='waveform']");
	let volumeControl = document.querySelector("input[name='volume']");
	let frequencyControl = document.querySelector("input[name='frequencyRange']");

	// initialize global variabels for wavePicker
	let chosenWaveform = null;
	let sineTerms = null;
	let cosineTerms = null;

	volumeControl.onchange = function() {
			  masterGainNode.gain.value = volumeControl.value;
	}
};