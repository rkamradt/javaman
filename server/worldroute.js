/*
 * Copyright 2015 randalkamradt.
 *
 */
export default class WorldRoute {

 constructor(world) {
    this.world = world
  }
  route(req, res, next) {
    switch(req.url) {
      case '/world':
        res.set('Content-Type', 'application/json').send(this.world.createWorld(req.jwt.claims)).end()
        return;
      case '/world/reset':
        res.set('Content-Type', 'application/json').send(this.world.resetWorld(req.jwt.claims)).end()
        return;
      case '/world/logoff':
        res.set('Content-Type', 'application/json').send(this.world.logoff(req.jwt.claims)).end()
        return;
      case '/world/go':
        res.set('Content-Type', 'application/json').send(this.world.getState(req.jwt.claims)).end()
        return;
      case '/world/go/up':
        res.set('Content-Type', 'application/json').send(this.world.move(req.jwt.claims, 'up')).end()
        return;
      case '/world/go/down':
        res.set('Content-Type', 'application/json').send(this.world.move(req.jwt.claims, 'down')).end()
        return;
      case '/world/go/right':
        res.set('Content-Type', 'application/json').send(this.world.move(req.jwt.claims, 'right')).end()
        return;
      case '/world/go/left':
        res.set('Content-Type', 'application/json').send(this.world.move(req.jwt.claims, 'left')).end()
        return;
    }
    next();
  }
}
