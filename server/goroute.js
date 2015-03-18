module.exports = function(field) {
  return function(req, res, next) {
    switch(req.url) {
      case '/field':
        res.send(field.getWorld()).end();
        return;
      case '/go':
        res.send(field.getState()).end();
        return;
      case '/go/up':
        field.moveUp();
        res.send(field.getState()).end();
        return;
      case '/go/down':
        field.moveDown();
        res.send(field.getState()).end();
        return;
      case '/go/right':
        field.moveRight();
        res.send(field.getState()).end();
        return;
      case '/go/left':
        field.moveLeft();
        res.send(field.getState()).end();
        return;
    }
    next();
  };
};
