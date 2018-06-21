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

   	// create audiocontext
	context = new AudioContext();

    // create analyserNode 
    // var analyserNode = context.createAnalyser(); 

   	// re-route audio playback into the processing graph of the Audio context
    // var source = context.createMediaElementSource(audio);
    
    // connect audio context analyser
    // source.connect(analyserNode);
    
    // connect visualizationdata to destination
    // analyserNode.connect(context.destination);

	// create audiocontext that work on multiple browsers
	// var context = new (window.AudioContext || window.webkitAudioContext)();
	// var voiceSelect = document.getElementById("voice");
	var selectedVolume = document.getElementById("volume");
	var selectedDistortion = document.getElementById("distortion");
	var selectedFilter = document.getElementById("filter");
	var selectedBassBooster = document.getElementById("lowpassfilter")

	console.log("volume", selectedVolume.value);
	console.log("distortion", selectedDistortion.value);
	console.log("filter", selectedFilter.value);
	console.log("bass:", selectedBassBooster);
	
	// create audio source
	// var oscillator = context.createOscillator();
	var analyser = context.createAnalyser();
	var distortion = context.createWaveShaper();
	var gainNode = context.createGain();
	var biquadFilter = context.createBiquadFilter();

    // re-route audio playback into the processing graph of the Audio context
    var source = context.createMediaElementSource(audio);
	
	// connect nodes
	source.connect(analyser);
	// analyser.connect(oscillator);
	analyser.connect(distortion);
	distortion.connect(biquadFilter);
	biquadFilter.connect(gainNode);
	gainNode.connect(context.destination);

	// slider values
	var changedDistortion = selectedDistortion.value;
	var changedVolume = selectedVolume.value;
	var changedFilter = selectedFilter.value;

	// reset button
	var resetButton = document.getElementById("button");

	// // when volume value changes
	// function volumeChange() {

	// 	// store value
	// 	changedVolume = selectedVolume.value;
	// 	console.log(changedVolume)

	// 	// adjust gainnode to change volume
	// 	gainNode.gain.setValueAtTime(changedVolume, context.currentTime);
	// };


	// when volume value changes
	function filterChange() {

		// store value
		changedFilter = selectedFilter.value;
		console.log("filter:", changedFilter)

		// use lowshelf filter
		biquadFilter.type = "highpass";

		if (changedFilter == 0.5) {
			newFilterValue == 0.5; 
		}
		else {

			// calculate new filter value
			newFilterValue = changedFilter * 10000;
			console.log("newfilter:", newFilterValue)
		};
		
	    // only let frequencies above 1000 get through
	    biquadFilter.frequency.setTargetAtTime(newFilterValue, context.currentTime, 0)

	    // if frequency is lower than above, add 30 
	    biquadFilter.gain.setTargetAtTime(30, context.currentTime, 0);
	};

	// when volume value changes
	function bassChange() {

		// store value
		changedBass = selectedBassBooster.value;
		console.log("bass:", changedBass)

		// use highshelf filter
		biquadFilter.type = "lowshelf";

		if (changedBass == 0.5) {
			newFilterValue == 0.5; 
		}
		else {

			// calculate new filter value
			newFilterValue = changedBass * 1000;
			console.log("newbass:", newFilterValue)
		}

	    // only let frequencies above 1000 get through
	    biquadFilter.frequency.setTargetAtTime(newFilterValue, context.currentTime, 0)

	    // if frequency is lower than above, add 30 
	    biquadFilter.gain.setTargetAtTime(30, context.currentTime, 0);

	};

	// when volume value changes
	function distortionChange() {

		changedDistortion = selectedDistortion.value * 400;
		
		// use distortion curve to change sound
	    distortion.curve = Distortion(changedDistortion);
	    console.log("dist:", changedDistortion)
    };


    // when sliders are used song-properties change
    selectedFilter.onchange = function() {
    	filterChange(selectedFilter.value);
    }

    selectedBassBooster.onchange = function() {
    	bassChange(selectedBassBooster.value);
    }

    selectedDistortion.onchange = function() {
    	distortionChange(selectedDistortion.value);
    }

    // selectedVolume.onchange = function() {
    // 	volumeChange(selectedVolume.value);
    // }

    // when clicked song-properties go back to default settings
	resetButton.onclick = function() {

		console.log("hey reset ")
		// selectedVolume.value = 5;
		// volumeChange();

		console.log(selectedVolume.value)
		changedFilter = 0.5;
		filterChange();

		console.log(selectedFilter.value)
		changedBassBooster = 0.5;
		bassChange();

		// console.log(selectedBassBooster.value)

		// distortion.curve = null;
		// distortionChange();
		// console.log(selectedDistortion.value);
	
		return changedVolume, changedFilter, changedBassBooster, changedDistortion;
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
	return curve;
};

