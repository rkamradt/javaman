module.exports = function() {
  return function(req, res, next) {
    var uid = req.session.uid;
    if(isNaN(uid)) {
      req.session.uuid = Math.floor(Math.random()*1000000);
    }
    switch(req.url) {
      case '/logon':
        res.send({message: 'ok'}).end();
        return;
    }
    next();
  };
};
