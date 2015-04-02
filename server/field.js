/*
 * Copyright 2015 randalkamradt.
 *
 */
module.exports = function(ctx) {
  var users = [];
  var field = [];
  var MAXY = 100;
  var MAXX = 100;
  return {
    'addUser': function(session) {
      users.push({
        sessionid: session,
        cursorx: 0,
        cursory: 0,
      });
      return users.length-1;
    },
    'validateUser': function(uid, session) {
      return uid < 0 || uid >= users.length ||
        users[uid].session !== session;
    },
    'resetWorld': function() {
      field = [];
      return {
        'world': field,
        'uid': -1
      };
    },
    'createWorld': function(uid) {
      for(var x = 0; x < MAXX; x++) {
        field.push([]);
        for(var y = 0; y < MAXY; y++) {
          field[x].push(Math.floor(Math.random()*4));
        }
      }
      return {
        'world': field,
        'uid': uid
      };
    },
    'getState': function() {
      return {
        'users': users
      };
    },
    'moveTo': function(uid, x, y) {
      if(x < 0) {
        x = 0;
      } else if(x >= MAXX) {
        x = MAXX-1;
      }
      if(y < 0) {
        y = 0;
      } else if(y >= MAXY) {
        y = MAXY-1;
      }
      users[uid].cursorx = x;
      users[uid].previousx = x;
      users[uid].cursory = y;
      users[uid].previousy = y;
    },
    'move': function(uid,direction) {
      var x = users[uid].cursorx + (direction === 'right' ? 1 : (direction === 'left' ? -1 : 0));
      var y = users[uid].cursory + (direction === 'down' ? 1 : (direction === 'up' ? -1 : 0));
      if(x < 0) {
        x = 0;
      } else if(x >= MAXX) {
        x = MAXX-1;
      }
      if(y < 0) {
        y = 0;
      } else if(y >= MAXY) {
        y = MAXY-1;
      }
      users[uid].cursorx = x;
      users[uid].cursory = y;
    },
  };
};
