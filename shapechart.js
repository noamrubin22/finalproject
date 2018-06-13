function circleChart() {

    // initialize audio element
    var audio = new Audio(); 
      
        // make sure CODS are set to None 
        audio.crossOrigin = 'anonymous';

        // choose song
        audio.src = "raga.mp3";

        // let it play 
        audio.controls = true;
        audio.loop = true; 
        audio.autoplay = false;

    audio.onchange = function(){
    // """ Being executed when audio context changes """

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
        var analyserNode = context.createAnalyser(); 

        // re-route audio playback into the processing graph of the Audio context
        var source = context.createMediaElementSource(audio);
        
        // connect audio context analyser
        source.connect(analyserNode);
        
        // connect visualizationdata to destination/speakers
        analyserNode.connect(context.destination);

        // initialize properties
    var svgHeight = 500,
    svgWidth = 500;

    var svgShaper = d3.select('.svgShaper')
                .append('svg')
                .attr("id", "shape-svg")
                .attr("height", svgHeight)
                .attr("width", svgWidth);

    var shape_svg = d3.select("#shape-svg")

    function createShapeChart() {
		// """ Creates a dynamic barchart """

        d3.selectAll("circle").remove(); 

		window.requestAnimationFrame(createShapeChart);

		// substract frequencies
		waveLengthArray = new Uint8Array(analyserNode.frequencyBinCount);

		// copy wavelength data to array
        analyserNode.getByteTimeDomainData(waveLengthArray);
        
        // scale things to fit
        var radiusScale = d3.scaleLinear()
            .domain([0, d3.max(waveLengthArray)])
            .range([0, svgHeight/2 - 30]);

        var hueScale = d3.scaleLinear()
            .domain([0, d3.max(waveLengthArray)])
            .range([0, 360]);

       // update d3 chart with new data
       var circles = shape_svg.selectAll("circle")
                        .data(waveLengthArray)
                        .enter()
                        .append("circle")
                        .attr("r", function(d) { return radiusScale(d);})
                        .attr("cx", svgWidth /2)
                        .attr("cy", svgHeight /2)
                        .attr("fill", "none")
                        // .attr("stroke-width", 2)
                        .attr("stroke-opacity", 0.4)
                        .attr("stroke", function(d) { return d3.hsl(hueScale(d), 1, 0.5)});
        };
        createShapeChart();

    // just for blocks viewer size
    d3.select(self.frameElement).style('height', '700px');

};

    
