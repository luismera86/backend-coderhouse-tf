import './middlewares/passport.js'

import cluster from 'cluster'
import config from './config/config.js'
import connectDB from './config/mongoDb.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import hbs from 'hbs'
import logger from './utils/logger.js'
import os from 'os'
import passport from 'passport'
import routes from './routes/index.js'
import session from 'express-session'

const { PORT, SECRET_KEY } = config
const app = express()

connectDB()
app.use(cors())
app.use(cookieParser())
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 10000,
    },
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('uploads'))
app.set('view engine', 'hbs')
hbs.registerPartials('views/partials')

const cpus = os.cpus()
const isCluster = process.argv[3] === 'cluster'
const isFork = process.argv[3] === 'fork'
if (cluster.isPrimary && isCluster) {
  // Devuelve true si cluster es un proceso principal o false si es un worker
  cpus.map(() => cluster.fork()) // Iteramos por todos los cpus y por cada cpu crea un subprocess
  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died. Date: ${new Date().toLocaleDateString()}`)
    cluster.fork() // Crea un nuevo proceso en caso de que se baje un worker
  })
} else if (isFork) {
  // Decimos si entra en modo fork con el pm2 ./src/server.js -- puerto fork
  app.listen(PORT, () => {
    logger.info(`Escuchando el puerto ${PORT} - Process ID: ${process.pid}. Date: ${new Date().toLocaleDateString()}`)
  })
}

app.get('/', (req, res) => {
  res.render('home')
})
app.use('/', routes)

app.listen(PORT, () => {
  logger.info(`Server on port ${PORT}`)
})
