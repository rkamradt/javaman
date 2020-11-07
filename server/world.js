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
      previousx: 0,
      cursory: 0,
      previousy: 0,
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
    this.field = []
    this.users = []
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
          this.field[x].push(Math.floor(Math.random()*4))
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
    const user = this.users[uid]
    if(!user) {
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
    user.cursorx = x
    user.previousx = x
    user.cursory = y
    tuser.previousy = y
    return this.getState()
  }
  move(uid,direction) {
    const user = this.users[uid]
    if(!user) {
      return {
        'error': 'unknown user ' + uid,
        'users': this.users
      }
    }
    var x = user.cursorx + (direction === 'right' ? 1 : (direction === 'left' ? -1 : 0))
    var y = user.cursory + (direction === 'down' ? 1 : (direction === 'up' ? -1 : 0))
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
    user.cursorx = x
    user.cursory = y
    return this.getState();
  }

}
