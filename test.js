window.onload = function() { 

	// initialize audio element
	var audio = new Audio(); 
      
		// make sure CODS are set to None 
		audio.crossOrigin = 'anonymous';

		// use uploaded song
		audio.src = "raga.mp3";
	
		// let it play 
		audio.controls = true;
		audio.loop = true; 
		audio.autoplay = false;
		// console.log("hoi")

	audio.onchange = function(){

		// create files in this 
		var files = this.files;

		// store objecturl 
		var file = URL.createObjectURL(files[0]); 

				// set objecturl to audioplayer
				audio_player.src = file; 

	// play audio
	audio_player.play();
	};


	// add created audio element to the audio box on the page
   	document.getElementById("audio_box").appendChild(audio);

	// create audiocontext that work on multiple browsers
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
	var voiceSelect = document.getElementById("voice");
	var selectedVolume = document.getElementById("volume");
	var selectedDistortion = document.getElementById("distortion");
	var selectedFilter = document.getElementById("filter");
	var selectedBassBooster = document.getElementById("lowpassfilter")

	console.log("volume", selectedVolume.value);
	console.log("distortion", selectedDistortion.value);
	console.log("filter", selectedFilter.value);
	console.log("bass:", selectedBassBooster);
	// create audio source
	// var oscillator = audioCtx.createOscillator();
	var analyser = audioCtx.createAnalyser();
	var distortion = audioCtx.createWaveShaper();
	var gainNode = audioCtx.createGain();
	var biquadFilter = audioCtx.createBiquadFilter();

    // re-route audio playback into the processing graph of the Audio context
    var source = audioCtx.createMediaElementSource(audio);
	
	// connect nodes
	source.connect(analyser);
	// analyser.connect(oscillator);
	analyser.connect(distortion);
	distortion.connect(biquadFilter);
	biquadFilter.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	// slider values
	var changedDistortion = selectedDistortion.value;
	var changedVolume = selectedVolume.value;
	var changedFilter = selectedFilter.value;

	// when volume value changes
	selectedVolume.onchange = function() {

		// store value
		changedVolume = selectedVolume.value;
		console.log(changedVolume)

		// adjust gainnode to change volume
		gainNode.gain.setValueAtTime(changedVolume, audioCtx.currentTime);
	};


	// when volume value changes
	selectedFilter.onchange = function() {

		// store value
		changedFilter = selectedFilter.value;
		console.log(changedFilter)

		// use lowshelf filter
		biquadFilter.type = "highpass";

		// calculate new filter value
		newFilterValue = changedFilter * 10000;
		console.log(newFilterValue)

	    // only let frequencies above 1000 get through
	    biquadFilter.frequency.setTargetAtTime(newFilterValue, audioCtx.currentTime, 0)

	    // if frequency is lower than above, add 30 
	    biquadFilter.gain.setTargetAtTime(30, audioCtx.currentTime, 0);
	};

	// when volume value changes
	selectedBassBooster.onchange = function() {

		// store value
		changedBass = selectedBassBooster.value;
		console.log(changedBass)

		// use highshelf filter
		biquadFilter.type = "lowshelf";

		// calculate new filter value
		newFilterValue = changedBass * 1000;
		console.log(newFilterValue)

	    // only let frequencies above 1000 get through
	    biquadFilter.frequency.setTargetAtTime(newFilterValue, audioCtx.currentTime, 0)

	    // if frequency is lower than above, add 30 
	    biquadFilter.gain.setTargetAtTime(30, audioCtx.currentTime, 0);

	};


	// when volume value changes
	selectedDistortion.onchange = function() {

	changedDistortion = selectedDistortion.value * 400;
	// use distortion curve to change sound
    distortion.curve = Distortion(changedDistortion);
    console.log(changedDistortion)
    };
};


// the function for the distortion curve is taken from stackoverflow
// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

function Distortion(amount) {

	var k = typeof amount === 'number' ? amount : 50,
	n_samples = 44100,
	curve = new Float32Array(n_samples),
	deg = Math.PI / 180,
	i = 0,
	x;
	for ( ; i < n_samples; ++i ) {
		x = i * 2 / n_samples - 1;
		curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
	}

	console.log("Hoi")
	return curve;
};

