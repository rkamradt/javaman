/*
 * Copyright 2015 randalkamradt.
 *
 */
const MAXY = 100;
const MAXX = 100;

 export default class World {

  constructor() {
    this.users = [];
    this.field = [];
  }
  addUser(jwt) {
    this.users[jwt.claims.uid] = {
      cursorx: 0,
      cursory: 0,
      uid: jwt.claims.uid,
      userId: jwt.claims.sub
    }
    console.log("users = ", this.users)
  }
  logoff(uid) {
    this.users[uid] = null
    return this.getState()
  }
  resetWorld() {
    this.field = [];
    return {
      'world': this.field,
      'uid': -1
    }
  }
  createWorld(uid) {
    if(this.field.length == 0) {
      for(var x = 0; x < MAXX; x++) {
        this.field.push([]);
        for(var y = 0; y < MAXY; y++) {
          this.field[x].push(Math.floor(Math.random()*4));
        }
      }
    }
    return {
      'world': this.field,
      'uid': uid,
      'users': this.users
    };
  }
  getState() {
    return {
      'users': this.users
    }
  }
  moveTo(uid, x, y) {
    if(!this.users[uid]) {
      return {
        'error': 'unknown user ' + uid,
        'users': this.users
      }
    }
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
    this.users[uid].cursorx = x
    this.users[uid].previousx = x
    this.users[uid].cursory = y
    this.users[uid].previousy = y
    return this.getState()
  }
  move(uid,direction) {
    if(!this.users[uid]) {
      return {
        'error': 'unknown user ' + uid,
        'users': this.users

      }
    }
    var x = this.users[uid].cursorx + (direction === 'right' ? 1 : (direction === 'left' ? -1 : 0))
    var y = this.users[uid].cursory + (direction === 'down' ? 1 : (direction === 'up' ? -1 : 0))
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
    this.users[uid].cursorx = x
    this.users[uid].cursory = y
    return this.getState();
  }

}
