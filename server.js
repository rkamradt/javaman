const express = require('express')
const morgan = require('morgan')
const game = require('./game')

const app = express()
app.use(express.json())
app.use(morgan('combined'))

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

function requireAuth(req, res, next) {
  const userId = req.headers['x-user-id']
  if (!userId) return res.status(401).json({ error: 'unauthorized' })
  req.userId = userId
  next()
}

const VALID_DIRECTIONS = new Set(['UP', 'DOWN', 'LEFT', 'RIGHT'])

app.post('/v1/game/join', requireAuth, async (req, res) => {
  const state = await game.join(req.userId)
  res.json(state)
})

app.get('/v1/game/state', requireAuth, async (req, res) => {
  const state = await game.getState(req.userId)
  res.json(state)
})

app.post('/v1/game/move', requireAuth, async (req, res) => {
  const { direction } = req.body
  if (!VALID_DIRECTIONS.has(direction)) {
    return res.status(400).json({ error: 'direction must be UP, DOWN, LEFT, or RIGHT' })
  }
  const state = await game.move(req.userId, direction)
  res.json(state)
})

app.post('/v1/game/logoff', requireAuth, async (req, res) => {
  await game.logoff(req.userId)
  res.json({ ok: true })
})

app.post('/v1/game/reset', requireAuth, async (req, res) => {
  const state = await game.resetPlayer(req.userId)
  res.json(state)
})

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'internal server error' })
})

module.exports = app
