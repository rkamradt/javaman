/*
 * Copyright 2015 randalkamradt.
 *
 */
var $ = require('jquery');
var soundsFactory = require('./sounds');
var controllerFactory = require('./controller');

$(document).ready(function() {
  var sounds = soundsFactory(new (window.AudioContext || window.webkitAudioContext)());
  var canvas = document.getElementById('canvas');
  var squares = document.getElementById('squares');
  var ctx = canvas.getContext('2d');
  var controller = controllerFactory(sounds, ctx, $.ajax, squares);
  controller.init();
});
