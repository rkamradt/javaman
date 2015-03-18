module.exports = function(field) {
  var users = [];
  return function(req, res, next) {
    var uid = req.session.uid;
    console.log('cookie: ' + JSON.stringify(req.session.cookie));
    if(isNaN(uid)) {
      uid = req.session.uid = field.addUser(req.session.cookie);
      console.log('no uid, setting to: ' + uid);
    } else {
      console.log('uid: ' + uid);
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
