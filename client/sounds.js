
function makeBeep(audioCtx) {
  var channels = 2;
  // Create an empty two second stereo buffer at the
  // sample rate of the AudioContext
  var frameCount = audioCtx.sampleRate * 0.5;

  var arrayBuffer = audioCtx.createBuffer(channels, frameCount, audioCtx.sampleRate);

  // Fill the buffer with white noise;
  //just random values between -1.0 and 1.0
  for (var channel = 0; channel < channels; channel++) {
   // This gives us the actual array that contains the data
   var buffer = arrayBuffer.getChannelData(channel);
   for (var i = 0; i < frameCount; i++) {
     // Math.random() is in [0; 1.0]
     // audio needs to be in [-1.0; 1.0]
     var amp = (frameCount-i)/frameCount;
     buffer[i] = Math.random() * 2 * amp - 1;
   }
  }
  return arrayBuffer;
}

function makeBloop(audioCtx) {
  var channels = 2;
  // Create an empty two second stereo buffer at the
  // sample rate of the AudioContext
  var frameCount = audioCtx.sampleRate * 0.5;

  var arrayBuffer = audioCtx.createBuffer(channels, frameCount, audioCtx.sampleRate);

  // Fill the buffer with white noise;
  //just random values between -1.0 and 1.0
  for (var channel = 0; channel < channels; channel++) {
   // This gives us the actual array that contains the data
   var buffer = arrayBuffer.getChannelData(channel);
   for (var i = 0; i < frameCount; i++) {
     // Math.random() is in [0; 1.0]
     // audio needs to be in [-1.0; 1.0]
     var amp = i/frameCount;
     buffer[i] = Math.random() * 0.5 * amp - 1;
   }
  }
  return arrayBuffer;
}

module.exports = function(audioCtx) {
  var beepArrayBuffer = makeBeep(audioCtx);
  var bloopArrayBuffer = makeBloop(audioCtx);

  return {
    'beep': function() {
      var source = audioCtx.createBufferSource();
      source.buffer = beepArrayBuffer;
      source.connect(audioCtx.destination);
      source.start();
    },
    'bloop': function() {
      var source = audioCtx.createBufferSource();
      source.buffer = bloopArrayBuffer;
      source.connect(audioCtx.destination);
      source.start();
    }
  };
};
