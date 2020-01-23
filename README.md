# Music visualization 
## Final project Noam Rubin 10800565
For the final project of the course "Dataprocessing" for my Computer Science Minor (University of Amsterdam, Harvard University) we had to create a data visualization with D3. The task was to build a visualization that links 3 graphs. I took the decision to use music as my data. The use of recursive functions allowed me to update the graphs with live data.
[Try it yourself!](https://noamrubin22.github.io/finalproject/)
Video: [link to video](https://www.youtube.com/watch?v=dp6riqiaczA&feature=youtu.be)

## Problem statement
This visualization will be an addition for music lovers that either don’t have the knowledge of how to use a synthesizer or don’t have the money to buy one. Often when a great idea of manipulating a song comes by it’s impossible for them to implement it. Complementing knowledge about how songs are being constructed would help the process of creating a new song.

## Solution
This data visualization will approach this problem by giving the users the freedom to manipulate sounds and visualize the deconstruction of songs.

![](https://github.com/noamrubin22/finalproject/blob/master/doc/sketchy.jpg) 

### Main features
**Minimum viable product implementations**

 *Visualizations*
  1. **Frequency barchart**: this barchart will update itself based on the frequency of the song
  2. **Shape update visualization**: shapes will transform into others based on the wavelength of the song
  3. **Synthesizer**: this tool will provide the option to manipulate songs by changing the frequency or volume and adding a delay or a filter (low/high- pass)
  4. **Linegraph**: this line graph is going to change based on the wavelength

 *Interactive features*
  1. Change of data by addition mp3 file
  2. Change of sound properties by synthesizer
  
  
## Prerequisites
* **Data sources**  
  Data will be chosen by the user by uploading or chosen from the audio directory.
  
* **External components**
  You will need the include d3 v4 library. The Audio Web API is a build-in function in JavaScript (documentation: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). Bootstrap is also required in the html. And last but not least, the Google Chrome extension to create a local host. 

* **Acknowledgements** 
  * Circle visualization: 
      http://bl.ocks.org/eesur/6ad4ee84c81b664353a7 

  * Distortion function:
      http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
   

