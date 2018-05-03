/*
 * Copyright 2015 randalkamradt.
 *
 */
import Field from './field';
import uuidv1 from 'uuid/v1';

export default function() {
  const users = [];
  const field = new Field();
  return function(req, res, next) {
    console.log("session.uuid = " + req.session.uuid);
    if(isNaN(req.session.uid)) {
      req.session.uuid = uuidv1();
      req.session.uid = field.addUser(req.session.uuid);
      console.log("new session uid = " + req.session.uid);
    } else {
      if(!field.validateUser(req.session.uid, req.session.uuid)) {
        req.session.uuid = uuidv1();
        req.session.uid = field.addUser(req.session.uuid);
        console.log("replase session, invalid user uid = " + req.session.uid);
      }
    }
    const uid = req.session.uid;
    switch(req.url) {
      case '/world':
        res.set('Content-Type', 'application/json').send(field.createWorld(uid)).end();
        return;
      case '/world/reset':
        res.set('Content-Type', 'application/json').send(field.resetWorld()).end();
        return;
      case '/world/go':
        res.set('Content-Type', 'application/json').send(field.getState()).end();
        return;
      case '/world/go/up':
        field.move(uid, 'up');
        res.set('Content-Type', 'application/json').send(field.getState()).end();
        return;
      case '/world/go/down':
        field.move(uid, 'down');
        res.set('Content-Type', 'application/json').send(field.getState()).end();
        return;
      case '/world/go/right':
        field.move(uid, 'right');
        res.set('Content-Type', 'application/json').send(field.getState()).end();
        return;
      case '/world/go/left':
        field.move(uid, 'left');
        res.set('Content-Type', 'application/json').send(field.getState()).end();
        return;
    }
    next();
  };
}
