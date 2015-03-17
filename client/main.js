/*
 * Copyright 2014 randalkamradt.
 *
 */
var $ = require('jquery');

$(document).ready(function() {
  console.log('in doc ready function');
  var canvas = document.getElementById('canvas');
  var gl = canvas.getContext('webgl');
  canvas.width = 600;
  canvas.height = 600;
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
});
