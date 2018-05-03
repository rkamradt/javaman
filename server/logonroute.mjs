import uuidv1 from 'uuid/v1';

export default function() {
  return function(req, res, next) {
    const uid = req.session.uid;
    if(!uid) {
      req.session.uuid = uuidv1();
      console.log("logon session.uuid = " + req.session.uuid);
    }
    switch(req.url) {
      case '/logon':
        res.send({message: 'ok'}).end();
        return;
    }
    next();
  };
}
