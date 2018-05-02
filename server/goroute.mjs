/*
 * Copyright 2015 randalkamradt.
 *
 */
import Field from './field';

export default function() {
  var users = [];
  var field = new Field();
  return function(req, res, next) {
    var uid = req.session.uid;
    if(isNaN(uid)) {
      req.session.uuid = Math.floor(Math.random()*1000000);
      uid = req.session.uid = field.addUser(req.session.uuid);
    } else {
      if(!field.validateUser(uid, req.session.uuid)) {
        req.session.uuid = Math.floor(Math.random()*1000000);
        uid = req.session.uid = field.addUser(req.session.uuid);
      }
    }
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
};
