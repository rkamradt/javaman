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
  canvas.style.display='none';
  var logon = document.getElementById('logon');
  var squares = document.getElementById('squares');
  $("#logon").submit(function( event ) {
    logon.style.display='none';
    canvas.style.display='block';
    var ctx = canvas.getContext('2d');
    var controller = controllerFactory(sounds, ctx, $.ajax, squares);
    controller.init();
    event.preventDefault();
  });
});
