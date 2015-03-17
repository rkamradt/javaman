/*
 * Copyright 2014 randalkamradt.
 *
 */
var $ = require('jquery');

function makeSquare(ctx, x, y, size, rgba) {
  var oldFillStyle = ctx.fillStyle;
  ctx.fillStyle = rgba;
  ctx.fillRect(x, y, size, size);
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
  }
}

$(document).ready(function() {
  console.log('in doc ready function');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  for(var i = 0; i < 20; i++) {
    for(var j = 0; j < 20; j++) {
      var rgb = getColor(Math.floor(Math.random()*4));
      makeSquare(ctx, i*20, j*20, 20, rgb);
    }
  }
  // create new image object to use as pattern
/*

   var img = new Image();
  img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
  img.onload = function(){

    // create pattern
    var ptrn = ctx.createPattern(img,'repeat');
    var oldFillStyle = ctx.fillStyle;
    ctx.fillStyle = ptrn;
    ctx.fillRect(0,0,150,150);
    ctx.fillStyle = oldFillStyle;
    makeDot(ctx, 30, 30, 4);

  };
*/
});
