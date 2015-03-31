/*
 * Copyright 2015 randalkamradt.
 *
 */
  var fieldFactory = require('./field');

 module.exports = function(sound, ctx, controller) {
   var field;
   var uid;
   var ticks = 0;

   return {
      'animate': function() {
        field.animate(ticks);
      },
      'tick': function() {
        var nextMove;
        if(ticks%10 === 0) { // every 10th tick sync
          if(ticks%20 === 0) {
            if(controller.leftdown) {
              nextMove = 'left';
            } else if(controller.rightdown) {
              nextMove = 'right';
            } else if(controller.updown) {
              nextMove = 'up';
            } else if(controller.downdown) {
              nextMove = 'down';
            }
            if(nextMove) {
              if(field.collision(uid, nextMove)) {
                nextMove = '';
                sound.beep();
              } else {
                sound.bloop();
              }
            }
          }
          controller.sync(nextMove);
        }
        ticks++;
      },
      'createWorld': function() {
        field = fieldFactory(ctx);
      },
      'setWorldState': function(data) {
        field.setWorld(data.world);
        field.drawField();
        uid = data.uid;
      },
      'setState': function(data) {
        field.setState(uid, data);
      }
   };
 };
