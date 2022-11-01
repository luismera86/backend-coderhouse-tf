import { Strategy } from 'passport-local'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import logger from '../utils/logger.js'
import passport from 'passport'

// import { sendEmailNewUser } from '../services/nodeMailer.js'

// import config from '../config/config.js'

// const { PORT } = config

const LocalStrategy = Strategy
// const hashPassword = password => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
// }

// const registerStrategy = new LocalStrategy(
//   { passReqToCallback: true, usernameField: 'email' },
//   async (req, email, password, done) => {
//     try {
//       const { firstName, lastName, age, address, phone, avatar } = req.body
//       const existingEmail = await User.findOne({ email })

//       // Verifica si el mail o el usuario existen
//       if (existingEmail) {
//         return done(null, false)
//       }
//       const user = new User({
//         firstName,
//         lastName,
//         age,
//         address,
//         phone,
//         avatar,
//         password: hashPassword(password),
//         email,
//       })

//       await sendEmailNewUser(user)
//       await user.save()

//       return done(null, user)
//     } catch (error) {
//       logger.info('error', error)
//       console.log(error)
//     }
//   }
// )

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, done)
})

// passport.use('register', registerStrategy)

const isValidPassword = (reqPass, password) => {
  return bcrypt.compareSync(password, reqPass)
}

const loginStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ email: username })
    console.log(username)

    if (!user) {
      return done(null, false)
    }
    if (!isValidPassword(user.password, password)) {
      return done(null, false)
    }
    return done(null, user)
  } catch (error) {
    logger.info('error', error)
    console.log(error)
  }
})

passport.use('login', loginStrategy)
