function synthesizer(context, source) {

		// var selectedVolume = document.getElementById("volume");
		var selectedDistortion = document.getElementById("distortion");
		var selectedFilter = document.getElementById("filter");
		var selectedBassBooster = document.getElementById("lowpassfilter")

		// console.log("volume", selectedVolume.value);
		// console.log("distortion", selectedDistortion.value);
		// console.log("filter", selectedFilter.value);
		// console.log("bass:", selectedBassBooster);
		
		// create audio source
		// var oscillator = context.createOscillator();
		var analyserNode = context.createAnalyser();
		var distortion = context.createWaveShaper();
		var gainNode = context.createGain();
		var biquadFilter = context.createBiquadFilter();

		// connect nodes
		source.connect(analyserNode);
		// analyser.connect(oscillator);
		analyserNode.connect(distortion);
		distortion.connect(biquadFilter);
		biquadFilter.connect(gainNode);
		gainNode.connect(context.destination);

		// slider values
		var changedDistortion = selectedDistortion.value;
		// var changedVolume = selectedVolume.value;
		var changedFilter = selectedFilter.value;
		var changedBass = selectedBassBooster.value;
		// console.log("dist:", changedDistortion);
		// console.log("vol:", changedVolume);
		// console.log("filter:", changedFilter);
		// console.log("bass:", changedBass);

		// reset button
		var resetButton = document.getElementById("button");


	// when volume value changes
	function filterChange() {


		// use lowshelf filter
		biquadFilter.type = "highpass";

		// calculate new filter value
		var newFilterValue = selectedFilter.value * 10000;
		// console.log("newfilter:", newFilterValue)

	    // only let frequencies above 1000 get through
	    biquadFilter.frequency.setTargetAtTime(newFilterValue, context.currentTime, 0)

	    // if frequency is lower than above, add 30 
	    biquadFilter.gain.setTargetAtTime(30, context.currentTime, 0);	
};

	// when volume value changes
	function bassChange() {

		// use highshelf filter
		biquadFilter.type = "lowshelf";

		// calculate new filter value
		var newFilterValue = selectedBassBooster.value * 100;
		// console.log("newbass:", newFilterValue)

	    // only let frequencies above 1000 get through
	    biquadFilter.frequency.setTargetAtTime(newFilterValue, context.currentTime, 0)

	    // if frequency is lower than above, add 30 
	    biquadFilter.gain.setTargetAtTime(30, context.currentTime, 0);

	};

	// when volume value changes
	function distortionChange() {

		changedDistortion = selectedDistortion.value * 800;
		
		// use distortion curve to change sound
	    distortion.curve = Distortion(changedDistortion);
	    // console.log(changedDistortion)
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


    // when clicked song-properties go back to default settings
	resetButton.onclick = function() {

		// console.log("hey reset ")

		// console.log("1", selectedFilter.value)

		selectedFilter.value = selectedFilter.defaultValue;
		filterChange(selectedFilter.defaultValue);

		// filterChange(selectedFilter.value)
		// console.log("na", selectedFilter.value);
		

		selectedBassBooster.value = selectedBassBooster.defaultValue
		bassChange(selectedBassBooster.defaultValue);
		// console.log("bassdefault:", selectedFilter.defaultValue);


		selectedDistortion.value = selectedDistortion.defaultValue
		distortionChange(selectedDistortion.defaultValue)
	};
	createBarChart(analyserNode)
	createShapeChart(analyserNode)
	return analyserNode;
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

