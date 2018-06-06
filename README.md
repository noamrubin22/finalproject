# Music visualization 
## Final project Noam Rubin 10800565
D3 visualization using music as data.

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

 *Interactive features*
  1. Change of data by addition soundcloud song 
  2. Change 'visualization-theme' (change of color and shape)
  3. See music manipulator in visualizations
  
***Optional implementations***
  * Combine different songs by splitting and merging audio channels
  * Adding beats to the songs
  * Using microphone to add sounds 
  * Possibility to save created songs
  
## Prerequisites
* **Data sources**  
  Data will be chosen by the user using soundcloud 
  https://soundcloud.com/stream 
  
* **External components**
  None! The only function that is needed (for now) is the Web Audio API, but this is a build-in function in JavaScript. The     documentation can be found here: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

* **Similar visualizations** 
  * Frequency barchart: 
      https://www.bignerdranch.com/blog/music-visualization-with-d3-js/  
      https://www.html5rocks.com/en/tutorials/webaudio/intro/ 
  
  * Shape update visualization: 
      https://preziotte.com/blog/partymode/ 
      http://bl.ocks.org/eesur/6ad4ee84c81b664353a7 
 
  * Synthesizer: 
      https://roadtolarissa.com/synth/ 
      http://thesynth.herokuapp.com/#!/
      
      lay-out sliders: https://www.w3schools.com/howto/howto_js_rangeslider.asp 
      
  * Soundcloud API: 
      https://www.youtube.com/watch?v=8TuqjGxosrc 
      
* **Hardest parts** 
  * Live data is being extracted all the time. The visualization should update itself constantly. 
  * Linking the visualizations
  * Transforming the shapes using the transition function in d3
  * Understanding Web Audio API 
   

