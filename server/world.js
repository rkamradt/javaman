/*
 * Copyright 2015 randalkamradt.
 *
 */
const MAXY = 100;
const MAXX = 100;

export default class World {

  constructor() {
    this.users = new Map();
    this.field = [];
  }
  addUser(claims) {
    this.users.set(claims.uid, {
      cursorx: 0,
      cursory: 0,
      uid: claims.uid,
      userId: claims.sub
    })
    console.log('add user = ', claims)
  }
  logoff(claims) {
    console.log('remove user ', claims)
    this.users.delete(claims.uid)
    return this.getState(claims)
  }
  resetWorld(claims) {
    console.log('remove all users by ', claims)
    this.field = []
    this.users.clear()
    const ret = {
      'field': this.field,
      'uid': claims.uid,
      'user': claims.sub,
      'users': Object.fromEntries(this.users)
    }
    console.log('returning ' + ret)
    return ret;
  }
  createWorld(claims) {
    if(!this.users.has(claims.uid)) {
      this.addUser(claims)
    }
    if(this.field.length == 0) {
      for(var x = 0; x < MAXX; x++) {
        this.field.push([]);
        for(var y = 0; y < MAXY; y++) {
          this.field[x].push(Math.floor(Math.random()*4))
        }
      }
    }
    const ret = JSON.stringify({
      'world': this.field,
      'uid': claims.uid,
      'user': claims.sub,
      'users': Object.fromEntries(this.users)
    })
    console.log('returning ' + ret)
    return ret;
  }
  getState(claims) {
    const ret = JSON.stringify({
      'uid': claims.uid,
      'user': claims.sub,
      'users': Object.fromEntries(this.users)
    })
    console.log('returning ' + ret)
    return ret;
  }
  move(claims,direction) {
    if(!this.users.has(claims.uid)) {
      this.addUser(claims)
    }
    const user = this.users.get(claims.uid)
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
    return this.getState(claims);
  }

}
