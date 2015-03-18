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
  sound.beep();
}

function bloop() {
  sound.bloop();
}

window.keyEvent = function(event) {
  var key = event.keyCode || event.which;
  if(key === left) {
    if(field.collision(-1, 0)) {
      beep();
    } else {
      field.moveLeft();
      bloop();
    }
  } else if(key === right) {
    if(field.collision(1, 0)) {
      beep();
    } else {
      field.moveRight();
      bloop();
    }
  } else if(key === up) {
    if(field.collision(0, -1)) {
      beep();
    } else {
      field.moveUp();
      bloop();
    }
  } else if(key === down) {
    if(field.collision(0, 1)) {
      beep();
    } else {
      field.moveDown();
      bloop();
    }
  } else {
    beep();
  }
};

$(document).ready(function() {
  sound = soundFactory(new (window.AudioContext || window.webkitAudioContext)());
  console.log('in doc ready function');
  var canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  field = fieldFactory(ctx);
  field.makeField();
  field.drawField();
  field.moveTo(0,0);
  field.drawMe();
});
