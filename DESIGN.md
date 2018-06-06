# A technical approach

## Data extraction
Data that will be used for this project can be seen as dynamic as every song changes over time.  
The Web Audio API will provide an array of numbers which corresponds to the waveform or frequency of the sound the html5 audio element is producing.


# Synthesizer 
**Audio nodes** are linked together by their inputs and outpouts to form an audio routing graph. 
In order to modify the sounds, other nodes can be used. The following filters can be used: 
  * GainNode: make sound louder or quieter 
  * BiquadFilterNode: represents different kind of filters and tone control devices
  * ConvolverNode: creates a reverb effect (echo)
  * DelayNode: causes a delay between the arrival of an input data and its propagation to the output
  * WaveShaperNode: can be used as a curve to apply waveshaping distortion to the signal. Adds a warm feeling.
  
Once the sound has been sufficiently processed for the intended effect,
it can be linked to the input of the destination, the **AudioContext.destination**, which send the sound to the speakers or 
headphones.

![](doc/audiocontext.png)

wavelength: through an OscillatorNode: which represents a periodic waveform. 
PeriodicWave: descripes a periodic waveform that can be used to shape the output of an OscillatorNode.

## Data visualization
The **AnalyserNode** can be used to extract time, frequency and other data from our audio file.
