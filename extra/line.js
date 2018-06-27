window.onload= function() {
    console.log("heeee");

    // initialize audio element
    var audio = new Audio(); 
      
        // make sure CODS are set to None 
        audio.crossOrigin = 'anonymous';


        // use uploaded song
        audio.src = "/audio/raga.mp3";
    
        // let it play 
        audio.controls = true;
        audio.loop = true; 
        audio.autoplay = false;

    audio.onchange = function(){

        // create files in this 
        var files = this.files;

        // store objecturl 
        var file = URL.createObjectURL(files[0]); 
            console.log("hoihihqojoi");
                            // set objecturl to audioplayer
                audio_player.src = file; 

    // play audio
    audio_player.play();
    };

    // replace audio element in the audio box on the page
    var audioElement = document.getElementById("audio-box");
    console.log(audio)
    audioElement.appendChild(audio);
    
    // create audiocontext
    var context = new AudioContext();

    // create analyserNode 
    var analyserNode = context.createAnalyser(); 

    // re-route audio playback into the processing graph of the Audio context
    var source = context.createMediaElementSource(audio);
    
    // connect audio context analyser
    source.connect(analyserNode);
    
    // connect visualizationdata to destination
    analyserNode.connect(context.destination);
    // analyserNode = synthesizer(context, source)

    createLinegraph(analyserNode);
};

    function createLinegraph(analyserNode) {

        // console.log("hoi")
        // clear svg    
        // d3.select("#path").remove();

        // Set the dimensions of the canvas / graph
        var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

        // Adds the svg canvas
        var svgContainer = d3.select("body")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom);

        // // makes sure that data is updated before overdrawing it
        // window.requestAnimationFrame(function() {
        //     createLinegraph(analyserNode)
        // });

        // substract frequencies
        wavelengthArray = new Uint8Array(analyserNode.frequencyBinCount);

        // copy frequency data into array
        analyserNode.getByteTimeDomainData(wavelengthArray);


        // Set the ranges
        var x = d3.scaleLinear()
                    .domain([0,254])
                    .range([0, width]);

        var y = d3.scaleLinear()
                    .domain([0, 255])
                    .range([height, 0]);


        // Define the line
        var valueline = d3.line()
                            .x(function(d, i) { 
                                console.log("hallo:", d, i);
                                return x(i); })
                            .y(function(d) { return y(d); });

        
        // Scale the range of the data
        x.domain(d3.extent(wavelengthArray, function(d) { return d; }));
        y.domain([0, d3.max(wavelengthArray, function(d) { return d; })]);

        // Add the valueline path.
        var linegraph =  svgContainer.append("path")
                                    .attr("d", valueline)
                                    .attr("class", "line")
                                    


    };