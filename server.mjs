/*
 * Copyright 2018 randalkamradt.
 *
 */
import express from 'express'
import http from 'http'
import fs from 'fs'
import url from 'url'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import methodOverride from 'method-override'
import morgan from 'morgan'
import expressSession from 'express-session'
import WorldRoute from './server/worldroute.mjs'
import World from './server/world.mjs'
import userroute from './server/userroute';
import User from './model/User.mjs'

import passport from 'passport'
import LocalStrategyFactory from 'passport-local'

const LocalStrategy = LocalStrategyFactory.Strategy

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true
}

const worldRoute = new WorldRoute(new World())

app.set('port', process.env.PORT || 9999)

app.use(cors(corsOptions))

app.use(bodyParser.urlencoded({extended: true}))

 // parse application/json
app.use(bodyParser.json())
app.use(methodOverride())
app.use(morgan('dev', { format: 'dev', immediate: true }))
app.use(expressSession({
  secret:'topsecret',
  saveUninitialized: true,
  resave: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(
  {
    usernameField: 'id',
    passwordField: 'password'
  },
  (id, password, done) => {
    User.findById(id , (err, user) => {
      if (err) return done(err)
      if (!user || !user.validPassword(password)) return done(null, false, { message: 'Incorrect Login.' })
      return done(null, user)
    })
  }
))
passport.serializeUser((user, done) =>  done(null, user.id))

passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)))

app.use(worldRoute.route.bind(worldRoute))

app.post('/logon', passport.authenticate('local'), (req, res) => res.send(JSON.stringify(req.user)).end())
app.get('/logout', (req, res) => {
  req.logout()
  res.status(200).end()
})
app.use('/user', userroute);

http.createServer(app).listen(app.get('port'), err => {
 if(err) return console.log('unable to start javaman on port ' + app.get('port'))
 console.log('Server listening on port ' + app.get('port'))
})
