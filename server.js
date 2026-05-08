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
const { auth } = require('express-oauth2-jwt-bearer')

const authenticationRequired = auth({
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  audience: process.env.AUTH0_AUDIENCE,
})

// Bridge Auth0's req.auth.payload to the req.jwt.claims shape that worldroute
// expects. Falls back uid to sub since Auth0 does not add uid by default.
function jwtBridge(req, res, next) {
  const payload = req.auth.payload
  req.jwt = { claims: { ...payload, uid: payload.uid || payload.sub } }
  next()
}

var app = express()
const worldRoute = new WorldRoute(new World())

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(morgan('dev'))

app.use('/api', authenticationRequired, jwtBridge, worldRoute.route.bind(worldRoute))

const { PORT = 3001 } = process.env

app.listen(PORT, () => console.log(`javaman listening on port ${PORT}!`))
