/*
 * Copyright 2018 randalkamradt.
 *
 */
import express from 'express'
import cors from 'cors'
import WorldRoute from './server/worldroute.js'
import World from './server/world.js'
const OktaJwtVerifier = require('@okta/jwt-verifier')

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: '0oag1oxllhj9N2SPV4x6',
  issuer: 'https://dev-804011.okta.com/oauth2/default'
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const match = authHeader.match(/Bearer (.+)/)

  if (!match) {
    res.status(401)
    return next('Unauthorized')
  }

  const accessToken = match[1];
  const audience = 'api://default'
  return oktaJwtVerifier.verifyAccessToken(accessToken, audience)
    .then((jwt) => {
      req.jwt = jwt
      next()
    })
    .catch((err) => {
      res.status(401).send(err.message)
    })
}

var app = express()
const worldRoute = new WorldRoute(new World())

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/users', authenticationRequired, (req, res) => {
  res.json(req.jwt);
})
app.use(worldRoute.route.bind(worldRoute))

const { PORT = 3001 } = process.env

app.listen(PORT, () => console.log(`javaman listening on port ${PORT}!`))
