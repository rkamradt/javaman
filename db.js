const { Pool } = require('pg')

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS worlds (
      id     SERIAL PRIMARY KEY,
      field  JSONB NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS player_states (
      user_id    VARCHAR(255) PRIMARY KEY,
      world_id   INTEGER REFERENCES worlds(id),
      cursor_x   INTEGER NOT NULL DEFAULT 0,
      cursor_y   INTEGER NOT NULL DEFAULT 0,
      joined_at  TIMESTAMPTZ DEFAULT NOW(),
      last_seen_at TIMESTAMPTZ DEFAULT NOW()
    );
  `)
  console.log('database schema ready')
}

module.exports = { pool, init }
