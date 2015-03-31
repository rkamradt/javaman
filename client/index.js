var $ = require('jquery');
var soundsFactory = require('./sounds');
var controllerFactory = require('./controller');

$(document).ready(function() {
  var sounds = soundsFactory(new (window.AudioContext || window.webkitAudioContext)());
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var controller = controllerFactory(sounds, ctx, $.ajax);
  controller.init();
});
