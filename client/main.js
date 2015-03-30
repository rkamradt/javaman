'use strict';
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
      break;
  }
};

window.keyDownEvent = function(event) {
  var key = event.keyCode;
  leftdown = false;  // keydown flags are mutually exclusive
  rightdown = false;
  updown = false;
  downdown = false;
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
      break;
  }
};

window.mouseUpEvent = function(e, dir) {
  e.preventDefault();
  switch(dir) {
    case 'left':
      leftdown = false;
      break;
    case 'right':
      rightdown = false;
      break;
    case 'up':
      updown = false;
      break;
    case 'down':
      downdown = false;
      break;
  }
};

window.mouseDownEvent = function(e, dir) {
  e.preventDefault();
  leftdown = false;  // keydown flags are mutually exclusive
  rightdown = false;
  updown = false;
  downdown = false;
  switch(dir) {
    case 'left':
      leftdown = true;
      break;
    case 'right':
      rightdown = true;
      break;
    case 'up':
      updown = true;
      break;
    case 'down':
      downdown = true;
      break;
  }
};

var ticks = 0;
window.tick = function() {
  field.animate(ticks);
  if(ticks%10 === 0) { // every 10th tick sync
    var url = 'world/go';
    if(ticks%20 === 0) {
      var nextMove = '';
      if(leftdown) {
        nextMove = 'left';
      } else if(rightdown) {
        nextMove = 'right';
      } else if(updown) {
        nextMove = 'up';
      } else if(downdown) {
        nextMove = 'down';
      }
      if(nextMove) {
        if(field.collision(uid, nextMove)) {
          beep();
        } else {
          url += '/' + nextMove;
          bloop();
        }
        nextMove = '';
      }
    }
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        field.setState(uid, data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log('error getting state from server');
      }.bind(this)
    });
  }
  ticks++;
};

$(document).ready(function() {
  sound = soundFactory(new (window.AudioContext || window.webkitAudioContext)());
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
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
          window.setInterval(window.tick, 20);
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
