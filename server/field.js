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
      users[uid].cursorx = x;
      users[uid].previousx = x;
      users[uid].cursory = y;
      users[uid].previousy = y;
    },
    'move': function(uid,direction) {
      users[uid].cursorx += (direction === 'right' ? 1 : (direction === 'left' ? -1 : 0));
      users[uid].cursory += (direction === 'down' ? 1 : (direction === 'up' ? -1 : 0));
    },
  };
};
