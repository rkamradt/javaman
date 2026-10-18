const { pool } = require('./db')

const MAXX = 100
const MAXY = 100

// Cache the world ID in memory — it's shared and never changes at runtime
let cachedWorldId = null

async function ensureWorld() {
  if (cachedWorldId) return cachedWorldId

  const existing = await pool.query('SELECT id FROM worlds ORDER BY id LIMIT 1')
  if (existing.rows.length > 0) {
    cachedWorldId = existing.rows[0].id
    return cachedWorldId
  }

  const field = Array.from({ length: MAXX }, () =>
    Array.from({ length: MAXY }, () => Math.floor(Math.random() * 4))
  )
  const result = await pool.query(
    'INSERT INTO worlds (field) VALUES ($1) RETURNING id',
    [JSON.stringify(field)]
  )
  cachedWorldId = result.rows[0].id
  return cachedWorldId
}

async function join(userId) {
  const wid = await ensureWorld()
  await pool.query(
    `INSERT INTO player_states (user_id, world_id, cursor_x, cursor_y)
     VALUES ($1, $2, 0, 0)
     ON CONFLICT (user_id) DO UPDATE SET last_seen_at = NOW()`,
    [userId, wid]
  )
  return buildState(userId)
}

async function getState(userId) {
  const row = await pool.query(
    'SELECT user_id FROM player_states WHERE user_id = $1',
    [userId]
  )
  if (row.rows.length === 0) return join(userId)
  return buildState(userId)
}

async function move(userId, direction) {
  const row = await pool.query(
    'SELECT cursor_x, cursor_y FROM player_states WHERE user_id = $1',
    [userId]
  )
  if (row.rows.length === 0) return join(userId)

  let { cursor_x, cursor_y } = row.rows[0]
  switch (direction) {
    case 'UP':    cursor_y = Math.max(0, cursor_y - 1); break
    case 'DOWN':  cursor_y = Math.min(MAXY - 1, cursor_y + 1); break
    case 'LEFT':  cursor_x = Math.max(0, cursor_x - 1); break
    case 'RIGHT': cursor_x = Math.min(MAXX - 1, cursor_x + 1); break
  }

  await pool.query(
    'UPDATE player_states SET cursor_x=$1, cursor_y=$2, last_seen_at=NOW() WHERE user_id=$3',
    [cursor_x, cursor_y, userId]
  )
  return buildState(userId)
}

async function logoff(userId) {
  await pool.query('DELETE FROM player_states WHERE user_id = $1', [userId])
}

async function resetPlayer(userId) {
  await pool.query(
    'UPDATE player_states SET cursor_x=0, cursor_y=0, last_seen_at=NOW() WHERE user_id=$1',
    [userId]
  )
  return buildState(userId)
}

async function buildState(userId) {
  const wid = await ensureWorld()
  const [worldRow, playerRow, allPlayersRow] = await Promise.all([
    pool.query('SELECT field FROM worlds WHERE id = $1', [wid]),
    pool.query('SELECT cursor_x, cursor_y FROM player_states WHERE user_id = $1', [userId]),
    pool.query('SELECT user_id, cursor_x, cursor_y FROM player_states WHERE world_id = $1', [wid]),
  ])

  return {
    world: worldRow.rows[0].field,
    player: playerRow.rows[0] ?? { cursor_x: 0, cursor_y: 0 },
    players: allPlayersRow.rows,
  }
}

module.exports = { join, getState, move, logoff, resetPlayer }
