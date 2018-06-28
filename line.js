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
        d3.select("#path").remove();

        // update circlechart constantly
        window.requestAnimationFrame(function() {
            shapeVisualization(analyserNode)
        });


        // Set the dimensions of the canvas / graph
        var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

        // Adds the svg canvas
        // var svgContainer = d3.select("body")
        //             .append("svg")
        //             .attr("width", width + margin.left + margin.right)
        //             .attr("height", height + margin.top + margin.bottom);

        // // makes sure that data is updated before overdrawing it
        // window.requestAnimationFrame(function() {
        //     createLinegraph(analyserNode)
        // });

        // substract frequencies
        wavelengthArray = new Uint8Array(analyserNode.frequencyBinCount);

        // copy frequency data into array
        analyserNode.getByteTimeDomainData(wavelengthArray);

        var svg_div = d3.select('.linegraph')
                        .append('svg')
                        .attr("id", "line-graph")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom);

        line_graph = d3.select("#line-graph");

        // wavelengthArray = [239, 248, 212, 192, 94, 123, 59];
        console.log(wavelengthArray);

        // Set the ranges
        var x = d3.scaleLinear()
                    .domain([0,7])
                    .range([0, width]);

        var y = d3.scaleLinear()
                    .domain([0, 255])
                    .range([height, 0]);


        // Define the line
        var line = d3.line()
                            .x(function(d, i) { 
                                // console.log(d, i);
                                return x(i); })
                            .y(function(d) { return y(d); });

        
        // Scale the range of the data
        // x.domain(d3.extent(wavelengthArray, function(d) { return d; }));
        // y.domain(d3.extent(wavelengthArray, function(d) { return d; }));

        // Add the valueline path.
        // svg_div
        //         .append("path")
        //         .data(wavelengthArray)
        //         .attr("class", "line")
        //         // .attr("id", "line-graph")
        //         .attr("d", line);
                // .style("stroke-width", "#ccc");
                svg_div.append("path")
                        // .data(wavelengthArray)
                        // .attr("class", "line")
                        .attr("d", line(wavelengthArray));

                // Add the X Axis
          svg_div.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));

          // Add the Y Axis
          svg_div.append("g")
              .call(d3.axisLeft(y));


    };