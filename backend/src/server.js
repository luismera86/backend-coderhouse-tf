import ChatManager from './services/chatManager.js'
import { Server as IOServer } from 'socket.io'
import config from './config/config.js'
import connectDB from './config/mongoDb.js'
import cors from 'cors'
import express from 'express'
import logger from './utils/logger.js'
import routes from './routes/index.js'

const { PORT } = config
const app = express()

connectDB()
app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('uploads'))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('home')
})
app.use('/', routes)

const serverExpress = app.listen(PORT, () => {
  logger.info(`Server on port ${PORT}`)
})
const io = new IOServer(serverExpress)
const chatManager = new ChatManager()
io.on('connection', async socket => {
  console.log(`Se conecto un usuario ${socket.id}`)
  const messages = await chatManager.getAllMessages()

  io.emit('server:message', messages)

  socket.on('client:message', async messageInfo => {
    const { email, message } = messageInfo
    await chatManager.newMessages(email, message)
    const messages = await chatManager.getAllMessages()
    io.emit('server:message', messages)
  })
})
