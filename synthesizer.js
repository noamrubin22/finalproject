
// initliaze audiocontext
let audioContext = new (window.AudioContext || window.webkitAudioContext);

// create list for 'currently-playing oscillators'
let currentOsc = [];

// volumenode
let masterGainNode = null;