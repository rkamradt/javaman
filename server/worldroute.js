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
    console.log('checking jwt ' + req.jwt)
    if (!this.uids[req.jwt]) {
      console.log("creating new user ", req.jwt)
      this.uids[req.jwt.uid] = this.world.addUser(req.jwt)
    }
    console.log('routing for uid ' + this.uids[req.jwt.uid])
    return this.uids[req.jwt.uid]
  }
  route(req, res, next) {
    switch(req.url) {
      case '/world':
        res.set('Content-Type', 'application/json').send(this.world.createWorld(this.getUid(req))).end()
        return;
      case '/world/reset':
        res.set('Content-Type', 'application/json').send(this.world.resetWorld()).end()
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
