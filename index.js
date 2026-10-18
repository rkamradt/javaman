const db = require('./db')
const app = require('./server')

const PORT = process.env.PORT || 3001

db.init()
  .then(() => {
    app.listen(PORT, () => console.log(`javaman-api listening on port ${PORT}`))
  })
  .catch(err => {
    console.error('Failed to initialize database:', err)
    process.exit(1)
  })
