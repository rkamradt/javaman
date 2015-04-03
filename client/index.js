/*
 * Copyright 2015 randalkamradt.
 *
 */
var $ = require('jquery');
var soundsFactory = require('./sounds');
var controllerFactory = require('./controller');
var React = require('react');
var Screen = require('./components/screen');

var handleLogonSubmit = function(data) {
  $.ajax({
    url: '/logon',
    dataType: 'json',
    type: 'POST',
    data: data,
    success: function(data) {
      var sounds = soundsFactory(new (window.AudioContext || window.webkitAudioContext)());
      var canvas = document.getElementById('canvas');
      canvas.style.display='none';
      var logon = document.getElementById('logon');
      var squares = document.getElementById('squares');
      logon.style.display='none';
      canvas.style.display='block';
      var ctx = canvas.getContext('2d');
      var controller = controllerFactory(sounds, ctx, $.ajax, squares);
      controller.init();
      event.preventDefault();
    }.bind(this),
    error: function(xhr, status, err) {
      console.error('/logon', status, err.toString());
    }.bind(this)
  });
};

$(document).ready(function() {
  React.render(
    React.createElement(Screen, {handleLogonSubmit: handleLogonSubmit}),
      document.getElementById('screen')
  );
});
