import uuidv1 from 'uuid/v1'
import passport from 'passport'
import User from '../model/User.mjs'

export default function() {
  return function(req, res, next) {
    switch(req.url) {
      case '/register':
        const user = new User(req.params.username,
          req.params.email,
          req.params.id,
          req.params.password)
        user.save((err) => {
          if(err) return res.status(500).end()
          return res.send({message: 'ok'}).end();
        });
        return
    }
    next()
  };
}
