/*
 * Copyright 2015 randalkamradt.
 *
 */
export default class WorldRoute {

 constructor(world) {
    this.world = world
    this.uids = new Map();
  }
  getUid(req) {
    var uid = req.jwt.claims.uid
    var sub = req.jwt.claims.sub;
    console.log('checking uid ' + uid)
    if (!this.uids.has(uid)) {
      console.log("creating new user for " + sub)
      this.uids.set(uid, this.world.addUser(req.jwt))
    }
    console.log('routing for uid ' + uid)
    return uid
  }
  removeUid(req) {
    var uid = req.jwt.claims.uid
    var sub = req.jwt.claims.sub;
    if (this.uids.has(uid)) {
      console.log("removing user for " + sub)
      this.uids.delete(uid);
    }
    console.log('logging out for uid ' + uid)
    return uid
  }
  route(req, res, next) {
    switch(req.url) {
      case '/world':
        res.set('Content-Type', 'application/json').send(this.world.createWorld(this.getUid(req))).end()
        return;
      case '/world/reset':
        res.set('Content-Type', 'application/json').send(this.world.resetWorld()).end()
        return;
      case '/world/logoff':
        res.set('Content-Type', 'application/json').send(this.world.logoff(this.removeUid(req))).end()
        return;
      case '/world/go':
        res.set('Content-Type', 'application/json').send(this.world.getState()).end()
        return;
      case '/world/go/up':
        res.set('Content-Type', 'application/json').send(this.world.move(this.getUid(req), 'up')).end()
        return;
      case '/world/go/down':
        res.set('Content-Type', 'application/json').send(this.world.move(this.getUid(req), 'down')).end()
        return;
      case '/world/go/right':
        res.set('Content-Type', 'application/json').send(this.world.move(this.getUid(req), 'right')).end()
        return;
      case '/world/go/left':
        res.set('Content-Type', 'application/json').send(this.world.move(this.getUid(req), 'left')).end()
        return;
    }
    next();
  }
}
