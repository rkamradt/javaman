/*
 * Copyright 2014 randalkamradt.
 *
 */
var $ = require('jquery');
var soundFactory = require('./sounds');
var fieldFactory = require('./field');

var left = 37;
var up = 38;
var right = 39;
var down = 40;

var field;
var sound;

function beep() {
//  sound.beep();
}

function bloop() {
//  sound.bloop();
}

var uid;

var leftdown = false;
var rightdown = false;
var updown = false;
var downdown = false;

window.keyUpEvent = function(event) {
  var key = event.keyCode;
  switch(key) {
    case left:
      leftdown = false;
      break;
    case right:
      rightdown = false;
      break;
    case up:
      updown = false;
      break;
    case down:
      downdown = false;
  }
};

window.keyDownEvent = function(event) {
  var key = event.keyCode;
  switch(key) {
    case left:
      leftdown = true;
      break;
    case right:
      rightdown = true;
      break;
    case up:
      updown = true;
      break;
    case down:
      downdown = true;
  }
};

window.tick = function() {
  if(leftdown) {
    if(field.collision(uid, -1, 0)) {
      beep();
    } else {
      $.ajax({
        url: 'world/go/left',
        dataType: 'json',
        success: function(data) {
          field.setState(uid, data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.log('error getting state from server');
        }.bind(this)
      });
      bloop();
    }
  } else if(rightdown) {
    if(field.collision(uid, 1, 0)) {
      beep();
    } else {
      $.ajax({
        url: 'world/go/right',
        dataType: 'json',
        success: function(data) {
          field.setState(uid, data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.log('error getting state from server');
        }.bind(this)
      });
      bloop();
    }
  } else if(updown) {
    if(field.collision(uid, 0, -1)) {
      beep();
    } else {
      $.ajax({
        url: 'world/go/up',
        dataType: 'json',
        success: function(data) {
          field.setState(uid, data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.log('error getting state from server');
        }.bind(this)
      });
      bloop();
    }
  } else if(downdown) {
    if(field.collision(uid, 0, 1)) {
      beep();
    } else {
      $.ajax({
        url: 'world/go/down',
        dataType: 'json',
        success: function(data) {
          field.setState(uid, data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.log('error getting state from server');
        }.bind(this)
      });
      bloop();
    }
  } else {
    beep();
  }
}

$(document).ready(function() {
  sound = soundFactory(new (window.AudioContext || window.webkitAudioContext)());
  var canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  field = fieldFactory(ctx);
  $.ajax({
    url: 'world',
    dataType: 'json',
    success: function(data) {
      uid = data.uid;
      field.setWorld(data.world);
      field.drawField();
      $.ajax({
        url: 'world/go',
        dataType: 'json',
        success: function(data) {
          field.setState(uid, data);
          window.setInterval(window.tick, 500);
        }.bind(this),
        error: function(xhr, status, err) {
          console.log('error getting state from server');
        }.bind(this)
      });
    }.bind(this),
    error: function(xhr, status, err) {
      console.log('error getting world from server');
    }.bind(this)
  });

});
