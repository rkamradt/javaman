module.exports = function(field) {
  var users = [];
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
        res.send(field.getWorld(uid)).end();
        return;
      case '/world/go':
        res.send(field.getState()).end();
        return;
      case '/world/go/up':
        field.moveUp(uid);
        res.send(field.getState()).end();
        return;
      case '/world/go/down':
        field.moveDown(uid);
        res.send(field.getState()).end();
        return;
      case '/world/go/right':
        field.moveRight(uid);
        res.send(field.getState()).end();
        return;
      case '/world/go/left':
        field.moveLeft(uid);
        res.send(field.getState()).end();
        return;
    }
    next();
  };
};
