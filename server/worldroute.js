/*
 * Copyright 2015 randalkamradt.
 *
 */
export default class WorldRoute {

 constructor(world) {
    this.world = world
    this.uids = [];
  }
  getUid(req) {
    var uid = req.jwt.claims.uid
    var sub = req.jwt.claims.sub;
    console.log('checking uid ' + uid)
    if (!this.uids[uid]) {
      console.log("creating new user for " + sub)
      this.uids[uid] = this.world.addUser(req.jwt)
    }
    console.log('routing for uid ' + this.uids[uid])
    return this.uids[uid]
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
        res.set('Content-Type', 'application/json').send(this.world.logoff(this.getUid(req))).end()
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
