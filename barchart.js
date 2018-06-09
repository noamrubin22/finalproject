// initialize audio element
var audio = new Audio(); 
      
      // make sure CODS are set to None 
      audio.crossOrigin = 'anonymous';

      // choose song
      audio.src = "raga.mp3";

      // let it play 
      audio.controls = true;
      audio.loop = true; 
      audio.autoplay = true;
      console.log("hoi")
      
      audio.onchange = function(){
        // """ Being excecuted when audio context changes """
          
          // create files in this 
          var files = this.files;

          // store objecturl 
          var file = URL.createObjectURL(files[0]); 

                  // set objecturl to audioplayer
                  audio_player.src = file; 

      // play 
      audio_player.play();
      };

      // establish all variables that your analyser will use
      var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

      // initialize the MP3 player after the page loads all of its HTML 
      window.addEventListener("load", initMp3Player, false);

      function initMp3Player() {

        // add created audio element to the audio box on the page
        document.getElementById("audio_box").appendChild(audio);

        // assign context variable (html5)
        context = new AudioContext();

        // create analyserNode for visualization
        analyser = context.createAnalyser(); 

        // 
        canvas = document.getElementById("analyser_render"); 

        ctx = canvas.getContext("2d");

        // re-route audio playback into the processing graph of the Audio context
        source = context.createMediaElementSource(audio);
        
        // connect audio context analyser
        source.connect(analyser);
        
        // connect visualizationdata to destination
        analyser.connect(context.destination);
        
        createBarchart();
      }


      function createBarchart() {
        window.requestAnimationFrame(createBarchart);
        fbc_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbc_array);
        console.log(fbc_array);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00CCFF"; 
        bars = 100; 
        for (var i = 0; i < bars; i++) {
          bar_x = i * 6; 
          bar_width = 4;
          bar_height = -(fbc_array[i] / 2);
          // console.log("hoi");
          // fillrect
          ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
        }
      }
