const app = require('./app')
const http = require('http')
const logger = require('./utils/logger')

const server = http.createServer(app)
const PORT = 3003
// bind ip adress for wsl2
server.listen(PORT, '0.0.0.0',  () => {
  logger.info(`Server running on port ${PORT}`)
})