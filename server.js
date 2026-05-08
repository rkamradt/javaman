/*
 * Copyright 2018 randalkamradt.
 *
 */
import express from 'express'
import cors from 'cors'
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
import WorldRoute from './server/worldroute.js'
import World from './server/world.js'
// JWT validation is handled by the api-gateway (Cloudflare tunnel).
// The gateway sets X-User-ID to the token subject before forwarding.
function authenticationRequired(req, res, next) {
  const userId = req.headers['x-user-id']
  if (!userId) {
    res.status(401).send('Unauthorized')
    return
  }
  req.jwt = { claims: { sub: userId, uid: userId } }
  next()
}

var app = express()
const worldRoute = new WorldRoute(new World())

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan('dev'))

app.use('/api', authenticationRequired, worldRoute.route.bind(worldRoute))

const { PORT = 3001 } = process.env

app.listen(PORT, () => console.log(`javaman listening on port ${PORT}!`))
