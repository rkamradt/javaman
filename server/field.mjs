/*
 * Copyright 2015 randalkamradt.
 *
 */
 export default class Field {

  constructor() {
    this.users = [];
    this.field = [];
    this.MAXY = 100;
    this.MAXX = 100;
  }
  addUser(session) {
    this.users.push({
      sessionid: this.session,
      cursorx: 0,
      cursory: 0,
    });
    return this.users.length-1;
  }
  validateUser(uid, session) {
    return uid < 0 || uid >= users.length ||
      this.users[uid].session !== this.session;
  }
  resetWorld() {
    this.field = [];
    return {
      'world': this.field,
      'uid': -1
    };
  }
  createWorld(uid) {
    for(var x = 0; x < this.MAXX; x++) {
      this.field.push([]);
      for(var y = 0; y < this.MAXY; y++) {
        this.field[x].push(Math.floor(Math.random()*4));
      }
    }
    return {
      'world': this.field,
      'uid': uid
    };
  }
  getState() {
    return {
      'users': this.users
    };
  }
  moveTo(uid, x, y) {
    if(x < 0) {
      x = 0;
    } else if(x >= this.MAXX) {
      x = this.MAXX-1;
    }
    if(y < 0) {
      y = 0;
    } else if(y >= this.MAXY) {
      y = this.MAXY-1;
    }
    this.users[uid].cursorx = x;
    this.users[uid].previousx = x;
    this.users[uid].cursory = y;
    this.users[uid].previousy = y;
  }
  move(uid,direction) {
    var x = this.users[uid].cursorx + (direction === 'right' ? 1 : (direction === 'left' ? -1 : 0));
    var y = this.users[uid].cursory + (direction === 'down' ? 1 : (direction === 'up' ? -1 : 0));
    if(x < 0) {
      x = 0;
    } else if(x >= this.MAXX) {
      x = this.MAXX-1;
    }
    if(y < 0) {
      y = 0;
    } else if(y >= this.MAXY) {
      y = this.MAXY-1;
    }
    this.users[uid].cursorx = x;
    this.users[uid].cursory = y;
  }

}
