/*
 * Copyright 2015 randalkamradt.
 *
 */
var fieldFactory = require('./field');

module.exports = function() {
  var users = [];
  var field = fieldFactory();
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
        res.send(field.createWorld(uid)).end();
        return;
      case '/world/reset':
        res.send(field.resetWorld()).end();
        return;
      case '/world/go':
        res.send(field.getState()).end();
        return;
      case '/world/go/up':
        field.move(uid, 'up');
        res.send(field.getState()).end();
        return;
      case '/world/go/down':
        field.move(uid, 'down');
        res.send(field.getState()).end();
        return;
      case '/world/go/right':
        field.move(uid, 'right');
        res.send(field.getState()).end();
        return;
      case '/world/go/left':
        field.move(uid, 'left');
        res.send(field.getState()).end();
        return;
    }
    next();
  };
};
