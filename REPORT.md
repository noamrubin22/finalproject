# Music visualization
This website visualizes music and gives the user the option to manipulate it. As the visualizations change based on these manipulations, this website can function as an learning environment for people that are interested in music.

![](https://github.com/noamrubin22/finalproject/blob/master/doc/screenshot.png)

## An overview
Looking at my files you will find scripts for the 2 different charts, the synthesizer, a script that lets the user upload a file and one that is responsible for the audio. The barchart is driven by frequency and the two circlegraphs by the wavelength of a song.

	* 	main.js
	*	audiocontext.js
	* 	barchart.js
	* 	shapechart.js
	* 	uploadfile.js
	*	line.js
	*	synthesizer.js
	*	index.html
	*	index.css


## Thinks you need to know 
The Web Audio API made it possible to substract those song-characteristics, as they were needed for the visualization. The Web Audio API works as follows: first, you need to create an audio context which is basically a set of different audio nodes, each with a different functionality. You connect all those nodes and make sure the last one is connected to the destination, the speakers. The first one, your source, consists out of your audio element. The analyserNode is the one that has the information that I needed for the visualization. Since I decided to add a synthesizer to my website, I also used other nodes that are capable of manipulating the sound. For example, a biquadFilter can filter frequencies above or below a given value. therefore I used that node to create the 'Bassbooster', a filter that only lets low frequency through, and the 'High frequency filter', that only passes high frequency sounds. For the distortion I worked with a formula from stackoverflow. It causes an alteration of the wavelength. As you can see in the synthesizer script, the analyserNode is the one that connects to the destination. In this way, an alteration from the synthesizer can be passed to the visualizations.
I also implemented a reset button that brings back all values to their startvalue.

## Functionality
The main.js file calls all necessary functions. Starting with **uploadFile**, a function that is located in uploadfile.js. This function lets the user upload their own mp3 file and calls the visualization. Ones a new song is uploaded, the **playAudio** function in audiocontext.js creates an audio element and context out of it and returns them with the analyserNode. Those properties are being used in further functions. **createBarChart**, **createCircleChart** and **createLinegraph** all need the analyserNode in order to visualize in d3. The **getByteFrequencyData()** and **getByteTimeDomainData()** guarenteed that the frequency and wavelength data could be stored in an Uint8Array. The **createCircleChart** function appends svg's to divs and selects id's before it calls the **shapeVisualization(analyserNode)** function. This following function is creating the circle charts. The synthesizer uses the source and context properties. Besides that it connects new nodes to the audio context, it consists out of functions that will alter the properties of the song based on which value the user has chosen. The user choses a filter value by practicing a slider. The synthesizer returns information about the new properties of the song and calls boths visualizations so the charts can being updated.

Since I am using music as data, the data changes over time. For this reason the charts need to be updated constantly. Recursive functions 
made this possible.

	createBarchart(analyserNode) {
		window.requestAnimationFrame(function() {
			createBarChart(analyserNode)
		});
	};


The **window.requestAnimationFame** function played an important role in updating those charts. This function tells the browser that to perform an animation and calls a function to update the animation before the next repaint. The amount of callbacks are more or less 60 a second. This is enough for the characteristics of the song to be passed to the visualizations. 

## Challenges
*	**Soundcloud API**

	This was definitely my first defeat. I was really fond of this 'stream music from soundcloud'-option. It would have made the website much more approachable for a lot of people I would guess. Unfortunately Soundcloud decided to stop giving API's since a few years. Other music sources didn't seem suitable and that is why I chose to implement the 'upload file' button. 

*	**Local mp3 files**

	Since I am using local mp3 files I needed to find a solution in order to use them on the web. By clicking on my html I would get an error. In the end I chose to download a Google Chrome Extention which creates a local host. You could also run a local host with python obviously.

*	**Two audio elements**

	In the beginning I was creating an audio element and context everytime a new visualization was made, for example if a new song was uploaded. Therefore I created the playAudio function, which leaves me with one audio element that is updated every time the song changes. 
	
*	**Synthesizer**

	Like I was expecting, understanding the synthesizer was a challenge. In the beginning I didn't understand why the visualizations where not updating after modification of the song but afterwards I put the anaylserNode the end of the connected nodes which worked fantastic! 

*	**Reset button**

	The reset button didn't work in the beginning because the startvalues where 0.5/1.0, which is obviously still causing a modification of the song while resetting. Ones I understood that I changed this startvalue to 0.0. 

*	**Css grid**
	
	This was new for me and in the beginning I had problems with centering the elements and creating a single screen. In the end I am really happy I learned it because I feel much more comfortable with CSS and HTML now. I also enjoy it much more. I guess it was great that I finally had some time to work on my lay-out. 

*	**Scale frequency barchart**

	It was a bit hard for me to scale the barchart because of all the confusion with the 'width' and the 'height'. The barchart is positionized on the right in an 90 degrees angle. Ones it was fixed it looked much better. I also decided to filter zero values because the array was consisting of quite a lot of them and the visualization became a bit ugly because of it.

*	**Callbacks**

	Because I was using recursive functions that are calling themselfs 60 times a second, my website was quite slow and everytime I wanted to adjust something or console.log it would just take a lot of time. This was a bit annoying. 

*	**Extra implementations**

	Ofcourse, I knew from the start that I wouldn't be able to implement all my ideas in this project. There are still a few in my mind that I might continue with later. I started with a few but because I had a hard time deciding which one I wanted to do I lost time. Typical me, but it's ok!

		Here are a few of my ideas:
			*	a metronome that can add a beat to the song, with the option to record something and use that sound. 
			*	a playlist (I would really liked to make it a bit more personal!)
			*	a 'save my song'- option
			*	a split & merge tool 
			*	extra filters in the synthesizer
			*	colorthemes

## Defend decicions 
I am pretty happy about the decicions that I made. Most of the things I wanted to do are working like I planned. Ofcourse, like I said before, I would have been happy to have a few extra visualizations and interactions with the user. This was obviously solved if I had more time. But I will just continue with it so I don't feel devastated. As for the style I chose happy colors. I really like purple, for example. The lay-out has a clean look and I like it. It was important for me to keep some calmless in the page. I can imagine that it can be quite overwhelming if I was positioning the visualizations in a different way or using different colors. The #allestahina hashtag gives the website a personal touch. I am happy I can spread my ideologies.. *since tahina, is the new 'prima'*.
