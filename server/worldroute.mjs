/*
 * Copyright 2015 randalkamradt.
 *
 */
import uuidv1 from 'uuid/v1'

export default class WorldRoute {

 constructor(world) {
    this.world = world
  }
  getUid(req) {
    console.log("session.uuid = " + req.session.uuid)
    console.log("session.uid = " + req.session.uid)
    if(isNaN(req.session.uid)) {
      req.session.uuid = uuidv1();
      req.session.uid = this.world.addUser(req.session.uuid)
      console.log("new session uid = " + req.session.uid)
      console.log("new session uuid = " + req.session.uuid)
    } else {
      if(!this.world.validateUser(req.session.uid, req.session.uuid)) {
        req.session.uuid = uuidv1()
        req.session.uid = this.world.addUser(req.session.uuid)
        console.log("replace session, invalid user, new uid = " + req.session.uid)
      }
    }
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
