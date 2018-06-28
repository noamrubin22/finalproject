//////////////////////////////////////////////////////////
// Minor Programmeren Finalproject Music visualization  // 
//                                                      //
// Name:  Noam Rubin                                    //
// Studentnumber: 10800565                              //
//                                                      //
// 27 - 06 - 2018                                       // 
//                                                      // 
// This script creates a circle chart that updates      //
// with live data using the wavelength of a song. The   //                                         //
// analyserNode provides the necessary information      //                                           
//                                                      //
//////////////////////////////////////////////////////////

var globalFilterValue;

function synthesizer(context, source) {
	/* gives possibilty to modify audio context and returns analyserNode*/

		// get elements from html
		var selectedDistortion = document.getElementById("distortion");
		var selectedFilter = document.getElementById("filter");
		var selectedBassBooster = document.getElementById("lowpassfilter");
		
		// create audio context elements
		var analyserNode = context.createAnalyser();
		var distortion = context.createWaveShaper();
		var gainNode = context.createGain();
		var biquadFilter = context.createBiquadFilter();

		// connect nodes
		source.connect(distortion);
		distortion.connect(biquadFilter);
		biquadFilter.connect(gainNode);
		gainNode.connect(analyserNode);
		analyserNode.connect(context.destination);

		// initialize slider values variables
		var changedDistortion = selectedDistortion.value;
		var changedFilter = selectedFilter.value;
		var changedBass = selectedBassBooster.value;

		// and a reset button variable
		var resetButton = document.getElementById("button");

	// when filter value changes
	function filterChange() {
		/* filters the low frequencies */

		// let only the high frequencies pass
		biquadFilter.type = "highpass";

		// calculate new filter value and multiply it
		var newFilterValue = selectedFilter.value * 10000;

		// change global filter value
		globalFilterValue = newFilterValue;

	    // only let frequencies above new filtervalue get through
	    biquadFilter.frequency.setTargetAtTime(newFilterValue, context.currentTime, 0);

	    // if frequency is lower than above, add 30 
	    biquadFilter.gain.setTargetAtTime(30, context.currentTime, 0);	
	};

	function bassChange() {
		/* increases the low frequency sounds */

		// use a lowshelf filter
		biquadFilter.type = "lowshelf";

		// calculate new filter value
		var newFilterValue = selectedBassBooster.value * 100;

	    // only let frequencies below new filter value get through
	    biquadFilter.frequency.setTargetAtTime(newFilterValue, context.currentTime, 0);

	    // if frequency is lower than above, add 30 
	    biquadFilter.gain.setTargetAtTime(30, context.currentTime, 0);

	};

	function distortionChange() {
		/*adds a distortion to the sound*/

		// calculate new distortion value
		changedDistortion = selectedDistortion.value * 800;
		
		// use distortion curve to change sound
	    distortion.curve = Distortion(changedDistortion);
    };


    // when sliders are used song-properties change and needs to be updated
    selectedFilter.onchange = function() {
    	filterChange(selectedFilter.value);
    }

    selectedBassBooster.onchange = function() {
    	bassChange(selectedBassBooster.value);
    }

    selectedDistortion.onchange = function() {
    	distortionChange(selectedDistortion.value);
    }

    // when reset button is clicked 
	resetButton.onclick = function() {

		// song-properties go back to default settings
		selectedFilter.value = selectedFilter.defaultValue;
		filterChange(selectedFilter.defaultValue);

		selectedBassBooster.value = selectedBassBooster.defaultValue
		bassChange(selectedBassBooster.defaultValue);

		selectedDistortion.value = selectedDistortion.defaultValue
		distortionChange(selectedDistortion.defaultValue);
	};

	// visualizations needs to receive new data from analyserNode
	createBarChart(analyserNode);
	shapeVisualization(analyserNode);
	startLineContext(analyserNode);

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