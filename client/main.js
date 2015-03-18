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
      $.ajax({
        url: 'go/left',
        dataType: 'json',
        success: function(data) {
          field.setState(data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      bloop();
    }
  } else if(key === right) {
    if(field.collision(1, 0)) {
      beep();
    } else {
      $.ajax({
        url: 'go/right',
        dataType: 'json',
        success: function(data) {
          field.setState(data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      bloop();
    }
  } else if(key === up) {
    if(field.collision(0, -1)) {
      beep();
    } else {
      $.ajax({
        url: 'go/up',
        dataType: 'json',
        success: function(data) {
          field.setState(data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      bloop();
    }
  } else if(key === down) {
    if(field.collision(0, 1)) {
      beep();
    } else {
      $.ajax({
        url: 'go/down',
        dataType: 'json',
        success: function(data) {
          field.setState(data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
      bloop();
    }
  } else {
    beep();
  }
};

$(document).ready(function() {
  sound = soundFactory(new (window.AudioContext || window.webkitAudioContext)());
  var canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  field = fieldFactory(ctx);
  $.ajax({
    url: 'field',
    dataType: 'json',
    success: function(data) {
      field.setWorld(data);
      field.drawField();
      $.ajax({
        url: 'go',
        dataType: 'json',
        success: function(data) {
          field.setState(data);
        }.bind(this),
        error: function(xhr, status, err) {
        }.bind(this)
      });
    }.bind(this),
    error: function(xhr, status, err) {
    }.bind(this)
  });

});
