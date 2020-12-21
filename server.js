/* eslint-disable no-process-exit */
process.on('uncaughtException', (err) => {
  console.log('🔥 Uncaught exception 🔥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

const app = require('./app')

const port = process.env.PORT || 5000

const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})

process.on('unhandledRejection', (err) => {
  console.log('🔥 Unhadled Rejection 🔥 Shutting down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})
