/*
 * Copyright 2015 randalkamradt.
 *
 */
var fieldFactory = require('./field');

 var VIEWSIZE = 20;
 var SIZE = 20;
 var MAXX = 100;
 var MAXY = 100;

module.exports = function(sound, ctx, controller) {
  var users = [];
  var uid;
  var field = fieldFactory(ctx);

   return {
      'setWorldState': function(data) {
        field.setWorld(data.world);
        field.drawField();
        uid = data.uid;
      },
      'setWorld': function(f) {
        field.setWorld(f);
      },
      'setState': function(data) {
        for(var i = 0; i < data.users.length; i++) {
          if(!users[i]) {
            users[i] = {
              cursorx: 0,
              previousx: 0,
              cursory: 0,
              previousy: 0
            };
          }
          if(users[i].cursorx !== data.users[i].cursorx) {
            users[i].cursorx = data.users[i].cursorx;
          }
          if(users[i].cursory !== data.users[i].cursory) {
            users[i].cursory = data.users[i].cursory;
          }
        }
        var user = users[uid];
        if(user.previousx !== user.cursorx ||
            user.previousy !== user.previousy) {
          field.ensureCentered(users[uid]);
        }
      },
      'collision': function(direction) {
        if(uid >= users.length) {
          return;
        }
        var x = users[uid].cursorx + (direction === 'right' ? 1 : (direction === 'left' ? -1 : 0));
        var y = users[uid].cursory + (direction === 'down' ? 1 : (direction === 'up' ? -1 : 0));
        return (x < 0 || x >= this.MAXX || y < 0 || y >= this.MAXY || field.getFieldToken(x,y) === 0);
      },
      'undrawUsers': function() {
        users.forEach(function(user) {
          field.drawFieldAt(user.cursorx, user.cursory);
        });
      },
      'drawUsers': function() {
        users.forEach(function(user) {
          field.drawAt(user.cursorx, user.cursory, 4);
        });
      },
      'animate': function(tick) {
        users.forEach(function(user) {
          if(tick%SIZE === 0) {
            field.drawFieldAt(user.previousx, user.previousy);
            user.previousx = user.cursorx;
            user.previousy = user.cursory;
            field.drawAt(user.cursorx, user.cursory, 4);
          } else {
            field.drawInterim(user.previousx, user.previousy, user.cursorx, user.cursory, tick, 4);
          }
        });
      }
   };
 };
