/*
 * Copyright 2014 randalkamradt.
 *
 */
var $ = require('jquery');

var cursorx = 10;
var cursory = 10;

var MAXX = 20;
var MAXY = 20;
var SIZE = 20;

var left = 37;
var up = 38;
var right = 39;
var down = 40;
var ctx;

function undrawMe(ctx) {
  drawAt(ctx, cursorx, cursory, field[cursorx][cursory]);
}

function drawMe(ctx) {
  drawAt(ctx, cursorx, cursory, 4);
}

function beep() {

}

function bloop() {

}

window.keyEvent = function(event) {
  var key = event.keyCode || event.which;
  if(key === left) {
    if(cursorx === 0) {
      beep();
    } else {
      undrawMe(ctx);
      cursorx--;
      bloop();
      drawMe(ctx);
    }
  } else if(key === right) {
    if(cursorx === MAXX-1) {
      beep();
    } else {
      undrawMe(ctx);
      cursorx++;
      bloop();
      drawMe(ctx);
    }
  } else if(key === up) {
    if(cursory === 0) {
      beep();
    } else {
      undrawMe(ctx);
      cursory--;
      bloop();
      drawMe(ctx);
    }
  } else if(key === down) {
    if(cursory === MAXY-1) {
      beep();
    } else {
      undrawMe(ctx);
      cursory++;
      bloop();
      drawMe(ctx);
    }
  } else {
    beep();
  }
};

function drawAt(ctx, i, j, o) {
  makeSquare(ctx, i*SIZE, j*SIZE, getColor(o));
}

function makeSquare(ctx, x, y, rgba) {
  var oldFillStyle = ctx.fillStyle;
  ctx.fillStyle = rgba;
  ctx.fillRect(x, y, SIZE, SIZE);
  ctx.fillStyle = oldFillStyle;
}

function getColor(i) {
  if(i === 0) {
    return 'rgb(255, 255, 128)';
  } else if(i === 1) {
    return 'rgb(255, 128, 255)';
  } else if(i === 2) {
    return 'rgb(128, 128, 255)';
  } else if(i === 3) {
    return 'rgb(255, 128, 128)';
  } else if(i === 4) {
    return 'rgb(0, 0, 0)';
  }
}

var field = [];

function drawField(ctx) {
  for(var i = 0; i < MAXX; i++) {
    for(var j = 0; j < MAXY; j++) {
      drawAt(ctx, i, j, field[i][j]);
    }
  }

}

$(document).ready(function() {
  console.log('in doc ready function');
  var canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  for(var i = 0; i < MAXX; i++) {
    field.push([]);
    for(var j = 0; j < MAXY; j++) {
      field[i].push(Math.floor(Math.random()*4));
    }
  }
  drawField(ctx);
  drawMe(ctx);
});
