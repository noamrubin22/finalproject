# Music visualization 
Final project of the programming minor - music will be used as data and by using d3 it will be visualized.
Noam Rubin 10800565 - June 2018

## Problem statement
This visualization will be an addition for music lovers that either don’t have the knowledge of how to use a synthesizer or don’t have the money to buy one. Often when a great idea of manipulating a song comes by it’s impossible for them to implement it. Complementing knowledge about how songs are being constructed would help the process of creating a new song.

## Solution
This data visualization will approach this problem by giving the users the freedom to manipulate sounds and visualize the deconstruction of songs.

![](https://github.com/noamrubin22/finalproject/blob/master/doc/sketch.jpg) 

#### Main features
**Minimum viable product implementations**

 *Visualizations*
  1. **frequency barchart**: this barchart will update itself based on the frequency of the song
  2. **shape update visualization**: shapes will transform into others based on the wavelength of the song
  3. **music manipulation tool**: this tool will provide the option to manipulate songs by changing the frequency or volume and adding a delay or a filter (low/high- pass)

 *Interactive features*
  1. change of data by addition soundcloud song 
  2. change 'visualization-theme' (change of color and shape)
  3. see music manipulator in visualizations
  
**Optional implementations**

  * combine different songs by splittng and merging audio channels
  * adding beats to the songs
  * using microphone to add sounds 


## Prerequisites
* **data sources**  
  data will be chosen by the user using soundcloud 
  https://soundcloud.com/stream 
  
* **external components**
  Web Audio API is a build-in function in JavaScript, the documentation can be found here:
  https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

* **similar visualizations** 
  * frequency barchart: 
      https://www.bignerdranch.com/blog/music-visualization-with-d3-js/  
      https://www.html5rocks.com/en/tutorials/webaudio/intro/ 
  
  * shape update visualization: 
      https://preziotte.com/blog/partymode/ 
      http://bl.ocks.org/eesur/6ad4ee84c81b664353a7 
 
  * music manipulation tool: 
      https://roadtolarissa.com/synth/ 
      http://thesynth.herokuapp.com/#!/
      
* **hardest parts** 
  * live data is being extracted all the time. the visualization should update itself constantly. 
  * linking the visualizations
  * transforming the shapes using the transition function in d3
  * understanding Web Audio API 
   

