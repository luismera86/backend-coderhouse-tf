import './middlewares/passport.js'

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

app.listen(PORT, () => {
  logger.info(`Server on port ${PORT}`)
})
